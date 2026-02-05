/**
 * Service Index
 * 
 * Central export for all services
 */

export { authService, type User, type LoginCredentials, type RegisterData } from './auth.service';
export { serverService, type Server, type Channel, type Message, type Attachment } from './server.service';
export { inboxService, type Friend, type FriendRequest } from './inbox.service';
export { materialsService, type MaterialFile, type MaterialFolder } from './materials.service';
export { josephineService, type Chat, type ChatMessage } from './josephine.service';
export { socketService } from './socket.service';
export { apiClient, STORAGE_KEYS } from './api.client';
