
// Add missing type
export interface DocumentType {
  id: number;
  typeName: string;
  typeKey: string;
  typeAttr: string;
  documentCounter?: number;
  docCounter?: number;
}

// Add missing SubType type
export interface SubType {
  id: number;
  subTypeKey: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  documentTypeId: number;
  isActive: boolean;
  documentType?: DocumentType;
}

// Create types for CreateLigneRequest and UpdateLigneRequest
export interface CreateLigneRequest {
  title: string;
  article?: string;
  prix?: number;
  documentId: number;
}

export interface UpdateLigneRequest {
  title?: string;
  article?: string;
  prix?: number;
}

export interface CreateSousLigneRequest {
  title: string;
  attribute?: string;
  ligneId: number;
}

// Update Document interface
export interface Document {
  id: number;
  documentKey: string;
  title: string;
  content?: string;
  docDate: Date | string;
  status: number;
  documentAlias: string;
  documentType: {
    id: number;
    typeName: string;
    typeKey: string;
    typeAttr: string;
  };
  subType?: {
    id: number;
    name: string;
    subTypeKey: string;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
  createdByUserId: number;
  currentStepId?: number;
  currentStepTitle?: string;
  circuitId?: number;
  circuit?: {
    id: number;
    title: string;
    steps?: any[];
  };
  isCircuitCompleted: boolean;
  lignesCount?: number;
  sousLignesCount?: number;
  createdBy?: {
    id?: number;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface Ligne {
  id: number;
  documentId: number;
  ligneKey: string;
  title: string;
  article: string;
  prix: number;
  sousLignesCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  document?: Document;
  sousLignes?: SousLigne[];
}

export interface SousLigne {
  id: number;
  ligneId: number;
  title: string;
  attribute: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  ligne?: Ligne;
}
