import * as breakfast from "../mealPlan/breakfast";
import * as lunch from "../mealPlan/lunch";
import * as dinner from "../mealPlan/dinner";

//lose weight, no pref, low sodium
export const loseWeight_noPref_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.greekYogurt_honey_nuts(),
            breakfast.chiaSeedPudding_berries(),
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.eggWhiteOmelette_spinach_tomatoes(),
            breakfast.smoothie_banana_spinach_proteinPowder_almondMilk(),
            breakfast.oatmeal_banana(),
            breakfast.overnight_oats()
        ],
        lunch: [
            lunch.grilled_chicken_salad(),
            lunch.turkey_avocado_wrap(),
            lunch.quinoa_salad(),
            lunch.lentil_soup(),
            lunch.tuna_salad(),
            lunch.veggie_wrap(),
            lunch.chicken_caesar_salad(),
            lunch.chickpea_salad(),
            lunch.salmon_salad(),
            lunch.yongTauFoo_clearSoup(),
            lunch.fishSoup_rice_clearBroth(),
        ],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
            dinner.stir_fried_tofu_vegetables(),
            dinner.grilled_shrimp_vegetables(),
            dinner.turkey_sweet_potato(),
            dinner.beef_broccoli_lowSodium(),
            dinner.baked_cod_green_beans(),
            dinner.chicken_veggie_stirfry_lowSodium(),
            dinner.turkey_meatballs_zucchini_noodles_lowSodium(),

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
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola(),
            breakfast.oatmeal_banana(),
            breakfast.overnight_oats()
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
            lunch.yongTauFoo_clearSoup(), 
            lunch.hainaneseChickenBreast_steamedVeggies(),
            lunch.sushiRolls_salmon_avocado_cucumber(),
            lunch.bakKutTeh_leanPork_reducedRice(), 
            lunch.vegetarianBeeHoon_tofu_vegetables(), 
            lunch.fishSoup_rice_clearBroth(),
            lunch.grilled_chicken_salad(),
            lunch.turkey_avocado_wrap(),
            lunch.quinoa_salad(),
            lunch.lentil_soup(),
            lunch.tuna_salad(),
            lunch.veggie_wrap(),
            lunch.chicken_caesar_salad(),
            lunch.chickpea_salad(),
            lunch.salmon_salad(),],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
            dinner.grilledChickenSalad_lightDressing(),
            dinner.tofuStirFry_mixedVeggies_quinoa(),
            dinner.beefBroccoliStirFry_cauliflowerRice(),
            dinner.grilledSalmon_asparagus_sweetPotato(),
            dinner.chickenSate_cucumberSalad(),
            dinner.stirFriedChicken_bellPeppers_brownRice(),
            dinner.stir_fried_tofu_vegetables(),
            dinner.grilled_shrimp_vegetables(),
            dinner.turkey_sweet_potato()
        ],
    };
}

