export { AuthProvider, useAuth } from './AuthContext';
export type { UserRole } from './AuthContext';
export { ServerProvider, useServer } from './ServerContext';
export { JosephineProvider, useJosephine } from './JosephineContext';
export { InboxProvider, useInbox } from './InboxContext';

// Re-export types from services for convenience
export type { User } from '../services/auth.service';
export type { Server, Channel, Message } from '../services/server.service';
export type { Chat as JosephineChat, ChatMessage as JosephineMessage } from '../services/josephine.service';
export type { Friend, FriendRequest } from '../services/inbox.service';
