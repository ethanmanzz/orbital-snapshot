import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { handleGoal } from '../../backend/supabase/database';

export default function HealthGoalQuestion({ navigation }) {

  const updateGoal = (thisGoal) => {
    handleGoal(thisGoal, navigation);
  };

  return (
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