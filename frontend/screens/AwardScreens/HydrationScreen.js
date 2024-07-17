import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { fetchHydrationBadgeData } from '../../../backend/supabase/database';

const badges = [
  {
    id: 1,
    title: 'HYDRATION 1',
    description: 'Hit the requirement for 4 days in a month',
    image: require('../../assets/badges/hydration1.png'), 
    requiredDays: 4,
  },
  {
    id: 2,
    title: 'HYDRATION 2',
    description: 'Hit the requirement for 7 days in a month',
    image: require('../../assets/badges/hydration2.png'), 
    requiredDays: 7,
  },
  {
    id: 3,
    title: 'HYDRATION 3',
    description: 'Hit the requirement for 10 days in a month',
    image: require('../../assets/badges/hydration3.png'), 
    requiredDays: 10,
  },
  {
    id: 4,
    title: 'HYDRATION EXPERT',
    description: 'Hit the requirement for 18 days in a month',
    image: require('../../assets/badges/hydration4.png'), 
    requiredDays: 18,
  },
  {
    id: 5,
    title: 'HYDRATION GOD',
    description: 'Hit the requirement for 28 days in a month',
    image: require('../../assets/badges/hydration5.png'), 
    requiredDays: 28,
  }
];

const HydrationScreen = ({ route }) => {
  const { year, month } = route.params;
  const [daysMeetingGoals, setDaysMeetingGoals] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const days = await fetchHydrationBadgeData(year, month);
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
          source={require('../../assets/badges/hydration.png')}
          style={styles.headerImage}
        />
        <Text style={styles.headerTitle}>Hydration</Text>
        <Text style={styles.headerSubtitle}>
          Drink and log 8 cups of water in a day
        </Text>
      </View>
      {badges.map((badge) => (
        <View
          key={badge.id}
          style={[
            styles.badgeContainer,
            daysMeetingGoals >= badge.requiredDays ? styles.badgeAchieved : styles.badgeNotAchieved
          ]}
        >
          <View style={styles.badgeText}>
            <Text style={styles.badgeTitle}>{badge.title}</Text>
            <Text style={styles.badgeDescription}>{badge.description}</Text>
            <Text style={styles.badgeProgress}>Progress: {daysMeetingGoals} / {badge.requiredDays}</Text>
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
    fontSize: 14.
  },
});

export default HydrationScreen;
