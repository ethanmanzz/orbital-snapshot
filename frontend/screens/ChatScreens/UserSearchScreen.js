import React, { useState, useContext } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChatContext } from 'stream-chat-expo'; 
import { useAppContext } from '../../../backend/StreamChat/AppContext';

const UserSearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const { client } = useContext(ChatContext);
  const { setChannel } = useAppContext();

  const searchUsers = async (searchText) => {
    if (!client) {
      console.error('StreamChat client is not initialized');
      return;
    }

    try {
      const response = await client.queryUsers({
        name: { $autocomplete: searchText }
      });
      setUsers(response.users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const createPrivateChannel = async (selectedUserId) => {
    if (!client) {
      console.error('StreamChat client is not initialized');
      return;
    }

    try {
      const channel = client.channel('messaging', {
        members: [client.user.id, selectedUserId]
      });
      await channel.create();
      setChannel(channel);
      navigation.navigate('ChannelScreen');
    } catch (error) {
      console.error('Error creating private channel:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Input username here"
        style={styles.input}
      />
      <TouchableOpacity onPress={() => searchUsers(searchText)} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => createPrivateChannel(item.id)} style={styles.userItem}>
            <Text style={styles.userText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.userList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // Light background color
    alignItems: 'center', // Center elements horizontally
  },
  input: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 18,
    width: '100%',
    backgroundColor: '#ffffff', // White background for input
  },
  searchButton: {
    height: 50,
    backgroundColor: '#4682b4', // Steel blue background for button
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userList: {
    width: '100%',
  },
  userItem: {
    padding: 15,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 5,
  },
  userText: {
    fontSize: 18,
  },
});

export default UserSearchScreen;

