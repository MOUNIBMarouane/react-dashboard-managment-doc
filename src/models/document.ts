
import { DocumentType } from './documentType';
import { SubType } from './subtype';
import { User } from './user';
import { Circuit } from './circuit';
import { Step } from './step';

export interface Document {
  id: number;
  documentKey: string;
  documentAlias?: string;
  title: string;
  content?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  docDate: Date | string;
  status: number;
  typeId: number;
  documentType?: DocumentType;
  subTypeId?: number;
  subType?: SubType;
  createdByUserId: number;
  createdBy?: User;
  circuitId?: number;
  circuit?: Circuit;
  currentStepId?: number;
  currentStep?: Step;
  isCircuitCompleted?: boolean;
  lignesCount?: number;
  sousLignesCount?: number;
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

export interface Ligne {
  id: number;
  documentId: number;
  document?: Document;
  ligneKey: string;
  title: string;
  article: string;
  prix: number;
  sousLigneCounter: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  sousLignes?: SousLigne[];
  sousLignesCount?: number;
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
  documentId: number;
  title: string;
  article: string;
  prix: number;
}

export interface UpdateLigneRequest {
  title?: string;
  article?: string;
  prix?: number;
}

export interface CreateSousLigneRequest {
  ligneId: number;
  title: string;
  attribute: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role?: string;
}

// Re-export DocumentType to fix import issues
export { DocumentType } from './documentType';