//lose weight, vegetarian, low sodium
export const loseWeight_vegetarian_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.overnight_oats(),
            breakfast.chiaSeedPudding_berries(),
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola(),
            breakfast.oatmeal_banana(),
            breakfast.greekYogurt_honey_nuts(),
            breakfast.smoothie_banana_spinach_proteinPowder_almondMilk()

        ],
        lunch: [
            lunch.quinoa_salad(),
            lunch.lentil_soup(),
            lunch.chickpea_salad(),
            lunch.veggie_wrap(),
            lunch.caprese_salad(),
            lunch.black_bean_burger(),
            lunch.tomato_soup_grilled_cheese()
        ],

        dinner: [
            dinner.stir_fried_tofu_vegetables(),
            dinner.quinoa_stuffed_peppers(),
            dinner.vegetable_curry(),
            dinner.mushroom_risotto(),
            dinner.eggplant_parmesan(),
            dinner.eggplant_stir_fry(),

        ]
    }
}
//lose weight, vegetarian, normal sodium
export const loseWeight_vegetarian_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.overnight_oats(),
            breakfast.chiaSeedPudding_berries(),
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola(),
            breakfast.oatmeal_banana(),
            breakfast.greekYogurt_honey_nuts(),
            breakfast.smoothie_banana_spinach_proteinPowder_almondMilk()

        ],
        lunch: [
            lunch.quinoa_salad(),
            lunch.lentil_soup(),
            lunch.chickpea_salad(),
            lunch.veggie_wrap(),
            lunch.caprese_salad(),
            lunch.black_bean_burger(),
            lunch.tomato_soup_grilled_cheese()
        ],

        dinner: [
            dinner.stir_fried_tofu_vegetables(),
            dinner.quinoa_stuffed_peppers(),
            dinner.vegetable_curry(),
            dinner.mushroom_risotto(),
            dinner.eggplant_parmesan(),
            dinner.stuffed_bell_peppers(),
            dinner.chickpea_curry(),
        ]
    }
}
//lose weight, vegan, low sodium
export const loseWeight_vegan_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.chia_pudding_vegan(),
            breakfast.oatmeal_freshFruits_vegan(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.overnight_oats(),
            breakfast.oatmeal_banana(),
            breakfast.vegan_smoothie_bowl(),
            breakfast.almond_butter_toast(),
            breakfast.vegan_smoothie_banana_almond_milk()

        ],
        lunch: [
            lunch.quinoa_salad(),
            lunch.lentil_soup(),
            lunch.chickpea_salad(),
            lunch.veggie_wrap(),
            lunch.black_bean_burger(),
            lunch.tofu_salad(),


        ],
        dinner: [
            dinner.stir_fried_tofu_vegetables(),
            dinner.quinoa_stuffed_peppers(),
            dinner.vegetable_curry(),
            dinner.mushroom_risotto(),
            dinner.eggplant_parmesan(),
            dinner.stuffed_bell_peppers(),
            dinner.chickpea_curry(),


        ]
    }
}
//lose weight, vegan, normal sodium
export const loseWeight_vegan_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.chia_pudding_vegan(),
            breakfast.oatmeal_freshFruits_vegan(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.overnight_oats(),
            breakfast.oatmeal_banana(),
            breakfast.vegan_smoothie_bowl(),
            breakfast.almond_butter_toast(),
            breakfast.vegan_smoothie_banana_almond_milk()

        ],
        lunch: [
            lunch.quinoa_salad(),
            lunch.lentil_soup(),
            lunch.chickpea_salad(),
            lunch.veggie_wrap(),
            lunch.black_bean_burger(),
            lunch.tofu_salad(),
            

        ],
        dinner: [
            dinner.stir_fried_tofu_vegetables(),
            dinner.quinoa_stuffed_peppers(),
            dinner.vegetable_curry(),
            dinner.mushroom_risotto(),
            dinner.eggplant_parmesan(),
            dinner.stuffed_bell_peppers(),
            dinner.chickpea_curry(),


        ]
    }
}
//lose weight, halal, low sodium
export const loseWeight_halal_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.greekYogurt_honey_nuts(),
            breakfast.chiaSeedPudding_berries(),
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.eggWhiteOmelette_spinach_tomatoes(),
            breakfast.smoothie_banana_spinach_proteinPowder_almondMilk(),
            breakfast.oatmeal_banana(),
            breakfast.overnight_oats()
        ],
        lunch: [
            lunch.grilled_chicken_salad(),
            lunch.turkey_avocado_wrap(),
            lunch.quinoa_salad(),
            lunch.lentil_soup(),
            lunch.tuna_salad(),
            lunch.veggie_wrap(),
            lunch.chicken_caesar_salad(),
            lunch.chickpea_salad(),
            lunch.salmon_salad(),
            lunch.yongTauFoo_clearSoup(),
            lunch.fishSoup_rice_clearBroth(),
        ],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
            dinner.stir_fried_tofu_vegetables(),
            dinner.grilled_shrimp_vegetables(),
            dinner.turkey_sweet_potato(),
            dinner.beef_broccoli_lowSodium(),
            dinner.baked_cod_green_beans(),
            dinner.chicken_veggie_stirfry_lowSodium(),
            dinner.turkey_meatballs_zucchini_noodles_lowSodium(),

        ]
    }
}
//lose weight, halal, normal sodium
export const loseWeight_halal_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.greekYogurt_honey_nuts(),
            breakfast.chiaSeedPudding_berries(),
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.eggWhiteOmelette_spinach_tomatoes(),
            breakfast.smoothie_banana_spinach_proteinPowder_almondMilk(),
            breakfast.oatmeal_banana(),
            breakfast.overnight_oats()
        ],
        lunch: [
            lunch.grilled_chicken_salad(),
            lunch.turkey_avocado_wrap(),
            lunch.quinoa_salad(),
            lunch.lentil_soup(),
            lunch.tuna_salad(),
            lunch.veggie_wrap(),
            lunch.chicken_caesar_salad(),
            lunch.chickpea_salad(),
            lunch.salmon_salad(),
            lunch.yongTauFoo_clearSoup(),
            lunch.fishSoup_rice_clearBroth(),
        ],
        dinner: [
            dinner.steamedFish_veggies_brownRice(),
            dinner.stir_fried_tofu_vegetables(),
            dinner.grilled_shrimp_vegetables(),
            dinner.turkey_sweet_potato(),
            dinner.beef_broccoli_lowSodium(),
            dinner.baked_cod_green_beans(),
            dinner.chicken_veggie_stirfry_lowSodium(),
            dinner.turkey_meatballs_zucchini_noodles_lowSodium(),

        ]
    }
    
}
//lose weight, keto, low sodium
export const loseWeight_keto_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.keto_breakfast_bowl(),
            breakfast.keto_smoothie(),
            breakfast.keto_scramble(),
            breakfast.keto_eggs_benedict(),
            breakfast.keto_tacos(),
            breakfast.keto_frittata(),
            breakfast.keto_cheese_omelette()
        ],
        lunch: [
            lunch.grilled_salmon_salad(),
            lunch.avocado_chicken_wrap(),
            lunch.keto_chicken_salad(),
            lunch.keto_tacos(),
            lunch.keto_chicken_wings(),
            lunch.keto_stir_fry(),
            lunch.keto_cauliflower_steak()
        ],
        dinner: [
            dinner.keto_steak(),
            dinner.keto_burger(),
            dinner.keto_baked_salmon(),
            dinner.keto_cauliflower_rice(),
            dinner.keto_zucchini_noodles(),
            dinner.keto_cabbage_wraps(),
            dinner.keto_chicken_parmesan()
        ],
    };
}
//lose weight, keto, normal sodium
export const loseWeight_keto_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.keto_breakfast_bowl(),
            breakfast.keto_smoothie(),
            breakfast.keto_scramble(),
            breakfast.keto_eggs_benedict(),
            breakfast.keto_frittata(),
            breakfast.keto_cheese_omelette()
        ],
        lunch: [
            lunch.grilled_salmon_salad(),
            lunch.avocado_chicken_wrap(),
            lunch.keto_chicken_salad(),
            lunch.keto_tacos(),
            lunch.keto_chicken_wings(),
            lunch.keto_stir_fry(),
            lunch.keto_cauliflower_steak()
        ],
        dinner: [
            dinner.keto_steak(),
            dinner.keto_burger(),
            dinner.keto_baked_salmon(),
            dinner.keto_cauliflower_rice(),
            dinner.keto_zucchini_noodles(),
            dinner.keto_cabbage_wraps(),
            dinner.keto_chicken_parmesan()
        ],
    };
}

