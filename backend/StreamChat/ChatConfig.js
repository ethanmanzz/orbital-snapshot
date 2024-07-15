import { supabase } from '../supabase/supabaseClient';

export const chatApiKey = 'n6bzf8eqdamm';
export const chatSecret = "fmq7w8f4zw9uue3m35sjtyzhbqf2zuakktnzh7n4sg584mu9m323epx7k8rshtrm";

export const chatUserId = async () => {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error('User not logged in');
  }
  const user = session.data.session.user;
  const userId = user.id;

  const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', userId);

  if (error) {
    console.error('Error fetching user credentials:', error);
    throw error;
  }

  return data;
};
