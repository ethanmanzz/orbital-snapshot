/*import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { handleAllergy } from '../../../backend/supabase/database';


export default function FoodAllergyQuestion({ navigation }) {
  const [allergy, setAllergy] = useState('');

  const updateAllergy = async () => {
    await handleAllergy(allergy);
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
     });

  };
  
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={{ flex: 1 }}>
    <ImageBackground source={require('../../../frontend/assets/backgrounds/allergy_bg.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Do you have any Food Allergies?</Text>
        <Text style={styles.subtitle}>This is used to make your own personalised plan</Text>
        <TextInput
          style={styles.input}
          placeholder="nuts, milk, eggs, fish , NIL etc."
          keyboardType="string"
          value={allergy}
          onChangeText={setAllergy}
        />
        <TouchableOpacity style={styles.button} onPress={updateAllergy}>
          <Text style={styles.buttonText}>Submit</Text>
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

*/
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { handleAllergy } from '../../../backend/supabase/database';
import { requestNotificationPermissions } from '../../notifications/notification';


export default function FoodAllergyQuestion({ navigation }) {
  const [allergy, setAllergy] = useState('');

  const updateAllergy = async () => {
    await handleAllergy(allergy);

    // Request notification permissions
    const permissionsGranted = await requestNotificationPermissions();
    if (!permissionsGranted) {
      console.log('Notification permissions denied');
    }

    // Navigate to the HomeScreen regardless of permission result
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <ImageBackground source={require('../../../frontend/assets/backgrounds/allergy_bg.png')} style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.title}>Do you have any Food Allergies?</Text>
            <Text style={styles.subtitle}>This is used to make your own personalised plan</Text>
            <TextInput
              style={styles.input}
              placeholder="nuts, milk, eggs, fish , NIL etc."
              keyboardType="default"
              value={allergy}
              onChangeText={setAllergy}
            />
            <TouchableOpacity style={styles.button} onPress={updateAllergy}>
              <Text style={styles.buttonText}>Submit</Text>
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
    backgroundColor: 'rgba(240, 240, 245, 0.5)',
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
  },
});
