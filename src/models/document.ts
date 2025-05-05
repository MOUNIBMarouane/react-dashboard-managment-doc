export interface Document {
  id: number;
  documentKey: string;
  documentAlias: string;
  title: string;
  content?: string;
  status: number;
  docDate: Date;
  createdAt: Date | string;
  updatedAt: Date | string;
  typeId: number;
  subTypeId?: number;
  createdByUserId: number;
  circuitId?: number;
  currentStepId?: number;
  isCircuitCompleted: boolean;
  lignesCount?: number;
  documentType?: DocumentType;
  subType?: SubType;
  createdBy?: {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  };
  currentStep?: {
    id: number;
    title: string;
  };
  circuit?: {
    id: number;
    title: string;
  };
  lignes?: Ligne[];
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
  description?: string;
  startDate: Date | string;
  endDate: Date | string;
  documentTypeId: number;
  isActive: boolean;
}

export interface Ligne {
  id: number;
  documentId: number;
  ligneKey: string;
  title: string;
  article: string;
  prix: number;
  sousLigneCounter?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  document?: Document;
  sousLignes?: SousLigne[];
}

export interface SousLigne {
  id: number;
  ligneId: number;
  sousLigneKey: string;
  title: string;
  attribute: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  ligne?: Ligne;
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

export interface UpdateDocumentRequest {
  title?: string;
  content?: string;
  typeId?: number;
  subTypeId?: number;
  documentAlias?: string;
  docDate?: string | Date;
  circuitId?: number;
}
