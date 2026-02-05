/**
 * Socket Service
 * 
 * Manages WebSocket connections for real-time features:
 * - Messaging
 * - Typing indicators
 * - User presence
 * - Server events
 */

import { io, Socket } from 'socket.io-client';
import { API_BASE_URL } from '../config/api.config';
import { Message, Attachment } from './server.service';
import { User } from './auth.service';

type MessageCallback = (message: Message, tempMsgId?: string) => void;
type TypingCallback = (indicator: string) => void;
type MemberCallback = (serverId: string, user: User) => void;
type FriendRequestCallback = (request: any) => void;
type RequestAcceptedCallback = (friendship: any) => void;

class SocketService {
  private socket: Socket | null = null;
  private userId: string | null = null;
  
  // Event listeners
  private messageListeners: Map<string, MessageCallback[]> = new Map();
  private typingListeners: Map<string, TypingCallback[]> = new Map();
  private memberJoinListeners: MemberCallback[] = [];
  private friendRequestListeners: FriendRequestCallback[] = [];
  private requestAcceptedListeners: RequestAcceptedCallback[] = [];

  /**
   * Initialize socket connection
   */
  connect(userId: string): void {
    if (this.socket?.connected && this.userId === userId) {
      return;
    }

    this.userId = userId;
    
    this.socket = io(API_BASE_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.registerUser(userId);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('connect_error', (error: Error) => {
      console.error('Socket connection error:', error);
    });

    // Set up global event listeners
    this.setupEventListeners();
  }

  /**
   * Disconnect socket
   */
  disconnect(): void {
    if (this.userId) {
      this.deregisterUser(this.userId);
    }
    this.socket?.disconnect();
    this.socket = null;
    this.userId = null;
  }

  /**
   * Check if socket is connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Register user for receiving events
   */
  private registerUser(userId: string): void {
    this.socket?.emit('register-user', userId);
  }

  /**
   * Deregister user
   */
  private deregisterUser(userId: string): void {
    this.socket?.emit('deregister-user', userId);
  }

  /**
   * Join a channel room
   */
  joinChannel(channelId: string): void {
    this.socket?.emit('join-channel', channelId);
  }

  /**
   * Leave a channel room
   */
  leaveChannel(channelId: string): void {
    if (this.userId) {
      this.socket?.emit('leave-channel', channelId, this.userId);
    }
  }

  /**
   * Send typing indicator
   */
  sendTyping(channelId: string, userName: string): void {
    if (this.userId) {
      this.socket?.emit('typing', channelId, this.userId, userName);
    }
  }

  /**
   * Send a message with optional attachments
   */
  async sendMessage(
    metadata: {
      serverId?: string;
      channelId: string;
      userId: string;
    },
    content: string,
    replyMessageId?: string,
    attachments?: { uri: string; name: string; type: string; size: number }[]
  ): Promise<string> {
    const tempMsgId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Socket not connected'));
        return;
      }

      const attachmentsLength = attachments?.length || 0;
      
      // Emit the message
      this.socket.emit(
        'send-message',
        attachmentsLength,
        metadata,
        content,
        replyMessageId || null,
        tempMsgId
      );

      // Handle file upload requests
      if (attachments && attachments.length > 0) {
        this.socket.on(`get-file:${tempMsgId}`, async (index: number) => {
          const attachment = attachments[index];
          try {
            const response = await fetch(attachment.uri);
            const blob = await response.blob();
            const arrayBuffer = await blob.arrayBuffer();
            
            this.socket?.emit(`file:${index}:${tempMsgId}`, {
              name: attachment.name,
              type: attachment.type,
              size: attachment.size,
              buffer: arrayBuffer,
            });
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        });

        this.socket.on(`upload-error:${tempMsgId}`, (error: any) => {
          console.error('Upload error:', error);
        });

        this.socket.on(`all-uploads-complete:${tempMsgId}`, () => {
          // Clean up listeners
          this.socket?.off(`get-file:${tempMsgId}`);
          this.socket?.off(`upload-error:${tempMsgId}`);
          this.socket?.off(`all-uploads-complete:${tempMsgId}`);
        });
      }

      resolve(tempMsgId);
    });
  }

  /**
   * Set up global event listeners
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    // Message received
    this.socket.on('receive-message', (message: Message, tempMsgId?: string) => {
      // Notify all listeners for this channel
      this.messageListeners.forEach((listeners) => {
        listeners.forEach((callback) => callback(message, tempMsgId));
      });
    });

    // Typing indicator
    this.socket.on('typing-indicator', (indicator: string) => {
      this.typingListeners.forEach((listeners) => {
        listeners.forEach((callback) => callback(indicator));
      });
    });

    // New member joined server
    this.socket.on('new-member-joined', (serverId: string, user: User) => {
      this.memberJoinListeners.forEach((callback) => callback(serverId, user));
    });

    // Friend request received
    this.socket.on('friend-request-received', (request: any) => {
      this.friendRequestListeners.forEach((callback) => callback(request));
    });

    // Friend request accepted
    this.socket.on('request-accepted', (friendship: any) => {
      this.requestAcceptedListeners.forEach((callback) => callback(friendship));
    });
  }

  /**
   * Subscribe to messages in a channel
   */
  onMessage(channelId: string, callback: MessageCallback): () => void {
    if (!this.messageListeners.has(channelId)) {
      this.messageListeners.set(channelId, []);
    }
    this.messageListeners.get(channelId)!.push(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.messageListeners.get(channelId);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    };
  }

  /**
   * Subscribe to typing indicators in a channel
   */
  onTyping(channelId: string, callback: TypingCallback): () => void {
    if (!this.typingListeners.has(channelId)) {
      this.typingListeners.set(channelId, []);
    }
    this.typingListeners.get(channelId)!.push(callback);

    return () => {
      const listeners = this.typingListeners.get(channelId);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    };
  }

  /**
   * Subscribe to new member join events
   */
  onMemberJoin(callback: MemberCallback): () => void {
    this.memberJoinListeners.push(callback);
    return () => {
      const index = this.memberJoinListeners.indexOf(callback);
      if (index > -1) {
        this.memberJoinListeners.splice(index, 1);
      }
    };
  }

  /**
   * Subscribe to friend request events
   */
  onFriendRequest(callback: FriendRequestCallback): () => void {
    this.friendRequestListeners.push(callback);
    return () => {
      const index = this.friendRequestListeners.indexOf(callback);
      if (index > -1) {
        this.friendRequestListeners.splice(index, 1);
      }
    };
  }

  /**
   * Subscribe to friend request accepted events
   */
  onRequestAccepted(callback: RequestAcceptedCallback): () => void {
    this.requestAcceptedListeners.push(callback);
    return () => {
      const index = this.requestAcceptedListeners.indexOf(callback);
      if (index > -1) {
        this.requestAcceptedListeners.splice(index, 1);
      }
    };
  }
}

export const socketService = new SocketService();
export default socketService;
