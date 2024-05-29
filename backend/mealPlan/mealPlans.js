import * as breakfast from "../mealPlan/breakfast";
import * as lunch from "../mealPlan/lunch";
import * as dinner from "../mealPlan/dinner";

//lose weight, no pref, low sodium

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

//lose weight, vegetarian, normal sodium

//lose weight, vegan, low sodium

//lose weight, vegan, normal sodium

//lose weight, halal, low sodium

//lose weight, halal, normal sodium

//lose weight, keto, low sodium

//lose weight, keto, normal sodium
