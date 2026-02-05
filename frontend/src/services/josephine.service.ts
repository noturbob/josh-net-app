/**
 * Josephine AI Service
 * 
 * Handles all Josephine AI chatbot-related API calls including:
 * - Chat listing
 * - Sending prompts
 * - Chat management
 */

import apiClient from './api.client';
import { API_ENDPOINTS } from '../config/api.config';

export interface ChatMessage {
  author: 'user' | 'ai';
  message: string;
  attachments: ChatAttachment[];
  timestamp: string;
}

export interface ChatAttachment {
  fileName: string;
  s3Key: string;
  cdnURL: string;
}

export interface Chat {
  _id: string;
  title: string;
  conversationHistory: ChatMessage[];
  isStarred: boolean;
  isPublic: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

class JosephineService {
  /**
   * Get all chats for current user
   */
  async listChats(): Promise<{ chats: Chat[] }> {
    return apiClient.get(API_ENDPOINTS.JOSEPHINE.CHATS) as any;
  }

  /**
   * Send a prompt to the AI
   */
  async sendPrompt(
    prompt: string,
    chatId?: string,
    files?: any[]
  ): Promise<{
    chat: Chat;
    response: string;
    isNewChat: boolean;
  }> {
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append('prompt', prompt);
      if (chatId) {
        formData.append('chatId', chatId);
      }
      files.forEach((file, index) => {
        formData.append('files', {
          uri: file.uri,
          type: file.type || 'application/pdf',
          name: file.name || `file${index}.pdf`,
        } as any);
      });
      return apiClient.uploadFormData(API_ENDPOINTS.JOSEPHINE.PROMPT, formData) as any;
    }

    return apiClient.post(API_ENDPOINTS.JOSEPHINE.PROMPT, {
      prompt,
      chatId,
    }) as any;
  }

  /**
   * Get a specific chat by ID
   */
  async getChat(chatId: string): Promise<{ chat: Chat }> {
    return apiClient.get(`${API_ENDPOINTS.JOSEPHINE.CHAT}/${chatId}`) as any;
  }

  /**
   * Delete a chat
   */
  async deleteChat(chatId: string): Promise<{ message: string }> {
    return apiClient.delete(`${API_ENDPOINTS.JOSEPHINE.CHAT}/${chatId}`) as any;
  }

  /**
   * Modify chat (star, rename, change access)
   */
  async modifyChat(
    chatId: string,
    details: {
      changeStar?: boolean;
      newName?: string;
      changeAccess?: boolean;
    }
  ): Promise<{ message: string }> {
    return apiClient.patch(`${API_ENDPOINTS.JOSEPHINE.CHAT}/${chatId}`, {
      details,
    }) as any;
  }

  /**
   * Batch delete chats
   */
  async batchDeleteChats(chatIds: string[]): Promise<{ message: string }> {
    return apiClient.delete(API_ENDPOINTS.JOSEPHINE.BATCH_DELETE, {
      chatIds,
    }) as any;
  }
}

export const josephineService = new JosephineService();
export default josephineService;
