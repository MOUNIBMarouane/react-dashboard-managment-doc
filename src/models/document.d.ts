
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
  createdBy?: any; // User info
  circuitId?: number;
  circuit?: any; // Circuit info
  currentStepId?: number;
  currentStep?: any; // Step info
  isCircuitCompleted?: boolean;
  lignesCount?: number;
  sousLignesCount?: number;
}

export interface DocumentType {
  id: number;
  typeKey: string;
  typeName: string;
  typeAttr?: string;
  documentCounter?: number;
  docCounter?: number;
}

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

export interface DocumentLigne {
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
  sousLignes?: DocumentSousLigne[];
  sousLignesCount?: number;
}

export interface DocumentSousLigne {
  id: number;
  ligneId: number;
  ligne?: DocumentLigne;
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
