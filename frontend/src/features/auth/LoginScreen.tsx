import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulation
    setTimeout(() => {
      setIsLoading(false);
      // Mock Role Logic for Demo
      if (email.includes('faculty')) login('FACULTY');
      else if (email.includes('admin')) login('ADMIN');
      else if (email.includes('alum')) login('ALUMNI');
      else login('STUDENT');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>
          
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
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              icon={<Ionicons name="mail-outline" size={20} color="#71717a" />}
            />
            
            <View>
              <Input 
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                icon={<Ionicons name="lock-closed-outline" size={20} color="#71717a" />}
              />
              <TouchableOpacity 
                onPress={() => navigation.navigate('ForgotPassword')}
                className="self-end mt-2"
              >
                <Text className="text-primary text-sm font-semibold">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <Button 
              label="Sign In" 
              onPress={handleLogin} 
              className="mt-4"
              disabled={isLoading}
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
            <SocialButton icon="logo-google" />
            <SocialButton icon="logo-apple" />
            <SocialButton icon="logo-microsoft" />
          </View>

          {/* Footer */}
          <View className="flex-row justify-center">
            <Text className="text-muted">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text className="text-primary font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const SocialButton = ({ icon }: { icon: any }) => (
  <TouchableOpacity className="w-14 h-14 bg-surface rounded-xl border border-border items-center justify-center active:bg-border">
    <Ionicons name={icon} size={24} color="white" />
  </TouchableOpacity>
);