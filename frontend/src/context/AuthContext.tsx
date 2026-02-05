/**
 * Enhanced Auth Context
 * 
 * Provides authentication state and methods throughout the app.
 * Integrates with the auth service for real API calls.
 */

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authService, User } from '../services/auth.service';
import { socketService } from '../services/socket.service';

// User role types - matching backend roles
export type UserRole = 'student' | 'faculty' | 'alumni' | 'admin' | null;

interface AuthState {
  user: User | null;
  role: UserRole;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; otpRequired?: boolean; message?: string }>;
  register: (data: { name: string; email: string; password: string; role?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
  sendOTP: (email: string) => Promise<{ success: boolean; message?: string }>;
  verifyOTP: (email: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  changePassword: (email: string, newPassword: string, otp?: string) => Promise<{ success: boolean; message?: string }>;
  refreshProfile: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Connect socket when authenticated
  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      socketService.connect(state.user._id);
    } else {
      socketService.disconnect();
    }

    return () => {
      socketService.disconnect();
    };
  }, [state.isAuthenticated, state.user?._id]);

  const checkAuthStatus = async () => {
    try {
      const isAuthenticated = await authService.isAuthenticated();
      
      if (isAuthenticated) {
        const storedUser = await authService.getStoredUser();
        
        if (storedUser) {
          setState({
            user: storedUser,
            role: storedUser.role as UserRole,
            isLoading: false,
            isAuthenticated: true,
          });
          
          // Try to refresh profile in background
          try {
            const freshUser = await authService.getProfile();
            setState(prev => ({
              ...prev,
              user: freshUser,
              role: freshUser.role as UserRole,
            }));
          } catch (error) {
            // Continue with stored user if profile fetch fails
            console.warn('Failed to refresh profile:', error);
          }
        } else {
          setState({
            user: null,
            role: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      } else {
        setState({
          user: null,
          role: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      setState({
        user: null,
        role: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const response = await authService.login({ email, password });
      
      if (response.otpSent) {
        setState(prev => ({ ...prev, isLoading: false }));
        return { success: true, otpRequired: true, message: 'OTP sent to your email' };
      }
      
      if (response.user && response.accessToken) {
        setState({
          user: response.user,
          role: response.user.role as UserRole,
          isLoading: false,
          isAuthenticated: true,
        });
        return { success: true };
      }
      
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: response.message || 'Login failed' };
    } catch (error: any) {
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: error.message || 'Login failed' };
    }
  }, []);

  const register = useCallback(async (data: { name: string; email: string; password: string; role?: string }) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const response = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: (data.role?.toLowerCase() || 'student') as any,
      });
      
      if (response.user && response.accessToken) {
        setState({
          user: response.user,
          role: response.user.role as UserRole,
          isLoading: false,
          isAuthenticated: true,
        });
        return { success: true };
      }
      
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: response.message || 'Registration failed' };
    } catch (error: any) {
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: error.message || 'Registration failed' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setState({
        user: null,
        role: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const logoutAll = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await authService.logoutAll();
    } catch (error) {
      console.error('Logout all error:', error);
    } finally {
      setState({
        user: null,
        role: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const sendOTP = useCallback(async (email: string) => {
    try {
      const response = await authService.sendOTP(email);
      return { success: response.type === 'success', message: response.message };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to send OTP' };
    }
  }, []);

  const verifyOTP = useCallback(async (email: string, otp: string) => {
    try {
      const response = await authService.verifyOTP(email, otp);
      
      if (response.user && response.accessToken) {
        setState({
          user: response.user,
          role: response.user.role as UserRole,
          isLoading: false,
          isAuthenticated: true,
        });
        return { success: true };
      }
      
      return { success: response.type === 'success', message: response.message };
    } catch (error: any) {
      return { success: false, message: error.message || 'OTP verification failed' };
    }
  }, []);

  const changePassword = useCallback(async (email: string, newPassword: string, otp?: string) => {
    try {
      const response = await authService.changePassword(email, newPassword, otp);
      return { success: response.type === 'success', message: response.message };
    } catch (error: any) {
      return { success: false, message: error.message || 'Password change failed' };
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const user = await authService.getProfile();
      setState(prev => ({
        ...prev,
        user,
        role: user.role as UserRole,
      }));
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    }
  }, []);

  const setUser = useCallback((user: User | null) => {
    setState(prev => ({
      ...prev,
      user,
      role: user?.role as UserRole || null,
      isAuthenticated: !!user,
    }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        logoutAll,
        sendOTP,
        verifyOTP,
        changePassword,
        refreshProfile,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;