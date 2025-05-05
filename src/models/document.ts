
import { DocumentType } from './documentType';
import { Step } from './circuit';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  userType?: string;
}

export interface Document {
  id: number;
  documentKey: string;
  documentAlias?: string;
  title: string;
  content?: string;
  status: number;
  docDate: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  createdByUserId: number;
  createdBy: User;
  typeId: number;
  documentType?: DocumentType;
  subTypeId?: number;
  subType?: any;
  circuitId?: number;
  circuit?: any;
  currentStepId?: number;
  currentStep?: Step;
  isCircuitCompleted?: boolean;
  ligneCouter?: number;
  lignesCount?: number; // Alias for compatibility
  lignes?: Ligne[];
}

export interface Ligne {
  id: number;
  documentId: number;
  document?: Document;
  ligneKey: string;
  title: string;
  article: string;
  prix: number;
  sousLigneCounter?: number;
  sousLignesCount?: number; // Alias for compatibility
  createdAt: Date | string;
  updatedAt: Date | string;
  sousLignes?: SousLigne[];
}

export interface SousLigne {
  id: number;
  ligneId: number;
  ligne?: Ligne;
  sousLigneKey: string;
  title: string;
  attribute: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateLigneRequest {
  title: string;
  article: string;
  prix: number;
  documentId: number;
}

export interface UpdateLigneRequest {
  title?: string;
  article?: string;
  prix?: number;
}

export interface CreateSousLigneRequest {
  title: string;
  attribute: string;
  ligneId: number;
}

export interface UpdateSousLigneRequest {
  title?: string;
  attribute?: string;
}

export interface UpdateDocumentRequest {
  title?: string;
  content?: string;
  typeId?: number;
  subTypeId?: number;
  documentAlias?: string;
  docDate?: Date | string;
  circuitId?: number;
}
