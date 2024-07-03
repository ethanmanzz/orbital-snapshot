import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dimensions, Image, Alert, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { fetchUserNutritionData, fetchUserWaterIntake, updateUserWaterIntake, fetchUserImagesForDate, fetchUserName } from '../../backend/supabase/database';
import { ProgressChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation, route }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const [waterIntake, setWaterIntake] = useState(0);
  const [userImages, setUserImages] = useState([]);
  const [refreshData, setRefreshData] = useState(false); // State to trigger data refresh
  const [userName, setUserName] = useState('');

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const handleCameraPress = () => {
    setModalVisible(true);
  };

  const takePhotoFromCamera = () => {
    launchCamera(
      { mediaType: 'photo', includeBase64: false, saveToPhotos: true },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Error: ', response.error);
        } else {
          console.log(response.uri);
          navigation.navigate('UploadScreen', { photoUri: response.uri });
        }
      }
    );
  };

  const choosePhotoFromLibrary = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: false, selectionLimit: 0 },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.assets) {
          console.log('Selected images from library:', response.assets);
          navigation.navigate('UploadScreen', { selectedImages: response.assets });
        }
      }
    );
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
    fetchNutritionData(currentDate);
    fetchWaterIntake(currentDate);
    fetchUserImages(currentDate);
  };

  const fetchNutritionData = async (selectedDate) => {
    const data = await fetchUserNutritionData(selectedDate);
    setNutritionData(data);
  };

  const fetchWaterIntake = async (selectedDate) => {
    const data = await fetchUserWaterIntake(selectedDate);
    setWaterIntake(data ? data.water_intake : 0);
  };

  const fetchUserImages = async (selectedDate) => {
    const images = await fetchUserImagesForDate(selectedDate);
    setUserImages(images);
  };

  const handleAddWater = async () => {
    if (waterIntake >= 8) {
      Alert.alert('Congratulations!', 'You have already drunk 8 cups of water today, keep it up!');
      return;
    }
    const newIntake = waterIntake + 1;
    setWaterIntake(newIntake);
    await updateUserWaterIntake(date, newIntake);
  };

  useEffect(() => {
    fetchNutritionData(date);
    fetchWaterIntake(date);
    fetchUserImages(date);
    const getUserName = async () => {
      const name = await fetchUserName();
      setUserName(name.username);
    };
    getUserName();
  }, [date, refreshData]);

  const getProgressData = (current, goal) => {
    return current / goal;
  };
  
  const progressData = {
    labels: ["Calories", "Protein", "Fats", "Carbs"],
    data: nutritionData
      ? [
          getProgressData(nutritionData.currentcalories, nutritionData.caloriegoal),
          getProgressData(nutritionData.currentprotein, nutritionData.proteingoal),
          getProgressData(nutritionData.currentfats, nutritionData.fatsgoal),
          getProgressData(nutritionData.currentcarbs, nutritionData.carbsgoal)
        ]
      : [0, 0, 0, 0]
  };

  const renderMealSections = () => {
    return mealTypes.map(mealType => (
      <View key={mealType} style={styles.mealContainer}>
        <Text style={styles.mealType}>{mealType}</Text>
        {userImages.filter(img => img.meal_type === mealType).map((img, index) => (
          <Image key={index} source={{ uri: img.image_url }} style={styles.mealImage} />
        ))}
      </View>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Hello {userName}!</Text>
          <TouchableOpacity onPress={handleCameraPress}>
            <Ionicons name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateTouchable}>
            <Ionicons name="calendar" size={20} color="gray" />
            <Text style={styles.date}>{date.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.chartTitle}>Nutrition Progress</Text>
          <ProgressChart
            data={progressData}
            width={screenWidth - 40}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForLabels: {
                fontSize: 12,
              },
            }}
            hideLegend={false}
            style={styles.chart}
          />
        </View>
        <View style={styles.waterIntakeContainer}>
          <Text style={styles.waterIntakeTitle}>Water Intake</Text>
          <View style={styles.waterCupsContainer}>
            {[...Array(8)].map((_, index) => (
              <Image
                key={index}
                source={
                  index < waterIntake
                    ? require('../assets/filled_cup.png')
                    : require('../assets/empty_cup.png')
                }
                style={styles.cupIcon}
              />
            ))}
          </View>
          <TouchableOpacity onPress={handleAddWater} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Cup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imagesContainer}>
          <Text style={styles.imagesTitle}>Food Intake</Text>
          {renderMealSections()}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Upload Photo</Text>
              <Button title="Take Photo" onPress={takePhotoFromCamera} />
              <Button title="Choose From Library" onPress={choosePhotoFromLibrary} />
              <Button title="Cancel" onPress={() => setModalVisible(!modalVisible)} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  waterIntakeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  waterIntakeTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  waterCupsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cupIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dateTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginLeft: 5,
    fontSize: 16,
    color: 'gray',
  },
  imagesContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagesTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  uploadedImage: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  mealContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  mealType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealImage: {
    width: 300,
    height: 200,
    marginVertical: 10,
  },
  mealItem: {
    marginBottom: 10,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default HomeScreen;
 





























