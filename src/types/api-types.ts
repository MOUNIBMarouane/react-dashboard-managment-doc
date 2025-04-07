
// Authentication types
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

// Circuit types
export interface Circuit {
  id: number;
  name: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CircuitDetail {
  id: number;
  circuitId: number;
  name: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Document types
export interface Document {
  id: number;
  title: string;
  description?: string;
  typeId: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DocumentType {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDocumentRequest {
  title: string;
  description?: string;
  typeId: number;
  status?: string;
}

export interface UpdateDocumentRequest {
  title?: string;
  description?: string;
  typeId?: number;
  status?: string;
}

// Ligne types
export interface Ligne {
  id: number;
  documentId: number;
  content: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLigneRequest {
  documentId: number;
  content: string;
  order: number;
}

export interface SousLigne {
  id: number;
  ligneId: number;
  content: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSousLigneRequest {
  ligneId: number;
  content: string;
  order: number;
}
