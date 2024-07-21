import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dimensions, Image, Alert, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { fetchUserNutritionData, fetchUserWaterIntake, updateUserWaterIntake, fetchUserImagesForDate, fetchUserName, setupRealTimeSubscriptionForImages, setupRealTimeSubscription } from '../../backend/supabase/database';
import { ProgressChart } from 'react-native-chart-kit';
import { getUser } from '../../backend/supabase/auth';
import { initializePushNotifications } from '../notifications/notification';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
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

  const onPictureSaved = async (photoUri) => {
    try {
      console.log('Photo URI:', photoUri); // Debugging log
      if (typeof photoUri !== 'string' || !photoUri) {
        throw new Error('Invalid photo URI');
      }
      await MediaLibrary.saveToLibraryAsync(photoUri);
      navigation.navigate('UploadScreen', { selectedImages: [{ uri: photoUri }] });
    } catch (error) {
      console.error('Error saving photo:', error);
      Alert.alert('Error', 'Failed to save photo to library.');
    }
  };

  const takePhotoFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant camera permissions to use this feature.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const photoUri = result.assets[0].uri;
      console.log('Photo Result:', result); // Debugging log
      await onPictureSaved(photoUri);
      setModalVisible(false);
    }
    
  };

  const choosePhotoFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant library permissions to use this feature.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      navigation.navigate('UploadScreen', { selectedImages: result.assets });
    } else {
      navigation.navigate('HomeScreen');
    }
    setModalVisible(false); // close modal after choosing photo or canceling
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

    const setupSubscriptions = async () => {
      const session = await getUser();
      if (!session.data.session) {
        throw new Error('User not logged in');
      }

      const user = session.data.session.user;

      const unsubscribeImages = await setupRealTimeSubscriptionForImages(user.id, date, (updatedImageList) => {
        console.log('Updated image list received:', updatedImageList); // Debugging log
        setUserImages(updatedImageList);
      });

      const unsubscribeNutrition = await setupRealTimeSubscription(user.id, (updatedNutritionData) => {
        console.log('Updated nutrition data received:', updatedNutritionData); // Debugging log
        setNutritionData(updatedNutritionData.nutritionData);
      });

      return () => {
        unsubscribeImages;
        unsubscribeNutrition;
      };
    };

    const unsubscribe = setupSubscriptions();

    initializePushNotifications(); // Added to initialize push notifications

    return () => {
      unsubscribe.then(({ unsubscribeImages, unsubscribeNutrition }) => {
        if (unsubscribeImages) unsubscribeImages();
        if (unsubscribeNutrition) unsubscribeNutrition();
      }).catch(error => {
        console.error('Error unsubscribing:', error);
      });
    };
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
            setModalVisible(false); // close modal on request close
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Upload Photo</Text>
              <Button title="Take Photo" onPress={takePhotoFromCamera} />
              <Button title="Choose From Library" onPress={() => {
                setModalVisible(false);
                choosePhotoFromLibrary();
              }} />
              <Button title="Cancel" onPress={() => {
                setModalVisible(false);
              }} />
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


