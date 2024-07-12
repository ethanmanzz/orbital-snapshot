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
    case 'weightloss-none-':
        return mealPlans.loseWeight_noPref_Sodium_MealPlan();
    case 'weightloss-none-lowsodium':
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
    case 'musclegain-none-':
        return mealPlans.muscleGain_noPref_Sodium_MealPlan();
    case 'musclegain-none-lowsodium':
        return mealPlans.muscleGain_noPref_lowSodium_MealPlan();
    case 'musclegain-vegetarian-':
        return mealPlans.muscleGain_vegetarian_Sodium_MealPlan();
    case 'musclegain-vegetarian-lowsodium':
        return mealPlans.muscleGain_vegetarian_lowSodium_MealPlan();
    case 'musclegain-vegan-':
        return mealPlans.muscleGain_vegan_Sodium_MealPlan();
    case 'musclegain-vegan-lowsodium':
        return mealPlans.muscleGain_vegan_lowSodium_MealPlan();
    case 'musclegain-halal-':
        return mealPlans.muscleGain_halal_Sodium_MealPlan();
    case 'musclegain-halal-lowsodium':
        return mealPlans.muscleGain_halal_lowSodium_MealPlan();
    case 'musclegain-keto-':
        return mealPlans.muscleGain_keto_Sodium_MealPlan();
    case 'musclegain-keto-lowsodium':
        return mealPlans.muscleGain_keto_lowSodium_MealPlan();
    case 'maintainhealth-none-':
        return mealPlans.maintainHealth_noPref_Sodium_MealPlan();
    case 'maintainhealth-none-lowsodium':
        return mealPlans.maintainHealth_noPref_lowSodium_MealPlan();
    case 'maintainhealth-vegetarian-':
        return mealPlans.maintainHealth_vegetarian_Sodium_MealPlan();
    case 'maintainhealth-vegetarian-lowsodium':
        return mealPlans.maintainHealth_vegetarian_lowSodium_MealPlan();
    case 'maintainhealth-vegan-':
        return mealPlans.maintainHealth_vegan_Sodium_MealPlan();
    case 'maintainhealth-vegan-lowsodium':
        return mealPlans.maintainHealth_vegan_lowSodium_MealPlan();
    case 'maintainhealth-halal-':
        return mealPlans.maintainHealth_halal_Sodium_MealPlan();
    case 'maintainhealth-halal-lowsodium':
        return mealPlans.maintainHealth_halal_lowSodium_MealPlan();
    case 'maintainhealth-keto-':
        return mealPlans.maintainHealth_keto_Sodium_MealPlan();
    case 'maintainhealth-keto-lowsodium':
        return mealPlans.maintainHealth_keto_lowSodium_MealPlan();
    
    default:
        return {
            breakfast: [],
            lunch: [],
            dinner: []
        };
}
}
