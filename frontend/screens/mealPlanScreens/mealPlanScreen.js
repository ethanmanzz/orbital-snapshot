import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Font from 'expo-font';

const loadFonts = () => {
    return Font.loadAsync({
      'CustomFont': require('../../assets/fonts/norwester.otf'),
    });
  };

const MealPlanScreen = () => {
    const [showBreakfast, setShowBreakfast] = useState(false);
    const [showLunch, setShowLunch] = useState(false);
    const [showDinner, setShowDinner] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const toggleBreakfast = () => setShowBreakfast(!showBreakfast);
    const toggleLunch = () => setShowLunch(!showLunch);
    const toggleDinner = () => setShowDinner(!showDinner);

    useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true));
    }, []);

    
    return (
        <ImageBackground source={require("../../assets/food_pictures/mealPlan_bg.png")} style={styles.background}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>WHAT TO EAT?</Text>
                </View>

                <View style={styles.mealBox}>
                    <TouchableOpacity onPress={toggleBreakfast} style={styles.mealButton}>
                        <Text style={styles.mealTitle}>BREAKFAST</Text>
                        <Icon name={showBreakfast ? 'chevron-up' : 'chevron-down'} type='font-awesome' color='#fff' />
                    </TouchableOpacity>
                    {showBreakfast && (
                        <View style={styles.mealContent}>
                            <Text style={styles.mealItem}>Oatmeal with Fruits</Text>
                            <Text style={styles.mealItem}>Wholegrain Avocado Toast</Text>
                            <Text style={styles.mealItem}>Booster Smoothie</Text>
                            <Text style={styles.mealItem}>Chia Seed Pudding w Berries</Text>
                        </View>
                    )}
                </View>

                <View style={styles.mealBox}>
                    <TouchableOpacity onPress={toggleLunch} style={styles.mealButton}>
                        <Text style={styles.mealTitle}>LUNCH</Text>
                        <Icon name={showLunch ? 'chevron-up' : 'chevron-down'} type='font-awesome' color='#fff' />
                    </TouchableOpacity>
                    {showLunch && (
                        <View style={styles.mealContent}>
                            <Text style={styles.mealItem}>Grilled Chicken Salad</Text>
                            <Text style={styles.mealItem}>Quinoa and Veggie Bowl</Text>
                            <Text style={styles.mealItem}>Turkey Sandwich</Text>
                            <Text style={styles.mealItem}>Lentil Soup</Text>
                        </View>
                    )}
                </View>

                <View style={styles.mealBox}>
                    <TouchableOpacity onPress={toggleDinner} style={styles.mealButton}>
                        <Text style={styles.mealTitle}>DINNER</Text>
                        <Icon name={showDinner ? 'chevron-up' : 'chevron-down'} type='font-awesome' color='#fff' />
                    </TouchableOpacity>
                    {showDinner && (
                        <View style={styles.mealContent}>
                            <Text style={styles.mealItem}>Baked Salmon with Veggies</Text>
                            <Text style={styles.mealItem}>Vegetable Stir Fry</Text>
                            <Text style={styles.mealItem}>Chicken and Rice</Text>
                            <Text style={styles.mealItem}>Beef Tacos</Text>
                        </View>
                    )}
                </View>

                <Image source={require('../../assets/snapshot_logo.png')} style={styles.logo} />
            </View>
         </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#333',
        borderRadius: 20,
        padding: 20,
        margin: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffcb77',
        fontFamily: 'CustomFont',
    },
    mealBox: {
        backgroundColor: '#444',
        borderRadius: 10,
        padding: 18,
        marginBottom: 40,
    },
    mealButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mealTitle: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'CustomFont',
    },
    mealContent: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
    },
    mealItem: {
        fontSize: 18,
        color: '#000',
        marginVertical: 5,
        fontFamily: 'CustomFont',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 30,
    },
});

export default MealPlanScreen;