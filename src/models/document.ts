// Base document interfaces
export interface Document {
  id: number;
  documentKey: string;
  title: string;
  content?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  docDate: Date | string;
  typeId: number;
  documentType?: DocumentType;
  subTypeId?: number;
  subType?: SubType;
  createdByUserId: number;
  createdBy?: DocumentUser;
  status: number;
  documentAlias: string;
  lignesCount?: number;
  sousLignesCount?: number;
  circuitId?: number;
  currentStepId?: number;
  currentStepTitle?: string;
  isCircuitCompleted: boolean;
}

export interface DocumentType {
  id?: number;
  typeKey: string;
  typeName: string;
  typeAttr: string;
  typeAlias?: string;
  documentCounter?: number;
  docCounter?: number;
}

export interface SubType {
  id: number;
  subTypeKey: string;
  name: string;
  description?: string;
  startDate: Date | string;
  endDate: Date | string;
  documentTypeId: number;
  isActive: boolean;
  documentType?: DocumentType;
}

export interface DocumentUser {
  id?: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  userType?: string;
  isActive?: boolean;
}

// Create and update interfaces
export interface CreateDocumentRequest {
  title: string;
  content?: string;
  typeId: number;
  subTypeId?: number;
  documentAlias?: string;
  docDate?: Date | string;
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
  createdAt: Date | string;
  updatedAt: Date | string;
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
  createdAt: Date | string;
  updatedAt: Date | string;
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

export interface DocumentDto {
  // Add fields as needed
}
