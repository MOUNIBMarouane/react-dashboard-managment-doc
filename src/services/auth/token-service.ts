
/**
 * Service responsible for token-related operations
 */
class TokenService {
  /**
   * Refresh the authentication token using the stored refresh token
   * @returns Promise<boolean> - True if token refresh was successful
   */
  async refreshAuthToken(refreshToken: string): Promise<{ accessToken: string; refreshToken?: string } | null> {
    if (!refreshToken) {
      console.log("No refresh token provided");
      return null;
    }
    
    try {
      // Import here to avoid circular dependency
      const { apiClient } = await import('../api-client');
      
      console.log("Attempting to refresh token with:", refreshToken);
      
      // Update to match your backend API structure
      const response = await apiClient.post<{ accessToken: string; refreshToken?: string }>('/Auth/refresh-token', { refreshToken });
      
      if (response && response.accessToken) {
        console.log("Token refresh successful, got new token:", response.accessToken);
        return response;
      }
      
      console.log("Token refresh failed - no token in response");
      return null;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    }
  }

  /**
   * Store token in localStorage
   */
  storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('auth_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    console.log("Tokens stored in localStorage");
  }

  /**
   * Clear tokens from localStorage
   */
  clearTokens(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    console.log("Tokens cleared from localStorage");
  }
}

export const tokenService = new TokenService();
