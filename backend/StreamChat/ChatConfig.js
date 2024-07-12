import { supabase } from '../supabase/supabaseClient';

export const chatApiKey = 'u5h5t5s2v63q';
export const chatSecret = "8c5huc5237kyh89jtnf83vj6jx9xnuhqmzrujt7cjsmvt3c9f2z9maygwsw628wt";

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

