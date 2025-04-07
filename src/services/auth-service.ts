// src/services/auth-service.ts
import { apiClient } from './api-client';
import { 
  AuthResponse, 
  UserLoginRequest, 
  UserRegisterRequest, 
  User,
  UpdateProfileRequest 
} from '../types/api-types';

class AuthService {
  // Login user with email or username
  async login(credentials: { emailOrUsername: string; password: string }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/Auth/login', credentials);
      if (response && response.token) {
        apiClient.setToken(response.token);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register new user
  async register(userData: UserRegisterRequest): Promise<any> {
    try {
      return await apiClient.post<any>('/Auth/register', userData);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Logout user
  async logout(userId: number): Promise<void> {
    try {
      await apiClient.post('/Auth/logout', { userId });
      apiClient.clearToken();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Check if username is already taken
  async validateUsername(username: string): Promise<boolean> {
    try {
      const response = await apiClient.post('/Auth/valide-username', { username });
      return !!response;
    } catch (error) {
      console.error('Username validation error:', error);
      throw error;
    }
  }

  // Check if email is already taken
  async validateEmail(email: string): Promise<boolean> {
    try {
      const response = await apiClient.post('/Auth/valide-email', { email });
      return !!response;
    } catch (error) {
      console.error('Email validation error:', error);
      throw error;
    }
  }

  // Verify email with verification code
  async verifyEmail(email: string, verificationCode: string): Promise<boolean> {
    try {
      const response = await apiClient.post('/Auth/verify-email', { email, verificationCode });
      return !!response;
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  }

  // Get current user info
  async getUserInfo(): Promise<User> {
    try {
      return await apiClient.get<User>('/Account/user-info');
    } catch (error) {
      console.error('Get user info error:', error);
      throw error;
    }
  }

  // Get current user role
  async getUserRole(): Promise<string> {
    try {
      return await apiClient.get<string>('/Account/user-role');
    } catch (error) {
      console.error('Get user role error:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(profileData: UpdateProfileRequest): Promise<any> {
    try {
      return await apiClient.put<any>('/Account/update-profile', profileData);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Update user email
  async updateEmail(email: string): Promise<any> {
    try {
      return await apiClient.put<any>('/Account/update-email', { email });
    } catch (error) {
      console.error('Update email error:', error);
      throw error;
    }
  }

  // Reset password
  async forgotPassword(email: string, newPassword: string): Promise<any> {
    try {
      return await apiClient.post<any>('/Account/forgot-password', { email, newPassword });
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  // Update password
  async updatePassword(email: string, newPassword: string): Promise<any> {
    try {
      return await apiClient.put<any>('/Account/update-password', { email, newPassword });
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  }

  // Upload profile image
  async uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiClient.post<string>('/Account/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  }

  // Get profile image
  getProfileImageUrl(userId: number): string {
    return `${apiClient.getBaseUrl()}/Account/profile-image/${userId}`;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!apiClient.getToken();
  }
}

export const authService = new AuthService();
