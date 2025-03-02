import { Stack } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack initialRouteName="index">
        {/* Define the initial route as "index" */}
        <Stack.Screen
          name="index"
          options={{ headerShown: false, gestureEnabled: false }} 
        />
        {/* Define the "info" screen */}
        <Stack.Screen
          name="info"
          options={{ headerShown: false, gestureEnabled: false }} 
        />
        {/* Define the "signup" screen */}
        <Stack.Screen 
          name="signup" 
          options={{ headerShown: false, gestureEnabled: false }} 
        />
        {/* Define the "login" screen */}
        <Stack.Screen 
          name="login" 
          options={{ headerShown: false, gestureEnabled: false }} 
        />
        {/* Define the "setup" screen */}
        <Stack.Screen 
          name="setup" 
          options={{ headerShown: false }} 
        />
        {/* Define the "(tabs)" screen */}
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false, gestureEnabled: false }} 
        />
        {/* Define the "map" screen */}
        <Stack.Screen 
          name="map" 
          options={{ headerShown: true, headerTitle: "UD-Campus Map", headerBackTitle: "Valv" }} 
        />
      </Stack>
    </ThemeProvider>
  );
}
