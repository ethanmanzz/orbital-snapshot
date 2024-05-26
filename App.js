import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './frontend/screens/LoginScreen';
import AgeQuestion from './frontend/screens/AgeQuestion';
import GenderQuestion from './frontend/screens/GenderQuestion';
import HeightWeightQuestion from './frontend/screens/HeightWeightQuestion';
import HealthGoalQuestion from './frontend/screens/HealthGoalQuestion';
import ActivityQuestion from './frontend/screens/ActivityQuestion';
import DietaryPrefQuestion from './frontend/screens/DietaryPrefQuestion';
import FoodAllergyQuestion from './frontend/screens/FoodAllergyQuestion';
import HomeScreen from './frontend/screens/HomeScreen';
import Tabs from './frontend/navigation/BottomTabNavigator';



const Stack = createStackNavigator();


export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: '' }}/>
          <Stack.Screen name="AgeQuestion" component={AgeQuestion} options={{ title: 'Age' }}/>
          <Stack.Screen name="GenderQuestion" component={GenderQuestion} options={{ title: 'Gender' }}/>
          <Stack.Screen name="HeightWeightQuestion" component={HeightWeightQuestion} options={{ title: 'Height & Weight' }}/>
          <Stack.Screen name="HealthGoalQuestion" component={HealthGoalQuestion} options={{ title: 'Health Goal' }}/>
          <Stack.Screen name="ActivityQuestion" component={ActivityQuestion} options={{ title: 'Activity Factor' }}/>
          <Stack.Screen name="DietaryPrefQuestion" component={DietaryPrefQuestion} options={{ title: 'Dietary Preferences' }}/>
          <Stack.Screen name="FoodAllergyQuestion" component={FoodAllergyQuestion} options={{ title: 'Food Allergy' }}/>
          <Stack.Screen name="HomeScreen" component={Tabs} options={{ headerShown: false }} />
        </Stack.Navigator>
        
      </NavigationContainer>
    );
  }