//muscle gain 
export const muscleGain_noPref_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.protein_pancakes(),
            breakfast.big_egg_white_omelette_spinach_tomatoes(),
            breakfast.cottage_cheese_pineapple(),
            breakfast.protein_smoothie(),
            breakfast.protein_smoothie_bowl(),
            breakfast.oatmeal_protein_nuts()
        ],
        lunch: [
            lunch.grilled_chicken_quinoa_salad(),
            lunch.big_turkey_avocado_wrap(),
            lunch.large_chicken_caesar_salad(),
            lunch.quinoa_black_bean_salad(),
            lunch.chicken_avocado_burrito(),
            lunch.bbq_chicken_salad()
        ],
        dinner: [
            dinner.baked_salmon_asparagus(),
            dinner.beef_stir_fry_vegetables(),
            dinner.grilled_chicken_sweet_potatoes(),
            dinner.turkey_meatballs_zucchini_noodles(),
            dinner.grilled_steak_sweet_potato_fries()
        ]
    }
}
export const muscleGain_noPref_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.protein_pancakes(),
            breakfast.big_egg_white_omelette_spinach_tomatoes(),
            breakfast.cottage_cheese_pineapple(),
            breakfast.protein_smoothie(),
            breakfast.protein_smoothie_bowl(),
            breakfast.oatmeal_protein_nuts()
        ],
        lunch: [
            lunch.grilled_chicken_quinoa_salad(),
            lunch.big_turkey_avocado_wrap(),
            lunch.large_chicken_caesar_salad(),
            lunch.quinoa_black_bean_salad(),
            lunch.chicken_avocado_burrito(),
            lunch.bbq_chicken_salad()
        ],
        dinner: [
            dinner.baked_salmon_asparagus(),
            dinner.beef_stir_fry_vegetables(),
            dinner.grilled_chicken_sweet_potatoes(),
            dinner.turkey_meatballs_zucchini_noodles(),
            dinner.grilled_steak_sweet_potato_fries()
        ]
    }
}

