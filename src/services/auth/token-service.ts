
/**
 * Service responsible for token-related operations
 */
class TokenService {
  /**
   * Refresh the authentication token using the stored refresh token
   * @returns Promise<boolean> - True if token refresh was successful
   */
  async refreshAuthToken(refreshToken: string): Promise<{ token: string; refreshToken?: string } | null> {
    if (!refreshToken) {
      return null;
    }
    
    try {
      // Import here to avoid circular dependency
      const { apiClient } = await import('../api-client');
      
      const response = await apiClient.post<{ token: string; refreshToken?: string }>('/Auth/refresh-token', { refreshToken });
      
      if (response && response.token) {
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
