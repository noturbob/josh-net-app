/**
 * Inbox Service
 * 
 * Handles all inbox/friend-related API calls including:
 * - Friend list
 * - Friend requests
 * - User search
 */

import apiClient from './api.client';
import { API_ENDPOINTS } from '../config/api.config';
import { User } from './auth.service';
import { Channel } from './server.service';

export interface FriendRequest {
  _id: string;
  user: User;
  status: 'incoming' | 'outgoing';
  createdAt: string;
}

export interface Friend {
  _id: string;
  user: User;
  channel: Channel;
  addedAt: string;
}

class InboxService {
  /**
   * Get friends and requests list
   */
  async getFriendsAndRequests(): Promise<{
    friends: Friend[];
    requests: FriendRequest[];
  }> {
    return apiClient.get(API_ENDPOINTS.INBOX.FRIENDS) as any;
  }

  /**
   * Search for users
   */
  async searchUser(keyword: string): Promise<{ results: User[] }> {
    return apiClient.post(API_ENDPOINTS.INBOX.SEARCH_USER, { keyword }) as any;
  }

  /**
   * Send a friend request
   */
  async sendRequest(receiverId: string): Promise<{
    outgoingRequest: FriendRequest;
  }> {
    return apiClient.post(API_ENDPOINTS.INBOX.SEND_REQUEST, { receiverId }) as any;
  }

  /**
   * Accept a friend request
   */
  async acceptRequest(userId: string): Promise<{
    newFriend: Friend;
  }> {
    return apiClient.post(API_ENDPOINTS.INBOX.ACCEPT_REQUEST, { userId }) as any;
  }

  /**
   * Reject a friend request
   */
  async rejectRequest(userId: string): Promise<{ message: string }> {
    return apiClient.post(API_ENDPOINTS.INBOX.REJECT_REQUEST, { userId }) as any;
  }

  /**
   * Cancel an outgoing friend request
   */
  async cancelRequest(userId: string): Promise<{ message: string }> {
    return apiClient.post(API_ENDPOINTS.INBOX.CANCEL_REQUEST, { userId }) as any;
  }
}

export const inboxService = new InboxService();
export default inboxService;
