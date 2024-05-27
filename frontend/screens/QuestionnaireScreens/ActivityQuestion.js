import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { handleActivity } from '../../../backend/supabase/database';


export default function ActivityQuestion({ navigation }) {
  const updateActivity = async (thisActivity) => {
    handleActivity(thisActivity, navigation);
  };

  return (
    <ImageBackground source={require('../../../frontend/assets/activity_bg.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>How Active are you?</Text>
        <Text style={styles.subtitle}>This is used to make your own personalised plan</Text>
        <TouchableOpacity style={styles.button} onPress={() => updateActivity('Sedentary')}>
          <Text style={styles.buttonText}>Sedentary: Little or No exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => updateActivity('Light Activity')}>
          <Text style={styles.buttonText}>Light Activity: e.g. Sports 1-3 days/week</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => updateActivity('Moderately Active')}>
          <Text style={styles.buttonText}>Moderately Active: e.g. Sports 3-5 days/week</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => updateActivity('Very Active')}>
          <Text style={styles.buttonText}>Very Active: e.g. Sports 6-7 days/week</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => updateActivity('Extra Active')}>
          <Text style={styles.buttonText}>Extra Active: e.g. 2x Training a Day</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 240, 245, 0.5)', // Adjusted to be semi-transparent
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#5c85d6',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});