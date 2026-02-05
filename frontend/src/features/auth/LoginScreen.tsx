import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const { login, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const result = await login(email.trim().toLowerCase(), password);
      
      if (result.otpRequired) {
        // Navigate to OTP screen for 2FA
        navigation.navigate('OtpVerification', { 
          email: email.trim().toLowerCase(),
          mode: 'login'
        });
      } else if (!result.success) {
        Alert.alert('Login Failed', result.message || 'Please check your credentials');
      }
      // If success, AuthContext will handle navigation
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    Alert.alert('Coming Soon', 'Google login will be available soon!');
  };

  const loading = isLoading || authLoading;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-16 h-16 bg-primary/20 rounded-2xl items-center justify-center mb-4 border border-primary">
              <Ionicons name="school" size={32} color="#6366f1" />
            </View>
            <Text className="text-3xl font-bold text-white tracking-tight">Welcome Back</Text>
            <Text className="text-muted text-center mt-2">
              Sign in to access your JoshNet portal
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            <Input 
              label="Email Address"
              placeholder="rollno@josephscollege.ac.in"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              icon={<Ionicons name="mail-outline" size={20} color="#71717a" />}
              error={errors.email}
              editable={!loading}
            />
            
            <View>
              <Input 
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                }}
                secureTextEntry
                autoComplete="password"
                icon={<Ionicons name="lock-closed-outline" size={20} color="#71717a" />}
                error={errors.password}
                editable={!loading}
              />
              <TouchableOpacity 
                onPress={() => navigation.navigate('ForgotPassword')}
                className="self-end mt-2"
                disabled={loading}
              >
                <Text className="text-primary text-sm font-semibold">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <Button 
              label={loading ? "Signing In..." : "Sign In"}
              onPress={handleLogin} 
              className="mt-4"
              disabled={loading}
              icon={loading ? <ActivityIndicator size="small" color="white" /> : undefined}
            />
          </View>

          {/* Divider */}
          <View className="flex-row items-center my-8">
            <View className="flex-1 h-[1px] bg-border" />
            <Text className="mx-4 text-muted text-xs uppercase">Or continue with</Text>
            <View className="flex-1 h-[1px] bg-border" />
          </View>

          {/* Social Login */}
          <View className="flex-row space-x-4 mb-8 justify-center gap-4">
            <SocialButton icon="logo-google" onPress={handleGoogleLogin} disabled={loading} />
          </View>

          {/* Footer */}
          <View className="flex-row justify-center">
            <Text className="text-muted">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} disabled={loading}>
              <Text className="text-primary font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const SocialButton = ({ icon, onPress, disabled }: { icon: any; onPress?: () => void; disabled?: boolean }) => (
  <TouchableOpacity 
    className="w-14 h-14 bg-surface rounded-xl border border-border items-center justify-center active:bg-border"
    onPress={onPress}
    disabled={disabled}
    style={{ opacity: disabled ? 0.5 : 1 }}
  >
    <Ionicons name={icon} size={24} color="white" />
  </TouchableOpacity>
);