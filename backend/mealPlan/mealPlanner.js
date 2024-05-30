import { supabase } from '../supabase/supabaseClient';
import * as mealPlans from "../mealPlan/mealPlans"

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
  if (goal == "lose weight") {
    return "weightloss";
  } else if (goal == "gain muscle") {
    return "musclegain";
  } else {
    return "maintainhealth";
  }
}

const sodiumPlan = (age) => {
  if (age < 50) {
    return "";
  } else {
    return "lowsodium";
  }
}

export const getMealPlan = (mealPlanType) => {
  switch(mealPlanType) {
    case 'weightloss-nopref-':
        return mealPlans.loseWeight_noPref_Sodium_MealPlan();
    case 'weightloss_nopref-lowsodium':
        return mealPlans.loseWeight_noPref_lowSodium_MealPlan();
    case 'weightloss-vegetarian-':
        return mealPlans.loseWeight_vegetarian_Sodium_MealPlan();
    case 'weightloss-vegetarian-lowsodium':
        return mealPlans.loseWeight_vegetarian_lowSodium_MealPlan();
    case 'weightloss-vegan-':
        return mealPlans.loseWeight_vegan_Sodium_MealPlan();
    case 'weightloss-vegan-lowsodium':
        return mealPlans.loseWeight_vegan_lowSodium_MealPlan();
    case 'weightloss-halal-':
        return mealPlans.loseWeight_halal_Sodium_MealPlan();
    case 'weightloss-halal-lowsodium':
        return mealPlans.loseWeight_halal_lowSodium_MealPlan();
    case 'weightloss-keto-':
        return mealPlans.loseWeight_keto_Sodium_MealPlan();
    case 'weightloss-keto-lowsodium':
        return mealPlans.loseWeight_keto_lowSodium_MealPlan();
    default:
        return {
            breakfast: [/* default breakfast items */],
            lunch: [/* default lunch items */],
            dinner: [/* default dinner items */]
        };
}
}
