import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import AuthNavigator from '../../../navigation/AuthNavigator';

// --- Temporary Dashboard Placeholder (Until we build the real V3 Dashboards) ---
const DashboardPlaceholder = () => {
  const { role, logout } = useAuth();
  return (
    <View className="flex-1 bg-background justify-center items-center p-4">
      <Text className="text-white text-3xl font-bold mb-2">Welcome, {role}!</Text>
      <Text className="text-muted mb-8 text-center">
        The {role?.toLowerCase()} dashboard for JoshNet V3 is coming soon.
      </Text>
      <TouchableOpacity 
        onPress={logout}
        className="bg-primary px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-bold">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { role } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {role === null ? (
        // 1. Not Logged In -> Show Auth Flow
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        // 2. Logged In -> Show Dashboard (Placeholder for now)
        <Stack.Screen name="App" component={DashboardPlaceholder} />
      )}
    </Stack.Navigator>
  );
}