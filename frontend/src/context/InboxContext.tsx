/**
 * Inbox Context
 * 
 * Manages friends, friend requests, and direct messages
 */

import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { inboxService, Friend, FriendRequest } from '../services/inbox.service';
import { socketService } from '../services/socket.service';
import { useAuth } from './AuthContext';

interface InboxState {
  friends: Friend[];
  pendingRequests: FriendRequest[];
  sentRequests: FriendRequest[];
  searchResults: any[];
  isLoading: boolean;
  error: string | null;
}

interface InboxContextType extends InboxState {
  loadFriendsAndRequests: () => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
  sendFriendRequest: (userId: string) => Promise<{ success: boolean; message?: string }>;
  acceptRequest: (userId: string) => Promise<{ success: boolean; message?: string }>;
  rejectRequest: (userId: string) => Promise<{ success: boolean; message?: string }>;
  cancelRequest: (userId: string) => Promise<{ success: boolean; message?: string }>;
  clearSearchResults: () => void;
}

const InboxContext = createContext<InboxContextType | undefined>(undefined);

export const InboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  const [state, setState] = useState<InboxState>({
    friends: [],
    pendingRequests: [],
    sentRequests: [],
    searchResults: [],
    isLoading: false,
    error: null,
  });

  // Load friends and requests
  const loadFriendsAndRequests = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await inboxService.getFriendsAndRequests();
      
      // Split requests into pending (incoming) and sent (outgoing)
      const pendingRequests = response.requests?.filter(r => r.status === 'incoming') || [];
      const sentRequests = response.requests?.filter(r => r.status === 'outgoing') || [];
      
      setState(prev => ({
        ...prev,
        friends: response.friends || [],
        pendingRequests,
        sentRequests,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to load friends',
        isLoading: false,
      }));
    }
  }, []);

  // Search users
  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setState(prev => ({ ...prev, searchResults: [] }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await inboxService.searchUser(query);
      
      setState(prev => ({
        ...prev,
        searchResults: response.results || [],
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Send friend request
  const sendFriendRequest = useCallback(async (userId: string) => {
    try {
      await inboxService.sendRequest(userId);
      loadFriendsAndRequests();
      return { success: true, message: 'Friend request sent' };
    } catch (error) {
      return { success: false, message: 'Failed to send request' };
    }
  }, [loadFriendsAndRequests]);

  // Accept friend request
  const acceptRequest = useCallback(async (userId: string) => {
    try {
      await inboxService.acceptRequest(userId);
      loadFriendsAndRequests();
      return { success: true, message: 'Friend request accepted' };
    } catch (error) {
      return { success: false, message: 'Failed to accept request' };
    }
  }, [loadFriendsAndRequests]);

  // Reject friend request
  const rejectRequest = useCallback(async (userId: string) => {
    try {
      await inboxService.rejectRequest(userId);
      loadFriendsAndRequests();
      return { success: true, message: 'Friend request rejected' };
    } catch (error) {
      return { success: false, message: 'Failed to reject request' };
    }
  }, [loadFriendsAndRequests]);

  // Cancel outgoing request
  const cancelRequest = useCallback(async (userId: string) => {
    try {
      await inboxService.cancelRequest(userId);
      loadFriendsAndRequests();
      return { success: true, message: 'Request cancelled' };
    } catch (error) {
      return { success: false, message: 'Failed to cancel request' };
    }
  }, [loadFriendsAndRequests]);

  // Clear search results
  const clearSearchResults = useCallback(() => {
    setState(prev => ({ ...prev, searchResults: [] }));
  }, []);

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadFriendsAndRequests();
    }
  }, [isAuthenticated, loadFriendsAndRequests]);

  // Socket listeners for real-time updates
  useEffect(() => {
    if (!isAuthenticated) return;

    // Listen for new friend requests
    const unsubFriendRequest = socketService.onFriendRequest(() => {
      loadFriendsAndRequests();
    });

    // Listen for request accepted
    const unsubAccepted = socketService.onRequestAccepted(() => {
      loadFriendsAndRequests();
    });

    return () => {
      unsubFriendRequest();
      unsubAccepted();
    };
  }, [isAuthenticated, loadFriendsAndRequests]);

  const value: InboxContextType = {
    ...state,
    loadFriendsAndRequests,
    searchUsers,
    sendFriendRequest,
    acceptRequest,
    rejectRequest,
    cancelRequest,
    clearSearchResults,
  };

  return (
    <InboxContext.Provider value={value}>
      {children}
    </InboxContext.Provider>
  );
};

export const useInbox = () => {
  const context = useContext(InboxContext);
  if (context === undefined) {
    throw new Error('useInbox must be used within an InboxProvider');
  }
  return context;
};
