import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './frontend/screens/LoginScreen';
import UploadScreen from './frontend/screens/UploadScreen';
import UsernameQuestion from './frontend/screens/QuestionnaireScreens/UsernameQuestion';
import AgeQuestion from './frontend/screens/QuestionnaireScreens/AgeQuestion';
import GenderQuestion from './frontend/screens/QuestionnaireScreens/GenderQuestion';
import HeightWeightQuestion from './frontend/screens/QuestionnaireScreens/HeightWeightQuestion';
import HealthGoalQuestion from './frontend/screens/QuestionnaireScreens/HealthGoalQuestion';
import ActivityQuestion from './frontend/screens/QuestionnaireScreens/ActivityQuestion';
import DietaryPrefQuestion from './frontend/screens/QuestionnaireScreens/DietaryPrefQuestion';
import FoodAllergyQuestion from './frontend/screens/QuestionnaireScreens/FoodAllergyQuestion';
import ChatQuestion from './frontend/screens/QuestionnaireScreens/ChatQuestion';
import Tabs from './frontend/navigation/BottomTabNavigator';


import { AppProvider } from "./backend/StreamChat/AppContext";


const Stack = createStackNavigator();


export default function App() {
    return (
      <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="UsernameQuestion" component={UsernameQuestion} options={{ title: 'Names' }}/>
          <Stack.Screen name="AgeQuestion" component={AgeQuestion} options={{ title: 'Age' }}/>
          <Stack.Screen name="GenderQuestion" component={GenderQuestion} options={{ title: 'Gender' }}/>
          <Stack.Screen name="HeightWeightQuestion" component={HeightWeightQuestion} options={{ title: 'Height & Weight' }}/>
          <Stack.Screen name="HealthGoalQuestion" component={HealthGoalQuestion} options={{ title: 'Health Goal' }}/>
          <Stack.Screen name="ActivityQuestion" component={ActivityQuestion} options={{ title: 'Activity Factor' }}/>
          <Stack.Screen name="DietaryPrefQuestion" component={DietaryPrefQuestion} options={{ title: 'Dietary Preferences' }}/>
          <Stack.Screen name="FoodAllergyQuestion" component={FoodAllergyQuestion} options={{ title: 'Food Allergy' }}/>
          <Stack.Screen name="ChatQuestion" component={ChatQuestion} options={{ title: 'Interests' }}/>
          <Stack.Screen name="HomeScreen" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="UploadScreen" component={UploadScreen} options={{ title: 'Upload' }} />
        </Stack.Navigator>   
      </NavigationContainer>
      </AppProvider>
    );
  }