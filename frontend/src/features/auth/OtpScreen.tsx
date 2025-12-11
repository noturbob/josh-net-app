import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function OtpScreen({ navigation, route }: any) {
  // mode can be 'signup' or 'reset'
  const mode = route.params?.mode || 'signup'; 

  return (
    <SafeAreaView className="flex-1 bg-background p-6">
      <Text className="text-2xl font-bold text-white mt-10">Verification Code</Text>
      <Text className="text-muted mt-2 mb-8">
        We sent a 4-digit code to your email. Enter it below to continue.
      </Text>

      {/* Simplified OTP Input for now - normally multiple boxes */}
      <Input 
        placeholder="1 2 3 4" 
        keyboardType="number-pad" 
        maxLength={4} 
        className="text-center text-2xl tracking-widest"
      />

      <View className="flex-1" />

      <Button 
        label="Verify" 
        className="mb-4"
        onPress={() => {
            if(mode === 'reset') navigation.navigate('ResetPassword');
            else navigation.popToTop(); // Back to login to sign in
        }}
      />
      
      <TouchableOpacity className="self-center">
        <Text className="text-primary font-bold">Resend Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}