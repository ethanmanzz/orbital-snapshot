
// lambda/checkDailyIntake/index.js

//import { supabase } from '../../supabase/supabaseClient';
//import sns from '../../backend/aws/snsClient';

/*const { supabase } = require('../../../supabase/supabaseClient');
const sns = require('../../../aws/snsClient');

async function sendPushNotification(snsTopicArn, message) {
  const params = {
    Message: message,
    TopicArn: snsTopicArn,
  };

  try {
    const data = await sns.publish(params).promise();
    console.log(`Message sent to the topic ${snsTopicArn}`);
    console.log("MessageID is " + data.MessageId);
  } catch (err) {
    console.error(err, err.stack);
  }
}

async function checkDailyIntakeAndNotify() {
  const { data: users, error } = await supabase
    .from('profiles')
    .select('id, push_token');

  if (error) {
    console.error(error);
    return;
  }

  const today = new Date().toISOString().split('T')[0];

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
      // User has not uploaded a photo today, send a notification
      await sendPushNotification(user.push_token, 'Reminder: Please upload a photo of your meal today!');
    }
  }
}

// Lambda handler
exports.handler = async (event) => {
  await checkDailyIntakeAndNotify();
};

*/

// index.mjs

import { supabase } from './supabase/supabaseClient.js';
import sns from './aws/snsClient.js';

async function sendPushNotification(snsTopicArn, message) {
  const params = {
    Message: message,
    TopicArn: snsTopicArn,
  };

  try {
    const data = await sns.publish(params).promise();
    console.log(`Message sent to the topic ${snsTopicArn}`);
    console.log("MessageID is " + data.MessageId);
  } catch (err) {
    console.error(err, err.stack);
  }
}

async function checkDailyIntakeAndNotify() {
  const { data: users, error } = await supabase
    .from('profiles')
    .select('id, push_token');

  if (error) {
    console.error(error);
    return;
  }

  const today = new Date().toISOString().split('T')[0];

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
      await sendPushNotification(user.push_token, 'Reminder: Please upload a photo of your meal today!');
    }
  }
}

// Lambda handler
export const handler = async (event) => {
  await checkDailyIntakeAndNotify();
};
