import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import StudentNavigator from './StudentNavigator';

// --- Temporary Dashboard Placeholder (Until we build the real V3 Dashboards) ---
const DashboardPlaceholder = () => {
  const { role, logout } = useAuth();
  return (
    // Added inline styles as a fallback to ensure visibility if NativeWind fails
    <View style={{ flex: 1, backgroundColor: '#09090b', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold', marginBottom: 8 }}>
        Welcome, {role}!
      </Text>
      <Text style={{ color: '#a1a1aa', textAlign: 'center', marginBottom: 32 }}>
        The {role?.toLowerCase()} dashboard for JoshNet V3 is coming soon.
      </Text>
      <TouchableOpacity 
        onPress={logout}
        style={{ backgroundColor: '#6366f1', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { role } = useAuth();

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        // Force a background color and flex expansion to prevent "Black Screen"
        cardStyle: { backgroundColor: '#09090b', flex: 1 } 
      }}
    >
      {role === null ? (
        // 1. Not Logged In -> Show Auth Flow
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : role === 'STUDENT' ? (
        // 2. Student Role -> Show Student Navigator (Sidebar, Chat, etc.)
        <Stack.Screen name="StudentRoot" component={StudentNavigator} />
      ) : (
        // 3. Other Roles -> Show Dashboard Placeholder (for now)
        <Stack.Screen name="App" component={DashboardPlaceholder} />
      )}
    </Stack.Navigator>
  );
}