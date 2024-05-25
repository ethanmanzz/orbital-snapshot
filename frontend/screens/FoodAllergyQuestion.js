import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { handleAllergy } from '../../backend/supabase/database';


export default function FoodAllergyQuestion({ navigation }) {
  const [allergy, setAllergy] = useState('');

  const updateAllergy = async () => {
    await handleAllergy(allergy, navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do you have any Food Allergies?</Text>
      <Text style={styles.subtitle}>This is used to make your own personalised plan</Text>
      <TextInput
        style={styles.input}
        placeholder="nuts, milk, eggs, fish etc."
        keyboardType="string"
        value={allergy}
        onChangeText={setAllergy}
      />
      <TouchableOpacity style={styles.button} onPress={updateAllergy}>
        <Text style={styles.buttonText}>Submit</Text>
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