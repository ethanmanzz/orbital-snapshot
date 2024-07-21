/*import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { supabase } from '../../backend/supabase/supabaseClient';

// Function to register for push notifications
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const updatePushTokenInDatabase = async (userId, newToken) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('push_token')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching current push token:', error.message);
    return;
  }

  const currentToken = data?.push_token;

  if (currentToken !== newToken) {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ push_token: newToken })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating push token:', updateError.message);
    } else {
      console.log('Push token updated successfully');
    }
  } else {
    console.log('Push token is up-to-date');
  }
};

export const initializePushNotifications = async () => {
  try {
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      throw new Error('User not logged in');
    }
    const user = session.data.session.user;
    const userId = user.id;
    const token = await registerForPushNotificationsAsync();
    if (token) {
      await updatePushTokenInDatabase(userId, token);
    }
  } catch (error) {
    console.error('Error initializing push notifications:', error.message);
  }
};
*/

// frontend/notifications/notification.js

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { supabase } from '../../backend/supabase/supabaseClient';

// Function to register for push notifications
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const updatePushTokenInDatabase = async (userId, newToken) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('push_token')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching current push token:', error.message);
    return;
  }

  const currentToken = data?.push_token;

  if (currentToken !== newToken) {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ push_token: newToken })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating push token:', updateError.message);
    } else {
      console.log('Push token updated successfully');
    }
  } else {
    console.log('Push token is up-to-date');
  }
};

export const initializePushNotifications = async () => {
  try {
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      throw new Error('User not logged in');
    }
    const user = session.data.session.user;
    const userId = user.id;
    const token = await registerForPushNotificationsAsync();
    if (token) {
      await updatePushTokenInDatabase(userId, token);
    }
  } catch (error) {
    console.error('Error initializing push notifications:', error.message);
  }
};
