import * as breakfast from "../mealPlan/breakfast";
import * as lunch from "../mealPlan/lunch";
import * as dinner from "../mealPlan/dinner";

//lose weight, no pref, low sodium
export const loseWeight_noPref_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
        ],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
        ]
    }
}
//lose weight, no pref, normal sodium
export const loseWeight_noPref_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.smoothie_banana_spinach_proteinPowder_almondMilk(),
            breakfast.chiaSeedPudding_berries(),
            breakfast.greekYogurt_honey_nuts(),
            breakfast.eggWhiteOmelette_spinach_tomatoes(),
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola()
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
            lunch.yongTauFoo_clearSoup(), 
            lunch.hainaneseChickenBreast_steamedVeggies(),
            lunch.sushiRolls_salmon_avocado_cucumber(),
            lunch.bakKutTeh_leanPork_reducedRice(), 
            lunch.vegetarianBeeHoon_tofu_vegetables(), 
            lunch.fishSoup_rice_clearBroth()],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
            dinner.grilledChickenSalad_lightDressing(),
            dinner.tofuStirFry_mixedVeggies_quinoa(),
            dinner.beefBroccoliStirFry_cauliflowerRice(),
            dinner.grilledSalmon_asparagus_sweetPotato(),
            dinner.chickenSate_cucumberSalad(),
            dinner.stirFriedChicken_bellPeppers_brownRice()
        ],
    };
}

//lose weight, vegetarian, low sodium
export const loseWeight_vegetarian_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.wholeGrainToast_avocado()
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
        ],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
            dinner.grilledChickenSalad_lightDressing(),
        ]
    }
}
//lose weight, vegetarian, normal sodium
export const loseWeight_vegetarian_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
            lunch.sushiRolls_salmon_avocado_cucumber()
        ],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
        ]
    }
}
//lose weight, vegan, low sodium
export const loseWeight_vegan_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.chiaSeedPudding_berries()
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
        ],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
            dinner.tofuStirFry_mixedVeggies_quinoa(),
        ]
    }
}
//lose weight, vegan, normal sodium
export const loseWeight_vegan_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
            lunch.vegetarianBeeHoon_tofu_vegetables()
        ],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
        ]
    }
}
//lose weight, halal, low sodium
export const loseWeight_halal_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola()
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
        ],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
        ]
    }
}
//lose weight, halal, normal sodium
export const loseWeight_halal_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
        ],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
            dinner.beefBroccoliStirFry_cauliflowerRice()
        ]
    }
}
//lose weight, keto, low sodium
export const loseWeight_keto_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
        ],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
            dinner.beefBroccoliStirFry_cauliflowerRice()
        ]
    }
}
//lose weight, keto, normal sodium
export const loseWeight_keto_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
        ],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
            dinner.beefBroccoliStirFry_cauliflowerRice()
        ]
    }
}