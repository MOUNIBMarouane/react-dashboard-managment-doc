// src/types/api-types.ts

// User related types
export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isEmailConfirmed: boolean;
  isActive: boolean;
  isOnline: boolean;
  lastLogin?: string;
  createdAt: string;
  profilePicture?: string;
  backgroundPicture?: string;
  city?: string;
  address?: string;
  phoneNumber?: string;
  country?: string;
  roleId: number;
  role?: string;
}

export interface UserLoginRequest {
  emailOrUsername: string;
  password: string;
}

export interface UserRegisterRequest {
  email: string;
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  city?: string;
  address?: string;
  phoneNumber?: string;
  country?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
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

// Circuit related types
export interface Circuit {
  id: number;
  circuitKey: string;
  title: string;
  descriptif: string;
  isActive: boolean;
  crdCounter: number;
  circuitDetails?: CircuitDetail[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CircuitDetail {
  id: number;
  circuitDetailKey: string;
  circuitId: number;
  circuit?: string; // This might be the full circuit object in responses
  title: string;
  descriptif: string;
  createdAt?: string;
  updatedAt?: string;
}

// Document related types
export interface DocumentType {
  typeAlias: string;
  typeKey: string;
  typeName: string;
  typeAttr: string;
}

export interface CircuitSummary {
  circuitId: string;
  title: string;
  descriptif: string;
  isActive: boolean;
}

export interface UserSummary {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Document {
  id: number;
  title: string;
  content: string;
  documentKey: string;
  documentAlias: string;
  typeId: number;
  docDate: string;
  documentType?: DocumentType;
  circuitId?: number;
  circuit?: CircuitSummary;
  createdAt: string;
  updatedAt?: string;
  status: number; // This might be better as an enum
  lignesCount: number;
  sousLignesCount: number;
  createdByUserId: number;
  createdBy?: UserSummary;
}

export interface CreateDocumentRequest {
  title: string;
  content: string;
  documentAlias?: string;
  docDate?: string;
  createdByUserId: number;
  circuitId?: number;
  typeId?: number;
  status: number;
}

export interface UpdateDocumentRequest {
  title?: string;
  content?: string;
  documentAlias?: string;
  docDate?: string;
  typeId?: number;
  circuitId?: number;
  status?: number;
}

// Ligne related types
export interface Ligne {
  id: number;
  documentId: number;
  lingeKey: string; // Note: There seems to be a typo in API vs payload (lingeKey vs ligneKey)
  title: string;
  article?: string;
  prix?: number;
  sousLignesCount: number;
  createdAt: string;
  updatedAt?: string;
  document?: Document;
}

export interface CreateLigneRequest {
  documentId: number;
  ligneKey?: string;
  title: string;
  article?: string;
  prix?: number;
  sousLigneCounter?: number;
  createdAt?: string;
  updatedAt?: string;
}

// SousLigne related types
export interface SousLigne {
  id: number;
  ligneId: number;
  sousLigneKey: string;
  title: string;
  attribute?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateSousLigneRequest {
  ligneId: number;
  sousLigneKey?: string;
  title: string;
  attribute?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Enum for document status
export enum DocumentStatus {
  Draft = 0,
  InReview = 1,
  Approved = 2,
  Rejected = 3,
  Published = 4,
  Archived = 5
}