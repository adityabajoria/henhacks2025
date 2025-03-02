import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function Signup() {
  const [username, setUsername] = useState(''); // Username entered by the user
  const [email, setEmail] = useState(''); // Email entered by the user
  const [password, setPassword] = useState(''); // Password entered by the user
  const [retypePassword, setRetypePassword] = useState(''); // Re-typed password for confirmation
  const [usernameTouched, setUsernameTouched] = useState(false); // Flag to check if username field is touched
  const [emailTouched, setEmailTouched] = useState(false); // Flag to check if email field is touched
  const [passwordTouched, setPasswordTouched] = useState(false); // Flag to check if password field is touched
  const [retypePasswordTouched, setRetypePasswordTouched] = useState(false); // Flag to check if retype password field is touched
  const router = useRouter(); // Router hook to navigate to different screens

  // Handles the continue button press and performs validation checks
  const handleContinue = () => {
    // Mark all fields as touched to show validation feedback
    setUsernameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setRetypePasswordTouched(true);

    // If all fields are valid, navigate to the setup screen
    if (username && validateEmail(email) && validatePassword(password) && validateRetypePassword(password, retypePassword)) {
      router.push('/setup'); // Navigate to the /setup page
    }
  };

  // Function to validate the email, ensuring it ends with .edu
  const validateEmail = (email: string) => {
    return email.endsWith('.edu');
  };

  // Function to validate the password, ensuring it's at least 8 characters long
  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  // Function to validate if the retyped password matches the original password
  const validateRetypePassword = (password: string, retypePassword: string) => {
    return password === retypePassword;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container} // Container to adjust layout for keyboard
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform (iOS or Android)
    >
      <View style={styles.innerContainer}>
        {/* Title and subtitle text */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
        
        {/* Username input field */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={text => {
            setUsername(text); // Update username state
            setUsernameTouched(true); // Mark username as touched
          }}
          onFocus={() => setUsernameTouched(true)} // Mark username as touched when focused
        />
        {/* Show error message if username is empty and touched */}
        {usernameTouched && !username && <Text style={styles.errorText}>Field cannot be empty</Text>}
        
        {/* Email input field */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={text => {
            setEmail(text); // Update email state
            setEmailTouched(true); // Mark email as touched
          }}
          onFocus={() => setEmailTouched(true)} // Mark email as touched when focused
        />
        {/* Show error message if email is not valid */}
        {emailTouched && !validateEmail(email) && <Text style={styles.errorText}>Email not valid</Text>}
        
        {/* Password input field */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={text => {
            setPassword(text); // Update password state
            setPasswordTouched(true); // Mark password as touched
          }}
          secureTextEntry // Hide the password text
          onFocus={() => setPasswordTouched(true)} // Mark password as touched when focused
        />
        {/* Show error message if password is less than 8 characters */}
        {passwordTouched && !validatePassword(password) && <Text style={styles.errorText}>Must contain 8 characters</Text>}
        
        {/* Retype password input field */}
        <TextInput
          style={styles.input}
          placeholder="Retype Password"
          placeholderTextColor="#888"
          value={retypePassword}
          onChangeText={text => {
            setRetypePassword(text); // Update retype password state
            setRetypePasswordTouched(true); // Mark retype password as touched
          }}
          secureTextEntry // Hide the password text
          onFocus={() => setRetypePasswordTouched(true)} // Mark retype password as touched when focused
        />
        {/* Show error message if passwords do not match */}
        {retypePasswordTouched && !validateRetypePassword(password, retypePassword) && <Text style={styles.errorText}>Passwords must match</Text>}
        
        {/* Continue button to submit the form */}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        
        {/* Link to navigate to the login screen if user already has an account */}
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background for the container
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    padding: 20, // Add padding around the container
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#000', // Black text color for input fields
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#227E75', // Green background for the button
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    textDecorationLine: 'underline', // Underline the link text
    color: '#000', // Black color for the link text
  },
  errorText: {
    color: 'red', // Red color for error messages
    alignSelf: 'flex-start',
    fontSize: 12,
  },
});
