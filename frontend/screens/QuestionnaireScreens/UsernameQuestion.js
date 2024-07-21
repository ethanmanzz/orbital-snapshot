
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { handleName } from '../../../backend/supabase/database';

export default function UsernameQuestion({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');

  const updateGender = () => {
    handleName(fullName, userName, navigation);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
      <ImageBackground source={require('../../../frontend/assets/backgrounds/name_bg.png')} style={styles.background}>
        <View style={styles.container}>
        <Text style={styles.title}>What is your full name</Text>
        <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              keyboardType="string"
              value={fullName}
              onChangeText={setFullName}
            />
        <Text style={styles.title}>Create a username</Text>
        <TextInput
              style={styles.input}
              placeholder="Enter your username"
              keyboardType="string"
              value={userName}
              onChangeText={setUserName}
            />
        <TouchableOpacity style={styles.button} onPress={updateGender}>
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