export const muscleGain_vegetarian_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.avocado_toast_tofu_scramble(),
            breakfast.protein_smoothie_bowl(),
            breakfast.oatmeal_peanut_butter_berries(),
            breakfast.chia_seed_pudding_almond_butter(),
            breakfast.vegan_pancakes_berries_maple_syrup(),
            breakfast.vegan_smoothie_bowl()
        ],
        lunch: [
            lunch.quinoa_black_bean_salad(),
            lunch.chickpea_avocado_sandwich(),
            lunch.hummus_veggie_wrap(),
            lunch.vegan_lentil_salad(),
            lunch.vegan_lentil_soup_bread(),
            lunch.vegan_buddha_bowl(),
            lunch.vegan_power_bowl()
        ],
        dinner: [
            dinner.tofu_stir_fry_brown_rice(),
            dinner.lentil_bolognese_pasta(),
            dinner.vegan_chickpea_curry_rice(),
            dinner.black_bean_sweet_potato_enchiladas(),
            dinner.tempeh_stir_fry_brown_rice(),
            dinner.vegan_spaghetti_lentil_meatballs()
        ]
    }
}

export const muscleGain_vegetarian_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.avocado_toast_tofu_scramble(),
            breakfast.protein_smoothie_bowl(),
            breakfast.oatmeal_peanut_butter_berries(),
            breakfast.chia_seed_pudding_almond_butter(),
            breakfast.vegan_pancakes_berries_maple_syrup(),
            breakfast.vegan_smoothie_bowl()
        ],
        lunch: [
            lunch.quinoa_black_bean_salad(),
            lunch.chickpea_avocado_sandwich(),
            lunch.hummus_veggie_wrap(),
            lunch.vegan_lentil_salad(),
            lunch.vegan_lentil_soup_bread(),
            lunch.vegan_buddha_bowl(),
            lunch.vegan_power_bowl()
        ],
        dinner: [
            dinner.tofu_stir_fry_brown_rice(),
            dinner.lentil_bolognese_pasta(),
            dinner.vegan_chickpea_curry_rice(),
            dinner.black_bean_sweet_potato_enchiladas(),
            dinner.tempeh_stir_fry_brown_rice(),
            dinner.vegan_spaghetti_lentil_meatballs()
        ]
    }
}

export const muscleGain_vegan_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.avocado_toast_tofu_scramble(),
            breakfast.protein_smoothie_bowl(),
            breakfast.oatmeal_peanut_butter_berries(),
            breakfast.chia_seed_pudding_almond_butter(),
            breakfast.vegan_pancakes_berries_maple_syrup(),
            breakfast.vegan_smoothie_bowl()
        ],
        lunch: [
            lunch.quinoa_black_bean_salad(),
            lunch.chickpea_avocado_sandwich(),
            lunch.hummus_veggie_wrap(),
            lunch.vegan_lentil_salad(),
            lunch.vegan_lentil_soup_bread(),
            lunch.vegan_buddha_bowl(),
            lunch.vegan_power_bowl()
        ],
        dinner: [
            dinner.tofu_stir_fry_brown_rice(),
            dinner.lentil_bolognese_pasta(),
            dinner.vegan_chickpea_curry_rice(),
            dinner.black_bean_sweet_potato_enchiladas(),
            dinner.tempeh_stir_fry_brown_rice(),
            dinner.vegan_spaghetti_lentil_meatballs()
        ]
    }
}

