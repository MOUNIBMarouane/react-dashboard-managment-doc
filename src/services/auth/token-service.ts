
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
      return null;
    }
    
    try {
      // Import here to avoid circular dependency
      const { apiClient } = await import('../api-client');
      
      // Update to match your backend API structure
      const response = await apiClient.post<{ accessToken: string; refreshToken?: string }>('/Auth/refresh-token', { refreshToken });
      
      if (response && response.accessToken) {
        console.log("Token refresh successful, got new token:", response.accessToken);
        return response;
      }
      
      return null;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    }
  }
}

export const tokenService = new TokenService();
