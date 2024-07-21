import { supabase } from './supabase/supabaseClient.js';
import fetch from 'node-fetch';

async function sendPushNotification(pushToken, message) {
  const payload = {
    to: pushToken,
    sound: 'default',
    title: 'Daily Intake Reminder',
    body: message,
    data: { withSome: 'data' },
  };

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
}

async function checkDailyIntakeAndNotify() {
  const testUserId = '7ad55cbf-fc6a-4c55-a0bd-22737212d9df';
  const { data: users, error } = await supabase
    .from('profiles')
    .select('id, push_token')
    .eq('id', testUserId);

  if (error) {
    console.error(error);
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  console.log(`Today's date is ${today}`);

  for (let user of users) {
    const { data: intake, error: intakeError } = await supabase
      .from('daily_intake')
      .select('date')
      .eq('id', user.id)
      .eq('date', today);

    if (intakeError) {
      console.error(intakeError);
      continue;
    }

    if (intake.length === 0 && user.push_token) {
      console.log(`Sending reminder to user ${user.id}`);
      await sendPushNotification(user.push_token, 'Reminder: Please upload a photo of your meal today!');
    }
  }
}

// Lambda handler
export async function handler(event) {
  await checkDailyIntakeAndNotify();
}



