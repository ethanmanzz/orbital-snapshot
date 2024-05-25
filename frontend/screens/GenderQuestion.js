import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { handleGender } from '../../backend/supabase/database';

export default function GenderQuestion({ navigation }) {

  const updateGender = (thisGender) => {
    handleGender(thisGender, navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your Gender?</Text>
      <Text style={styles.subtitle}>This is used to make your own personalised plan</Text>
      <TouchableOpacity style={styles.button} onPress={() => updateGender('male')}>
        <Text style={styles.buttonText}>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => updateGender('female')}>
        <Text style={styles.buttonText}>Female</Text>
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