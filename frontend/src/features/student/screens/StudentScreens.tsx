/**
 * Student Feature Screens
 * 
 * These are the main feature screens for students:
 * - Materials: File browsing and management
 * - Attendance: View attendance records
 * - Josephine: AI chatbot interface
 * - Profile: User profile management
 */

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';

// ============================================================================
// MATERIALS SCREEN
// ============================================================================
export function MaterialsScreen({ navigation }: any) {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="h-16 border-b border-border flex-row items-center px-4 justify-between bg-surface/50">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.openDrawer()} className="mr-4">
            <Ionicons name="menu" size={28} color="#e4e4e7" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-lg">Materials</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="cloud-upload-outline" size={24} color="#6366f1" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Quick Access */}
        <Text className="text-muted text-xs uppercase tracking-widest mb-3 font-bold">
          Quick Access
        </Text>
        <View className="flex-row flex-wrap gap-3 mb-6">
          <QuickAccessCard icon="folder-outline" title="My Files" color="#6366f1" />
          <QuickAccessCard icon="star-outline" title="Starred" color="#f59e0b" />
          <QuickAccessCard icon="time-outline" title="Recent" color="#14b8a6" />
          <QuickAccessCard icon="share-outline" title="Shared" color="#f43f5e" />
        </View>

        {/* Course Materials */}
        <Text className="text-muted text-xs uppercase tracking-widest mb-3 font-bold">
          Course Materials - {user?.academic?.currentSemester || 'Semester V'}
        </Text>
        <View className="space-y-3">
          <MaterialFolder name="Data Structures" files={12} />
          <MaterialFolder name="Database Management" files={8} />
          <MaterialFolder name="Computer Networks" files={15} />
          <MaterialFolder name="Software Engineering" files={6} />
          <MaterialFolder name="Web Technologies" files={10} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const QuickAccessCard = ({ icon, title, color }: { icon: any; title: string; color: string }) => (
  <TouchableOpacity 
    className="bg-surface border border-border rounded-xl p-4 items-center w-[48%]"
    activeOpacity={0.7}
  >
    <View 
      className="w-12 h-12 rounded-xl items-center justify-center mb-2"
      style={{ backgroundColor: color + '20' }}
    >
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <Text className="text-white font-semibold">{title}</Text>
  </TouchableOpacity>
);

const MaterialFolder = ({ name, files }: { name: string; files: number }) => (
  <TouchableOpacity 
    className="bg-surface border border-border rounded-xl p-4 flex-row items-center"
    activeOpacity={0.7}
  >
    <View className="w-12 h-12 bg-primary/20 rounded-xl items-center justify-center mr-4">
      <Ionicons name="folder" size={24} color="#6366f1" />
    </View>
    <View className="flex-1">
      <Text className="text-white font-semibold">{name}</Text>
      <Text className="text-muted text-sm">{files} files</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#71717a" />
  </TouchableOpacity>
);

// ============================================================================
// ATTENDANCE SCREEN
// ============================================================================
export function AttendanceScreen({ navigation }: any) {
  const { user } = useAuth();
  
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="h-16 border-b border-border flex-row items-center px-4 justify-between bg-surface/50">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.openDrawer()} className="mr-4">
            <Ionicons name="menu" size={28} color="#e4e4e7" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-lg">Attendance</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="calendar-outline" size={24} color="#a1a1aa" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Overall Stats */}
        <View className="bg-surface border border-border rounded-2xl p-4 mb-6">
          <Text className="text-muted text-xs uppercase tracking-widest mb-3">Overall Attendance</Text>
          <View className="flex-row items-center justify-between">
            <View className="items-center flex-1">
              <Text className="text-4xl font-bold text-secondary">78%</Text>
              <Text className="text-muted text-sm">Current</Text>
            </View>
            <View className="w-px h-12 bg-border" />
            <View className="items-center flex-1">
              <Text className="text-4xl font-bold text-white">75%</Text>
              <Text className="text-muted text-sm">Required</Text>
            </View>
            <View className="w-px h-12 bg-border" />
            <View className="items-center flex-1">
              <Text className="text-4xl font-bold text-accent">156</Text>
              <Text className="text-muted text-sm">Classes</Text>
            </View>
          </View>
        </View>

        {/* Subject-wise Attendance */}
        <Text className="text-muted text-xs uppercase tracking-widest mb-3 font-bold">
          Subject-wise Attendance
        </Text>
        <View className="space-y-3">
          <AttendanceCard subject="Data Structures" percentage={85} status="safe" />
          <AttendanceCard subject="Database Management" percentage={78} status="safe" />
          <AttendanceCard subject="Computer Networks" percentage={72} status="warning" />
          <AttendanceCard subject="Software Engineering" percentage={68} status="danger" />
          <AttendanceCard subject="Web Technologies" percentage={82} status="safe" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const AttendanceCard = ({ 
  subject, 
  percentage, 
  status 
}: { 
  subject: string; 
  percentage: number;
  status: 'safe' | 'warning' | 'danger';
}) => {
  const statusColors = {
    safe: '#14b8a6',
    warning: '#f59e0b',
    danger: '#f43f5e',
  };
  
  return (
    <View className="bg-surface border border-border rounded-xl p-4">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-white font-semibold flex-1">{subject}</Text>
        <Text 
          className="font-bold text-lg"
          style={{ color: statusColors[status] }}
        >
          {percentage}%
        </Text>
      </View>
      <View className="h-2 bg-surface rounded-full overflow-hidden">
        <View 
          className="h-full rounded-full"
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: statusColors[status] 
          }} 
        />
      </View>
    </View>
  );
};

