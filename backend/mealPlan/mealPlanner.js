import { supabase } from '../supabase/supabaseClient';

// Assign a customized meal plan to the user by giving the userId and chosen meal plan
export const assignMealPlan = async (userId, mealPlan) => {
  const { error } = await supabase
    .from('user_data')
    .update({ meal_plan: mealPlan })
    .eq("id", userId);

  if (error) throw error;
};

// Logic to create a meal plan based on user information
export const chooseMealPlan = (userInfo) => {
  console.log(userInfo);
  const userGoal = goalPlan(userInfo.goal);
  const needSodium = sodiumPlan(userInfo.age);
  return userGoal + "-" + userInfo.dietpref + "-" + needSodium;
}

const goalPlan = (goal) => {
  console.log(goal);
  if (goal == "lose weight") {
    return "weightloss";
  } else if (goal == "gain muscle") {
    return "musclegain";
  } else {
    return "maintainhealth";
  }
}

const sodiumPlan = (age) => {
  console.log(age);
  if (age < 50) {
    return "";
  } else {
    return "lowsodium";
  }
}


