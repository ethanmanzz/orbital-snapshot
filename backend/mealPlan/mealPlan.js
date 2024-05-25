import { supabase } from '../supabase/supabaseClient';

// Function to fetch user information
export const getUserInfo = async (userId) => {
  const { data, error } = await supabase
    .from('user_data')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

// Assign a customized meal plan to the user by giving the userId and chosen meal plan
export const assignMealPlan = async (userId, mealPlan) => {
  const { error } = await supabase
    .from('user_meal_plans')
    .insert({ user_id: userId, meal_plan: mealPlan });

  if (error) throw error;
};

// Logic to create a meal plan based on user information
export const createMealPlan = (userInfo) => {
  // Example logic, you should replace this with your actual logic
  if (userInfo.age < 18) {
    return 'High Protein Meal Plan';
  } else if (userInfo.age >= 18 && userInfo.age <= 50) {
    return 'Balanced Meal Plan';
  } else {
    return 'Low Sodium Meal Plan';
  }
};

