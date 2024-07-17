import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { fetchNutritionBadgeData } from '../../../backend/supabase/database';

const badges = [
  {
    id: 1,
    title: 'NUTRI NOVICE',
    description: 'Hit the requirement for 5 days in a month',
    image: require('../../assets/badges/nutrition1.png'), 
  },
  {
    id: 2,
    title: 'NUTRI LEADER',
    description: 'Hit the requirement for 10 days in a month',
    image: require('../../assets/badges/nutrition2.png'), 
  },
  {
    id: 3,
    title: 'NUTRI SPECIALIST',
    description: 'Hit the requirement for 15 days in a month',
    image: require('../../assets/badges/nutrition3.png'), 
  },
  {
    id: 4,
    title: 'NUTRITIONAL GENIUS',
    description: 'Hit the requirement for 20 days in a month',
    image: require('../../assets/badges/nutrition4.png'), 
  },
  {
    id: 5,
    title: 'NUTRITIONAL OVERLORD',
    description: 'Hit the requirement for 25 days in a month',
    image: require('../../assets/badges/nutrition5.png'), 
  }
];

const NutritionBadgesScreen = ({ route }) => {
  const { year, month } = route.params;
  const [daysMeetingGoals, setDaysMeetingGoals] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const days = await fetchNutritionBadgeData(year, month);
        setDaysMeetingGoals(days);
      } catch (error) {
        console.error('Error fetching badge data:', error);
      }
    };

    fetchData();
  }, [year, month]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/badges/nutrition.png')} // Update this with the actual path
          style={styles.headerImage}
        />
        <Text style={styles.headerTitle}>Nutrition Badges</Text>
        <Text style={styles.headerSubtitle}>
          Be within a 100kcal range from your daily calorie goal AND a 3g range of all the daily nutrient goals
        </Text>
      </View>
      {badges.map((badge) => (
        <View
        key={badge.id}
        style={[
          styles.badgeContainer,
          daysMeetingGoals >= badge.id * 5 ? styles.badgeAchieved : styles.badgeNotAchieved
        ]}
      >
          <View style={styles.badgeText}>
            <Text style={styles.badgeTitle}>{badge.title}</Text>
            <Text style={styles.badgeDescription}>{badge.description}</Text>
            <Text style={styles.badgeProgress}>Progress: {daysMeetingGoals} / {badge.id * 5}</Text>
          </View>
          <Image source={badge.image} style={styles.badgeImage} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  badgeText: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badgeDescription: {
    fontSize: 12.5,
    color: '#666',
  },
  badgeImage: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  badgeAchieved: {
    backgroundColor: '#83c791',
  },
  badgeNotAchieved: {
    backgroundColor: '#f0f0f0',
  }
});

export default NutritionBadgesScreen;
