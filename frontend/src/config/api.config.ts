/**
 * API Configuration
 * 
 * Central configuration for all API endpoints and settings.
 * Update BASE_URL for production deployment.
 */

// Development URL - Change this to your production URL when deploying
export const API_BASE_URL = __DEV__ 
  ? 'http://192.168.1.100:8080' // Change to your local IP for development
  : 'https://api.joshnet.com';

export const API_VERSION = '/api/v1';

export const API_ENDPOINTS = {
  // Auth Endpoints
  AUTH: {
    LOGIN: `${API_VERSION}/auth/login`,
    REGISTER: `${API_VERSION}/auth/register`,
    VERIFY_OTP: `${API_VERSION}/auth/verify-otp`,
    SEND_OTP: `${API_VERSION}/auth/send-otp`,
    CHANGE_PASSWORD: `${API_VERSION}/auth/change-password`,
    REFRESH_TOKEN: `${API_VERSION}/auth/refresh-token`,
    LOGOUT: `${API_VERSION}/auth/logout`,
    LOGOUT_ALL: `${API_VERSION}/auth/logout-all`,
    PROFILE: `${API_VERSION}/auth/profile`,
    GOOGLE_AUTH: `${API_VERSION}/auth/google`,
    GOOGLE_CALLBACK: `${API_VERSION}/auth/google/callback`,
    LINK_GOOGLE: `${API_VERSION}/auth/link-google`,
    UNLINK_GOOGLE: `${API_VERSION}/auth/unlink-google`,
    EXCHANGE_CODE: `${API_VERSION}/auth/exchange-code`,
  },
  
  // Server Endpoints
  SERVER: {
    CREATE: `${API_VERSION}/server/create`,
    LIST: `${API_VERSION}/server/list`,
    CREATE_INVITE: `${API_VERSION}/server/create/invite`,
    JOIN_INVITE: `${API_VERSION}/server/join/invite`,
    CHANNEL_CREATE: `${API_VERSION}/server/channel/create`,
    CHANNEL_LIST: `${API_VERSION}/server/channel/list`,
    MESSAGE_LIST: `${API_VERSION}/server/message/list`,
    MESSAGE_FORWARD_DESTINATIONS: `${API_VERSION}/server/messages/forward/destinations`,
    MESSAGE_FORWARD: `${API_VERSION}/server/messages/forward`,
    MESSAGE_EDIT: `${API_VERSION}/server/message/edit`,
    MESSAGE_DELETE: `${API_VERSION}/server/message`,
  },
  
  // Materials Endpoints
  MATERIALS: {
    UPLOAD_SINGLE: `${API_VERSION}/student/upload-single`,
    UPLOAD_MULTIPLE: `${API_VERSION}/student/upload-multiple`,
    DOWNLOAD: `${API_VERSION}/student/download`,
    DOWNLOAD_FOLDER: `${API_VERSION}/student/download-folders`,
    LIST_FILES: `${API_VERSION}/student/files`,
    DELETE_FILES: `${API_VERSION}/student/files`,
    DELETE_FOLDERS: `${API_VERSION}/student/folders`,
    COPY_FILE: `${API_VERSION}/student/file/copy`,
    COPY_FOLDER: `${API_VERSION}/student/folder/copy`,
    MOVE_FILE: `${API_VERSION}/student/file/move`,
    MOVE_FOLDER: `${API_VERSION}/student/folder/move`,
    COURSEWORK: `${API_VERSION}/student/coursework`,
  },
  
  // Inbox Endpoints
  INBOX: {
    FRIENDS: `${API_VERSION}/inbox/friends`,
    SEARCH_USER: `${API_VERSION}/inbox/search-user`,
    SEND_REQUEST: `${API_VERSION}/inbox/friends/request`,
    ACCEPT_REQUEST: `${API_VERSION}/inbox/friends/request/accept`,
    REJECT_REQUEST: `${API_VERSION}/inbox/friends/request/reject`,
    CANCEL_REQUEST: `${API_VERSION}/inbox/friends/request/cancel`,
  },
  
  // Josephine AI Endpoints
  JOSEPHINE: {
    CHATS: `${API_VERSION}/josephine/chats`,
    PROMPT: `${API_VERSION}/josephine/prompt`,
    CHAT: `${API_VERSION}/josephine/chat`,
    BATCH_DELETE: `${API_VERSION}/josephine/chats`,
  },
};

export default {
  API_BASE_URL,
  API_VERSION,
  API_ENDPOINTS,
};
