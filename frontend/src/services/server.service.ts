/**
 * Server Service
 * 
 * Handles all server-related API calls including:
 * - Server creation and listing
 * - Channel management
 * - Message operations
 * - Invite system
 */

import apiClient from './api.client';
import { API_ENDPOINTS } from '../config/api.config';
import { User } from './auth.service';

export interface Channel {
  _id: string;
  name: string;
  type: 'text' | 'voice' | 'dm';
  messages: Message[];
  participants?: User[];
  createdAt: string;
}

export interface Message {
  _id: string;
  userId: User;
  content: string;
  attachments?: Attachment[];
  replyTo?: Message;
  reactions?: Reaction[];
  isEdited?: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  attachmentId: string;
  fileName: string;
  s3Key: string;
  s3URL: string;
  cdnURL: string;
  fileSize: number;
  mimeType: string;
}

export interface Reaction {
  emoji: string;
  users: string[];
}

export interface Server {
  _id: string;
  name: string;
  icon?: string;
  description?: string;
  users: User[];
  channels: Channel[];
  owner: string;
  createdAt: string;
}

export interface CreateServerData {
  name: string;
  description?: string;
}

export interface CreateChannelData {
  serverId: string;
  name: string;
  type?: 'text' | 'voice';
}

class ServerService {
  /**
   * Create a new server
   */
  async createServer(data: CreateServerData, icon?: any): Promise<{ server: Server }> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    if (icon) {
      formData.append('icon', {
        uri: icon.uri,
        type: icon.type || 'image/jpeg',
        name: icon.fileName || 'icon.jpg',
      } as any);
    }

    return apiClient.uploadFormData(API_ENDPOINTS.SERVER.CREATE, formData) as any;
  }

  /**
   * Get list of servers for current user
   */
  async listServers(): Promise<{ servers: Server[] }> {
    return apiClient.get(API_ENDPOINTS.SERVER.LIST) as any;
  }

  /**
   * Create an invite code for a server
   */
  async createInvite(serverId: string): Promise<{ inviteCode: string }> {
    return apiClient.post(API_ENDPOINTS.SERVER.CREATE_INVITE, { serverId }) as any;
  }

  /**
   * Join a server using an invite code
   */
  async joinServerViaInvite(inviteCode: string): Promise<{ server: Server }> {
    return apiClient.post(API_ENDPOINTS.SERVER.JOIN_INVITE, { inviteCode }) as any;
  }

  /**
   * Create a new channel in a server
   */
  async createChannel(data: CreateChannelData): Promise<{ channel: Channel }> {
    return apiClient.post(API_ENDPOINTS.SERVER.CHANNEL_CREATE, data) as any;
  }

  /**
   * Get list of channels for a server
   */
  async listChannels(serverId: string): Promise<{ channels: Channel[] }> {
    return apiClient.get(API_ENDPOINTS.SERVER.CHANNEL_LIST, { serverId }) as any;
  }

  /**
   * Get messages for a channel
   */
  async listMessages(
    channelId: string,
    options?: { limit?: number; before?: string }
  ): Promise<{ messages: Message[] }> {
    return apiClient.get(API_ENDPOINTS.SERVER.MESSAGE_LIST, {
      channelId,
      ...(options?.limit && { limit: options.limit.toString() }),
      ...(options?.before && { before: options.before }),
    }) as any;
  }

  /**
   * Get destinations for forwarding messages
   */
  async getMessageDestinations(): Promise<{ destinations: any[] }> {
    return apiClient.get(API_ENDPOINTS.SERVER.MESSAGE_FORWARD_DESTINATIONS) as any;
  }

  /**
   * Forward messages to another channel
   */
  async forwardMessages(
    messageIds: string[],
    destinationChannelId: string
  ): Promise<{ message: string }> {
    return apiClient.post(API_ENDPOINTS.SERVER.MESSAGE_FORWARD, {
      messageIds,
      destinationChannelId,
    }) as any;
  }

  /**
   * Edit a message
   */
  async editMessage(
    messageId: string,
    content: string
  ): Promise<{ message: Message }> {
    return apiClient.patch(API_ENDPOINTS.SERVER.MESSAGE_EDIT, {
      messageId,
      content,
    }) as any;
  }

  /**
   * Delete a message
   */
  async deleteMessage(messageId: string): Promise<{ message: string }> {
    return apiClient.delete(API_ENDPOINTS.SERVER.MESSAGE_DELETE, { messageId }) as any;
  }
}

export const serverService = new ServerService();
export default serverService;
