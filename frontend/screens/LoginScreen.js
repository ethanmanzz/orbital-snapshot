import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { signIn, signUp } from '../../backend/supabase/auth';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const fadeAnim = useSharedValue(0);
    const slideAnim = useSharedValue(-50);

    useEffect(() => {
        fadeAnim.value = withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) });
        slideAnim.value = withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) });
    }, [fadeAnim, slideAnim]);

    const fadeStyle = useAnimatedStyle(() => {
        return {
            opacity: fadeAnim.value,
        };
    });

    const slideStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: slideAnim.value }],
        };
    });

    const handleAuth = async () => {
        setLoading(true);
        if (isSignUp) {
            const { user, error } = await signUp(email, password);
            if (!error) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'UsernameQuestion' }],
                });
            }
        } else {
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
                    <Animated.View style={[styles.container, fadeStyle]}>
                        <Animated.Image
                            source={require('../../frontend/assets/snapshot_logo.png')}
                            style={[styles.logo, slideStyle]}
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
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
