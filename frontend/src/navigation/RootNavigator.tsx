import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import StudentNavigator from './StudentNavigator';

// --- Loading Screen ---
const LoadingScreen = () => (
  <View style={{ flex: 1, backgroundColor: '#09090b', justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#6366f1" />
    <Text style={{ color: '#a1a1aa', marginTop: 16, fontSize: 16 }}>
      Loading JoshNet...
    </Text>
  </View>
);

// --- Dashboard Placeholder for Other Roles ---
const DashboardPlaceholder = () => {
  const { role, user, logout, isLoading } = useAuth();
  
  return (
    <View style={{ flex: 1, backgroundColor: '#09090b', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold', marginBottom: 8 }}>
        Welcome, {user?.name || role}!
      </Text>
      <Text style={{ color: '#a1a1aa', textAlign: 'center', marginBottom: 32 }}>
        The {role?.toLowerCase()} dashboard for JoshNet V3 is coming soon.
      </Text>
      <TouchableOpacity 
        onPress={logout}
        disabled={isLoading}
        style={{ 
          backgroundColor: '#6366f1', 
          paddingVertical: 12, 
          paddingHorizontal: 24, 
          borderRadius: 12,
          opacity: isLoading ? 0.7 : 1
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {isLoading ? 'Logging out...' : 'Log Out'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { role, isAuthenticated, isLoading } = useAuth();

  // Show loading screen while checking auth status
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: '#09090b', flex: 1 } 
      }}
    >
      {!isAuthenticated ? (
        // 1. Not Logged In -> Show Auth Flow
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : role === 'student' ? (
        // 2. Student Role -> Show Student Navigator (Sidebar, Chat, etc.)
        <Stack.Screen name="StudentRoot" component={StudentNavigator} />
      ) : (
        // 3. Other Roles -> Show Dashboard Placeholder (for now)
        <Stack.Screen name="App" component={DashboardPlaceholder} />
      )}
    </Stack.Navigator>
  );
}