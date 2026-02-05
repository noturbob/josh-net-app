/**
 * Authentication Service
 * 
 * Handles all authentication-related API calls including:
 * - Login/Register
 * - OTP verification
 * - Password management
 * - Token management
 * - Google OAuth
 */

import apiClient from './api.client';
import { API_ENDPOINTS } from '../config/api.config';

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'student' | 'faculty' | 'admin' | 'alumni';
  avatarURL?: string;
  academic?: {
    course?: string;
    currentSemester?: string;
    year?: string;
  };
  profile?: {
    userName?: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'student' | 'faculty' | 'alumni';
}

export interface AuthResponse {
  message: string;
  type: 'success' | 'error';
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  otpSent?: boolean;
}

class AuthService {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // If login successful (no 2FA), save tokens and user
    if (response.accessToken && response.user) {
      await apiClient.saveTokens(response.accessToken, response.refreshToken!);
      await apiClient.saveUser(response.user);
    }

    return response;
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );

    // Save tokens and user on successful registration
    if (response.accessToken && response.user) {
      await apiClient.saveTokens(response.accessToken, response.refreshToken!);
      await apiClient.saveUser(response.user);
    }

    return response;
  }

  /**
   * Send OTP to email
   */
  async sendOTP(email: string): Promise<AuthResponse> {
    return apiClient.post(API_ENDPOINTS.AUTH.SEND_OTP, { email });
  }

  /**
   * Verify OTP
   */
  async verifyOTP(email: string, otp: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      { email, otp }
    );

    // If verification includes tokens, save them
    if (response.accessToken && response.user) {
      await apiClient.saveTokens(response.accessToken, response.refreshToken!);
      await apiClient.saveUser(response.user);
    }

    return response;
  }

  /**
   * Change/Reset password
   */
  async changePassword(email: string, newPassword: string, otp?: string): Promise<AuthResponse> {
    return apiClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      email,
      newPassword,
      otp,
    });
  }

  /**
   * Logout current session
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Continue with local logout even if API call fails
      console.warn('Logout API call failed:', error);
    }
    await apiClient.logout();
  }

  /**
   * Logout from all devices
   */
  async logoutAll(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT_ALL);
    } catch (error) {
      console.warn('Logout all API call failed:', error);
    }
    await apiClient.logout();
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    const response = await apiClient.get<{ user: User }>(API_ENDPOINTS.AUTH.PROFILE);
    if (response.user) {
      await apiClient.saveUser(response.user);
    }
    return response.user!;
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });
  }

  /**
   * Link Google account
   */
  async linkGoogleAccount(code: string): Promise<AuthResponse> {
    return apiClient.post(API_ENDPOINTS.AUTH.LINK_GOOGLE, { code });
  }

  /**
   * Unlink Google account
   */
  async unlinkGoogleAccount(): Promise<AuthResponse> {
    return apiClient.post(API_ENDPOINTS.AUTH.UNLINK_GOOGLE);
  }

  /**
   * Exchange Google auth code for tokens
   */
  async exchangeCode(code: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.EXCHANGE_CODE,
      { code }
    );

    if (response.accessToken && response.user) {
      await apiClient.saveTokens(response.accessToken, response.refreshToken!);
      await apiClient.saveUser(response.user);
    }

    return response;
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    return apiClient.isAuthenticated();
  }

  /**
   * Get stored user
   */
  async getStoredUser(): Promise<User | null> {
    return apiClient.getUser();
  }
}

export const authService = new AuthService();
export default authService;
