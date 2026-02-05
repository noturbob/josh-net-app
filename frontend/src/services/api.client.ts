/**
 * API Client
 * 
 * Central HTTP client using fetch with automatic token handling,
 * error handling, and request/response interceptors.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api.config';

// Storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: '@joshnet_access_token',
  REFRESH_TOKEN: '@joshnet_refresh_token',
  USER: '@joshnet_user',
};

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

interface ApiResponse<T = any> {
  message: string;
  type: 'success' | 'error';
  data?: T;
  [key: string]: any;
}

class ApiClient {
  private baseURL: string;
  private isRefreshing: boolean = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getAccessToken(): Promise<string | null> {
    return AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  private async getRefreshToken(): Promise<string | null> {
    return AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  private async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.ACCESS_TOKEN, accessToken],
      [STORAGE_KEYS.REFRESH_TOKEN, refreshToken],
    ]);
  }

  private async clearTokens(): Promise<void> {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER,
    ]);
  }

  private subscribeTokenRefresh(callback: (token: string) => void) {
    this.refreshSubscribers.push(callback);
  }

  private onTokenRefreshed(token: string) {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  private async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = await this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${this.baseURL}/api/v1/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (response.ok && data.accessToken) {
        await this.setTokens(data.accessToken, data.refreshToken || refreshToken);
        return data.accessToken;
      }

      throw new Error('Failed to refresh token');
    } catch (error) {
      await this.clearTokens();
      return null;
    }
  }

  async request<T = any>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...fetchConfig } = config;
    
    // Build URL with query params
    let url = `${this.baseURL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    // Get access token for authenticated requests
    const accessToken = await this.getAccessToken();

    // Set default headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...config.headers,
    };

    // Add authorization header if token exists
    if (accessToken) {
      (headers as any)['Authorization'] = `Bearer ${accessToken}`;
    }

    try {
      let response = await fetch(url, {
        ...fetchConfig,
        headers,
      });

      // Handle 401 - Token expired
      if (response.status === 401 && accessToken) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          const newToken = await this.refreshAccessToken();
          this.isRefreshing = false;

          if (newToken) {
            this.onTokenRefreshed(newToken);
            
            // Retry original request with new token
            (headers as any)['Authorization'] = `Bearer ${newToken}`;
            response = await fetch(url, {
              ...fetchConfig,
              headers,
            });
          } else {
            // Token refresh failed, user needs to re-login
            throw new Error('Session expired. Please login again.');
          }
        } else {
          // Wait for token refresh to complete
          return new Promise((resolve) => {
            this.subscribeTokenRefresh(async (token) => {
              (headers as any)['Authorization'] = `Bearer ${token}`;
              const retryResponse = await fetch(url, {
                ...fetchConfig,
                headers,
              });
              resolve(retryResponse.json());
            });
          });
        }
      }

      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.message || 'Request failed',
          status: response.status,
          data,
        };
      }

      return data;
    } catch (error: any) {
      if (error.message === 'Network request failed') {
        throw {
          message: 'Unable to connect to server. Please check your internet connection.',
          type: 'error',
        };
      }
      throw error;
    }
  }

  // Convenience methods
  async get<T = any>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // Multipart form data upload
  async uploadFormData<T = any>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const accessToken = await this.getAccessToken();
    const url = `${this.baseURL}${endpoint}`;

    const headers: HeadersInit = {};
    if (accessToken) {
      (headers as any)['Authorization'] = `Bearer ${accessToken}`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.message || 'Upload failed',
          status: response.status,
          data,
        };
      }

      return data;
    } catch (error: any) {
      if (error.message === 'Network request failed') {
        throw {
          message: 'Unable to connect to server. Please check your internet connection.',
          type: 'error',
        };
      }
      throw error;
    }
  }

  // Token management methods
  async saveTokens(accessToken: string, refreshToken: string) {
    await this.setTokens(accessToken, refreshToken);
  }

  async logout() {
    await this.clearTokens();
  }

  async saveUser(user: any) {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  async getUser(): Promise<any | null> {
    const userStr = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAccessToken();
    return !!token;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
