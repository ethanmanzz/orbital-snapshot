import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Image, Alert, Dimensions, View, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../../backend/supabase/supabaseClient';
import Ionicons from 'react-native-vector-icons/Ionicons';


const getUserId = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  return user ? user.id : null;
};

const UploadScreen = () => {
  const [images, setImages] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedImages } = route.params || {};
  const screenWidth = Dimensions.get('window').width;
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (selectedImages) {
      setImages(selectedImages);
      setMealTypes(new Array(selectedImages.length).fill('')); // Initialize meal types array
    }
  }, [selectedImages]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log('Selected Date:', currentDate); // Log the selected date
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const uploadImageToSupabase = async (imageUri) => {
    try {
      const fileName = imageUri.split('/').pop();
      const response = await fetch(imageUri);
      const blob = await response.blob();
  
      const arrayBuffer = await new Response(blob).arrayBuffer();
      console.log("arrayBuffer", arrayBuffer.byteLength);
  
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`public/${Date.now()}_${fileName}`, arrayBuffer, {
          contentType: 'image/jpeg',
          upsert: false,
        });
  
      if (error) {
        console.error('Upload error:', error.message);
        return null;
      }
  
      const url = `https://pqwbyjnyiffsgbhjzpof.supabase.co/storage/v1/object/public/images/${data.path}`;
      return { key: data.path, url };
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  };

  const analyzeImage = async (imageUrl) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_url: imageUrl }),
      });
      if (!response.ok) {
        throw new Error('Image analysis failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Analysis error:', error);
      return null;
    }
  };

  const saveAnalysisResults = async (results, selectedDate, mealType) => {
    const userId = await getUserId();
    if (!userId) {
      console.error('User ID not found');
      return null;
    }

    const formattedDate = selectedDate.toISOString();
    console.log('Formatted date for insertion:', formattedDate);

    const { data, error } = await supabase
      .from('daily_intake')
      .insert([
        {
          ...results,
          id: userId,
          date: formattedDate, // Use the formatted date
          meal_type: mealType, // Include meal type
        },
      ])
      .select('entry_id') // Select the generated entry_id
      .single();

    if (error) {
      console.error('Error saving analysis results:', error.message);
      return null;
    }
    console.log('Generated entry_id from daily_intake:', data.entry_id);
    return data.entry_id;
  };

  const saveImageMetadata = async (imageUrl, entryId, selectedDate) => {
    const formattedDate = selectedDate.toISOString();
    console.log('Inserting into intake_images with entry_id:', entryId, 'and date:', formattedDate);
    const { data, error } = await supabase
      .from('intake_images')
      .insert([
        {
          image_url: imageUrl,
          entry_id: entryId,
          created_at: formattedDate, // Use the formatted date
        },
      ]);

    if (error) {
      console.error('Error saving image metadata:', error.message);
      return null;
    }
    return data;
  };

  const uploadAndAnalyzeImage = async (imageUri, mealType) => {
    setIsAnalysing(true);
    const uploadResult = await uploadImageToSupabase(imageUri);
    console.log("Upload result:", uploadResult);

    if (uploadResult) {
      const imageUrl = uploadResult.url;
      console.log("Image URL to be analyzed:", imageUrl); 
      const analysisResults = await analyzeImage(imageUrl);
      console.log("Analysis results:", analysisResults);
      const entryId = await saveAnalysisResults(analysisResults, date, mealType); // Pass the selected date here
      if (entryId) {
        const saveResults = await saveImageMetadata(uploadResult.url, entryId, date); 
        console.log('Analysis and save results:', saveResults);
        Alert.alert('Success', 'Analysis completed!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('HomeScreen'),
          },
        ]);
      } else {
        console.error('Failed to save analysis results.');
      }
    } else {
        console.error('Failed to upload image.');
    }
    setIsAnalysing(false);
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => images.forEach((img, index) => uploadAndAnalyzeImage(img.uri, mealTypes[index]))}>
          <Text style={styles.buttonText}>Upload and Analyze Images</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.buttonText}>Select Date</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      {images.map((img, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={{ uri: img.uri }} style={{ width: screenWidth - 40, height: 300, marginBottom: 5 }} />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={mealTypes[index]}
              style={styles.picker}
              onValueChange={(itemValue) => {
                const newMealTypes = [...mealTypes];
                newMealTypes[index] = itemValue;
                setMealTypes(newMealTypes);
              }}
              itemStyle={styles.pickerItem} // Style for picker items
            >
              <Picker.Item label="Select Meal Type" value="" color="#00008B" />
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
              <Picker.Item label="Snack" value="Snack" />
            </Picker>
            <Ionicons name="chevron-down" size={24} color="gray" style={styles.pickerIcon} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center'
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10
  },
  picker: {
    flex: 1,
    height: 50,
  },
  pickerIcon: {
    marginLeft: -30,
  },
  pickerItem: {
    fontSize: 16, // Adjust font size for picker items
    height: 44,   // Ensure height is appropriate for the items
  }
});

export default UploadScreen;




