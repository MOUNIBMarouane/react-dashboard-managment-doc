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
        // Store the refresh token if the API provides one
        if (response.refreshToken) {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      }
      return response;
    } catch (error: any) {
      // Format error message for better user feedback
      let errorMessage = 'Login failed. Please check your credentials and try again.';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          errorMessage = 'Invalid username or password';
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'Server not responding. Please try again later.';
      }
      
      throw new Error(errorMessage);
    }
  }

  // Register new user
  async register(userData: UserRegisterRequest): Promise<any> {
    try {
      return await apiClient.post<any>('/Auth/register', userData);
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response && error.response.status === 409) {
        errorMessage = 'Username or email already exists.';
      }
      
      throw new Error(errorMessage);
    }
  }

  // Logout user
  async logout(userId?: number): Promise<void> {
    try {
      // Only make the logout API call if we have a user ID
      if (userId) {
        await apiClient.post('/Auth/logout', { userId });
      }
      
      // Always clear local tokens regardless of API call success
      apiClient.clearToken();
      localStorage.removeItem('refresh_token');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear tokens even if the API call fails
      apiClient.clearToken();
      localStorage.removeItem('refresh_token');
    }
  }

  // Check if username is already taken
  async validateUsername(username: string): Promise<boolean> {
    try {
      const response = await apiClient.post('/Auth/valide-username', { username });
      return !!response;
    } catch (error) {
      return false; // Assume username is taken if validation fails
    }
  }

  // Check if email is already taken
  async validateEmail(email: string): Promise<boolean> {
    try {
      const response = await apiClient.post('/Auth/valide-email', { email });
      return !!response;
    } catch (error) {
      return false; // Assume email is taken if validation fails
    }
  }

  // Verify email with verification code
  async verifyEmail(email: string, verificationCode: string): Promise<boolean> {
    try {
      const response = await apiClient.post('/Auth/verify-email', { email, verificationCode });
      return !!response;
    } catch (error) {
      return false;
    }
  }

  // Get current user info
  async getUserInfo(): Promise<User> {
    try {
      return await apiClient.get<User>('/Account/user-info');
    } catch (error) {
      throw new Error('Failed to retrieve user information');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!apiClient.getToken();
  }

  // This method specifically handles token refreshing
  async refreshAuthToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      return false;
    }
    
    try {
      const response = await apiClient.post<AuthResponse>('/Auth/refresh-token', { refreshToken });
      
      if (response && response.token) {
        apiClient.setToken(response.token);
        
        // Update refresh token if a new one is provided
        if (response.refreshToken) {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }
}

export const authService = new AuthService();