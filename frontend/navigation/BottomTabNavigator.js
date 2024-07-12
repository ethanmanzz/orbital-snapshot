import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import MealPlanScreen from '../screens/mealPlanScreens/mealPlanScreen';
import MealDetailsScreen from '../screens/mealPlanScreens/MealDetailsScreen';
import { OverlayProvider, Chat } from 'stream-chat-expo';
import { useChatClient } from '../../backend/StreamChat/useChatClient';
import ChannelListScreen from '../screens/ChatScreens/ChannelListScreen';
import ChannelScreen from '../screens/ChatScreens/ChannelScreen';
import ThreadScreen from '../screens/ChatScreens/ThreadScreen';
import UserSearchScreen from '../screens/ChatScreens/UserSearchScreen';
import { StreamChat } from 'stream-chat';
import { chatApiKey } from '../../backend/StreamChat/ChatConfig';
import { Text } from 'react-native';
import { IconButton } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MealPlanStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MealPlanScreen" component={MealPlanScreen} options={{ title: "Meal Plans" }} />
      <Stack.Screen name="MealDetailsScreen" component={MealDetailsScreen} options={{ title: "Meal Details" }} />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  const { clientIsReady } = useChatClient();
  const chatClient = StreamChat.getInstance(chatApiKey);

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen name="ChannelListScreen" component={ChannelListScreen} options={({ navigation }) => ({ 
            title: 'Chats',
            headerRight: () => (
              <IconButton icon="magnify" size={28} onPress={() => navigation.navigate('UserSearchScreen')}/>
               ),
             })}
           />
          <Stack.Screen name="UserSearchScreen" component={UserSearchScreen} options={{ title: 'Search Users' }}/>
          <Stack.Screen name="ChannelScreen" component={ChannelScreen} options={{ title: "" }} />
          <Stack.Screen name="ThreadScreen" component={ThreadScreen} />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
          } else if (route.name === 'Progress') {
            return <Ionicons name={focused ? 'bar-chart' : 'bar-chart-outline'} size={size} color={color} />;
          } else if (route.name === 'Chat') {
            return <Ionicons name={focused ? 'chatbubble' : 'chatbubble-outline'} size={size} color={color} />;
          } else if (route.name === 'Meal Plans') {
            return <FontAwesome name="cutlery" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Meal Plans" component={MealPlanStack} options={{ headerShown: false }} />
      <Tab.Screen name="Chat" component={ChatStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default Tabs;
