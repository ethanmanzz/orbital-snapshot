import { Alert } from 'react-native';
import { supabase } from './supabaseClient';
import { getUser } from './auth';
import { assignMealPlan, chooseMealPlan, getMealPlan } from '../mealPlan/mealPlanner'; 
import updateNutritionalNeeds from '../calorieTracker/nutrition';
import { StreamChat } from 'stream-chat';
import { chatApiKey } from '../StreamChat/ChatConfig';


//for UsernameQuestion.js
export const handleName = async (thisFullName, thisUserName, navigation) => {
  if (thisFullName.trim() === '' || thisUserName.trim() === '') {
    Alert.alert('Invalid Names', 'Full name and username cannot be empty'); //ensures username and full name is not empty
    return;
  }

  try {
    const session = await getUser();
    if (!session.data.session) {
      throw new Error('User not logged in');
    }

    const user = session.data.session.user;

    const { error } = await supabase
      .from('profiles')
      .update({ username: thisUserName, full_name: thisFullName }) //update username and fullname into supabase
      .eq('id', user.id);

    // Create user on Stream Chat
    const client = StreamChat.getInstance(chatApiKey);
    console.log('StreamChat Client:', client);
    await client.connectUser(
      {
          id: thisUserName,
          name: thisUserName,
          image: 'https://getstream.io/random_svg/?name=John',
      },
     client.devToken(thisUserName),
    );
    client.disconnect()
    
    if (error) {
      throw error;
    }

    navigation.navigate('AgeQuestion'); 
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};



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
export const handleAllergy = async (allergy) => {
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
      await updateNutritionalNeeds(userData); //assigns the required calories, carbs, protein and fats to the user

      console.log(userData);
      const mealPlan = await chooseMealPlan(userData);
      await assignMealPlan(user.id, mealPlan); //based on all the questions, assign an appropriate meal plan

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

//for ChatQuestion.js
export const handleChat = async (selectedChats) => {
  const chatClient = StreamChat.getInstance(chatApiKey);
  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    throw new Error('User not logged in');
  }

  const user = session.data.session.user;
  const userId = user.id;

  // Use the fetchUserName function to get the username
  const { username: userName } = await fetchUserName();
  console.log(userName)
  // Connect as admin user
  await chatClient.connectUser(
    {
      id: 'Admin1',
      name: 'Admin1',
    },
    chatClient.devToken('Admin1')
  );

  // Mapping of friendly chat names to actual channel IDs
  const chatIds = {
    'Food Recommendations': 'FOOD-RECCO-SHARINGS',
    'Exercise': 'EXERCISE',
    'Social Gatherings': 'HANGOUT-SESSIONS',
    'Recipe Sharing': 'FOOD-RECIPES',
    'Casual Chit-Chat': 'CASUAL-TALKING'
  };

  const promises = selectedChats.map(async (chat) => {
    const chatId = chatIds[chat];
    if (!chatId) {
      throw new Error(`Invalid chat id for selected chat: ${chat}`);
    }
    const channel = chatClient.channel('messaging', chatId);

    await channel.addMembers([userName]);
    return channel.watch();
  });

  await Promise.all(promises);

  // Disconnect the admin user after adding the member
  await chatClient.disconnectUser();

  // Reconnect as the actual user
  await chatClient.connectUser(
    {
      id: userName,
      name: userName,
    },
    chatClient.devToken(userName)
  );

  // Optionally, you can disconnect the actual user if there's no need to stay connected
  await chatClient.disconnectUser();
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
  
    return data;
  };

  //for mealPlanScreen.js
  export const fetchUserMealPlan = async () => {
    const { data: { user } } = await supabase.auth.getUser(); 
    if (user) {
        const { data, error } = await supabase
            .from('user_data')
            .select('meal_plan')
            .eq('id', user.id)
            .single();
        
        if (data && !error) {
            const mealPlanType = data.meal_plan;
            const mealPlan = getMealPlan(mealPlanType);
            return mealPlan;
        } else {
            console.error('Error fetching meal plan:', error);
        }
    }
  };
  

  export async function fetchUserNutritionData(date) {
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      throw new Error('User not logged in');
    }
    const user = session.data.session.user;
    const userId = user.id;

    // Fetch user nutrition goals
    const { data: userNutrition, error: userNutritionError } = await supabase
      .from('user_nutrition')
      .select('caloriegoal, carbsgoal, proteingoal, fatsgoal')
      .eq('id', userId)
      .single();

    if (userNutritionError) {
      console.error('Error fetching user nutrition data:', userNutritionError);
      return null;
    }

    //Formatting to same a format that is the same as supabase
    const formattedDate = date.toISOString().split('T')[0]; //format the date so that it can be checked 
    // Fetch current daily intake
    const { data: dailyIntake, error: dailyIntakeError } = await supabase
      .from('daily_intake')
      .select('calories, carbs, proteins, fats')
      .eq('id', userId)
      .eq('date', formattedDate); //checkthe date 

    if (dailyIntakeError) {
      console.error('Error fetching daily intake data:', dailyIntakeError);
      return null;
    }

    const totalIntake = dailyIntake.reduce((acc, entry) => {
      acc.calories += entry.calories || 0;
      acc.carbs += entry.carbs || 0;
      acc.protein += entry.proteins || 0;
      acc.fats += entry.fats || 0;
      return acc;
    }, { calories: 0, carbs: 0, protein: 0, fats: 0 });

    return {
      ...userNutrition,
      currentcalories: totalIntake.calories,
      currentcarbs: totalIntake.carbs,
      currentprotein: totalIntake.protein,
      currentfats: totalIntake.fats,
    };
  };

