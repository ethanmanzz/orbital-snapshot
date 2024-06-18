import React, { useState, useContext } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChatContext } from 'stream-chat-expo';
import { Button } from 'react-native-paper';

const UserSearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const { client } = useContext(ChatContext);

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
      navigation.navigate('ChannelScreen', { channel });
    } catch (error) {
      console.error('Error creating private channel:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Input username here"
        placeholderTextColor="#7F7F7F"
      />
      <Button 
        mode="text" 
        onPress={() => searchUsers(searchText)} 
        style={styles.searchButton}
        labelStyle={{ color: '#4A90E2', fontSize: 16 }}
      >
        Search
      </Button>
      <FlatList
        style={styles.userList}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem} onPress={() => createPrivateChannel(item.id)}>
            <Text style={styles.userName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EDF3',
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#A0AAB8',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    color: '#000',
  },
  searchButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  userList: {
    marginTop: 20,
  },
  userItem: {
    backgroundColor: '#A0AAB8',
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default UserSearchScreen;
