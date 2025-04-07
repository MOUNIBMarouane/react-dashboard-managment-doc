
import { apiClient } from '../api-client';
import { User, AuthResponse, UserLoginRequest, UserRegisterRequest } from './auth-types';
import { userValidationService } from './user-validation-service';
import { tokenService } from './token-service';

/**
 * Main authentication service responsible for login, registration, and session management
 */
class AuthService {
  /**
   * Login user with email or username
   * @param credentials - Login credentials (email/username and password)
   * @returns Promise<AuthResponse> - Authentication response with token and user data
   */
  async login(credentials: { emailOrUsername: string; password: string }): Promise<AuthResponse> {
    try {
      // Update to match your backend API structure
      const response = await apiClient.post<{accessToken: string, refreshToken: string}>('/Auth/login', credentials);
      
      if (response && response.accessToken) {
        apiClient.setToken(response.accessToken);
        
        // Store the refresh token if the API provides one
        if (response.refreshToken) {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
        
        console.log("Login successful, storing tokens:", response);
        return { 
          token: response.accessToken,
          refreshToken: response.refreshToken
        };
      }
      
      throw new Error('No token received from server');
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

  /**
   * Register new user
   * @param userData - User registration data
   * @returns Promise<any> - Registration response
   */
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

  /**
   * Logout user
   * @param userId - Optional user ID for API logout
   */
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

  /**
   * Get current user info
   * @returns Promise<User> - Current user information
   */
  async getUserInfo(): Promise<User> {
    try {
      return await apiClient.get<User>('/Account/user-info');
    } catch (error) {
      throw new Error('Failed to retrieve user information');
    }
  }

  /**
   * Check if user is authenticated
   * @returns boolean - True if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!apiClient.getToken();
  }

  /**
   * Refresh authentication token
   * @returns Promise<boolean> - True if token refresh was successful
   */
  async refreshAuthToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      console.log("No refresh token found in localStorage");
      return false;
    }
    
    try {
      console.log("Attempting to refresh token with:", refreshToken);
      const response = await tokenService.refreshAuthToken(refreshToken);
      
      if (response && response.accessToken) {
        apiClient.setToken(response.accessToken);
        console.log("Token refreshed successfully");
        return true;
      }
      
      console.log("Token refresh failed - no token in response");
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }

  // Re-export user validation methods for convenience
  validateUsername = userValidationService.validateUsername;
  validateEmail = userValidationService.validateEmail;
  verifyEmail = userValidationService.verifyEmail;
}

export const authService = new AuthService();