export const fetchDailyIntake = async (userId) => {
  const { data, error } = await supabase
      .from('daily_intake')
      .select('*')
      .eq('id', userId)
      .order('date', { ascending: false });
    
  if (error) {
      console.error('Error fetching daily intake data: ', error);
      return null;
  }
  return data;
};

export const storeDailyIntake = async (dailyIntake) => {
    const { data, error } = await supabase
        .from('daily_intake')
        .insert([dailyIntake]);
    
    if (error) {
        console.error('Error storing daily intake data: ', error);
        return null;
    }
    return data;
};



export const fetchUserWeeklyAndMonthlyAverages = async (userId) => {
  const { data: weeklyData, error: weeklyError } = await supabase
    .rpc('calculate_weekly_averages', { user_id: userId });

  const { data: monthlyData, error: monthlyError } = await supabase
    .rpc('calculate_monthly_averages', { user_id: userId });

    console.log(`Fetching monthly averages for user: ${userId}`);
  const { data: monthlyWeeklyData, error: monthlyWeeklyError } = await supabase
    .rpc('calculate_monthly_weekly_averages', { user_id: userId });

  if (weeklyError) {
    console.error('Error fetching weekly averages:', weeklyError);
  }

  if (monthlyError) {
    console.error('Error fetching monthly averages:', monthlyError);
  }

  if (monthlyWeeklyError) {
    console.error('Error fetching monthly weekly averages:', monthlyWeeklyError);
  }

  return {
    weeklyData,
    monthlyData,
    monthlyWeeklyData,
    error: weeklyError || monthlyError || monthlyWeeklyError,
  };
};


//To calculate the amount for each week 

export const fetchUserDailyGoals = async (userId) => {
try {
  const { data, error } = await supabase
  .from('user_nutrition') //table name is 'user_nutrition'
  .select('caloriegoal, carbsgoal, proteingoal, fatsgoal')
  .eq('id', userId)
  .single(); // Assuming you want a single result for the user

if (error) {
  console.error('Error fetching user daily goals:', error);
  return null;
}

return data;
} catch (error) {
console.error('Unexpected error:', error);
return null;
}
};


//for water-intake 
export const fetchUserWaterIntake = async (selectedDate) => {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error('User not logged in');
  }
  const user = session.data.session.user;
  const userId = user.id;

  const { data, error } = await supabase
    .from('daily_water_intake')
    .select('water_intake')
    .eq('id', userId)
    .eq('date', selectedDate.toISOString().split('T')[0]);

  if (error) {
    console.error('Error fetching water intake:', error);
    return null;
  }

  return data[0];
};

//for water-intake
export const updateUserWaterIntake = async (selectedDate, newIntake) => {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error('User not logged in');
  }
  const user = session.data.session.user;
  const userId = user.id;

  const { data, error } = await supabase
    .from('daily_water_intake')
    .upsert({
      id: userId,
      date: selectedDate.toISOString().split('T')[0],
      water_intake: newIntake
    });

  if (error) {
    console.error('Error updating water intake:', error);
    return null;
  }

  return data;
};

export const fetchUserImagesForDate = async (date) => {
  try {
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      throw new Error('User not logged in');
    }
    const user = session.data.session.user;
    const userId = user.id;
    const formattedDate = date.toISOString().split('T')[0];

    // Fetch entries and associated images for the date
    const { data: entriesData, error: entriesError } = await supabase
      .from('daily_intake')
      .select(`
        meal_type,
        intake_images(image_url)
      `)  // Assuming `intake_images` is a related table
      .eq('id', userId)
      .eq('date', formattedDate);

    if (entriesError) {
      throw new Error(`Error fetching entries: ${entriesError.message}`);
    }

    // Flatten entries data to create a list of { meal_type, image_url } pairs
    const imageList = entriesData.flatMap(entry => 
      entry.intake_images.map(image => ({
        meal_type: entry.meal_type,
        image_url: image.image_url
      }))
    );

    return imageList;
  } catch (error) {
    console.error('Error fetching user images:', error.message);
    return [];
  }
};

