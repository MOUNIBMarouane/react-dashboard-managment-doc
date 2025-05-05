
// Base document interfaces
export interface Document {
  id: number;
  documentKey: string;
  documentAlias: string;
  title: string;
  content?: string;
  status: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  docDate: string | Date;
  typeId: number;
  documentType?: DocumentType;
  subTypeId?: number;
  subType?: SubType;
  createdByUserId: number;
  createdBy?: any;
  circuitId?: number;
  circuit?: any;
  currentStepId?: number | null;
  currentStep?: any;
  isCircuitCompleted: boolean;
  lignesCount: number;
}

export interface DocumentType {
  id?: number;
  typeKey: string;
  typeName: string;
  typeAttr?: string;
  documentCounter?: number;
  docCounter?: number;
}

export interface SubType {
  id: number;
  subTypeKey: string;
  name: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  documentTypeId: number;
  isActive: boolean;
  documentType?: DocumentType;
}

// Create and update interfaces
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
  docDate?: Date;
  circuitId?: number;
}

// Document type-related interfaces
export interface DocumentTypeCreateRequest {
  typeKey: string;
  typeName: string;
  typeAttr?: string;
}

export interface DocumentTypeUpdateRequest {
  typeKey?: string;
  typeName?: string;
  typeAttr?: string;
}

// Ligne-related interfaces
export interface Ligne {
  id: number;
  documentId: number;
  ligneKey: string;
  title: string;
  article: string;
  prix: number;
  sousLigneCounter: number;
  sousLignesCount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  document?: Document;
  sousLignes?: SousLigne[];
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

export interface SousLigne {
  id: number;
  ligneId: number;
  sousLigneKey: string;
  title: string;
  attribute?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  ligne?: Ligne;
}

export interface CreateSousLigneRequest {
  ligneId: number;
  title: string;
  attribute?: string;
}

export interface UpdateSousLigneRequest {
  title?: string;
  attribute?: string;
}

// Search and filter interfaces
export interface DocumentSearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: number;
  typeId?: number;
  dateFrom?: string;
  dateTo?: string;
}
