/**
 * Inbox Screen
 * 
 * Displays friends list, friend requests, and user search
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useInbox } from '../../context/InboxContext';
import { Friend, FriendRequest } from '../../services/inbox.service';
import { User } from '../../services/auth.service';

type TabType = 'friends' | 'requests' | 'search';

export function InboxScreen() {
  const {
    friends,
    pendingRequests,
    sentRequests,
    searchResults,
    isLoading,
    loadFriendsAndRequests,
    searchUsers,
    sendFriendRequest,
    acceptRequest,
    rejectRequest,
    cancelRequest,
    clearSearchResults,
  } = useInbox();

  const [activeTab, setActiveTab] = useState<TabType>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === 'search' && searchQuery.length >= 2) {
        searchUsers(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, activeTab, searchUsers]);

  // Clear search when leaving search tab
  useEffect(() => {
    if (activeTab !== 'search') {
      setSearchQuery('');
      clearSearchResults();
    }
  }, [activeTab, clearSearchResults]);

  const handleSendRequest = async (userId: string) => {
    const result = await sendFriendRequest(userId);
    if (result.success) {
      Alert.alert('Success', result.message || 'Friend request sent!');
    } else {
      Alert.alert('Error', result.message || 'Failed to send request');
    }
  };

  const handleAcceptRequest = async (userId: string) => {
    const result = await acceptRequest(userId);
    if (result.success) {
      Alert.alert('Success', 'Friend request accepted!');
    } else {
      Alert.alert('Error', result.message || 'Failed to accept request');
    }
  };

  const handleRejectRequest = async (userId: string) => {
    const result = await rejectRequest(userId);
    if (!result.success) {
      Alert.alert('Error', result.message || 'Failed to reject request');
    }
  };

  const handleCancelRequest = async (userId: string) => {
    const result = await cancelRequest(userId);
    if (!result.success) {
      Alert.alert('Error', result.message || 'Failed to cancel request');
    }
  };

  const openProfile = (user: User) => {
    setSelectedUser(user);
    setShowProfileModal(true);
  };

  const renderFriendItem = ({ item }: { item: Friend }) => (
    <TouchableOpacity
      className="flex-row items-center p-4 border-b border-gray-800"
      onPress={() => openProfile(item.user)}
    >
      {item.user.avatarURL ? (
        <Image
          source={{ uri: item.user.avatarURL }}
          className="w-12 h-12 rounded-full"
        />
      ) : (
        <View className="w-12 h-12 rounded-full bg-blue-600 items-center justify-center">
          <Text className="text-white text-lg font-bold">
            {item.user.name?.charAt(0).toUpperCase() || '?'}
          </Text>
        </View>
      )}
      <View className="flex-1 ml-3">
        <Text className="text-white font-semibold">{item.user.name}</Text>
        <Text className="text-gray-400 text-sm">{item.user.email}</Text>
      </View>
      <TouchableOpacity className="p-2">
        <Ionicons name="chatbubble-outline" size={22} color="#60A5FA" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderRequestItem = ({ item, type }: { item: FriendRequest; type: 'incoming' | 'outgoing' }) => (
    <View className="flex-row items-center p-4 border-b border-gray-800">
      {item.user.avatarURL ? (
        <Image
          source={{ uri: item.user.avatarURL }}
          className="w-12 h-12 rounded-full"
        />
      ) : (
        <View className="w-12 h-12 rounded-full bg-purple-600 items-center justify-center">
          <Text className="text-white text-lg font-bold">
            {item.user.name?.charAt(0).toUpperCase() || '?'}
          </Text>
        </View>
      )}
      <View className="flex-1 ml-3">
        <Text className="text-white font-semibold">{item.user.name}</Text>
        <Text className="text-gray-400 text-sm">
          {type === 'incoming' ? 'Wants to be your friend' : 'Request sent'}
        </Text>
      </View>
      {type === 'incoming' ? (
        <View className="flex-row gap-2">
          <TouchableOpacity
            className="bg-green-600 px-3 py-2 rounded-lg"
            onPress={() => handleAcceptRequest(item.user._id)}
          >
            <Text className="text-white font-medium">Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-600 px-3 py-2 rounded-lg"
            onPress={() => handleRejectRequest(item.user._id)}
          >
            <Text className="text-white font-medium">Reject</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          className="bg-gray-700 px-3 py-2 rounded-lg"
          onPress={() => handleCancelRequest(item.user._id)}
        >
          <Text className="text-white font-medium">Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderSearchResult = ({ item }: { item: User }) => {
    // Check if already friend or has pending request
    const isFriend = friends.some(f => f.user._id === item._id);
    const hasSentRequest = sentRequests.some(r => r.user._id === item._id);
    const hasReceivedRequest = pendingRequests.some(r => r.user._id === item._id);

    return (
      <View className="flex-row items-center p-4 border-b border-gray-800">
        {item.avatarURL ? (
          <Image
            source={{ uri: item.avatarURL }}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <View className="w-12 h-12 rounded-full bg-gray-600 items-center justify-center">
            <Text className="text-white text-lg font-bold">
              {item.name?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
        )}
        <View className="flex-1 ml-3">
          <Text className="text-white font-semibold">{item.name}</Text>
          <Text className="text-gray-400 text-sm capitalize">{item.role || 'User'}</Text>
        </View>
        {isFriend ? (
          <View className="bg-green-800 px-3 py-2 rounded-lg">
            <Text className="text-green-300 font-medium">Friends</Text>
          </View>
        ) : hasSentRequest ? (
          <View className="bg-yellow-800 px-3 py-2 rounded-lg">
            <Text className="text-yellow-300 font-medium">Pending</Text>
          </View>
        ) : hasReceivedRequest ? (
          <TouchableOpacity
            className="bg-green-600 px-3 py-2 rounded-lg"
            onPress={() => handleAcceptRequest(item._id)}
          >
            <Text className="text-white font-medium">Accept</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-blue-600 px-3 py-2 rounded-lg"
            onPress={() => handleSendRequest(item._id)}
          >
            <Text className="text-white font-medium">Add</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#60A5FA" />
        </View>
      );
    }

    switch (activeTab) {
      case 'friends':
        return friends.length > 0 ? (
          <FlatList
            data={friends}
            keyExtractor={(item) => item._id}
            renderItem={renderFriendItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        ) : (
          <View className="flex-1 items-center justify-center p-8">
            <Ionicons name="people-outline" size={64} color="#4B5563" />
            <Text className="text-gray-400 text-lg mt-4 text-center">
              No friends yet
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Search for users to add them as friends
            </Text>
          </View>
        );

      case 'requests':
        const allRequests = [
          ...pendingRequests.map(r => ({ ...r, type: 'incoming' as const })),
          ...sentRequests.map(r => ({ ...r, type: 'outgoing' as const })),
        ];
        
        return allRequests.length > 0 ? (
          <FlatList
            data={allRequests}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => renderRequestItem({ item, type: item.type })}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        ) : (
          <View className="flex-1 items-center justify-center p-8">
            <Ionicons name="mail-outline" size={64} color="#4B5563" />
            <Text className="text-gray-400 text-lg mt-4 text-center">
              No pending requests
            </Text>
          </View>
        );

      case 'search':
        return (
          <View className="flex-1">
            {searchQuery.length < 2 ? (
              <View className="flex-1 items-center justify-center p-8">
                <Ionicons name="search-outline" size={64} color="#4B5563" />
                <Text className="text-gray-400 text-lg mt-4 text-center">
                  Type at least 2 characters to search
                </Text>
              </View>
            ) : searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item._id}
                renderItem={renderSearchResult}
                contentContainerStyle={{ paddingBottom: 100 }}
              />
            ) : (
              <View className="flex-1 items-center justify-center p-8">
                <Ionicons name="person-outline" size={64} color="#4B5563" />
                <Text className="text-gray-400 text-lg mt-4 text-center">
                  No users found
                </Text>
              </View>
            )}
          </View>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900" edges={['top']}>
      {/* Header */}
      <View className="px-4 py-3 border-b border-gray-800">
        <Text className="text-white text-xl font-bold">Inbox</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-gray-800">
        <TouchableOpacity
          className={`flex-1 py-3 items-center ${activeTab === 'friends' ? 'border-b-2 border-blue-500' : ''}`}
          onPress={() => setActiveTab('friends')}
        >
          <Text className={`font-medium ${activeTab === 'friends' ? 'text-blue-500' : 'text-gray-400'}`}>
            Friends ({friends.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 items-center ${activeTab === 'requests' ? 'border-b-2 border-blue-500' : ''}`}
          onPress={() => setActiveTab('requests')}
        >
          <View className="flex-row items-center">
            <Text className={`font-medium ${activeTab === 'requests' ? 'text-blue-500' : 'text-gray-400'}`}>
              Requests
            </Text>
            {pendingRequests.length > 0 && (
              <View className="ml-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">{pendingRequests.length}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 items-center ${activeTab === 'search' ? 'border-b-2 border-blue-500' : ''}`}
          onPress={() => setActiveTab('search')}
        >
          <Text className={`font-medium ${activeTab === 'search' ? 'text-blue-500' : 'text-gray-400'}`}>
            Search
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Input (only for search tab) */}
      {activeTab === 'search' && (
        <View className="px-4 py-3 border-b border-gray-800">
          <View className="flex-row items-center bg-gray-800 rounded-lg px-3">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 text-white py-3 ml-2"
              placeholder="Search by name or email..."
              placeholderTextColor="#6B7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Content */}
      {renderTabContent()}

      {/* Profile Modal */}
      <Modal
        visible={showProfileModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowProfileModal(false)}
      >
        <View className="flex-1 bg-black/70 items-center justify-center p-6">
          <View className="bg-gray-800 rounded-2xl w-full max-w-sm p-6">
            {selectedUser && (
              <>
                <View className="items-center">
                  {selectedUser.avatarURL ? (
                    <Image
                      source={{ uri: selectedUser.avatarURL }}
                      className="w-24 h-24 rounded-full"
                    />
                  ) : (
                    <View className="w-24 h-24 rounded-full bg-blue-600 items-center justify-center">
                      <Text className="text-white text-3xl font-bold">
                        {selectedUser.name?.charAt(0).toUpperCase() || '?'}
                      </Text>
                    </View>
                  )}
                  <Text className="text-white text-xl font-bold mt-4">
                    {selectedUser.name}
                  </Text>
                  <Text className="text-gray-400 mt-1">{selectedUser.email}</Text>
                  <View className="bg-blue-900/50 px-3 py-1 rounded-full mt-2">
                    <Text className="text-blue-300 capitalize">
                      {selectedUser.role || 'User'}
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity
                  className="bg-gray-700 mt-6 py-3 rounded-lg items-center"
                  onPress={() => setShowProfileModal(false)}
                >
                  <Text className="text-white font-medium">Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default InboxScreen;
