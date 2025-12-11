import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function ForgotPasswordScreen({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-background p-6 justify-center">
      <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-12 left-6 z-10">
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
        placeholder="rollno@student.college.edu" 
        keyboardType="email-address"
        className="mb-6"
      />

      <Button 
        label="Send Reset Code" 
        onPress={() => navigation.navigate('OtpVerification', { mode: 'reset' })} 
      />
    </SafeAreaView>
  );
}