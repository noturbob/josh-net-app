/**
 * Server Context
 * 
 * Manages server and channel state for the application.
 * Handles real-time updates via socket connections.
 */

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { serverService, Server, Channel, Message } from '../services/server.service';
import { socketService } from '../services/socket.service';
import { useAuth } from './AuthContext';

interface ServerState {
  servers: Server[];
  activeServer: Server | null;
  activeChannel: Channel | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

interface ServerContextType extends ServerState {
  loadServers: () => Promise<void>;
  selectServer: (serverId: string) => void;
  selectChannel: (channelId: string) => void;
  createServer: (data: { name: string; description?: string }, icon?: any) => Promise<{ success: boolean; message?: string }>;
  createChannel: (data: { serverId: string; name: string; type?: 'text' | 'voice' }) => Promise<{ success: boolean; message?: string }>;
  joinServer: (inviteCode: string) => Promise<{ success: boolean; message?: string }>;
  createInvite: (serverId: string) => Promise<{ success: boolean; inviteCode?: string; message?: string }>;
  loadMessages: (channelId: string, options?: { limit?: number; before?: string }) => Promise<void>;
  sendMessage: (content: string, replyToId?: string, attachments?: any[]) => Promise<{ success: boolean; message?: string }>;
  editMessage: (messageId: string, content: string) => Promise<{ success: boolean; message?: string }>;
  deleteMessage: (messageId: string) => Promise<{ success: boolean; message?: string }>;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export const ServerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  const [state, setState] = useState<ServerState>({
    servers: [],
    activeServer: null,
    activeChannel: null,
    messages: [],
    isLoading: false,
    error: null,
  });

