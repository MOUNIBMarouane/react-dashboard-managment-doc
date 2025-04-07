
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

// New types for improved auth handling
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginRequest {
  emailOrUsername: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  success: boolean;
  requiresVerification?: boolean;
}
