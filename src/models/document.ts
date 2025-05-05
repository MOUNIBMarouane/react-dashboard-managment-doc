
export interface Document {
  id: number;
  documentKey: string;
  title: string;
  content?: string;
  status: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  createdByUserId: number;
  typeId: number;
  subTypeId?: number;
  documentType?: DocumentType;
  subType?: SubType;
  circuitId?: number;
  currentStepId?: number;
  isCircuitCompleted?: boolean;
  lignes?: Ligne[];
  createdBy?: User;
  circuit?: any;
  currentStep?: any;
  documentAlias?: string;
  docDate: Date | string;
  lignesCount: number;
}

export interface DocumentType {
  id: number;
  typeKey: string;
  typeName: string;
  typeAttr: string;
  documentCounter: number;
  docCounter: number;
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

export interface User {
  id: number;
  username: string;
  email: string;
  role?: string | {
    id: number;
    roleName: string;
  };
  firstName?: string;
  lastName?: string;
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
  createdAt: string | Date;
  updatedAt: string | Date;
  sousLignes?: SousLigne[];
  document?: Document;
  sousLignesCount?: number;
}

export interface SousLigne {
  id: number;
  ligneId: number;
  sousLigneKey: string;
  title: string;
  attribute: string;
  createdAt: string | Date;
  updatedAt: string | Date;
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

export interface UpdateDocumentRequest {
  title?: string;
  content?: string;
  typeId?: number;
  subTypeId?: number;
  documentAlias?: string;
  docDate?: string;
  documentCounter?: number;
}
