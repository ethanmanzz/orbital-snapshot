import * as Notifications from 'expo-notifications';

// Request permissions for notifications
export async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('You need to enable notifications for the app to work properly.');
    return false;
  }
  return true;
}

// Daily notification 
export async function scheduleDailyNotification(hour, minute, title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
    },
    trigger: {
      hour,
      minute,
      repeats: true,
    },
  });
}

// Set up daily reminders for breakfast, lunch, and dinner 
export async function setupDailyReminders() {
  const permissionsGranted = await requestNotificationPermissions();
  if (!permissionsGranted) return;

  await scheduleDailyNotification(8, 0, 'Good Morning!', "Don't forget to log your breakfast.");
  await scheduleDailyNotification(12, 0, 'Lunch Time!', "Don't forget to log your lunch.");
  await scheduleDailyNotification(19, 0, 'Dinner Time!', "Don't forget to log your dinner.");
}
