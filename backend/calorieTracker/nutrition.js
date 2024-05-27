import { supabase } from "../supabase/supabaseClient";
import { gainMuscle_keto, loseWeight_keto, maintainHealth_keto } from "./calorieCalculation/keto";
import { gainMuscle_noPref, loseWeight_noPref, maintainHealth_noPref } from "./calorieCalculation/noPref";
//halal, vegetarian, vegan will affect suggested meal plan. keto affect the calories goals and meal plan
  
  const getBMR = (weight, height, age, gender) => { //based on the harris-benedict formula
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  };

  const getTDEE = (bmr, activityLevel) => {
    console.log(activityLevel)
    switch (activityLevel) {
      case 'Sedentary':
        return bmr * 1.2;
      case 'Light Activity':
        return bmr * 1.375;
      case 'Moderately Active':
        return bmr * 1.55;
      case 'Very Active':
        return bmr * 1.725;
      case 'Extra Active':
        return bmr * 1.9;
      default:
        return bmr * 1.2;
    }
  };

  const updateNutritionalNeeds = async (user) => {
    try {
      console.log(user);
  
      const bmr = getBMR(user.weight, user.height, user.age, user.gender);
      const baseCalories = getTDEE(bmr, user.activity_factor);
  
      let calories, protein, fat, carbs;
      if (user.dietpref == "keto") { //if dietpref is keto
        if (user.goal == "gain muscle") {
          [calories, protein, fat, carbs] = gainMuscle_keto(baseCalories);
        } else if (user.goal == "lose weight") {
          [calories, protein, fat, carbs] = loseWeight_keto(baseCalories);
        } else {
          [calories, protein, fat, carbs] = maintainHealth_keto(baseCalories);
        }
      } else { //any other dietpref
        if (user.goal == "gain muscle") {
          [calories, protein, fat, carbs] = gainMuscle_noPref(user.gender, user.weight, baseCalories);
        } else if (user.goal == "lose weight") {
          [calories, protein, fat, carbs] = loseWeight_noPref(user.weight, baseCalories);
        } else {
          [calories, protein, fat, carbs] = maintainHealth_noPref(user.weight, baseCalories);
        }
      }
  
      // Ensure all values are integers
      calories = Math.round(calories);
      protein = Math.round(protein);
      fat = Math.round(fat);
      carbs = Math.round(carbs);
  
      const { error: updateError } = await supabase
        .from('user_nutrition')
        .insert([{
          id: user.id,
          caloriegoal: calories,
          carbsgoal: carbs,
          proteingoal: protein,
          fatsgoal: fat
        }]);
  
      if (updateError) {
        throw new Error('Error updating nutritional needs: ' + updateError.message);
      }
    } catch (error) {
        console.error(error.message);
    }
  };
  
  export default updateNutritionalNeeds;
  