import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function StudentDashboard({ navigation, route }: any) {
  const channelName = route.params?.channel || 'general';

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="h-16 border-b border-border flex-row items-center px-4 justify-between bg-surface/50">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.openDrawer()} className="mr-4">
            <Ionicons name="menu" size={28} color="#e4e4e7" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-lg"># {channelName}</Text>
        </View>
        <Ionicons name="search" size={24} color="#a1a1aa" />
      </View>

      {/* Chat Area Placeholder */}
      <View className="flex-1 justify-end p-4">
        <View className="flex-row items-start mb-6">
          <View className="w-10 h-10 bg-primary rounded-full items-center justify-center mr-3">
            <Text className="text-white font-bold">JD</Text>
          </View>
          <View>
            <View className="flex-row items-baseline">
              <Text className="text-white font-bold mr-2">John Doe</Text>
              <Text className="text-muted text-xs">Today at 10:42 AM</Text>
            </View>
            <Text className="text-slate-300 mt-1">
              Does anyone have the notes for the Data Structures lecture?
            </Text>
          </View>
        </View>
        
        {/* Input Bar */}
        <View className="bg-surface p-3 rounded-full flex-row items-center border border-border">
          <TouchableOpacity className="mr-3 bg-muted/20 p-1 rounded-full">
            <Ionicons name="add" size={20} color="#a1a1aa" />
          </TouchableOpacity>
          <Text className="text-muted flex-1">Message #{channelName}</Text>
          <Ionicons name="happy-outline" size={24} color="#a1a1aa" />
        </View>
      </View>
    </SafeAreaView>
  );
}