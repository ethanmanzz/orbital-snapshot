import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Image, Button, Alert, Dimensions, View, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../../backend/supabase/supabaseClient';

const getUserId = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  return user ? user.id : null;
};

const UploadScreen = () => {
  const [images, setImages] = useState([]);
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
    // Placeholder for image analysis logic
    return { calories: 250, proteins: 10, fats: 5, carbs: 20 }; // Example results
  };

  const saveAnalysisResults = async (results, selectedDate) => {
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

  const uploadAndAnalyzeImage = async (imageUri) => {
    setIsAnalysing(true);
    const uploadResult = await uploadImageToSupabase(imageUri);
    console.log("Upload result:", uploadResult);
    if (uploadResult) {
      const analysisResults = await analyzeImage(uploadResult.url);
      console.log("Analysis results:", analysisResults);
      const entryId = await saveAnalysisResults(analysisResults, date); // Pass the selected date here
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
      <Text>Review and Upload Photos</Text>
      <Button onPress={showDatePicker} title="Select Date" />
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
        <Image key={index} source={{ uri: img.uri }} style={{ width: screenWidth - 40, height: 300, marginBottom: 10 }} />
      ))}
      <Button title="Upload and Analyze Images" onPress={() => images.forEach(img => uploadAndAnalyzeImage(img.uri))} />
    </ScrollView>
  );
};

export default UploadScreen;


/*import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Image, Button, Alert, Dimensions, View, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../../backend/supabase/supabaseClient';

const getUserId = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  return user ? user.id : null;
};

const UploadScreen = () => {
  const [images, setImages] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedImages } = route.params || {};
  const screenWidth = Dimensions.get('window').width;
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mealTypes, setMealTypes] = useState({});

  useEffect(() => {
    if (selectedImages) {
      setImages(selectedImages);
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
    // Placeholder for image analysis logic
    return { calories: 250, proteins: 10, fats: 5, carbs: 20 }; // Example results
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
          meal_type: mealType // Save the meal type
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
          date: formattedDate, // Use the formatted date
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
      const analysisResults = await analyzeImage(uploadResult.url);
      console.log("Analysis results:", analysisResults);
      const entryId = await saveAnalysisResults(analysisResults, date, mealType); // Pass the selected date and meal type here
      if (entryId) {
        const saveResults = await saveImageMetadata(uploadResult.url, entryId, date); // Pass the correct URL and date here
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
      <Text>Review and Upload Photos</Text>
      <Button onPress={showDatePicker} title="Select Date" />
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
        <View key={index} style={{ marginBottom: 20, alignItems: 'center' }}>
          <Image source={{ uri: img.uri }} style={{ width: screenWidth - 40, height: 300, marginBottom: 10 }} />
          <Text>Select Meal Type:</Text>
          <Picker
            selectedValue={mealTypes[index] || "breakfast"}
            onValueChange={(itemValue) => {
              setMealTypes((prev) => ({ ...prev, [index]: itemValue }));
            }}
            style={{ height: 50, width: screenWidth - 40 }}
          >
            <Picker.Item label="Breakfast" value="breakfast" />
            <Picker.Item label="Lunch" value="lunch" />
            <Picker.Item label="Dinner" value="dinner" />
            <Picker.Item label="Snack" value="snack" />
          </Picker>
        </View>
      ))}
      <Button title="Upload and Analyze Images" onPress={() => images.forEach((img, index) => uploadAndAnalyzeImage(img.uri, mealTypes[index]))} />
    </ScrollView>
  );
};

export default UploadScreen;


*/
