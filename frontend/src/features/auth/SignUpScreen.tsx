import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function SignUpScreen({ navigation }: any) {
  const [role, setRole] = useState<'STUDENT' | 'FACULTY' | 'ALUMNI'>('STUDENT');

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-2 border-b border-border">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text className="text-3xl font-bold text-white mb-2">Create Account</Text>
        <Text className="text-muted mb-8">Join the campus network today.</Text>

        {/* Role Selector Tabs */}
        <View className="flex-row bg-surface p-1 rounded-xl mb-6 border border-border">
          {['STUDENT', 'FACULTY', 'ALUMNI'].map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setRole(r as any)}
              className={`flex-1 py-2 rounded-lg items-center ${
                role === r ? 'bg-primary' : 'bg-transparent'
              }`}
            >
              <Text className={`text-xs font-bold ${role === r ? 'text-white' : 'text-muted'}`}>
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="space-y-4">
          <Input 
            label="Full Name" 
            placeholder="John Doe" 
            icon={<Ionicons name="person-outline" size={20} color="#71717a" />}
          />
          <Input 
            label="College Email" 
            placeholder={role === 'ALUMNI' ? "personal@gmail.com" : "id@college.edu"}
            keyboardType="email-address"
            icon={<Ionicons name="mail-outline" size={20} color="#71717a" />}
          />
          <Input 
            label="Password" 
            placeholder="Create a strong password" 
            secureTextEntry 
            icon={<Ionicons name="lock-closed-outline" size={20} color="#71717a" />}
          />
          
          {role === 'ALUMNI' && (
             <Input label="Graduation Year" placeholder="2023" keyboardType="numeric" />
          )}
          
          <Button 
            label="Create Account" 
            className="mt-6"
            onPress={() => navigation.navigate('OtpVerification', { email: 'test@college.edu' })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}