import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Setup() {
  // State hooks for email and password 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Router hook from 'expo-router' for navigation between screens
  const router = useRouter();

  // Handle the login action (currently just navigates to tabs without authentication)
  const handleLogin = () => {
    // Navigation to the tabs screen after clicking "Sign in"
    router.push('/(tabs)');
  };

  return (
    // KeyboardAvoidingView ensures that the keyboard doesn't overlap the input fields on iOS or Android
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Different behavior for iOS and Android
    >
      <View style={styles.innerContainer}>        
        {/* Title of the screen */}
        <Text style={styles.title}>Welcome Back!</Text>

        {/* Subtitle prompting the user to sign in */}
        <Text style={styles.subtitle}>Sign in to Continue!</Text>

        {/* Social login button for Google */}
        <TouchableOpacity style={[styles.socialButton, styles.socialButtonBackground]}>
          <FontAwesome name="google" size={20} color="#000" style={styles.socialLogo} />
          <Text style={styles.socialButtonText}>Log in with Google</Text>
        </TouchableOpacity>

        {/* Social login button for Apple */}
        <TouchableOpacity style={[styles.socialButton, styles.socialButtonBackground]}>
          <FontAwesome name="apple" size={20} color="#000" style={styles.socialLogo} />
          <Text style={styles.socialButtonText}>Log in with Apple</Text>
        </TouchableOpacity>

        {/* Divider text for alternative sign-up method */}
        <Text style={styles.orText}>Or</Text>

        {/* Button for signing up with email */}
        <TouchableOpacity style={[styles.socialButton, styles.socialButtonBackground]}>
          <Text style={styles.socialButtonText}>Sign up with email</Text>
        </TouchableOpacity>

        {/* Text informing the user about terms and conditions */}
        <Text style={styles.orText1}>By signing up you are agreeing to our friendly{"\n"}</Text>
        <Text style={{ bottom: 30}}>terms and conditions</Text>

        {/* Sign-in button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        {/* Navigation to the sign-up screen if the user doesn't have an account */}
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.link}>
            Don't have an account? <Text style={{ color: "red", textDecorationLine: 'none' }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '101%',
    padding: 5,
    marginVertical: 10,
    borderRadius: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#227E75',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    textDecorationLine: 'underline',
    color: '#000',
  },
  socialButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButtonBackground: {
    backgroundColor: '#f0f0f0',
  },
  socialLogo: {
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 10,
    fontSize: 14,
    paddingVertical: 35,
  },
  orText1: {
    fontSize: 14,
    paddingVertical: 20,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});
