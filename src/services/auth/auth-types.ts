
import { User, AuthResponse, UserLoginRequest, UserRegisterRequest, UpdateProfileRequest } from '@/types/api-types';

// Re-export types that are specific to auth service
export type { User, AuthResponse, UserLoginRequest, UserRegisterRequest, UpdateProfileRequest };

// Add missing types that might be used in the auth service
export interface ValideUsernameRequest {
  Username?: string;
  Email?: string;
}

export interface VerifyEmailRequest {
  Email: string;
  VerificationCode: string;
}

export interface LogoutRequest {
  UserId: number;
}
