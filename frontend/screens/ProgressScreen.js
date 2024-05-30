import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { fetchUserWeeklyAndMonthlyAverages } from '../../backend/supabase/database';
import { getUser } from '../../backend/supabase/auth';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ProgressScreen = () => {
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const session = await getUser();
        if (!session.data.session) {
          throw new Error('User not logged in');
        }

        const user = session.data.session.user;
        //console.log('User ID:', user.id);
        const { weeklyData, monthlyData, error } = await fetchUserWeeklyAndMonthlyAverages(user.id);

        if (error) {
          console.error('Error fetching data:', error);
          setError(error);
        } else {
          //console.log('Weekly Data:', weeklyData);
          //console.log('Monthly Data:', monthlyData);
          setWeeklyData(weeklyData);
          setMonthlyData(monthlyData);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleIndexChange = (index) => {
    setSelectedIndex(index);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
    yAxisLabel: '',
    formatYLabel: (yValue) => `${Math.round(yValue / 50) * 50}`, // Ensures multiples of 50
  };

  const getPast7Days = () => {
    let dates = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(daysOfWeek[date.getDay()]); // Use the short form of the day
    }
    return dates;
  };

  const generateChartData = (data) => {
    let chartData = new Array(7).fill(0); // Initialize with 0 for all days
    data.forEach((item, index) => {
      chartData[index] = item.average_calories;
    });
    return chartData;
  };

  const data = {
    labels: getPast7Days(),
    datasets: [
      {
        data: selectedIndex === 0 ? generateChartData(weeklyData) : generateChartData(monthlyData),
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SegmentedControlTab
        values={['Weekly', 'Monthly']}
        selectedIndex={selectedIndex}
        onTabPress={handleIndexChange}
        tabsContainerStyle={styles.tabsContainer}
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        tabTextStyle={styles.tabTextStyle}
        activeTabTextStyle={styles.activeTabTextStyle}
      />
      {selectedIndex === 0 ? (
        weeklyData && weeklyData.length > 0 ? (
          <View style={styles.dataContainer}>
            <Text>Calories: {weeklyData[0].average_calories}</Text>
            <Text>Proteins: {weeklyData[0].average_proteins}</Text>
            <Text>Fats: {weeklyData[0].average_fats}</Text>
            <Text>Carbs: {weeklyData[0].average_carbs}</Text>
          </View>
        ) : (
          <Text>No weekly data available</Text>
        )
      ) : (
        monthlyData && monthlyData.length > 0 ? (
          <View style={styles.dataContainer}>
            <Text>Calories: {monthlyData[0].average_calories}</Text>
            <Text>Proteins: {monthlyData[0].average_proteins}</Text>
            <Text>Fats: {monthlyData[0].average_fats}</Text>
            <Text>Carbs: {monthlyData[0].average_carbs}</Text>
          </View>
        ) : (
          <Text>No monthly data available</Text>
        )
      )}
      <BarChart
        style={styles.chartStyle}
        data={data}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        verticalLabelRotation={0}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  tabStyle: {
    borderColor: '#6a1b9a',
    borderWidth: 1,
  },
  activeTabStyle: {
    backgroundColor: '#6a1b9a',
  },
  tabTextStyle: {
    color: '#6a1b9a',
  },
  activeTabTextStyle: {
    color: '#ffffff',
  },
  dataContainer: {
    padding: 20,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  errorText: {
    color: 'red',
  },
});

export default ProgressScreen;

