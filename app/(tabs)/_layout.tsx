import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff', // Active tab icon color
        tabBarInactiveTintColor: '#888', // Inactive tab icon color
        headerShown: false, // Hide the header
        tabBarStyle: {
          backgroundColor: '#25292e', // Tab bar background color
          borderTopColor: '#ccc', // Border top color
          paddingBottom: 4, // Padding bottom
          paddingTop: 10, // Padding top
        },
        tabBarLabelStyle: {
          fontSize: 12, // Font size for tab labels
          top: 5, // Position tab labels
        },
      }}
    >
      {/* Home tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      {/* Resources tab */}
      <Tabs.Screen
        name="resources"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search-sharp' : 'search-outline'} color={color} size={24} />
          ),
        }}
      />
      {/* About tab */}
      <Tabs.Screen
        name="about"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'scan-sharp' : 'scan-outline'} color={color} size={24} />
          ),
        }}
      />
      {/* Videos tab */}
      <Tabs.Screen
        name="videos"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'videocam-sharp' : 'videocam-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
