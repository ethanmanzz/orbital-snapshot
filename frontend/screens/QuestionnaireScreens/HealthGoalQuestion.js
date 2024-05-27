import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { handleGoal } from '../../../backend/supabase/database';

export default function HealthGoalQuestion({ navigation }) {

  const updateGoal = (thisGoal) => {
    handleGoal(thisGoal, navigation);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={{ flex: 1 }}>
    <ImageBackground source={require('../../../frontend/assets/healthgoal_bg.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Health Goal</Text>
        <Text style={styles.subtitle}>This is used to make your own personalised plan</Text>
        <TouchableOpacity style={styles.button} onPress={() => updateGoal('lose weight')}>
          <Text style={styles.buttonText}>Lose Weight</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => updateGoal('maintain health')}>
          <Text style={styles.buttonText}>Maintain Health</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => updateGoal('gain muscle')}>
          <Text style={styles.buttonText}>Gain Muscle</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    </View>
    </TouchableWithoutFeedback>
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