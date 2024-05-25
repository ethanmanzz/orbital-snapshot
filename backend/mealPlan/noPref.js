export const gainMuscle_noPref = (gender, weight, calories) => {
    let requiredCalories = Math.round(calories);
    if (gender == "male") {
      requiredCalories = calories + 300;
     } else {
      requiredCalories = calories + 200;
    }
    const requiredProtein = Math.round(weight * 1.9); //1.9g per kg of body weight
    const requiredFats = Math.round(requiredCalories * 0.30 / 9); //30% of calories from fat, 9 calories per gram of fat
    const requiredCarbs = Math.round((requiredCalories-(requiredProtein*4 + requiredFats*9)) / 4); //remaining calories from carbs, 4 calories per gram of carbs
    return [requiredCalories, requiredProtein, requiredFats, requiredCarbs];
  };
  
  export const loseWeight_noPref = (weight, calories) => {
    const requiredCalories = Math.round(calories - 400); //400 calorie deficit
    const requiredProtein = Math.round(weight * 1.8); //1.8g per kg of body weight
    const requiredFats = Math.round(requiredCalories * 0.25 / 9); //25% of calories from fat, 9 calories per gram of fat
    const requiredCarbs = Math.round((requiredCalories-(requiredProtein*4 + requiredFats*9)) / 4);
    return [requiredCalories, requiredProtein, requiredFats, requiredCarbs];
  };
  
  export const maintainHealth_noPref = (weight, calories) => {
    const requiredProtein =  Math.round(weight * 1.0); //1.0g per kg of body weight
    const requiredFats = Math.round(calories * 0.25 / 9); //25% of calories from fat, 9 calories per gram of fat
    const requiredCarbs = Math.round((calories-(requiredProtein*4 + requiredFats*9)) / 4);
    return [Math.round(calories), requiredProtein, requiredFats, requiredCarbs];
  };