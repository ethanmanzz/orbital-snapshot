import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dimensions, Image, Alert, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { fetchUserNutritionData, fetchUserWaterIntake, updateUserWaterIntake, fetchUserImagesForDate, fetchUserName, setupRealTimeSubscriptionForImages, setupRealTimeSubscription} from '../../backend/supabase/database';
import { ProgressChart } from 'react-native-chart-kit';
import Svg, { Rect } from 'react-native-svg'; 
import { getUser } from '../../backend/supabase/auth'; 

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
    if (!result.cancelled) {
      console.log(result.uri);
      navigation.navigate('UploadScreen', { photoUri: result.uri });
      setModalVisible(false); // close modal after taking photo
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
      // ensures allowsMultipleSelection is not enabled
    });
    if (!result.cancelled) {
      console.log('Selected images from library:', result.assets);
      navigation.navigate('UploadScreen', { selectedImages: result.assets });
    }
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
    return Math.min(current / goal, 1);
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

  const Bar = ({ label, value, goal, color, unit }) => {
    const widthPercentage = (value / goal) * 100;
    return (
      <View style={styles.barContainer}>
        <Text style={styles.barLabel}>{label}</Text>
        <Svg height="15" width="80%">
          <Rect
            x="0"
            y="0"
            width={`${widthPercentage}%`}
            height="20"
            fill={color}
          />
          <Rect
            x={`${widthPercentage}%`}
            y="0"
            width={`${100 - widthPercentage}%`}
            height="20"
            fill="#ddd"
          />
        </Svg>
        <View style={styles.barValueContainer}>
          <Text style={styles.barValue}>{Math.round(value)}</Text>
          <Text style={styles.barGoal}>/ {goal + " " + unit}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>{userName}'s Home Page</Text>
          <TouchableOpacity onPress={handleCameraPress} style={styles.cameraIconWrapper}>
            <Ionicons name="camera" size={24} color="black" />
          </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle = {styles.container}>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateTouchable} >
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
          <View style={styles.chartContainer}>
            <ProgressChart
              data={progressData}
              width={screenWidth - 40}
              height={240}
              strokeWidth={12}
              radius={30}
              chartConfig={{
                backgroundColor: '#3146FF',
                backgroundGradientFrom: 'skyblue',
                backgroundGradientTo: '#3146FF',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(237, 243, 234, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForLabels: {
                  fontSize: 11,
                },
              }}
              hideLegend={false}
              style={styles.chart}
            />
          </View>
          {nutritionData ? (
            <View style={styles.overlayBox}>
              <Bar label="Calories  :" value={nutritionData.currentcalories} goal={nutritionData.caloriegoal} color="red" unit="kcal" />
              <Bar label="Protein   :" value={nutritionData.currentprotein} goal={nutritionData.proteingoal} color="green" unit="g" />
              <Bar label="Fats         :" value={nutritionData.currentfats} goal={nutritionData.fatsgoal} color="blue" unit="g" />
              <Bar label="Carbs     :" value={nutritionData.currentcarbs} goal={nutritionData.carbsgoal} color="orange" unit="g" />
            </View>
          ) : (
            <Text style={styles.loadingText}>Loading nutrition data...</Text>
          )}
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
            <Text style={styles.addButtonText}>Add Cup (250ml)</Text>
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
    paddingTop: 60,
    paddingHorizontal: 20, 
    paddingBottom: 30, 
    backgroundColor: '#1E90FF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  cameraIconWrapper: {
    width: 40, 
    height: 40,
    borderRadius: 20, 
    backgroundColor: 'white', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 0, 
  },
  content: {
    alignItems: 'center',
    marginVertical: 10,
    
  },
  chartTitle: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 4, 
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
    fontSize: 22,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  waterCupsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cupIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 2,
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
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
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
  overlayBox: {
    backgroundColor: '#6084cb',
    padding: 9,
    borderRadius: 10,
    elevation: 3,
    marginTop: 3,
    marginLeft: 60,
    marginRight: 60,
    marginHorizontal: 20
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingLeft: 20,
    paddingRight: 150,
  },
  barLabel: {
    fontSize: 14,
    marginRight: 10,
    width: 70, 
    fontWeight: 'bold'
  },
  barValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  barValue: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  barGoal: {
    marginLeft: 5,
    fontSize: 12,
    color: 'black',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },

});

export default HomeScreen;
