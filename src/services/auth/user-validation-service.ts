
import { apiClient } from '../api-client';

interface ValideUsernameRequest {
  username: string;
}

interface ValideEmailRequest {
  email: string;
}

interface VerifyEmailRequest {
  email: string;
  verificationCode: string;
}

interface ResendCodeRequest {
  email: string;
}

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
      const request: ValideUsernameRequest = { username };
      const response = await apiClient.post<string>('/Auth/valide-username', request);
      return response === "True";
    } catch (error) {
      console.error("Error validating username:", error);
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
      const request: ValideEmailRequest = { email };
      const response = await apiClient.post<string>('/Auth/valide-email', request);
      return response === "True";
    } catch (error) {
      console.error("Error validating email:", error);
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
      const request: VerifyEmailRequest = { email, verificationCode };
      const response = await apiClient.post<string>('/Auth/verify-email', request);
      return response === "Email verified successfully!";
    } catch (error: any) {
      console.error("Error verifying email:", error);
      throw new Error(error.message || "Failed to verify email. Please try again.");
    }
  }

  /**
   * Resend verification code to user's email
   * @param email - Email to send verification code to
   * @returns Promise<boolean> - True if resending verification code is successful
   */
  async resendVerificationCode(email: string): Promise<boolean> {
    try {
      const request: ResendCodeRequest = { email };
      const response = await apiClient.post<string>('/Account/resend-code', request);
      return response.includes("Verification Code Is reSent");
    } catch (error: any) {
      console.error("Error resending verification code:", error);
      throw new Error(error.message || "Failed to resend verification code. Please try again later.");
    }
  }
}

export const userValidationService = new UserValidationService();
