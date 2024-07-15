import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import { handleChat } from '../../../backend/supabase/database';

export default function ChatQuestion({ navigation }) {
  const [selectedChats, setSelectedChats] = useState([]);

  const toggleChatSelection = (chat) => {
    setSelectedChats((prevSelectedChats) =>
      prevSelectedChats.includes(chat)
        ? prevSelectedChats.filter((c) => c !== chat)
        : [...prevSelectedChats, chat]
    );
  };

  const submitChats = async () => {
    try {
      await handleChat(selectedChats);
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <ImageBackground source={require('../../../frontend/assets/backgrounds/chatquestion_bg.png')} style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.title}>Select Chats to Join</Text>
            <Text style={styles.subtitle}>Choose which community chats you are interested to join</Text>

            {['Food Recommendations', 'Exercise', 'Social Gatherings', 'Recipe Sharing', 'Casual Chit-Chat'].map((chat) => (
              <TouchableOpacity
                key={chat}
                style={[styles.button, selectedChats.includes(chat) && styles.selectedButton]}
                onPress={() => toggleChatSelection(chat)}
              >
                <Text style={styles.buttonText}>{chat}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.submitButton} onPress={submitChats}>
              <Text style={styles.submitButtonText}>Submit</Text>
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
  button: {
    backgroundColor: '#5c85d6',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
