import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";

/**
 * Splash Screen Component
 *
 * This component serves as the splash screen for the application. It displays an animated logo
 * that fades in and scales up, then automatically navigates to the '/info' screen after a short delay.
 *
 * Features:
 * - Fade-in animation
 * - Scaling animation
 * - Auto-navigation after 3 seconds
 * - Theme support (dark and light mode)
 */

export default function Splash() {
  const router = useRouter(); // Hook for navigation
  const fadeAnim = new Animated.Value(0); // Animation for fading effect
  const scaleAnim = new Animated.Value(0.8); // Animation for scaling effect
  const theme = useTheme(); // Get current theme from context

  useEffect(() => {
    // Start animations in parallel
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000, // Fade-in effect over 2 seconds
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 2, // Spring effect with low friction
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to the info screen after 3 seconds
    const timer = setTimeout(() => {
      router.push("/info");
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      {/* Animated logo container */}
      <Animated.View
        style={{
          ...styles.logoContainer,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Image
          source={
            theme === "dark"
              ? require("../assets/images/logo.png")
              : require("../assets/images/logo_dark.png")
          }
          style={styles.logo}
        />
      </Animated.View>
      {/* App Name */}
      <Text
        style={[
          styles.text,
          theme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        VALV
      </Text>
    </View>
  );
}

/**
 * Styles for the Splash Screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  darkContainer: {
    backgroundColor: "#25292e", // Dark mode background
  },
  lightContainer: {
    backgroundColor: "#fff", // Light mode background
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  darkText: {
    color: "#fff", // Dark mode text color
  },
  lightText: {
    color: "#000", // Light mode text color
  },
});