// ============================================================================
// JOSEPHINE AI SCREEN
// ============================================================================
export function JosephineScreen({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="h-16 border-b border-border flex-row items-center px-4 justify-between bg-surface/50">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.openDrawer()} className="mr-4">
            <Ionicons name="menu" size={28} color="#e4e4e7" />
          </TouchableOpacity>
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-secondary rounded-full items-center justify-center mr-2">
              <MaterialCommunityIcons name="robot" size={18} color="white" />
            </View>
            <Text className="text-white font-bold text-lg">Josephine</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={26} color="#14b8a6" />
        </TouchableOpacity>
      </View>

      {/* Chat History / Empty State */}
      <View className="flex-1 p-4 justify-center items-center">
        <View className="w-24 h-24 bg-secondary/20 rounded-full items-center justify-center mb-6 border-2 border-secondary">
          <MaterialCommunityIcons name="robot" size={48} color="#14b8a6" />
        </View>
        <Text className="text-white text-2xl font-bold mb-2">Hello! I'm Josephine</Text>
        <Text className="text-muted text-center px-8 mb-8">
          Your AI study companion. Ask me anything about your courses, assignments, or college life!
        </Text>
        
        {/* Quick Prompts */}
        <View className="space-y-3 w-full">
          <QuickPrompt text="Help me understand Data Structures" />
          <QuickPrompt text="Summarize my notes on DBMS" />
          <QuickPrompt text="Create a study plan for exams" />
        </View>
      </View>

      {/* Input Area */}
      <View className="p-4 border-t border-border bg-surface">
        <View className="flex-row items-center bg-background rounded-full px-4 py-3 border border-border">
          <TouchableOpacity className="mr-3">
            <Ionicons name="attach" size={24} color="#71717a" />
          </TouchableOpacity>
          <Text className="text-muted flex-1">Ask Josephine anything...</Text>
          <TouchableOpacity className="bg-secondary w-10 h-10 rounded-full items-center justify-center">
            <Ionicons name="send" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const QuickPrompt = ({ text }: { text: string }) => (
  <TouchableOpacity 
    className="bg-surface border border-border rounded-xl p-4 flex-row items-center"
    activeOpacity={0.7}
  >
    <Ionicons name="sparkles" size={20} color="#14b8a6" />
    <Text className="text-slate-300 ml-3 flex-1">{text}</Text>
    <Ionicons name="chevron-forward" size={18} color="#71717a" />
  </TouchableOpacity>
);

// ============================================================================
// PROFILE SCREEN
// ============================================================================
export function ProfileScreen({ navigation }: any) {
  const { user, logout, isLoading } = useAuth();
  
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="h-16 border-b border-border flex-row items-center px-4 justify-between bg-surface/50">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.openDrawer()} className="mr-4">
            <Ionicons name="menu" size={28} color="#e4e4e7" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-lg">Profile</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#a1a1aa" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Profile Card */}
        <View className="bg-surface border border-border rounded-2xl p-6 items-center mb-6">
          <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-4">
            <Text className="text-white text-3xl font-bold">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </Text>
          </View>
          <Text className="text-white text-xl font-bold mb-1">{user?.name || 'User'}</Text>
          <Text className="text-muted mb-2">{user?.email}</Text>
          <View className="flex-row items-center">
            <View className="bg-primary/20 px-3 py-1 rounded-full">
              <Text className="text-primary font-semibold text-sm capitalize">{user?.role || 'Student'}</Text>
            </View>
          </View>
        </View>

        {/* Academic Info */}
        <View className="bg-surface border border-border rounded-2xl p-4 mb-6">
          <Text className="text-muted text-xs uppercase tracking-widest mb-3 font-bold">
            Academic Information
          </Text>
          <ProfileItem icon="school-outline" label="Course" value={user?.academic?.course || 'BBA - IT'} />
          <ProfileItem icon="calendar-outline" label="Semester" value={user?.academic?.currentSemester || 'Semester V'} />
          <ProfileItem icon="layers-outline" label="Batch" value={user?.academic?.year || 'R23'} />
        </View>

        {/* Account Settings */}
        <View className="bg-surface border border-border rounded-2xl p-4 mb-6">
          <Text className="text-muted text-xs uppercase tracking-widest mb-3 font-bold">
            Account
          </Text>
          <ProfileMenuItem icon="key-outline" label="Change Password" />
          <ProfileMenuItem icon="notifications-outline" label="Notifications" />
          <ProfileMenuItem icon="shield-outline" label="Privacy & Security" />
          <ProfileMenuItem icon="help-circle-outline" label="Help & Support" />
        </View>

        {/* Logout */}
        <TouchableOpacity 
          className="bg-danger/20 border border-danger/30 rounded-2xl p-4 flex-row items-center justify-center"
          onPress={logout}
          disabled={isLoading}
        >
          <Ionicons name="log-out-outline" size={20} color="#f43f5e" />
          <Text className="text-danger font-bold ml-2">
            {isLoading ? 'Logging out...' : 'Log Out'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const ProfileItem = ({ icon, label, value }: { icon: any; label: string; value: string }) => (
  <View className="flex-row items-center py-3 border-b border-border last:border-b-0">
    <Ionicons name={icon} size={20} color="#71717a" />
    <Text className="text-muted ml-3 flex-1">{label}</Text>
    <Text className="text-white font-medium">{value}</Text>
  </View>
);

const ProfileMenuItem = ({ icon, label }: { icon: any; label: string }) => (
  <TouchableOpacity className="flex-row items-center py-3 border-b border-border last:border-b-0">
    <Ionicons name={icon} size={20} color="#71717a" />
    <Text className="text-white ml-3 flex-1">{label}</Text>
    <Ionicons name="chevron-forward" size={18} color="#71717a" />
  </TouchableOpacity>
);