  // Load servers when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadServers();
    } else {
      setState({
        servers: [],
        activeServer: null,
        activeChannel: null,
        messages: [],
        isLoading: false,
        error: null,
      });
    }
  }, [isAuthenticated]);

  // Subscribe to channel messages when active channel changes
  useEffect(() => {
    if (!state.activeChannel) return;

    const channelId = state.activeChannel._id;
    
    // Join the channel room
    socketService.joinChannel(channelId);

    // Subscribe to new messages
    const unsubscribe = socketService.onMessage(channelId, (message, tempMsgId) => {
      setState(prev => {
        // Check if this is replacing a temp message
        const existingIndex = prev.messages.findIndex(
          m => (m as any).tempId === tempMsgId
        );
        
        if (existingIndex >= 0) {
          const newMessages = [...prev.messages];
          newMessages[existingIndex] = message;
          return { ...prev, messages: newMessages };
        }
        
        // Add new message
        return { ...prev, messages: [...prev.messages, message] };
      });
    });

    return () => {
      socketService.leaveChannel(channelId);
      unsubscribe();
    };
  }, [state.activeChannel?._id]);

  // Subscribe to member join events
  useEffect(() => {
    const unsubscribe = socketService.onMemberJoin((serverId, newUser) => {
      setState(prev => {
        const updatedServers = prev.servers.map(server => {
          if (server._id === serverId) {
            return {
              ...server,
              users: [...server.users, newUser],
            };
          }
          return server;
        });
        
        return {
          ...prev,
          servers: updatedServers,
          activeServer: prev.activeServer?._id === serverId
            ? { ...prev.activeServer, users: [...prev.activeServer.users, newUser] }
            : prev.activeServer,
        };
      });
    });

    return unsubscribe;
  }, []);

  const loadServers = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await serverService.listServers();
      
      setState(prev => ({
        ...prev,
        servers: response.servers || [],
        isLoading: false,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to load servers',
      }));
    }
  }, []);

  const selectServer = useCallback((serverId: string) => {
    setState(prev => {
      const server = prev.servers.find(s => s._id === serverId);
      if (!server) return prev;

      // Auto-select first channel
      const firstChannel = server.channels?.[0] || null;
      
      return {
        ...prev,
        activeServer: server,
        activeChannel: firstChannel,
        messages: [],
      };
    });
  }, []);

  const selectChannel = useCallback((channelId: string) => {
    setState(prev => {
      if (!prev.activeServer) return prev;
      
      const channel = prev.activeServer.channels?.find(c => c._id === channelId);
      if (!channel) return prev;

      return {
        ...prev,
        activeChannel: channel,
        messages: [],
      };
    });
  }, []);

  const createServer = useCallback(async (data: { name: string; description?: string }, icon?: any) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response = await serverService.createServer(data, icon);
      
      if (response.server) {
        setState(prev => ({
          ...prev,
          servers: [...prev.servers, response.server],
          activeServer: response.server,
          isLoading: false,
        }));
        return { success: true };
      }
      
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: 'Failed to create server' };
    } catch (error: any) {
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: error.message || 'Failed to create server' };
    }
  }, []);

  const createChannel = useCallback(async (data: { serverId: string; name: string; type?: 'text' | 'voice' }) => {
    try {
      const response = await serverService.createChannel(data);
      
      if (response.channel) {
        setState(prev => {
          const updatedServers = prev.servers.map(server => {
            if (server._id === data.serverId) {
              return {
                ...server,
                channels: [...(server.channels || []), response.channel],
              };
            }
            return server;
          });
          
          return {
            ...prev,
            servers: updatedServers,
            activeServer: prev.activeServer?._id === data.serverId
              ? { ...prev.activeServer, channels: [...(prev.activeServer.channels || []), response.channel] }
              : prev.activeServer,
          };
        });
        return { success: true };
      }
      
      return { success: false, message: 'Failed to create channel' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to create channel' };
    }
  }, []);

  const joinServer = useCallback(async (inviteCode: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response = await serverService.joinServerViaInvite(inviteCode);
      
      if (response.server) {
        setState(prev => ({
          ...prev,
          servers: [...prev.servers, response.server],
          activeServer: response.server,
          isLoading: false,
        }));
        return { success: true };
      }
      
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: 'Failed to join server' };
    } catch (error: any) {
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: error.message || 'Failed to join server' };
    }
  }, []);

  const createInvite = useCallback(async (serverId: string) => {
    try {
      const response = await serverService.createInvite(serverId);
      
      if (response.inviteCode) {
        return { success: true, inviteCode: response.inviteCode };
      }
      
      return { success: false, message: 'Failed to create invite' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to create invite' };
    }
  }, []);

  const loadMessages = useCallback(async (channelId: string, options?: { limit?: number; before?: string }) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response = await serverService.listMessages(channelId, options);
      
      setState(prev => ({
        ...prev,
        messages: options?.before 
          ? [...(response.messages || []), ...prev.messages]
          : response.messages || [],
        isLoading: false,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to load messages',
      }));
    }
  }, []);

  const sendMessage = useCallback(async (content: string, replyToId?: string, attachments?: any[]) => {
    if (!state.activeChannel || !user) {
      return { success: false, message: 'No active channel' };
    }

    try {
      const metadata = {
        serverId: state.activeServer?._id,
        channelId: state.activeChannel._id,
        userId: user._id,
      };

      // Create temp message for optimistic update
      const tempId = `temp_${Date.now()}`;
      const tempMessage: any = {
        _id: tempId,
        tempId,
        content,
        userId: user,
        replyTo: replyToId,
        createdAt: new Date().toISOString(),
        attachments: [],
        isPending: true,
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, tempMessage],
      }));

      await socketService.sendMessage(metadata, content, replyToId, attachments);
      return { success: true };
    } catch (error: any) {
      // Remove temp message on error
      setState(prev => ({
        ...prev,
        messages: prev.messages.filter(m => !(m as any).isPending),
      }));
      return { success: false, message: error.message || 'Failed to send message' };
    }
  }, [state.activeChannel, state.activeServer, user]);

  const editMessage = useCallback(async (messageId: string, content: string) => {
    try {
      const response = await serverService.editMessage(messageId, content);
      
      if (response.message) {
        setState(prev => ({
          ...prev,
          messages: prev.messages.map(m => 
            m._id === messageId ? { ...m, content, isEdited: true } : m
          ),
        }));
        return { success: true };
      }
      
      return { success: false, message: 'Failed to edit message' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to edit message' };
    }
  }, []);

  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      await serverService.deleteMessage(messageId);
      
      setState(prev => ({
        ...prev,
        messages: prev.messages.filter(m => m._id !== messageId),
      }));
      
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to delete message' };
    }
  }, []);

  return (
    <ServerContext.Provider
      value={{
        ...state,
        loadServers,
        selectServer,
        selectChannel,
        createServer,
        createChannel,
        joinServer,
        createInvite,
        loadMessages,
        sendMessage,
        editMessage,
        deleteMessage,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = () => {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServer must be used within a ServerProvider');
  }
  return context;
};

export default ServerContext;
