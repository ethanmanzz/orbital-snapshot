import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { fetchUserWeeklyAndMonthlyAverages, fetchUserDailyGoals, fetchUserDailyIntake, fetchMealCounts, setupRealTimeSubscription } from '../../backend/supabase/database';
import { getUser } from '../../backend/supabase/auth';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ProgressScreen = () => {
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlyWeeklyData, setMonthlyWeeklyData] = useState([]);
  const [dailyIntakeData, setDailyIntakeData] = useState([]);
  const [userGoals, setUserGoals] = useState({});
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedGraph, setSelectedGraph] = useState('calories');
  const [mealCounts, setMealCounts] = useState({ Breakfast: 0, Lunch: 0, Dinner: 0, Snack: 0 });

  const loadData = async () => {
    try {
      const session = await getUser();
      if (!session.data.session) {
        throw new Error('User not logged in');
      }

      const user = session.data.session.user;
      console.log('Loading data for user:', user.id); // Debugging log
      const [goals, dailyIntake, averages, mealData] = await Promise.all([
        fetchUserDailyGoals(user.id),
        fetchUserDailyIntake(user.id),
        fetchUserWeeklyAndMonthlyAverages(user.id),
        fetchMealCounts(user.id, selectedIndex === 0 ? 'weekly' : 'monthly')
      ]);

      if (goals.error) {
        throw goals.error;
      }
      if (averages.error) {
        throw averages.error;
      }
      if (dailyIntake.error) {
        throw dailyIntake.error;
      }

      setUserGoals(goals);
      setWeeklyData(averages.weeklyData || []);
      setMonthlyData(averages.monthlyData || []);
      setDailyIntakeData(dailyIntake.reverse() || []);
      setMonthlyWeeklyData(averages.monthlyWeeklyData.reverse() || []);
      setMealCounts(mealData);
      console.log('Data loaded successfully'); // Debugging log
    } catch (err) {
      setError(err);
      console.error('Error loading data:', err); // Debugging log
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const setupSubscription = async () => {
      const session = await getUser();
      if (!session.data.session) {
        throw new Error('User not logged in');
      }

      const user = session.data.session.user;
      setupRealTimeSubscription(user.id, (updatedData) => {
        console.log('Updated data received:', updatedData); // Debugging log 
        setMealCounts(updatedData.mealCounts);
        setWeeklyData(updatedData.weeklyData);
        setMonthlyData(updatedData.monthlyData);
        setMonthlyWeeklyData(updatedData.monthlyWeeklyData);
        setDailyIntakeData(updatedData.dailyIntakeData.reverse());
      });
    };

    setupSubscription();
  }, [selectedIndex]);

  const handleIndexChange = (index) => {
    setSelectedIndex(index);
  };

  const handleGraphChange = (graph) => {
    setSelectedGraph(graph);
  };

  const calculatePercentage = (current, goal) => {
    return goal ? ((current / goal) * 100).toFixed(2) : 0;
  };

  const formatValue = (value) => {
    return value.toFixed(1);
  };

  const getEncouragementMessage = (averagePercentage) => {
    if (averagePercentage >= 80) {
      return "You're crushing it!";
    } else if (averagePercentage >= 50) {
      return "Keep it up!";
    } else {
      return "Try harder!";
    }
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
    color: (opacity = 1) => `rgba(106, 27, 154, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
    fromZero: true,
  };

  const getPast7Days = () => {
    let dates = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(daysOfWeek[date.getDay()]);
    }
    return dates;
  };

  const getWeeklyLabels = () => {
    return ["3 Weeks Ago", "2 Weeks Ago", "Last Week", "This Week"];
  };

  const generateChartData = (data = [], key) => {
    let chartData = new Array(selectedIndex === 0 ? 7 : 4).fill(0);
    data.forEach((item, index) => {
      chartData[index] = item[key];
    });
    return chartData;
  };

  const data = {
    labels: selectedIndex === 0 ? getPast7Days() : getWeeklyLabels(),
    datasets: [
      {
        data: selectedIndex === 0 ? generateChartData(dailyIntakeData, `average_${selectedGraph}`) : generateChartData(monthlyWeeklyData, `average_${selectedGraph}`),
      },
    ],
  };

  const currentData = selectedIndex === 0 ? weeklyData[0] : monthlyData[0];

  const averagePercentage = (
    (parseFloat(calculatePercentage(currentData?.average_calories || 0, userGoals.caloriegoal)) +
      parseFloat(calculatePercentage(currentData?.average_proteins || 0, userGoals.proteingoal)) +
      parseFloat(calculatePercentage(currentData?.average_fats || 0, userGoals.fatsgoal)) +
      parseFloat(calculatePercentage(currentData?.average_carbs || 0, userGoals.carbsgoal))) /
    4
  ).toFixed(2);

  const encouragementMessage = getEncouragementMessage(averagePercentage);

  const pieData = Object.entries(mealCounts)
    .filter(([mealType, count]) => count > 0)
    .map(([mealType, count]) => ({
      name: mealType,
      count: count,
      color: getColorForMealType(mealType),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }));

  function getColorForMealType(mealType) {
    switch (mealType) {
      case 'Breakfast':
        return '#FFA726';
      case 'Lunch':
        return '#66BB6A';
      case 'Dinner':
        return '#42A5F5';
      case 'Snack':
        return '#FF7043';
      default:
        return '#000000';
    }
  }

  return (
    <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Progress Summary</Text>
        </View>
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
      <View style={styles.encouragementContainer}>
        <Text style={styles.encouragementText}>{encouragementMessage}</Text>
      </View>
      <View style={styles.graphSelectorContainer}>
        {['calories', 'proteins', 'fats', 'carbs'].map((graph) => (
          <TouchableOpacity
            key={graph}
            style={[styles.graphButton, selectedGraph === graph && styles.selectedGraphButton]}
            onPress={() => handleGraphChange(graph)}
          >
            <Text style={[styles.graphButtonText, selectedGraph === graph && styles.selectedGraphButtonText]}>
              {graph.charAt(0).toUpperCase() + graph.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Calories: {formatValue(currentData?.average_calories || 0)} / {userGoals.caloriegoal || 'N/A'} kcal ({calculatePercentage(currentData?.average_calories || 0, userGoals.caloriegoal)}%)
        </Text>
        <Text style={styles.summaryText}>
          Proteins: {formatValue(currentData?.average_proteins || 0)} / {userGoals.proteingoal || 'N/A'} g ({calculatePercentage(currentData?.average_proteins || 0, userGoals.proteingoal)}%)
        </Text>
        <Text style={styles.summaryText}>
          Fats: {formatValue(currentData?.average_fats || 0)} / {userGoals.fatsgoal || 'N/A'} g ({calculatePercentage(currentData?.average_fats || 0, userGoals.fatsgoal)}%)
        </Text>
        <Text style={styles.summaryText}>
          Carbs: {formatValue(currentData?.average_carbs || 0)} / {userGoals.carbsgoal || 'N/A'} g ({calculatePercentage(currentData?.average_carbs || 0, userGoals.carbsgoal)}%)
        </Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{`Average ${selectedGraph.charAt(0).toUpperCase() + selectedGraph.slice(1)} Intake Per Meal`}</Text>
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
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Meal Summary:</Text>
        <PieChart
          data={pieData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 66,
    paddingHorizontal: 20,
    paddingBottom: 29,
    backgroundColor: '#77529A',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
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
  encouragementContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  encouragementText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a1b9a',
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  graphSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  graphButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  selectedGraphButton: {
    backgroundColor: '#6a1b9a',
  },
  graphButtonText: {
    color: '#6a1b9a',
  },
  selectedGraphButtonText: {
    color: '#ffffff',
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

//Bottom code is trying to add make the rpc calls real time 

/*import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { fetchUserWeeklyAndMonthlyAverages, fetchUserDailyGoals, fetchMealCounts } from '../../backend/supabase/database';
import { getUser } from '../../backend/supabase/auth';
import { supabase } from '../../backend/supabase/supabaseClient'; 
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ProgressScreen = () => {
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlyWeeklyData, setMonthlyWeeklyData] = useState([]);
  const [userGoals, setUserGoals] = useState({});
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedGraph, setSelectedGraph] = useState('calories');
  const [mealCounts, setMealCounts] = useState({ Breakfast: 0, Lunch: 0, Dinner: 0, Snack: 0 });

  useEffect(() => {
    const loadData = async () => {
      try {
        const session = await getUser();
        if (!session.data.session) {
          throw new Error('User not logged in');
        }

        const user = session.data.session.user;
        const [goals, averages, mealData] = await Promise.all([
          fetchUserDailyGoals(user.id),
          fetchUserWeeklyAndMonthlyAverages(user.id),
          fetchMealCounts(user.id, selectedIndex === 0 ? 'weekly' : 'monthly')
        ]);

        if (goals.error) {
          throw goals.error;
        }
        if (averages.error) {
          throw averages.error;
        }

        setUserGoals(goals);
        setWeeklyData(averages.weeklyData || []);
        setMonthlyData(averages.monthlyData || []);
        setMonthlyWeeklyData(averages.monthlyWeeklyData.reverse() || []);

        setMealCounts(mealData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Setup real-time subscription
    const subscription = supabase
      .from('daily_intake')
      .on('*', async payload => {
        console.log('Change detected:', payload);
        const updatedMealCounts = await fetchMealCounts(session.data.session.user.id, selectedIndex === 0 ? 'weekly' : 'monthly');
        setMealCounts(updatedMealCounts);
      })
      .subscribe();

    return () => supabase.removeSubscription(subscription);
  }, [selectedIndex]);

  const handleIndexChange = (index) => {
    setSelectedIndex(index);
  };

  const handleGraphChange = (graph) => {
    setSelectedGraph(graph);
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

  // Rest of the component rendering, including pie chart
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
      <View style={styles.encouragementContainer}>
        <Text style={styles.encouragementText}>{getEncouragementMessage(averagePercentage)}</Text>
      </View>
      <View style={styles.graphSelectorContainer}>
        {['calories', 'proteins', 'fats', 'carbs'].map((graph) => (
          <TouchableOpacity
            key={graph}
            style={[styles.graphButton, selectedGraph === graph && styles.selectedGraphButton]}
            onPress={() => handleGraphChange(graph)}
          >
            <Text style={[styles.graphButtonText, selectedGraph === graph && styles.selectedGraphButtonText]}>
              {graph.charAt(0).toUpperCase() + graph.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Calories: {formatValue(currentData?.average_calories || 0)} / {userGoals.caloriegoal || 'N/A'} kcal ({calculatePercentage(currentData?.average_calories || 0, userGoals.caloriegoal)}%)
        </Text>
        <Text style={styles.summaryText}>
          Proteins: {formatValue(currentData?.average_proteins || 0)} / {userGoals.proteingoal || 'N/A'} g ({calculatePercentage(currentData?.average_proteins || 0, userGoals.proteingoal)}%)
        </Text>
        <Text style={styles.summaryText}>
          Fats: {formatValue(currentData?.average_fats || 0)} / {userGoals.fatsgoal || 'N/A'} g ({calculatePercentage(currentData?.average_fats || 0, userGoals.fatsgoal)}%)
        </Text>
        <Text style={styles.summaryText}>
          Carbs: {formatValue(currentData?.average_carbs || 0)} / {userGoals.carbsgoal || 'N/A'} g ({calculatePercentage(currentData?.average_carbs || 0, userGoals.carbsgoal)}%)
        </Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{`Average ${selectedGraph.charAt(0).toUpperCase() + selectedGraph.slice(1)} Intake`}</Text>
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
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Meal Summary:</Text>
        <PieChart
          data={pieData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
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
  encouragementContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  encouragementText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a1b9a',
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  graphSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  graphButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  selectedGraphButton: {
    backgroundColor: '#6a1b9a',
  },
  graphButtonText: {
    color: '#6a1b9a',
  },
  selectedGraphButtonText: {
    color: '#ffffff',
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

*/


