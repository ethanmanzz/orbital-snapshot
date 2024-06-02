import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { fetchUserWeeklyAndMonthlyAverages, fetchUserDailyGoals } from '../../backend/supabase/database';
import { getUser } from '../../backend/supabase/auth';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ProgressScreen = () => {
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [userGoals, setUserGoals] = useState({});
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
        console.log('User ID:', user.id);

        const [goals, averages] = await Promise.all([
          fetchUserDailyGoals(user.id),
          fetchUserWeeklyAndMonthlyAverages(user.id)
        ]);

        console.log('User Goals:', goals);

        if (goals.error) {
          throw goals.error;
        }
        if (averages.error) {
          throw averages.error;
        }

        setUserGoals(goals);
        setWeeklyData(averages.weeklyData);
        setMonthlyData(averages.monthlyData);
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

  const calculatePercentage = (current, goal) => {
    return goal ? ((current / goal) * 100).toFixed(2) : 0;
  };

  const formatValue = (value) => {
    return value.toFixed(1);
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
  };

  const getPast7Days = () => {
    let dates = [];
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(daysOfWeek[date.getDay()]);
    }
    return dates;
  };

  const generateChartData = (data, key) => {
    let chartData = new Array(7).fill(0);
    data.forEach((item, index) => {
      chartData[index] = item[key];
    });
    return chartData;
  };

  const data = {
    labels: getPast7Days(),
    datasets: [
      {
        data: selectedIndex === 0 ? generateChartData(weeklyData, 'average_calories') : generateChartData(monthlyData, 'average_calories'),
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
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Calories: {weeklyData[0]?.average_calories || 0} / {userGoals.caloriegoal || 'N/A'} kcal ({calculatePercentage(weeklyData[0]?.average_calories || 0, userGoals.caloriegoal)}%)
        </Text>
        <Text style={styles.summaryText}>
          Proteins: {formatValue(weeklyData[0]?.average_proteins || 0)} / {userGoals.proteingoal || 'N/A'} g ({calculatePercentage(weeklyData[0]?.average_proteins || 0, userGoals.proteingoal)}%)
        </Text>
        <Text style={styles.summaryText}>
          Fats: {formatValue(weeklyData[0]?.average_fats || 0)} / {userGoals.fatsgoal || 'N/A'} g ({calculatePercentage(weeklyData[0]?.average_fats || 0, userGoals.fatsgoal)}%)
        </Text>
        <Text style={styles.summaryText}>
          Carbs: {formatValue(weeklyData[0]?.average_carbs || 0)} / {userGoals.carbsgoal || 'N/A'} g ({calculatePercentage(weeklyData[0]?.average_carbs || 0, userGoals.carbsgoal)}%)
        </Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Average Calorie Intake</Text>
        <BarChart
          style={styles.chartStyle}
          data={data}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={0}
        />
      </View>
      
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
  summaryContainer: {
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
  chartContainer: {
    marginVertical: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
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

