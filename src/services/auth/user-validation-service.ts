
import { apiClient } from '../api-client';

/**
 * Service responsible for user validation operations
 */
class UserValidationService {
  /**
   * Check if username is already taken
   * @param username - Username to validate
   * @returns Promise<boolean> - True if username is valid and available
   */
  async validateUsername(username: string): Promise<boolean> {
    try {
      const response = await apiClient.post('/Auth/valide-username', { username });
      return !!response;
    } catch (error) {
      return false; // Assume username is taken if validation fails
    }
  }

  /**
   * Check if email is already taken
   * @param email - Email to validate
   * @returns Promise<boolean> - True if email is valid and available
   */
  async validateEmail(email: string): Promise<boolean> {
    try {
      const response = await apiClient.post('/Auth/valide-email', { email });
      return !!response;
    } catch (error) {
      return false; // Assume email is taken if validation fails
    }
  }

  /**
   * Verify email with verification code
   * @param email - Email to verify
   * @param verificationCode - Verification code sent to the email
   * @returns Promise<boolean> - True if email verification is successful
   */
  async verifyEmail(email: string, verificationCode: string): Promise<boolean> {
    try {
      const response = await apiClient.post('/Auth/verify-email', { email, verificationCode });
      return !!response;
    } catch (error) {
      return false;
    }
  }
}

export const userValidationService = new UserValidationService();