export const muscleGain_vegan_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.avocado_toast_tofu_scramble(),
            breakfast.protein_smoothie_bowl(),
            breakfast.oatmeal_peanut_butter_berries(),
            breakfast.chia_seed_pudding_almond_butter(),
            breakfast.vegan_pancakes_berries_maple_syrup(),
            breakfast.vegan_smoothie_bowl()
        ],
        lunch: [
            lunch.quinoa_black_bean_salad(),
            lunch.chickpea_avocado_sandwich(),
            lunch.hummus_veggie_wrap(),
            lunch.vegan_lentil_salad(),
            lunch.vegan_lentil_soup_bread(),
            lunch.vegan_buddha_bowl(),
            lunch.vegan_power_bowl()
        ],
        dinner: [
            dinner.tofu_stir_fry_brown_rice(),
            dinner.lentil_bolognese_pasta(),
            dinner.vegan_chickpea_curry_rice(),
            dinner.black_bean_sweet_potato_enchiladas(),
            dinner.tempeh_stir_fry_brown_rice(),
            dinner.vegan_spaghetti_lentil_meatballs()
        ]
    }
}

export const muscleGain_halal_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.protein_pancakes(),
            breakfast.big_egg_white_omelette_spinach_tomatoes(),
            breakfast.cottage_cheese_pineapple(),
            breakfast.protein_smoothie(),
            breakfast.protein_smoothie_bowl(),
            breakfast.oatmeal_protein_nuts()
        ],
        lunch: [
            lunch.grilled_chicken_quinoa_salad(),
            lunch.big_turkey_avocado_wrap(),
            lunch.large_chicken_caesar_salad(),
            lunch.quinoa_black_bean_salad(),
            lunch.chicken_avocado_burrito(),
            lunch.bbq_chicken_salad()
        ],
        dinner: [
            dinner.baked_salmon_asparagus(),
            dinner.beef_stir_fry_vegetables(),
            dinner.grilled_chicken_sweet_potatoes(),
            dinner.turkey_meatballs_zucchini_noodles(),
            dinner.grilled_steak_sweet_potato_fries()
        ]
    }
}

export const muscleGain_halal_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.protein_pancakes(),
            breakfast.big_egg_white_omelette_spinach_tomatoes(),
            breakfast.cottage_cheese_pineapple(),
            breakfast.protein_smoothie(),
            breakfast.protein_smoothie_bowl(),
            breakfast.oatmeal_protein_nuts()
        ],
        lunch: [
            lunch.grilled_chicken_quinoa_salad(),
            lunch.big_turkey_avocado_wrap(),
            lunch.large_chicken_caesar_salad(),
            lunch.quinoa_black_bean_salad(),
            lunch.chicken_avocado_burrito(),
            lunch.bbq_chicken_salad()
        ],
        dinner: [
            dinner.baked_salmon_asparagus(),
            dinner.beef_stir_fry_vegetables(),
            dinner.grilled_chicken_sweet_potatoes(),
            dinner.turkey_meatballs_zucchini_noodles(),
            dinner.grilled_steak_sweet_potato_fries()
        ]
    }
}

export const muscleGain_keto_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.large_keto_pancakes(),
            breakfast.large_keto_breakfast_bowl(),
            breakfast.large_keto_smoothie(),
            breakfast.chia_seed_pudding_almonds(),
            breakfast.egg_muffins_spinach_bacon(),
            breakfast.avocado_smoked_salmon(),
            breakfast.bulletproof_coffee()
        ],
        lunch: [
            lunch.keto_blt_salad(),
            lunch.large_grilled_salmon_salad(),
            lunch.avocado_chicken_salad(),
            lunch.beef_avocado_salad(),
            lunch.keto_caesar_salad(),
            lunch.keto_turkey_cheese_roll_ups()

        ],
        dinner: [
            dinner.ribeye_steak_garlic_butter(),
            dinner.large_baked_salmon_asparagus(),
            dinner.keto_stuffed_bell_peppers(),
            dinner.lamb_chops_garlic_butter(),
            dinner.shrimp_scampi_zucchini_noodles(),
            dinner.pork_chops_cauliflower_mash(),
            dinner.keto_meatballs_zoodles()
        ]
    }
}

export const muscleGain_keto_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.large_keto_pancakes(),
            breakfast.large_keto_breakfast_bowl(),
            breakfast.large_keto_smoothie(),
            breakfast.chia_seed_pudding_almonds(),
            breakfast.egg_muffins_spinach_bacon(),
            breakfast.avocado_smoked_salmon(),
            breakfast.bulletproof_coffee()
        ],
        lunch: [
            lunch.keto_blt_salad(),
            lunch.large_grilled_salmon_salad(),
            lunch.avocado_chicken_salad(),
            lunch.beef_avocado_salad(),
            lunch.keto_caesar_salad(),
            lunch.keto_turkey_cheese_roll_ups()

        ],
        dinner: [
            dinner.ribeye_steak_garlic_butter(),
            dinner.large_baked_salmon_asparagus(),
            dinner.keto_stuffed_bell_peppers(),
            dinner.lamb_chops_garlic_butter(),
            dinner.shrimp_scampi_zucchini_noodles(),
            dinner.pork_chops_cauliflower_mash(),
            dinner.keto_meatballs_zoodles()
        ]
    }
}

