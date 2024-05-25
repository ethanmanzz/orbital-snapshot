import { Alert } from 'react-native';
import { supabase } from './supabaseClient';
import { getUser } from './auth';
import { getUserInfo, assignMealPlan, createMealPlan } from '../../backend/mealPlan/mealPlan'; 
import updateNutritionalNeeds from '../mealPlan/nutrition';
import { CommonActions } from '@react-navigation/native';

//for AgeQuestion.js
export const handleAgeSubmit = async (thisAge, navigation) => {
    try {
      const parsedAge = parseInt(thisAge, 10);
      if (isNaN(parsedAge) || parsedAge <= 0) {
        Alert.alert('Invalid age', 'Please enter a valid age.'); //handles that age must be integer
        return;
      }

      const session = await getUser(); //get user info
      if (!session.data.session) {
        throw new Error('User not logged in');
      }

      const user = session.data.session.user; //get user 
  

      const { data: existingUserData , error } = await hasRowAlready(user.id);

      if (existingUserData) {
        // If user data exists, update the age
        await updateUserAge(user.id, parsedAge);
      } else {
        // If user data doesn't exist, insert new row
        await createRowWithAge(user.id, parsedAge);
      }

      if (error) {
        throw error;
      }

      navigation.navigate('GenderQuestion');

    } catch (error) {
      Alert.alert('Error', error.message);
    }
};

export const hasRowAlready = async (userId) => { //check if user already created a data row
  return await supabase 
  .from('user_data')
  .select('id')
  .eq('id', userId)
  .maybeSingle();
};

export const updateUserAge = async (userId, age) => { //update user's age 
  return await supabase
    .from('user_data')
    .update({ age })
    .eq('id', userId);
};

export const createRowWithAge = async (userId, parsedAge) => {
  return await supabase
  .from('user_data')
  .insert([{ id: userId, age: parsedAge }]);
};

//for GenderQuestion.js
export const handleGender = async (thisGender, navigation) => {
    try {
        const session = await getUser();
        if (!session.data.session) {
          throw new Error('User not logged in');
        }
  
        const user = session.data.session.user;
  
        const {error} = await supabase
        .from('user_data')
        .update({ gender: thisGender })
        .eq('id', user.id);
  
        if (error) {
          throw error;
        }

        navigation.navigate('HeightWeightQuestion'); 
  
      } catch (error) {
        Alert.alert('Error', error.message);
      }
};

//for HeightWeightQuestion.js
export const updateHeightWeight = async (height, weight, navigation) => {
    try {
      const parsedHeight = parseInt(height, 10);
      if (isNaN(parsedHeight) || parsedHeight <= 0) {
        Alert.alert('Invalid Height', 'Please enter a valid height.'); //handles that height must be positive integer
        return;
      }
      const parsedWeight = parseInt(weight, 10);
      if (isNaN(parsedWeight) || parsedWeight <= 0) {
        Alert.alert('Invalid Weight', 'Please enter a valid weight.'); //handles that weight must be positive integer
        return;
      }

      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        throw new Error('User not logged in');
      }

      const user = session.data.session.user; //get user 

      const {error} = await supabase
        .from('user_data')
        .update({ height: parsedHeight , weight: parsedWeight })
        .eq('id', user.id);
    
      if (error) {
        throw error;
      }
      navigation.navigate('HealthGoalQuestion');

    } catch (error) {
      Alert.alert('Error', error.message);
    }
};

//for HealthGoalQuestion.js
export const handleGoal = async (thisGoal, navigation) => {
    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        throw new Error('User not logged in');
      }

      const user = session.data.session.user;

      const {error} = await supabase
      .from('user_data')
      .update({ goal: thisGoal })
      .eq('id', user.id);

      if (error) {
        throw error;
      }
      navigation.navigate('ActivityQuestion'); 

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

//for ActivityQuestion.js
export const handleActivity = async (thisActivity, navigation) => {
  try {
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      throw new Error('User not logged in');
    }

    const user = session.data.session.user;

    const {error} = await supabase
    .from('user_data')
    .update({ activity_factor: thisActivity })
    .eq('id', user.id);

    if (error) {
      throw error;
    }
    navigation.navigate('DietaryPrefQuestion'); 

  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

//for DietaryPrefQuestion.js
export const handlePref = async (thisPref, navigation) => {
    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        throw new Error('User not logged in');
      }

      const user = session.data.session.user;

      const {error} = await supabase
      .from('user_data')
      .update({ dietpref: thisPref })
      .eq('id', user.id);

      if (error) {
        throw error;
      }
      navigation.navigate('FoodAllergyQuestion'); 

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

//for FoodAllergyQuestion.js
export const handleAllergy = async (allergy, navigation) => {
    try {
      if (/\d/.test(allergy)) {
        throw new Error('Invalid input. Allergies cannot contain numbers');
      }

      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        throw new Error('User not logged in');
      }

      const user = session.data.session.user; //get user 

      const {error} = await supabase
        .from('user_data')
        .update({ allergy: allergy })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      const userData = await fetchUserQuestionnaireData();
      await updateNutritionalNeeds(userData);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        })
      );
      // Fetch user information after completing the questionnaire (INCOMPLETE)
      //const userInfo = await getUserInfo(user.id);

      // Assign a customized meal plan based on user information
      //const mealPlan = createMealPlan(userInfo);
      //await assignMealPlan(user.id, mealPlan);

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  export async function fetchUserQuestionnaireData() {
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      throw new Error('User not logged in');
    }
    const user = session.data.session.user;
  
    const { data, error } = await supabase
      .from('user_data')
      .select('*')
      .eq('id', user.id)
      .single(); // Ensure there's exactly one row
  
    if (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Error fetching user data'); // Propagate the error
    }
    console.log(data);
  
    return data;
  };

  export async function fetchUserNutritionData() {
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      throw new Error('User not logged in');
    }
    const user = session.data.session.user;
  
    const { data, error } = await supabase
      .from('user_nutrition')
      .select('currentcalories, caloriegoal, currentcarbs, carbsgoal, currentprotein, proteingoal, currentfats, fatsgoal')
      .eq('id', user.id)
      .single(); 
  
      if (error) {
        console.error('Error fetching user data:', error);
        return;
      }
      
      return data;
    };
  
  
  




      


