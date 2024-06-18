import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native'; 
import { signIn, signUp } from '../../backend/supabase/auth';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-50)).current;

    useEffect(() => {
        Animated.parallel([ //run animations in parallel
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    const handleAuth = async () => {
        setLoading(true);
        if (isSignUp) {
            // Sign-up logic
            const { user, error } = await signUp(email, password);
            if (!error) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'UsernameQuestion' }],
                });
            }
        } else {
            // Login logic
            const { user, error } = await signIn(email, password);
            if (!error) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
            }
        }
        setLoading(false);
    };

    return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
      <ImageBackground source={require('../../frontend/assets/backgrounds/login_background.png')} style={styles.background}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <Animated.Image 
            source={require('../../frontend/assets/snapshot_logo.png')}
            style={[styles.logo, { transform: [{ translateY: slideAnim }] }]}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.toggleText}>
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background to enhance readability
        padding: 20,
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Background for text inputs to enhance readability
    },
    button: {
        backgroundColor: '#5c85d6',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    toggleText: {
        color: '#5c85d6',
        marginTop: 20,
        fontSize: 16,
    },
});
