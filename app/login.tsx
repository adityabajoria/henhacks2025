import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Login() {
  // State to manage email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Hook to navigate between screens
  const router = useRouter();

  // Function to handle login, currently it just navigates to the 'tabs' screen
  const handleLogin = () => {
    // No authentication, just navigate to the tabs
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjusts view behavior on different platforms
    >
      <View style={styles.innerContainer}>
        {/* Title and Subtitle */}
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to Continue!</Text>
        
        {/* Social Login Buttons */}
        <TouchableOpacity style={[styles.socialButton, styles.socialButtonBackground]}>
          <FontAwesome name="google" size={20} color="#000" style={styles.socialLogo} />
          <Text style={styles.socialButtonText}>Log in with Google</Text> {/* Option to login with google - not functional yet*/}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.socialButtonBackground]}>
          <FontAwesome name="apple" size={20} color="#000" style={styles.socialLogo} />
          <Text style={styles.socialButtonText}>Log in with Apple</Text>  {/* Option to login with apple - not functional yet*/}
        </TouchableOpacity>
        
        {/* Text separating social login and email/password */}
        <Text style={styles.orText}>Or</Text>
        
        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail} // Updates email state
        />
        
        {/* Line separator */}
        <View style={styles.line} />
        
        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword} // Updates password state
          secureTextEntry // Hides password text
        />
        
        {/* Line separator */}
        <View style={styles.line} />
        
        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        {/* Forgot Password Link */}
        <TouchableOpacity>
          <Text style={styles.link}><Text style={{textDecorationLine: 'none'}}>Forgot Password?</Text></Text>
        </TouchableOpacity>
        
        {/* Link to Sign Up screen */}
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.link}>Don't have an account?<Text style={{color: "red", textDecorationLine: 'none'}}>Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// Styles for the Login screen
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
    color: '#000',
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
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});
