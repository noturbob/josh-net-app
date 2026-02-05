import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';

// Message type
interface Message {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatarURL?: string;
  };
  timestamp: string;
  attachments?: any[];
  replyTo?: Message;
  isEdited?: boolean;
}

// Mock messages for demo
const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hey everyone! Welcome to the new semester 🎉',
    author: { id: 'u1', name: 'Prof. Smith' },
    timestamp: '10:00 AM',
  },
  {
    id: '2',
    content: 'Does anyone have the notes for yesterday\'s Data Structures lecture?',
    author: { id: 'u2', name: 'John Doe' },
    timestamp: '10:15 AM',
  },
  {
    id: '3',
    content: 'I have them! Let me upload to the materials section.',
    author: { id: 'u3', name: 'Jane Smith' },
    timestamp: '10:18 AM',
  },
  {
    id: '4',
    content: 'Thanks Jane! You\'re a lifesaver 🙏',
    author: { id: 'u2', name: 'John Doe' },
    timestamp: '10:20 AM',
  },
  {
    id: '5',
    content: 'Reminder: Assignment 2 is due next Monday. Please submit on time.',
    author: { id: 'u1', name: 'Prof. Smith' },
    timestamp: '11:30 AM',
  },
];

export default function StudentDashboard({ navigation, route }: any) {
  const { user } = useAuth();
  const channelName = route.params?.channel || 'general';
  
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  
  const scrollViewRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputText.trim(),
      author: { 
        id: user?._id || 'current',
        name: user?.name || 'You',
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      replyTo: replyingTo || undefined,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setReplyingTo(null);
    
    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderMessage = ({ item: message }: { item: Message }) => {
    const isCurrentUser = message.author.id === (user?._id || 'current');
    
    return (
      <TouchableOpacity 
        className="flex-row items-start mb-4 px-4"
        activeOpacity={0.7}
        onLongPress={() => setReplyingTo(message)}
      >
        {/* Avatar */}
        <View 
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: isCurrentUser ? '#6366f1' : '#14b8a6' }}
        >
          <Text className="text-white font-bold text-sm">
            {getInitials(message.author.name)}
          </Text>
        </View>
        
        {/* Content */}
        <View className="flex-1">
          <View className="flex-row items-baseline">
            <Text className="text-white font-bold mr-2">{message.author.name}</Text>
            <Text className="text-muted text-xs">{message.timestamp}</Text>
            {message.isEdited && (
              <Text className="text-muted text-xs ml-2">(edited)</Text>
            )}
          </View>
          
          {/* Reply indicator */}
          {message.replyTo && (
            <View className="flex-row items-center mt-1 mb-1 pl-2 border-l-2 border-primary">
              <Text className="text-muted text-xs">
                Replying to <Text className="text-primary">{message.replyTo.author.name}</Text>
              </Text>
            </View>
          )}
          
          <Text className="text-slate-300 mt-1 leading-5">{message.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="h-14 border-b border-border flex-row items-center px-4 justify-between bg-surface/50">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.openDrawer()} className="mr-3">
            <Ionicons name="menu" size={26} color="#e4e4e7" />
          </TouchableOpacity>
          <MaterialCommunityIcons name="pound" size={22} color="#71717a" />
          <Text className="text-white font-bold text-lg ml-1">{channelName}</Text>
        </View>
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity>
            <Ionicons name="people-outline" size={22} color="#a1a1aa" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={22} color="#a1a1aa" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={scrollViewRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className="items-center py-8 px-4 mb-4">
              <View className="w-16 h-16 bg-primary/20 rounded-full items-center justify-center mb-4">
                <MaterialCommunityIcons name="pound" size={32} color="#6366f1" />
              </View>
              <Text className="text-white text-xl font-bold">Welcome to #{channelName}</Text>
              <Text className="text-muted text-center mt-2">
                This is the start of the #{channelName} channel. Say hello!
              </Text>
            </View>
          }
        />

        {/* Reply indicator */}
        {replyingTo && (
          <View className="flex-row items-center px-4 py-2 bg-surface border-t border-border">
            <Ionicons name="arrow-undo" size={16} color="#6366f1" />
            <Text className="text-muted text-sm ml-2 flex-1">
              Replying to <Text className="text-primary">{replyingTo.author.name}</Text>
            </Text>
            <TouchableOpacity onPress={() => setReplyingTo(null)}>
              <Ionicons name="close" size={20} color="#71717a" />
            </TouchableOpacity>
          </View>
        )}

        {/* Input Bar */}
        <View className="p-3 bg-surface border-t border-border">
          <View className="bg-background rounded-2xl flex-row items-center px-3 border border-border">
            <TouchableOpacity className="p-2">
              <Ionicons name="add" size={24} color="#71717a" />
            </TouchableOpacity>
            
            <TextInput
              ref={inputRef}
              className="flex-1 text-white py-3 px-2 text-base"
              placeholder={`Message #${channelName}`}
              placeholderTextColor="#71717a"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={2000}
            />
            
            <TouchableOpacity className="p-2 mr-1">
              <Ionicons name="happy-outline" size={22} color="#71717a" />
            </TouchableOpacity>
            
            {inputText.trim() ? (
              <TouchableOpacity 
                className="bg-primary w-9 h-9 rounded-full items-center justify-center"
                onPress={handleSendMessage}
              >
                <Ionicons name="send" size={16} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="p-2">
                <Ionicons name="mic-outline" size={22} color="#71717a" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}