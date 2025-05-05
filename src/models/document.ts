
import { DocumentType } from './documentType';
import { User } from './user';
import { Step } from './step.d';

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
