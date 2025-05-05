
export interface Document {
  id: number;
  documentKey: string;
  documentAlias?: string;
  title: string;
  content?: string;
  status: number;
  docDate: string;
  createdAt: string;
  updatedAt: string;
  typeId: number;
  subTypeId?: number;
  documentType?: DocumentType;
  createdByUserId?: number;
  createdBy?: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email?: string;
    role?: string;
  };
  circuitId?: number;
  circuit?: {
    id: number;
    title: string;
  };
  currentStepId?: number;
  currentStep?: {
    id: number;
    title: string;
  };
  isCircuitCompleted: boolean;
  lignesCount?: number;
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
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  documentTypeId: number;
  isActive: boolean;
  documentType?: DocumentType;
}

export interface Ligne {
  id: number;
  documentId: number;
  ligneKey: string;
  title: string;
  article: string;
  prix: number;
  price?: number;
  sousLigneCounter?: number;
  createdAt: string;
  updatedAt: string;
  document?: Document;
  sousLignes?: SousLigne[];
}

export interface SousLigne {
  id: number;
  ligneId: number;
  sousLigneKey: string;
  title: string;
  attribute: string;
  createdAt: string;
  updatedAt: string;
  ligne?: Ligne;
}

export interface CreateLigneRequest {
  documentId: number;
  title: string;
  article: string;
  price?: number;
  prix?: number;
}

export interface UpdateLigneRequest {
  title?: string;
  article?: string;
  price?: number;
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
  docDate?: string;
  circuitId?: number;
}
