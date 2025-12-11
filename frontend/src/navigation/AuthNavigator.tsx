import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../features/auth/LoginScreen';
import SignUpScreen from '../features/auth/SignUpScreen';
import ForgotPasswordScreen from '../features/auth/ForgotPasswordScreen';
import OtpScreen from '../features/auth/OtpScreen';
import ResetPasswordScreen from '../features/auth/ResetPasswordScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OtpVerification" component={OtpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}