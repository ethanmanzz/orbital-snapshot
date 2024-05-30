import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ChatScreen from '../screens/ChatScreen';
import MealPlanScreen from '../screens/mealPlanScreens/mealPlanScreen';
import MealDetailsScreen from '../screens/mealPlanScreens/MealDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MealPlanStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MealPlanScreen" component={MealPlanScreen} options ={{ title:"Meal Plans" }}/>
      <Stack.Screen name="MealDetailsScreen" component={MealDetailsScreen} options ={{ title:"Meal Details" }} />
    </Stack.Navigator>
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
      <Tab.Screen name="Meal Plans" component={MealPlanStack} options={{ tabBarBadge: 3, headerShown: false }} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

export default Tabs;
