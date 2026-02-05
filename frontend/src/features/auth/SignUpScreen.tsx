import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

type RoleType = 'student' | 'faculty' | 'alumni';

export default function SignUpScreen({ navigation }: any) {
  const { register, isLoading: authLoading } = useAuth();
  const [role, setRole] = useState<RoleType>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    } else if (role !== 'alumni' && !email.includes('@josephscollege.ac.in')) {
      newErrors.email = 'Please use your college email';
    }
    
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

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const result = await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
      });
      
      if (result.success) {
        // Registration successful - AuthContext will handle navigation
        // Or navigate to OTP verification if required
        navigation.navigate('OtpVerification', { 
          email: email.trim().toLowerCase(),
          mode: 'signup'
        });
      } else {
        Alert.alert('Registration Failed', result.message || 'Please try again');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const loading = isLoading || authLoading;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-2 border-b border-border">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2" disabled={loading}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-3xl font-bold text-white mb-2">Create Account</Text>
        <Text className="text-muted mb-8">Join the campus network today.</Text>

        {/* Role Selector Tabs */}
        <View className="flex-row bg-surface p-1 rounded-xl mb-6 border border-border">
          {(['student', 'faculty', 'alumni'] as RoleType[]).map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setRole(r)}
              disabled={loading}
              className={`flex-1 py-2 rounded-lg items-center ${
                role === r ? 'bg-primary' : 'bg-transparent'
              }`}
            >
              <Text className={`text-xs font-bold uppercase ${role === r ? 'text-white' : 'text-muted'}`}>
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="space-y-4">
          <Input 
            label="Full Name" 
            placeholder="John Doe"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
            }}
            icon={<Ionicons name="person-outline" size={20} color="#71717a" />}
            error={errors.name}
            editable={!loading}
          />
          
          <Input 
            label="College Email" 
            placeholder={role === 'alumni' ? "personal@gmail.com" : "rollno@josephscollege.ac.in"}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            icon={<Ionicons name="mail-outline" size={20} color="#71717a" />}
            error={errors.email}
            editable={!loading}
          />
          
          <Input 
            label="Password" 
            placeholder="Create a strong password"
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
            placeholder="Confirm your password"
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
          
          <Button 
            label={loading ? "Creating Account..." : "Create Account"}
            className="mt-6"
            onPress={handleSignUp}
            disabled={loading}
            icon={loading ? <ActivityIndicator size="small" color="white" /> : undefined}
          />
        </View>

        {/* Terms */}
        <Text className="text-muted text-center text-xs mt-6">
          By creating an account, you agree to our{' '}
          <Text className="text-primary">Terms of Service</Text> and{' '}
          <Text className="text-primary">Privacy Policy</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}