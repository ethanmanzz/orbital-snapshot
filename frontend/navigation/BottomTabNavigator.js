import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome
import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ChatScreen from '../screens/ChatScreen';
import MealPlanScreen from '../screens/mealPlanScreens/mealPlanScreen';

const Tab = createBottomTabNavigator();

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
          } else if (route.name === 'MealPlans') {
            return <FontAwesome name="cutlery" size={size} color={color} />; // Direct use of FontAwesome
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="MealPlans" component={MealPlanScreen} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

export default Tabs;