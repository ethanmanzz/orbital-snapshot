export const gainMuscle_keto = (gender, calories) => {
    let requiredCalories = Math.round(calories);
    if (gender == "male") {
      requiredCalories = calories + 300;
     } else {
      requiredCalories = calories + 200;
    }
    const requiredProtein = Math.round(requiredCalories * 0.25 / 4); //25% of calories and 4 calories per gram of protein
    const requiredFats = Math.round(requiredCalories * 0.70 / 9); //70% of calories from fat, 9 calories per gram of fat
    const requiredCarbs = Math.round(requiredCalories * 0.05 / 4); //5% of calories from carbs, 4 calories per gram of carbs
    return [requiredCalories, requiredProtein, requiredFats, requiredCarbs];
  };
  
  export const loseWeight_keto= (calories) => {
    const requiredCalories = Math.round(calories - 400); //400 calorie deficit
    const requiredProtein = Math.round(requiredCalories * 0.25 / 4); //25% of calories and 4 calories per gram of protein
    const requiredFats = Math.round(requiredCalories * 0.70 / 9); //70% of calories from fat, 9 calories per gram of fat
    const requiredCarbs = Math.round(requiredCalories * 0.05 / 4); //5% of calories from carbs, 4 calories per gram of carbs
    return [requiredCalories, requiredProtein, requiredFats, requiredCarbs];
  };
  
  export const maintainHealth_keto = (calories) => {
    const requiredProtein = Math.round(calories * 0.20 / 4); //25% of calories and 4 calories per gram of protein
    const requiredFats = Math.round(calories * 0.75 / 9); //70% of calories from fat, 9 calories per gram of fat
    const requiredCarbs = Math.round(calories * 0.05 / 4); //5% of calories from carbs, 4 calories per gram of carbs
    return [Math.round(calories), requiredProtein, requiredFats, requiredCarbs];
  };