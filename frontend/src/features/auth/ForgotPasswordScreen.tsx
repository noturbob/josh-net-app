import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPasswordScreen({ navigation }: any) {
  const { sendOTP, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    setError('');
    return true;
  };

  const handleSendCode = async () => {
    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      const result = await sendOTP(email.trim().toLowerCase());
      
      if (result.success) {
        navigation.navigate('OtpVerification', { 
          mode: 'reset',
          email: email.trim().toLowerCase()
        });
      } else {
        Alert.alert('Failed', result.message || 'Could not send reset code. Please try again.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const loading = isLoading || authLoading;

  return (
    <SafeAreaView className="flex-1 bg-background p-6 justify-center">
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        className="absolute top-12 left-6 z-10"
        disabled={loading}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View className="items-center mb-8">
        <View className="w-16 h-16 bg-surface rounded-full items-center justify-center mb-4 border border-border">
          <Ionicons name="key-outline" size={32} color="#6366f1" />
        </View>
        <Text className="text-2xl font-bold text-white">Forgot Password?</Text>
        <Text className="text-muted text-center mt-2 px-4">
          Enter your email address and we'll send you a code to reset your password.
        </Text>
      </View>

      <Input 
        label="Email Address" 
        placeholder="rollno@josephscollege.ac.in" 
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (error) setError('');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        className="mb-6"
        error={error}
        editable={!loading}
      />

      <Button 
        label={loading ? "Sending..." : "Send Reset Code"}
        onPress={handleSendCode}
        disabled={loading}
        icon={loading ? <ActivityIndicator size="small" color="white" /> : undefined}
      />
    </SafeAreaView>
  );
}