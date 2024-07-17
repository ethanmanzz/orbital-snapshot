import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { fetchCalorificBadgeData } from '../../../backend/supabase/database';

const badges = [
  {
    id: 1,
    title: 'CALORIE NOVICE',
    description: 'Hit the requirement for 5 days in a month',
    image: require('../../assets/badges/calorie1.png'), 
  },
  {
    id: 2,
    title: 'CALORIE SPECIALIST',
    description: 'Hit the requirement for 10 days in a month',
    image: require('../../assets/badges/calorie2.png'), 
  },
  {
    id: 3,
    title: 'CALORIE MASTER',
    description: 'Hit the requirement for 15 days in a',
    image: require('../../assets/badges/calorie3.png'), 
  },
];

const CalorificScreen = ({ route }) => {
  const { year, month } = route.params;
  const [daysMeetingGoals, setDaysMeetingGoals] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const days = await fetchCalorificBadgeData(year, month);
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
          source={require('../../assets/badges/calorific.png')}
          style={styles.headerImage}
        />
        <Text style={styles.headerTitle}>Calorific</Text>
        <Text style={styles.headerSubtitle}>
          Be within a 100kcal range from your daily calorie goal
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
    width: '100%',
  },
  badgeAchieved: {
    backgroundColor: '#83c791',
  },
  badgeNotAchieved: {
    backgroundColor: '#f0f0f0',
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
  badgeProgress: {
    fontSize: 14,
  },
});

export default CalorificScreen;