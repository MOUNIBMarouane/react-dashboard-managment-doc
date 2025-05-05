
// Add or update this interface to include isCircuitCompleted

export interface Document {
  id: number;
  documentKey: string;
  documentAlias: string;
  title: string;
  content?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  docDate: string | Date;
  status: number;
  typeId: number;
  documentType: {
    id: number;
    typeName: string;
    typeKey: string;
    typeAttr: string;
  };
  subTypeId?: number;
  subType?: {
    id: number;
    name: string;
    description?: string;
    subTypeKey: string;
  };
  createdByUserId: number;
  createdBy: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    role?: string;
  };
  circuitId?: number;
  circuit?: any;
  currentStepId?: number;
  currentStep?: any;
  isCircuitCompleted: boolean;
  lignes?: Ligne[];
  lignesCount?: number;
  sousLignesCount?: number;
}

export interface Ligne {
  id: number;
  documentId: number;
  ligneKey: string;
  title: string;
  article: string;
  prix: number;
  sousLigneCounter: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  sousLignes?: SousLigne[];
}

export interface SousLigne {
  id: number;
  ligneId: number;
  sousLigneKey: string;
  title: string;
  attribute: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CreateDocumentRequest {
  title: string;
  content?: string;
  typeId: number;
  subTypeId?: number;
  documentAlias?: string;
  docDate?: Date;
  circuitId?: number;
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

export interface UpdateSousLigneRequest {
  title?: string;
  attribute?: string;
}

// Re-export DocumentType from documentType.ts to maintain compatibility
export { DocumentType } from './documentType';