//maintain health
export const maintainHealth_noPref_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.avocado_toast_egg(),
            breakfast.scrambled_eggs_veggies(),
            breakfast.whole_grain_pancakes_maple_syrup_berries()
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
            lunch.yongTauFoo_clearSoup(), 
            lunch.sushiRolls_salmon_avocado_cucumber(),
            lunch.bakKutTeh_leanPork_reducedRice(), 
            lunch.grilled_chicken_salad(),
            lunch.turkey_avocado_wrap(),
            lunch.tuna_salad(),
            lunch.chicken_caesar_salad(),
            lunch.salmon_salad(),
            lunch.falafel_wrap_tzatziki()
        ],
        dinner: [
            dinner.grilled_chicken_sweet_potatoes(),
            dinner.beefBroccoliStirFry_cauliflowerRice(),
            dinner.grilledSalmon_asparagus_sweetPotato(),
            dinner.stirFriedChicken_bellPeppers_brownRice(),
            dinner.stir_fried_tofu_vegetables(),
            dinner.grilled_shrimp_vegetables(),
            dinner.turkey_sweet_potato(),
            dinner.baked_salmon_asparagus(),
            dinner.spaghetti_meat_sauce(),
            dinner.grilled_chicken_couscous_roasted_veggies()
        ],
    };
}
export const maintainHealth_noPref_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.avocado_toast_egg(),
            breakfast.scrambled_eggs_veggies(),
            breakfast.whole_grain_pancakes_maple_syrup_berries()
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
            lunch.yongTauFoo_clearSoup(), 
            lunch.sushiRolls_salmon_avocado_cucumber(),
            lunch.bakKutTeh_leanPork_reducedRice(), 
            lunch.grilled_chicken_salad(),
            lunch.turkey_avocado_wrap(),
            lunch.tuna_salad(),
            lunch.chicken_caesar_salad(),
            lunch.salmon_salad(),
            lunch.falafel_wrap_tzatziki()
        ],
        dinner: [
            dinner.grilled_chicken_sweet_potatoes(),
            dinner.beefBroccoliStirFry_cauliflowerRice(),
            dinner.grilledSalmon_asparagus_sweetPotato(),
            dinner.stirFriedChicken_bellPeppers_brownRice(),
            dinner.stir_fried_tofu_vegetables(),
            dinner.grilled_shrimp_vegetables(),
            dinner.turkey_sweet_potato(),
            dinner.baked_salmon_asparagus(),
            dinner.spaghetti_meat_sauce(),
            dinner.grilled_chicken_couscous_roasted_veggies()
        ],
    };
}

export const maintainHealth_vegetarian_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.avocado_toast_tomato(),
            breakfast.overnight_oats(),
            breakfast.chiaSeedPudding_berries(),
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola(),
            breakfast.oatmeal_banana(),
            breakfast.scrambled_eggs_spinach_feta(),
            breakfast.smoothie_banana_spinach_proteinPowder_almondMilk(),
            breakfast.whole_grain_pancakes_maple_syrup_berries()

        ],
        lunch: [
            lunch.quinoa_salad(),
            lunch.lentil_soup(),
            lunch.chickpea_salad(),
            lunch.veggie_wrap(),
            lunch.caprese_salad(),
            lunch.black_bean_burger(),
            lunch.tomato_soup_grilled_cheese(),
            lunch.chickpea_salad_sandwich(),
            lunch.chickpea_avocado_sandwich(),
            lunch.black_bean_sweet_potato_enchiladas()
        ],

        dinner: [
            dinner.stir_fried_tofu_vegetables(),
            dinner.quinoa_stuffed_peppers(),
            dinner.vegetable_curry(),
            dinner.mushroom_risotto(),
            dinner.eggplant_parmesan_whole_wheat_pasta(),
            dinner.eggplant_stir_fry(),
            dinner.tofu_stir_fry_brown_rice(),
            dinner.veggie_pizza_whole_wheat_crust()
        ]
    }
}

