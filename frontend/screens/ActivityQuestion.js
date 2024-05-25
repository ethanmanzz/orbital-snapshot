import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { handleActivity } from '../../backend/supabase/database';


export default function ActivityQuestion({ navigation }) {
  const updateActivity = async (thisActivity) => {
    handleActivity(thisActivity, navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How Active are you? (How much do you exercise?)</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
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