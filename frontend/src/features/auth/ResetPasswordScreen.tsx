import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export default function ResetPasswordScreen({ navigation, route }: any) {
  const { changePassword, isLoading: authLoading } = useAuth();
  const email = route.params?.email || '';
  const otp = route.params?.otp || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await changePassword(email, password, otp);
      
      if (result.success) {
        Alert.alert(
          'Password Updated',
          'Your password has been successfully reset. Please login with your new password.',
          [
            {
              text: 'OK',
              onPress: () => navigation.popToTop(),
            },
          ]
        );
      } else {
        Alert.alert('Failed', result.message || 'Could not reset password. Please try again.');
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
      {/* Icon */}
      <View className="items-center mb-8">
        <View className="w-16 h-16 bg-surface rounded-full items-center justify-center mb-4 border border-border">
          <Ionicons name="lock-closed-outline" size={32} color="#6366f1" />
        </View>
        <Text className="text-2xl font-bold text-white">Reset Password</Text>
        <Text className="text-muted text-center mt-2 px-4">
          Create a new password for your account
        </Text>
      </View>
      
      <View className="space-y-4 mb-8">
        <Input 
          label="New Password" 
          placeholder="••••••••" 
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
          }}
          secureTextEntry
          autoComplete="password-new"
          icon={<Ionicons name="lock-closed-outline" size={20} color="#71717a" />}
          error={errors.password}
          editable={!loading}
        />
        <Input 
          label="Confirm Password" 
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
          }}
          secureTextEntry
          autoComplete="password-new"
          icon={<Ionicons name="lock-closed-outline" size={20} color="#71717a" />}
          error={errors.confirmPassword}
          editable={!loading}
        />
      </View>

      <Button 
        label={loading ? "Updating..." : "Update Password"}
        onPress={handleResetPassword}
        disabled={loading}
        icon={loading ? <ActivityIndicator size="small" color="white" /> : undefined}
      />
    </SafeAreaView>
  );
}