//Function to retrieve the data for each day in the past week
export const fetchUserDailyIntake = async (userId) => {
  try {
    const { data, error } = await supabase
      .rpc('calculate_daily_averages', { user_id: userId });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching daily intake:', error.message);
    return { error: error.message };
  }
};

// To calculate the number of each type of meals over a weekly and monthly time span.
export const fetchMealCounts = async (userId, period = 'weekly') => {
  console.log(supabase.from('daily_intake'));

  try {
    const { data, error } = await supabase.rpc(period === 'weekly' ? 'fetch_weekly_meal_counts' : 'fetch_monthly_meal_counts', { user_id: userId });

    if (error) {
      throw error;
    }

    const mealCounts = {
      Breakfast: data[0],
      Lunch: data[1],
      Dinner: data[2],
      Snack: data[3]
    };

    return mealCounts;
  } catch (error) {
    console.error('Error fetching meal counts:', error.message);
    return { error: error.message };
  }
}; 

export const setupRealTimeSubscription = async (userId, updateCallback) => {
  console.log('Setting up real-time subscription for user:', userId); // Debugging log

  const channel = supabase
    .channel('realtime daily_intake')
    .on('postgres_changes', {
      //event: ['INSERT', 'UPDATE'],
      event: '*',
      schema: 'public',
      table: 'daily_intake',
      filter: `id=eq.${userId}`
    }, async payload => {
      console.log('Real-time event received in database.js:', payload); // Debugging log

      // Re-fetch data or perform calculations here
      const [mealCounts, averages, dailyIntake, nutritionData] = await Promise.all([
        fetchMealCounts(userId, 'weekly'),
        fetchUserWeeklyAndMonthlyAverages(userId),
        fetchUserDailyIntake(userId),
        fetchUserNutritionData(new Date())
      ]);

      updateCallback({
        mealCounts,
        weeklyData: averages.weeklyData,
        monthlyData: averages.monthlyData,
        monthlyWeeklyData: averages.monthlyWeeklyData,
        dailyIntakeData: dailyIntake,
        nutritionData: nutritionData
      });
    })
    .subscribe();

  return () => {
    console.log('Removing channel subscription in database.js'); // Debugging log
    supabase.removeChannel(channel);
  };
};

//Real-time for images 
export const setupRealTimeSubscriptionForImages = async (userId, date, updateCallback) => {
  console.log('Setting up real-time subscription for user images:', userId); // Debugging log

  const channel = supabase
    .channel('realtime daily_intake')
    .on('postgres_changes', {
      event: 'INSERT',  
      schema: 'public',
      table: 'daily_intake',
      filter: `id=eq.${userId}`
    }, async payload => {
      console.log('Real-time event received for images:', payload); // Debugging log

      // Re-fetch data or perform calculations here
      const updatedImageList = await fetchUserImagesForDate(date);
      updateCallback(updatedImageList);
    })
    .subscribe();

  return () => {
    console.log('Removing channel subscription for images'); // Debugging log
    supabase.removeChannel(channel);
  };
};

//get user's username
export const fetchUserName = async () => {
  const { data: { user } } = await supabase.auth.getUser(); 
  if (user) {
      const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();
      
      if (data && !error) {
          return data;
      } else {
          console.error('Error fetching username:', error);
      }
  }
};


//Check if a meal has been logged
export const isMealLogged = async (mealType, date) => {
  const { data: { user }, error: authError } = await supabase.auth.getUser(); 

  if (authError) {
    console.error('Error fetching authenticated user:', authError);
    return false;
  }

  if (user) {
    const { data, error } = await supabase
      .from('daily_intake')
      .select('*')
      .eq('meal_type', mealType)
      .eq('date', date)
      .eq('id', userId)

    if (error) {
      console.error('Error fetching meal logs:', error);
      return false;
    }

    return data.length > 0;
  }

  return false;
};



