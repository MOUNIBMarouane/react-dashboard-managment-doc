
// If this file doesn't exist, we'll create it with the necessary types
export interface AuthResponse {
  token: string;
  user?: User;
  expiresAt?: string;
  refreshToken?: string;
}

export interface UserLoginRequest {
  emailOrUsername: string;
  password: string;
}

export interface UserRegisterRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  profilePicture?: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  username?: string;
  profilePicture?: string;
  country?: string;
  city?: string;
  phoneNumber?: string;
  address?: string;
  backgroundPicture?: string;
  currentPassword?: string;
  newPassword?: string;
}
