import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function ResetPasswordScreen({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-background p-6 justify-center">
      <Text className="text-2xl font-bold text-white mb-6">Reset Password</Text>
      
      <View className="space-y-4 mb-8">
        <Input label="New Password" placeholder="••••••••" secureTextEntry />
        <Input label="Confirm Password" placeholder="••••••••" secureTextEntry />
      </View>

      <Button 
        label="Update Password" 
        onPress={() => navigation.popToTop()} 
      />
    </SafeAreaView>
  );
}