//for Awards and Badges
export async function fetchNutritionBadgeData(year, month) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error('User not logged in');
  }
  const user = session.data.session.user;
  const userId = user.id;

  const { data: userNutrition, error: userNutritionError } = await supabase
    .from('user_nutrition')
    .select('caloriegoal, carbsgoal, proteingoal, fatsgoal')
    .eq('id', userId)
    .single();

  if (userNutritionError) {
    console.error('Error fetching user nutrition data:', userNutritionError);
    return null;
  }

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const { data: dailyIntake, error: dailyIntakeError } = await supabase
    .from('daily_intake')
    .select('date, calories, carbs, proteins, fats')
    .eq('id', userId)
    .gte('date', startDate.toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0]);

  if (dailyIntakeError) {
    console.error('Error fetching daily intake data:', dailyIntakeError);
    return null;
  }

  const daysMeetingGoals = dailyIntake.reduce((count, entry) => {
    const withinCalorieRange = Math.abs(entry.calories - userNutrition.caloriegoal) <= 100;
    const withinCarbsRange = Math.abs(entry.carbs - userNutrition.carbsgoal) <= 3;
    const withinProteinRange = Math.abs(entry.proteins - userNutrition.proteingoal) <= 3;
    const withinFatsRange = Math.abs(entry.fats - userNutrition.fatsgoal) <= 3;

    if (withinCalorieRange && withinCarbsRange && withinProteinRange && withinFatsRange) {
      return count + 1;
    }
    return count;
  }, 0);

  return daysMeetingGoals;
}

export async function fetchCalorificBadgeData(year, month) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error('User not logged in');
  }
  const user = session.data.session.user;
  const userId = user.id;

  const { data: userNutrition, error: userNutritionError } = await supabase
    .from('user_nutrition')
    .select('caloriegoal')
    .eq('id', userId)
    .single();

  if (userNutritionError) {
    console.error('Error fetching user nutrition data:', userNutritionError);
    return null;
  }

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const { data: dailyIntake, error: dailyIntakeError } = await supabase
    .from('daily_intake')
    .select('date, calories')
    .eq('id', userId)
    .gte('date', startDate.toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0]);

  if (dailyIntakeError) {
    console.error('Error fetching daily intake data:', dailyIntakeError);
    return null;
  }

  const daysMeetingGoals = dailyIntake.reduce((count, entry) => {
    const withinCalorieRange = Math.abs(entry.calories - userNutrition.caloriegoal) <= 100;

    if (withinCalorieRange) {
      return count + 1;
    }
    return count;
  }, 0);

  return daysMeetingGoals;
}

export async function fetchProteinBadgeData(year, month) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error('User not logged in');
  }
  const user = session.data.session.user;
  const userId = user.id;

  const { data: userNutrition, error: userNutritionError } = await supabase
    .from('user_nutrition')
    .select('proteingoal')
    .eq('id', userId)
    .single();

  if (userNutritionError) {
    console.error('Error fetching user nutrition data:', userNutritionError);
    return 0;
  }

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const { data: dailyIntake, error: dailyIntakeError } = await supabase
    .from('daily_intake')
    .select('date, proteins')
    .eq('id', userId)
    .gte('date', startDate.toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0]);

  if (dailyIntakeError) {
    console.error('Error fetching daily intake data:', dailyIntakeError);
    return null;
  }

  const daysMeetingGoals = dailyIntake.reduce((count, entry) => {
    const withinProteinRange = Math.abs(entry.proteins - userNutrition.proteingoal) <= 2;

    if (withinProteinRange) {
      return count + 1;
    }
    return count;
  }, 0);

  return daysMeetingGoals;
}

export async function fetchPhotoBadgeData(year, month) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error('User not logged in');
  }
  const user = session.data.session.user;
  const userId = user.id;

  const startDate = new Date(year, month, 1).toISOString().split('T')[0];
  const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];

  const { data: dailyIntake, error: dailyIntakeError } = await supabase
    .from('daily_intake')
    .select('date, meal_type')
    .eq('id', userId)
    .gte('date', startDate)
    .lte('date', endDate);

  if (dailyIntakeError) {
    console.error('Error fetching daily intake data:', dailyIntakeError);
    return 0;
  }

  const mealLog = {};

  dailyIntake.forEach(entry => {
    const date = entry.date;
    if (!mealLog[date]) {
      mealLog[date] = new Set();
    }
    mealLog[date].add(entry.meal_type);
  });

  const daysWithAllMeals = Object.values(mealLog).filter(meals => meals.has('Breakfast') && meals.has('Lunch') && meals.has('Dinner')).length;

  return daysWithAllMeals;
}

export async function fetchHydrationBadgeData(year, month) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error('User not logged in');
  }
  const user = session.data.session.user;
  const userId = user.id;

  const startDate = new Date(year, month, 1).toISOString().split('T')[0];
  const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];

  const { data: dailyWaterIntake, error: dailyWaterIntakeError } = await supabase
    .from('daily_water_intake')
    .select('date, water_intake')
    .eq('id', userId)
    .gte('date', startDate)
    .lte('date', endDate);

  if (dailyWaterIntakeError) {
    console.error('Error fetching daily water intake data:', dailyWaterIntakeError);
    return 0;
  }

  const daysWithFullIntake = dailyWaterIntake.filter(entry => entry.water_intake >= 8).length;

  return daysWithFullIntake;
}