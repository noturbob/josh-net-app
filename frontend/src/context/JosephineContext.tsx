/**
 * Josephine Chat Context
 * 
 * Manages AI chat state and conversations with Josephine
 */

import React, { createContext, useState, useContext, useCallback } from 'react';
import { josephineService, Chat, ChatMessage } from '../services/josephine.service';
import { useAuth } from './AuthContext';

interface JosephineState {
  chats: Chat[];
  activeChat: Chat | null;
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
}

interface JosephineContextType extends JosephineState {
  loadChats: () => Promise<void>;
  selectChat: (chatId: string) => Promise<void>;
  sendMessage: (prompt: string, files?: any[]) => Promise<{ success: boolean; message?: string }>;
  createNewChat: () => void;
  deleteChat: (chatId: string) => Promise<{ success: boolean; message?: string }>;
  modifyChat: (chatId: string, details: { changeStar?: boolean; newName?: string; changeAccess?: boolean }) => Promise<{ success: boolean }>;
}

const JosephineContext = createContext<JosephineContextType | undefined>(undefined);

export const JosephineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  const [state, setState] = useState<JosephineState>({
    chats: [],
    activeChat: null,
    isLoading: false,
    isSending: false,
    error: null,
  });

  const loadChats = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await josephineService.listChats();
      
      setState(prev => ({
        ...prev,
        chats: response.chats || [],
        isLoading: false,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to load chats',
      }));
    }
  }, [isAuthenticated]);

  const selectChat = useCallback(async (chatId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response = await josephineService.getChat(chatId);
      
      setState(prev => ({
        ...prev,
        activeChat: response.chat,
        isLoading: false,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to load chat',
      }));
    }
  }, []);

  const sendMessage = useCallback(async (prompt: string, files?: any[]) => {
    try {
      setState(prev => ({ ...prev, isSending: true }));
      
      const response = await josephineService.sendPrompt(
        prompt,
        state.activeChat?._id,
        files
      );
      
      if (response.chat) {
        setState(prev => {
          // Update active chat
          const updatedChat = response.chat;
          
          // Update chats list
          const chatExists = prev.chats.some(c => c._id === updatedChat._id);
          const updatedChats = chatExists
            ? prev.chats.map(c => c._id === updatedChat._id ? updatedChat : c)
            : [updatedChat, ...prev.chats];
          
          return {
            ...prev,
            activeChat: updatedChat,
            chats: updatedChats,
            isSending: false,
          };
        });
        
        return { success: true };
      }
      
      setState(prev => ({ ...prev, isSending: false }));
      return { success: false, message: 'Failed to send message' };
    } catch (error: any) {
      setState(prev => ({ ...prev, isSending: false }));
      return { success: false, message: error.message || 'Failed to send message' };
    }
  }, [state.activeChat]);

  const createNewChat = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeChat: null,
    }));
  }, []);

  const deleteChat = useCallback(async (chatId: string) => {
    try {
      await josephineService.deleteChat(chatId);
      
      setState(prev => ({
        ...prev,
        chats: prev.chats.filter(c => c._id !== chatId),
        activeChat: prev.activeChat?._id === chatId ? null : prev.activeChat,
      }));
      
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to delete chat' };
    }
  }, []);

  const modifyChat = useCallback(async (
    chatId: string,
    details: { changeStar?: boolean; newName?: string; changeAccess?: boolean }
  ) => {
    try {
      await josephineService.modifyChat(chatId, details);
      
      setState(prev => {
        const updateChat = (chat: Chat): Chat => {
          if (chat._id !== chatId) return chat;
          
          return {
            ...chat,
            isStarred: details.changeStar ? !chat.isStarred : chat.isStarred,
            title: details.newName || chat.title,
            isPublic: details.changeAccess ? !chat.isPublic : chat.isPublic,
          };
        };
        
        return {
          ...prev,
          chats: prev.chats.map(updateChat),
          activeChat: prev.activeChat ? updateChat(prev.activeChat) : null,
        };
      });
      
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }, []);

  return (
    <JosephineContext.Provider
      value={{
        ...state,
        loadChats,
        selectChat,
        sendMessage,
        createNewChat,
        deleteChat,
        modifyChat,
      }}
    >
      {children}
    </JosephineContext.Provider>
  );
};

export const useJosephine = () => {
  const context = useContext(JosephineContext);
  if (!context) {
    throw new Error('useJosephine must be used within a JosephineProvider');
  }
  return context;
};

export default JosephineContext;
