
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
  lignes?: any[];
  createdBy?: User;
  circuit?: any;
  currentStep?: any;
  documentAlias?: string;
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
