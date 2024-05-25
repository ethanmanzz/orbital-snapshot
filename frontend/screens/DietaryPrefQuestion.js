import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { handlePref } from '../../backend/supabase/database';


export default function DietaryPrefQuestion({ navigation }) {
  const updatePref = async (thisPref) => {
    handlePref(thisPref, navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do you have any Dietary Preferences?</Text>
      <Text style={styles.subtitle}>This is used to make your own personalised plan</Text>
      <TouchableOpacity style={styles.button} onPress={() => updatePref('halal')}> 
        <Text style={styles.buttonText}>Halal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => updatePref('vegetarian')}>
        <Text style={styles.buttonText}>Vegetarian</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => updatePref('vegan')}>
        <Text style={styles.buttonText}>Vegan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => updatePref('keto')}>
        <Text style={styles.buttonText}>Keto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => updatePref('none')}>
        <Text style={styles.buttonText}>None</Text>
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