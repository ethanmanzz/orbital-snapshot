import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { fetchUserNutritionData } from '../../backend/supabase/database';
import { ProgressCircle } from 'react-native-svg-charts';

const HomeScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);

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
          console.log('ImagePicker Error: ', response.error);
        } else {
          console.log(response.uri);
        }
      }
    );
  };

  const choosePhotoFromLibrary = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: false },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          console.log(response.uri);
        }
      }
    );
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
    fetchNutritionData(currentDate); // Fetch data for the selected date
  };

  const fetchNutritionData = async (selectedDate) => {
    const data = await fetchUserNutritionData(selectedDate);
    setNutritionData(data);
  };

  useEffect(() => {
    fetchNutritionData(date); // Fetch data for the current date on initial render
  }, [date]);

  const getProgressData = (current, goal) => {
    return current / goal;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Hello Snapshot!</Text>
        <TouchableOpacity onPress={handleCameraPress}>
          <Ionicons name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.progressRingContainer}>
          <View style={styles.largeProgressRing}>
            <Text>Calories</Text>
            <ProgressCircle
              style={styles.largeProgressCircle}
              progress={nutritionData ? getProgressData(nutritionData.currentcalories, nutritionData.caloriegoal) : 0}
              progressColor={'rgb(255, 165, 0)'}
            />
            <Text>{nutritionData ? `${nutritionData.currentcalories} / ${nutritionData.caloriegoal} kcal` : 'Loading...'}</Text>
          </View>
          <View style={styles.smallProgressRingsContainer}>
            <View style={styles.smallProgressRing}>
              <Text>Protein</Text>
              <ProgressCircle
                style={styles.smallProgressCircle}
                progress={nutritionData ? getProgressData(nutritionData.currentprotein, nutritionData.proteingoal) : 0}
                progressColor={'rgb(134, 65, 244)'}
              />
              <Text>{nutritionData ? `${nutritionData.currentprotein} / ${nutritionData.proteingoal} g` : 'Loading...'}</Text>
            </View>
            <View style={styles.smallProgressRing}>
              <Text>Fats</Text>
              <ProgressCircle
                style={styles.smallProgressCircle}
                progress={nutritionData ? getProgressData(nutritionData.currentfats, nutritionData.fatsgoal) : 0}
                progressColor={'rgb(244, 65, 134)'}
              />
              <Text>{nutritionData ? `${nutritionData.currentfats} / ${nutritionData.fatsgoal} g` : 'Loading...'}</Text>
            </View>
            <View style={styles.smallProgressRing}>
              <Text>Carbs</Text>
              <ProgressCircle
                style={styles.smallProgressCircle}
                progress={nutritionData ? getProgressData(nutritionData.currentcarbs, nutritionData.carbsgoal) : 0}
                progressColor={'rgb(65, 134, 244)'}
              />
              <Text>{nutritionData ? `${nutritionData.currentcarbs} / ${nutritionData.carbsgoal} g` : 'Loading...'}</Text>
            </View>
          </View>
        </View>
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
  kcal: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'gray',
  },
  progressRingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  largeProgressRing: {
    alignItems: 'center',
    marginBottom: 20,
  },
  largeProgressCircle: {
    height: 150,
    width: 150,
  },
  smallProgressRingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  smallProgressRing: {
    alignItems: 'center',
    margin: 10,
  },
  smallProgressCircle: {
    height: 80,
    width: 80,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dateTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginLeft: 10,
    fontSize: 16,
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