export const maintainHealth_vegetarian_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.oatmeal_freshFruits(),
            breakfast.avocado_toast_tomato(),
            breakfast.overnight_oats(),
            breakfast.chiaSeedPudding_berries(),
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola(),
            breakfast.oatmeal_banana(),
            breakfast.scrambled_eggs_spinach_feta(),
            breakfast.smoothie_banana_spinach_proteinPowder_almondMilk(),
            breakfast.whole_grain_pancakes_maple_syrup_berries()

        ],
        lunch: [
            lunch.quinoa_salad(),
            lunch.lentil_soup(),
            lunch.chickpea_salad(),
            lunch.veggie_wrap(),
            lunch.caprese_salad(),
            lunch.black_bean_burger(),
            lunch.tomato_soup_grilled_cheese(),
            lunch.chickpea_salad_sandwich(),
            lunch.chickpea_avocado_sandwich(),
        ],

        dinner: [
            dinner.stir_fried_tofu_vegetables(),
            dinner.quinoa_stuffed_peppers(),
            dinner.vegetable_curry(),
            dinner.mushroom_risotto(),
            dinner.eggplant_parmesan_whole_wheat_pasta(),
            dinner.eggplant_stir_fry(),
            dinner.tofu_stir_fry_brown_rice(),
            dinner.veggie_pizza_whole_wheat_crust(),
            dinner.black_bean_sweet_potato_enchiladas()
        ]
    }
}

export const maintainHealth_vegan_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.chia_pudding_vegan(),
            breakfast.oatmeal_freshFruits_vegan(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.overnight_oats(),
            breakfast.oatmeal_banana(),
            breakfast.vegan_smoothie_bowl(),
            breakfast.almond_butter_toast(),
            breakfast.vegan_smoothie_banana_almond_milk()

        ],
        lunch: [
            lunch.quinoa_salad(),
            lunch.lentil_soup(),
            lunch.chickpea_salad(),
            lunch.veggie_wrap(),
            lunch.black_bean_burger(),
            lunch.tofu_salad(),
            lunch.vegan_buddha_bowl(),
            lunch.vegan_wrap_hummus(),
            lunch.vegan_poke_bowl()
        ],
        dinner: [
            dinner.stir_fried_tofu_vegetables(),
            dinner.quinoa_stuffed_peppers(),
            dinner.vegetable_curry(),
            dinner.mushroom_risotto(),
            dinner.eggplant_parmesan(),
            dinner.stuffed_bell_peppers(),
            dinner.chickpea_curry(),
            dinner.vegan_tacos_black_beans()
        ]
    }
}

export const maintainHealth_vegan_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.chia_pudding_vegan(),
            breakfast.oatmeal_freshFruits_vegan(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.overnight_oats(),
            breakfast.oatmeal_banana(),
            breakfast.vegan_smoothie_bowl(),
            breakfast.almond_butter_toast(),
            breakfast.vegan_smoothie_banana_almond_milk()

        ],
        lunch: [
            lunch.quinoa_salad(),
            lunch.lentil_soup(),
            lunch.chickpea_salad(),
            lunch.veggie_wrap(),
            lunch.black_bean_burger(),
            lunch.tofu_salad(),
            lunch.vegan_buddha_bowl(),
            lunch.vegan_wrap_hummus(),
            lunch.vegan_poke_bowl()
        ],
        dinner: [
            dinner.stir_fried_tofu_vegetables(),
            dinner.quinoa_stuffed_peppers(),
            dinner.vegetable_curry(),
            dinner.mushroom_risotto(),
            dinner.eggplant_parmesan(),
            dinner.stuffed_bell_peppers(),
            dinner.chickpea_curry(),
            dinner.vegan_tacos_black_beans()
        ]
    }
}

