import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons';

const AwardScreen = () => {
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation();

  const getFormattedDate = (date) => {
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  const handlePreviousMonth = () => {
    let newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    let newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  const isCurrentMonth = () => {
    const now = new Date();
    return now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Awards & Badges</Text>
      </View>
      <ScrollView>
        <View style={styles.datePickerContainer}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={handlePreviousMonth}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.dateDisplay}>
            <Text style={styles.datePickerText}>
              {isCurrentMonth() ? 'This Month' : getFormattedDate(date)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={handleNextMonth}
            disabled={isCurrentMonth()}
          >
            <Ionicons name="arrow-forward" size={24} color={isCurrentMonth() ? 'gray' : 'black'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.awardSection} 
          onPress={() => navigation.navigate('NutritionBadgesScreen', { year: date.getFullYear(), month: date.getMonth() })}
        >
          <Text style={styles.awardTitle}>▼ Nutrition Badges</Text>
          <Image source={require('../../assets/badges/nutrition.png')} style={styles.badgeIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.awardSection} 
          onPress={() => navigation.navigate('CalorificScreen', { year: date.getFullYear(), month: date.getMonth() })}
        >
          <Text style={styles.awardTitle}>▼ Calorific</Text>
          <Image source={require('../../assets/badges/calorific.png')} style={styles.badgeIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.awardSection} 
          onPress={() => navigation.navigate('ProteinScreen', { year: date.getFullYear(), month: date.getMonth() })}
        >
          <Text style={styles.awardTitle}>▼ Protein</Text>
          <Image source={require('../../assets/badges/muscle.png')} style={styles.badgeIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.awardSection} 
          onPress={() => navigation.navigate('PhotoBadgesScreen', { year: date.getFullYear(), month: date.getMonth() })}
        >
          <Text style={styles.awardTitle}>▼ Photo Badges</Text>
          <Image source={require('../../assets/badges/camera.png')} style={styles.badgeIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.awardSection} 
          onPress={() => navigation.navigate('HydrationScreen', { year: date.getFullYear(), month: date.getMonth() })}
        >
          <Text style={styles.awardTitle}>▼ Hydration</Text>
          <Image source={require('../../assets/badges/hydration.png')} style={styles.badgeIcon} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 66,
    paddingHorizontal: 20,
    paddingBottom: 29,
    backgroundColor: '#98C386',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  arrowButton: {
    paddingHorizontal: 10,
  },
  dateDisplay: {
    paddingHorizontal: 10,
  },
  datePickerText: {
    fontSize: 18,
  },
  awardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  awardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  badgeIcon: {
    width: 70,
    height: 70,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
});

export default AwardScreen;
