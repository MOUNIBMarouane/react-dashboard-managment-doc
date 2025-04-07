
import { apiClient } from '../api-client';
import { AuthResponse, UserLoginRequest, UserRegisterRequest, User } from '@/types/api-types';
import { userValidationService } from './user-validation-service';

interface AuthOptions {
  headers?: {
    [key: string]: string;
  };
}

/**
 * Service responsible for authentication operations
 */
class AuthService {
  private currentUser: User | null = null;

  /**
   * Register a new user
   * @param data - User registration data
   * @returns Promise<void>
   */
  async register(data: UserRegisterRequest, options?: AuthOptions): Promise<void> {
    try {
      // Make a copy of the data and map the password field to passwordHash
      // This is needed because the backend expects passwordHash, not password
      const requestData = {
        ...data,
        passwordHash: data.password,  // Map password to passwordHash for the API
      };
      
      // Delete the original password field to avoid sending both
      delete (requestData as any).password;
      
      await apiClient.post('/Auth/register', requestData, options);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login a user
   * @param emailOrUsername - Email or username
   * @param password - Password
   * @returns Promise<AuthResponse>
   */
  async login(emailOrUsername: string, password: string): Promise<AuthResponse> {
    try {
      const loginRequest: UserLoginRequest = { emailOrUsername, password };
      const response = await apiClient.post<AuthResponse>('/Auth/login', loginRequest);
      
      if (response.token) {
        apiClient.setToken(response.token);
        localStorage.setItem('refresh_token', response.refreshToken || '');
        
        if (response.user) {
          this.currentUser = response.user;
        }
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Refresh auth token
   * @returns Promise<string> - New access token
   */
  async refreshToken(): Promise<string> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post<{ accessToken: string }>('/Auth/refresh-token', { refreshToken });
      
      if (response.accessToken) {
        apiClient.setToken(response.accessToken);
        return response.accessToken;
      }
      
      throw new Error('Failed to refresh token');
    } catch (error) {
      this.logout();
      throw error;
    }
  }

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    try {
      if (this.currentUser) {
        await apiClient.post('/Auth/logout', { userId: this.currentUser.id });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      apiClient.clearToken();
      localStorage.removeItem('refresh_token');
      this.currentUser = null;
    }
  }

  /**
   * Get current user information
   * @returns Promise<User>
   */
  async getUserInfo(): Promise<User> {
    try {
      if (!this.isAuthenticated()) {
        throw new Error('User is not authenticated');
      }

      // If we already have user info and it's fresh enough, return it
      if (this.currentUser) {
        return this.currentUser;
      }

      // Otherwise fetch it from the API
      const user = await apiClient.get<User>('/Users/me');
      this.currentUser = user;
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if the user is authenticated
   * @returns boolean
   */
  isAuthenticated(): boolean {
    return !!apiClient.getToken();
  }

  /**
   * Verify email with verification code - using the validation service
   */
  async verifyEmail(email: string, verificationCode: string): Promise<boolean> {
    return userValidationService.verifyEmail(email, verificationCode);
  }
}

export const authService = new AuthService();
