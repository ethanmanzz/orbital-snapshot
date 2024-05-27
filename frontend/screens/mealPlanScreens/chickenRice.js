import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import { chickenRice_reducedRice_noSkin } from '../../../backend/mealPlan/lunch';

const MealDetailsScreen = () => {
    const [showIngredients, setShowIngredients] = useState(false);

    const toggleIngredients = () => {
        setShowIngredients(!showIngredients);
    };

    const food = chickenRice_reducedRice_noSkin();

    return (
        <ImageBackground source={require("../../assets/food_pictures/hawker_bg.png")} style={styles.background}>
         <ScrollView style={styles.container}>
            <View style={styles.overlay} />
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image source={require("../../assets/food_pictures/chicken_rice.png")} style={styles.mealImage} />
                </View>
                <View style={styles.mealInfo}>
                    <Text style={styles.mealTitle}>CHICKEN RICE</Text>
                    <Text style={styles.mealSubtitle}>(No Skin, Half - Rice)</Text>
                    <View style={styles.nutritionContainer}>
                        <View style={styles.nutritionItem}>
                            <Text style={styles.nutritionLabel}>CALORIES</Text>
                            <View style={styles.nutritionValueContainer}>
                                <Text style={styles.nutritionValue}>{food.calories}</Text>
                            </View>
                        </View>
                        <View style={styles.nutritionItem}>
                            <Text style={styles.nutritionLabel}>PROTEIN</Text>
                            <View style={styles.nutritionValueContainer}>
                                <Text style={styles.nutritionValue}>{food.protein}</Text>
                            </View>
                        </View>
                        <View style={styles.nutritionItem}>
                            <Text style={styles.nutritionLabel}>FATS</Text>
                            <View style={styles.nutritionValueContainer}>
                                <Text style={styles.nutritionValue}>{food.fats}</Text>
                            </View>
                        </View>
                        <View style={styles.nutritionItem}>
                            <Text style={styles.nutritionLabel}>CARBOHYDRATES</Text>
                            <View style={styles.nutritionValueContainer}>
                                <Text style={styles.nutritionValue}>{food.carbs}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.ingredientsButton} onPress={toggleIngredients}>
                        <Text style={styles.ingredientsButtonText}>Ingredients</Text>
                        <Icon name={showIngredients ? 'chevron-up' : 'chevron-down'} type='font-awesome' color='#000' />
                    </TouchableOpacity>
                    {showIngredients && (
                        <View style={styles.ingredientsList}>
                            <Text style={styles.ingredient}>White Rice: 100g</Text>
                            <Text style={styles.ingredient}>Chicken Breast: 100g</Text>
                            <Text style={styles.ingredient}>Cucumber Slices: 50g</Text>
                            <Text style={styles.ingredient}>Chicken Broth: 250ml</Text>
                        </View>
                    )}
                </View>
            </View>
         </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50, // Adjust this value to add space at the bottom of the scrollable content
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        position: 'relative',
        top: 50, // Adjust this value to shift the content upwards or downwards
        padding: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    mealImage: {
        width: 300,
        height: 200,
        borderWidth: 4,
        borderColor: '#000',
    },
    mealInfo: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    mealTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    mealSubtitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 20,
    },
    nutritionContainer: {
        width: '100%',
        backgroundColor: '#000',
        borderRadius: 10,
        padding: 20,
    },
    nutritionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    nutritionLabel: {
        color: '#fff',
        fontSize: 16,
    },
    nutritionValueContainer: {
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nutritionValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    ingredientsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        width: '100%',
    },
    ingredientsButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    ingredientsList: {
        marginTop: 20,
        alignItems: 'flex-start',
        paddingBottom: 30,
    },
    ingredient: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default MealDetailsScreen;
