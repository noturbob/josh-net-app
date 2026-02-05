import "./global.css"; // Load Tailwind styles
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { ServerProvider } from './src/context/ServerContext';
import { JosephineProvider } from './src/context/JosephineContext';
import { InboxProvider } from './src/context/InboxContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ServerProvider>
          <JosephineProvider>
            <InboxProvider>
              <NavigationContainer>
                <StatusBar style="light" />
                <RootNavigator />
              </NavigationContainer>
            </InboxProvider>
          </JosephineProvider>
        </ServerProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}