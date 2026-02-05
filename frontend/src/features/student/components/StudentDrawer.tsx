import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { cn } from '../../../lib/utils';
import { useAuth } from '../../../context/AuthContext';

// --- Configuration ---
const SERVERS = [
  { id: 'class', name: 'CS Dept', icon: 'school', color: 'bg-indigo-500' },
  { id: 'alumni', name: 'Alumni', icon: 'people', color: 'bg-emerald-500' },
  { id: 'club', name: 'Coding Club', icon: 'code-slash', color: 'bg-rose-500' },
];

const CHANNELS: Record<string, string[]> = {
  class: ['announcements', 'general', 'assignments', 'resources'],
  alumni: ['events', 'jobs', 'mentorship'],
  club: ['hackathons', 'projects', 'general'],
};

// Direct messages mock data
const DM_FRIENDS = [
  { id: 'f1', name: 'Alice Johnson', status: 'online', lastMessage: 'Thanks for the notes!' },
  { id: 'f2', name: 'Bob Smith', status: 'offline', lastMessage: 'See you tomorrow' },
  { id: 'f3', name: 'Carol Williams', status: 'online', lastMessage: 'Working on the project' },
];

type TabType = 'servers' | 'dms';

export default function StudentDrawer(props: any) {
  const { user, logout } = useAuth();
  const [activeServer, setActiveServer] = useState('class');
  const [activeTab, setActiveTab] = useState<TabType>('servers');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  
  // Navigation Helper
  const nav = (screen: string, params?: any) => {
    props.navigation.navigate(screen, params);
    props.navigation.closeDrawer();
  };

  const handleJoinServer = async () => {
    if (!inviteCode.trim()) {
      Alert.alert('Error', 'Please enter an invite code');
      return;
    }
    
    setIsJoining(true);
    // Simulate API call
    setTimeout(() => {
      setIsJoining(false);
      setShowJoinModal(false);
      setInviteCode('');
      Alert.alert('Success', 'You have joined the server!');
    }, 1500);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <View className="flex-1 bg-background flex-row">
      
      {/* 1. LEFT STRIP: SERVERS + TABS */}
      <SafeAreaView className="w-[72px] bg-surface items-center border-r border-border py-3" edges={['top']}>
        {/* Tab Switcher */}
        <View className="flex-row mb-4 p-1 bg-background rounded-lg">
          <TouchableOpacity 
            onPress={() => setActiveTab('servers')}
            className={cn(
              "p-2 rounded-md",
              activeTab === 'servers' && "bg-primary"
            )}
          >
            <Ionicons 
              name="server-outline" 
              size={16} 
              color={activeTab === 'servers' ? 'white' : '#71717a'} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('dms')}
            className={cn(
              "p-2 rounded-md",
              activeTab === 'dms' && "bg-primary"
            )}
          >
            <Ionicons 
              name="chatbubbles-outline" 
              size={16} 
              color={activeTab === 'dms' ? 'white' : '#71717a'} 
            />
          </TouchableOpacity>
        </View>

        <View className="h-px w-10 bg-border mb-3" />

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {activeTab === 'servers' ? (
            // Server list
            <>
              {SERVERS.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  onPress={() => setActiveServer(s.id)}
                  className="mb-3 items-center w-full relative"
                >
                  {activeServer === s.id && (
                    <View className="absolute left-0 top-3 w-1 h-6 bg-white rounded-r-full" />
                  )}
                  <View 
                    className={cn(
                      "w-12 h-12 items-center justify-center transition-all",
                      activeServer === s.id 
                        ? `${s.color} rounded-xl` 
                        : "bg-slate-800 rounded-[24px]"
                    )}
                  >
                    <Ionicons name={s.icon as any} size={24} color="white" />
                  </View>
                </TouchableOpacity>
              ))}
              
              {/* Add Server Button */}
              <TouchableOpacity
                onPress={() => setShowJoinModal(true)}
                className="mb-3 items-center w-full"
              >
                <View className="w-12 h-12 bg-surface border border-dashed border-border rounded-[24px] items-center justify-center">
                  <Ionicons name="add" size={24} color="#71717a" />
                </View>
              </TouchableOpacity>
            </>
          ) : (
            // DM list avatars
            <>
              {DM_FRIENDS.map((friend) => (
                <TouchableOpacity
                  key={friend.id}
                  onPress={() => nav('Chat', { channel: friend.name, isDM: true })}
                  className="mb-3 items-center w-full relative"
                >
                  <View className="w-12 h-12 bg-secondary rounded-full items-center justify-center">
                    <Text className="text-white font-bold text-sm">
                      {getInitials(friend.name)}
                    </Text>
                  </View>
                  {friend.status === 'online' && (
                    <View className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-surface" />
                  )}
                </TouchableOpacity>
              ))}
              
              {/* Find Friends Button */}
              <TouchableOpacity className="mb-3 items-center w-full">
                <View className="w-12 h-12 bg-surface border border-dashed border-border rounded-full items-center justify-center">
                  <Ionicons name="person-add-outline" size={20} color="#71717a" />
                </View>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>

        {/* User Avatar */}
        <TouchableOpacity 
          onPress={() => nav('Profile')}
          className="mt-2"
        >
          <View className="w-10 h-10 bg-primary rounded-full items-center justify-center">
            <Text className="text-white font-bold text-sm">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      {/* 2. RIGHT PANEL: CHANNELS / DMs & DOCK */}
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        {/* Header */}
        <View className="h-12 px-4 border-b border-border flex-row items-center justify-between">
          <Text className="text-white font-bold text-base">
            {activeTab === 'servers' 
              ? SERVERS.find(s => s.id === activeServer)?.name 
              : 'Direct Messages'
            }
          </Text>
          {activeTab === 'servers' && (
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={20} color="#71717a" />
            </TouchableOpacity>
          )}
        </View>

        {/* Content */}
        <ScrollView className="flex-1 pt-4 px-2">
          {activeTab === 'servers' ? (
            <>
              <Text className="text-xs font-bold text-muted px-2 mb-2 uppercase tracking-widest">
                Text Channels
              </Text>
              {CHANNELS[activeServer]?.map((channel) => (
                <TouchableOpacity 
                  key={channel}
                  className="flex-row items-center px-2 py-2 mb-1 rounded-md active:bg-surface"
                  onPress={() => nav('Chat', { channel })}
                >
                  <MaterialCommunityIcons name="pound" size={20} color="#71717a" />
                  <Text className="text-slate-300 ml-3 font-medium text-base">{channel}</Text>
                </TouchableOpacity>
              ))}
              
              {/* Add Channel */}
              <TouchableOpacity className="flex-row items-center px-2 py-2 mb-1 rounded-md">
                <Ionicons name="add-circle-outline" size={20} color="#6366f1" />
                <Text className="text-primary ml-3 font-medium text-sm">Add Channel</Text>
              </TouchableOpacity>
            </>
          ) : (
            // DM List
            <>
              <Text className="text-xs font-bold text-muted px-2 mb-2 uppercase tracking-widest">
                Friends
              </Text>
              {DM_FRIENDS.map((friend) => (
                <TouchableOpacity 
                  key={friend.id}
                  className="flex-row items-center px-2 py-3 mb-1 rounded-md active:bg-surface"
                  onPress={() => nav('Chat', { channel: friend.name, isDM: true })}
                >
                  <View className="relative">
                    <View className="w-9 h-9 bg-secondary rounded-full items-center justify-center">
                      <Text className="text-white font-bold text-xs">
                        {getInitials(friend.name)}
                      </Text>
                    </View>
                    <View 
                      className={cn(
                        "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background",
                        friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                      )}
                    />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-white font-medium">{friend.name}</Text>
                    <Text className="text-muted text-xs" numberOfLines={1}>
                      {friend.lastMessage}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>

        {/* 3. BOTTOM DOCK */}
        <View className="bg-surface/90 border-t border-border pb-6 pt-2 flex-row justify-around items-center">
          <NavIcon icon="library" label="Materials" onPress={() => nav('Materials')} />
          <NavIcon icon="calendar" label="Attendance" onPress={() => nav('Attendance')} />
          
          {/* AI Button (Floating) */}
          <View className="relative -top-5">
            <TouchableOpacity 
              onPress={() => nav('Josephine')}
              className="w-14 h-14 bg-secondary rounded-full items-center justify-center border-4 border-surface shadow-lg active:scale-95"
            >
              <MaterialCommunityIcons name="robot" size={26} color="white" />
            </TouchableOpacity>
          </View>

          <NavIcon icon="notifications" label="Inbox" badge={3} />
          <NavIcon icon="person" label="Profile" onPress={() => nav('Profile')} />
        </View>
      </SafeAreaView>

      {/* Join Server Modal */}
      <Modal
        visible={showJoinModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowJoinModal(false)}
      >
        <View className="flex-1 bg-black/70 justify-center items-center px-6">
          <View className="bg-surface w-full rounded-2xl p-6 border border-border">
            <Text className="text-white text-xl font-bold mb-2">Join a Server</Text>
            <Text className="text-muted mb-4">
              Enter an invite code to join an existing server
            </Text>
            
            <TextInput
              className="bg-background border border-border rounded-xl px-4 py-3 text-white mb-4"
              placeholder="Enter invite code"
              placeholderTextColor="#71717a"
              value={inviteCode}
              onChangeText={setInviteCode}
              autoCapitalize="none"
            />
            
            <View className="flex-row space-x-3">
              <TouchableOpacity 
                className="flex-1 bg-background border border-border rounded-xl py-3"
                onPress={() => setShowJoinModal(false)}
                disabled={isJoining}
              >
                <Text className="text-white text-center font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-1 bg-primary rounded-xl py-3 flex-row items-center justify-center"
                onPress={handleJoinServer}
                disabled={isJoining}
              >
                {isJoining ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text className="text-white text-center font-bold">Join</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const NavIcon = ({ 
  icon, 
  label, 
  onPress, 
  badge 
}: { 
  icon: any; 
  label: string; 
  onPress?: () => void;
  badge?: number;
}) => (
  <TouchableOpacity className="items-center p-2 relative" onPress={onPress}>
    <Ionicons name={icon} size={22} color="#a1a1aa" />
    <Text className="text-[10px] text-muted mt-1 font-medium">{label}</Text>
    {badge && badge > 0 && (
      <View className="absolute -top-1 -right-1 bg-danger w-5 h-5 rounded-full items-center justify-center">
        <Text className="text-white text-xs font-bold">{badge}</Text>
      </View>
    )}
  </TouchableOpacity>
);