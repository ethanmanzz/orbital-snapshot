import { supabase } from './supabaseClient';
import { Alert } from 'react-native';

export const signUp = async (email, password) => {
  try {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      Alert.alert('Error', error.message);
      return { error };
    }
    Alert.alert('Success', 'Sign-up successful.');
    return { user };
  } catch (error) {
    Alert.alert('Error', error.message);
    return { error };
  }
};

export const signIn = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert('Error', error.message);
        return { error };
      }
      Alert.alert('Success', 'Logged in successfully');
      return { user };
    } catch (error) {
      Alert.alert('Error', error.message);
      return { error };
    }
  };

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getUser = async () => {
  return await supabase.auth.getSession();
};