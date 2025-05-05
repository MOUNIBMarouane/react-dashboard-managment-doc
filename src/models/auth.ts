
export interface User {
  id?: string; // Make id optional
  userId?: string; // Add userId to match UserInfo
  email: string;
  firstName: string;
  lastName: string;
  role?: string; // Make role optional to match UserInfo
  username?: string;
  profilePicture?: string;
  address?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
  isActive?: boolean;
  isOnline?: boolean;
}

export interface UserInfo {
  id: string; // Make sure id exists
  userId?: string;
  username?: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  profilePicture?: string;
  isActive?: boolean;
  isOnline?: boolean;
}

export interface LoginRequest {
  emailOrUsername: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: UserInfo;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}