export const maintainHealth_halal_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.avocado_toast_egg(),
            breakfast.scrambled_eggs_veggies(),
            breakfast.whole_grain_pancakes_maple_syrup_berries()
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
            lunch.yongTauFoo_clearSoup(), 
            lunch.sushiRolls_salmon_avocado_cucumber(),
            lunch.grilled_chicken_salad(),
            lunch.turkey_avocado_wrap(),
            lunch.tuna_salad(),
            lunch.chicken_caesar_salad(),
            lunch.salmon_salad(),
            lunch.falafel_wrap_tzatziki()
        ],
        dinner: [
            dinner.grilled_chicken_sweet_potatoes(),
            dinner.beefBroccoliStirFry_cauliflowerRice(),
            dinner.grilledSalmon_asparagus_sweetPotato(),
            dinner.stirFriedChicken_bellPeppers_brownRice(),
            dinner.stir_fried_tofu_vegetables(),
            dinner.grilled_shrimp_vegetables(),
            dinner.turkey_sweet_potato(),
            dinner.baked_salmon_asparagus(),
            dinner.spaghetti_meat_sauce(),
            dinner.grilled_chicken_couscous_roasted_veggies()
        ],
    };
}

export const maintainHealth_halal_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.smoothieBowl_mixedBerries_greekYogurt_granola(),
            breakfast.wholeGrainToast_avocado(),
            breakfast.avocado_toast_egg(),
            breakfast.scrambled_eggs_veggies(),
            breakfast.whole_grain_pancakes_maple_syrup_berries()
        ],
        lunch: [
            lunch.chickenRice_reducedRice_noSkin(), 
            lunch.yongTauFoo_clearSoup(), 
            lunch.sushiRolls_salmon_avocado_cucumber(),
            lunch.grilled_chicken_salad(),
            lunch.turkey_avocado_wrap(),
            lunch.tuna_salad(),
            lunch.chicken_caesar_salad(),
            lunch.salmon_salad(),
            lunch.falafel_wrap_tzatziki()
        ],
        dinner: [
            dinner.grilled_chicken_sweet_potatoes(),
            dinner.beefBroccoliStirFry_cauliflowerRice(),
            dinner.grilledSalmon_asparagus_sweetPotato(),
            dinner.stirFriedChicken_bellPeppers_brownRice(),
            dinner.stir_fried_tofu_vegetables(),
            dinner.grilled_shrimp_vegetables(),
            dinner.turkey_sweet_potato(),
            dinner.baked_salmon_asparagus(),
            dinner.spaghetti_meat_sauce(),
            dinner.grilled_chicken_couscous_roasted_veggies()
        ],
    };
}

export const maintainHealth_keto_lowSodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.keto_avocado_egg_bowl(),
            breakfast.keto_smoothie(),
            breakfast.keto_spinach_mushroom_omelette(),
            breakfast.keto_eggs_benedict(),
            breakfast.keto_tacos(),
            breakfast.keto_frittata(),
            breakfast.keto_cheese_omelette()
        ],
        lunch: [
            lunch.grilled_salmon_salad(),
            lunch.avocado_chicken_wrap(),
            lunch.keto_chicken_salad(),
            lunch.keto_tacos(),
            lunch.keto_chicken_wings(),
            lunch.keto_stir_fry(),
            lunch.keto_cauliflower_steak()
        ],
        dinner: [
            dinner.keto_steak(),
            dinner.keto_burger(),
            dinner.keto_grilled_salmon_asparagus(),
            dinner.keto_cauliflower_rice(),
            dinner.keto_zucchini_noodles(),
            dinner.keto_beef_broccoli_stir_fry(),
            dinner.keto_chicken_parmesan(),
            dinner.keto_eggplant_lasagna()
        ],
    };
}

export const maintainHealth_keto_Sodium_MealPlan = () => {
    return {
        breakfast: [
            breakfast.keto_avocado_egg_bowl(),
            breakfast.keto_smoothie(),
            breakfast.keto_spinach_mushroom_omelette(),
            breakfast.keto_eggs_benedict(),
            breakfast.keto_tacos(),
            breakfast.keto_frittata(),
            breakfast.keto_cheese_omelette()
        ],
        lunch: [
            lunch.grilled_salmon_salad(),
            lunch.avocado_chicken_wrap(),
            lunch.keto_chicken_salad(),
            lunch.keto_tacos(),
            lunch.keto_chicken_wings(),
            lunch.keto_stir_fry(),
            lunch.keto_cauliflower_steak()
        ],
        dinner: [
            dinner.keto_steak(),
            dinner.keto_burger(),
            dinner.keto_grilled_salmon_asparagus(),
            dinner.keto_cauliflower_rice(),
            dinner.keto_zucchini_noodles(),
            dinner.keto_beef_broccoli_stir_fry(),
            dinner.keto_chicken_parmesan(),
            dinner.keto_eggplant_lasagna()
        ],
    };
}