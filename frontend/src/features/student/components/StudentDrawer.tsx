import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { cn } from '../../../lib/utils';

// --- Configuration ---
const SERVERS = [
  { id: 'class', name: 'CS Dept', icon: 'school', color: 'bg-indigo-500' },
  { id: 'alumni', name: 'Alumni', icon: 'people', color: 'bg-emerald-500' },
  { id: 'club', name: 'Coding Club', icon: 'code-slash', color: 'bg-rose-500' },
];

const CHANNELS = {
  class: ['announcements', 'general', 'assignments', 'resources'],
  alumni: ['events', 'jobs', 'mentorship'],
  club: ['hackathons', 'projects', 'general'],
};

export default function StudentDrawer(props: any) {
  const [activeServer, setActiveServer] = useState('class');
  
  // Navigation Helper
  const nav = (screen: string, params?: any) => {
    props.navigation.navigate(screen, params);
    props.navigation.closeDrawer();
  };

  return (
    <View className="flex-1 bg-background flex-row">
      
      {/* 1. LEFT STRIP: SERVERS */}
      <SafeAreaView className="w-[72px] bg-surface items-center border-r border-border py-4" edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {SERVERS.map((s) => (
            <TouchableOpacity
              key={s.id}
              onPress={() => setActiveServer(s.id)}
              className="mb-3 items-center w-full relative group"
            >
              {activeServer === s.id && (
                <View className="absolute left-0 top-3 w-1 h-6 bg-white rounded-r-full" />
              )}
              <View 
                className={cn(
                  "w-12 h-12 items-center justify-center transition-all duration-200",
                  activeServer === s.id ? `${s.color} rounded-xl` : "bg-surface/50 rounded-[24px] bg-slate-800"
                )}
              >
                <Ionicons name={s.icon as any} size={24} color="white" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

      {/* 2. RIGHT PANEL: CHANNELS & DOCK */}
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        {/* Server Header */}
        <View className="h-12 px-4 border-b border-border justify-center shadow-sm">
          <Text className="text-white font-bold text-base">
            {SERVERS.find(s => s.id === activeServer)?.name}
          </Text>
        </View>

        {/* Channel List */}
        <ScrollView className="flex-1 pt-4 px-2">
          <Text className="text-xs font-bold text-muted px-2 mb-2 uppercase tracking-widest">
            Text Channels
          </Text>
          {CHANNELS[activeServer as keyof typeof CHANNELS].map((channel) => (
            <TouchableOpacity 
              key={channel}
              className="flex-row items-center px-2 py-2 mb-1 rounded-md active:bg-surface"
              onPress={() => nav('Chat', { channel })}
            >
              <MaterialCommunityIcons name="pound" size={20} color="#71717a" />
              <Text className="text-slate-300 ml-3 font-medium text-base">{channel}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 3. BOTTOM DOCK (The "Traffic Light" Navigation) */}
        <View className="bg-surface/90 border-t border-border pb-6 pt-2 flex-row justify-around items-center">
          <NavIcon icon="library" label="Docs" onPress={() => nav('Materials')} />
          <NavIcon icon="calendar" label="Attend" onPress={() => nav('Attendance')} />
          
          {/* AI Button (Floating) */}
          <View className="relative -top-5">
            <TouchableOpacity 
              onPress={() => nav('Josephine')}
              className="w-14 h-14 bg-secondary rounded-full items-center justify-center border-4 border-surface shadow-lg shadow-teal-500/20 active:scale-95"
            >
              <MaterialCommunityIcons name="robot" size={26} color="white" />
            </TouchableOpacity>
          </View>

          <NavIcon icon="person" label="Profile" onPress={() => nav('Profile')} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const NavIcon = ({ icon, label, onPress }: any) => (
  <TouchableOpacity className="items-center p-2" onPress={onPress}>
    <Ionicons name={icon} size={22} color="#a1a1aa" />
    <Text className="text-[10px] text-muted mt-1 font-medium">{label}</Text>
  </TouchableOpacity>
);