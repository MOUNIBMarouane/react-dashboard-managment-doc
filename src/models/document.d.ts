
// Basic document interfaces
interface Document {
  id: number;
  title: string;
  content?: string;
  documentKey: string;
  documentAlias: string;
  createdAt: string;
  updatedAt: string;
  status: number;
  typeId: number;
  createdByUserId: number;
  docDate: string;
  lignesCount: number;
  subTypeId?: number;
  circuitId?: number;
  currentStepId?: number;
  currentStep?: {
    id: number;
    title: string;
  };
  circuit?: {
    id: number;
    title: string;
    steps?: Step[];
  };
  documentType?: {
    id: number;
    typeName: string;
    typeKey: string;
  };
  createdBy?: {
    id: number;
    username: string;
    email: string;
  };
  isCircuitCompleted: boolean;
}

// DocumentType interface
interface DocumentType {
  id: number;
  typeKey: string;
  typeName: string;
  typeAttr: string;
  documentCounter: number;
  docCounter: number;
}

// Interface for document creation
interface CreateDocumentDto {
  title: string;
  content?: string;
  typeId: number;
  subTypeId?: number;
  documentAlias?: string;
  docDate?: string;
}

// Interface for document update
interface UpdateDocumentDto {
  title?: string;
  content?: string;
  typeId?: number;
  subTypeId?: number;
  documentAlias?: string;
  docDate?: string;
}

// Interface for document filter options
interface DocumentFilterOptions {
  search?: string;
  status?: number;
  typeId?: number;
  subTypeId?: number;
  createdByUserId?: number;
  dateFrom?: string;
  dateTo?: string;
  circuitId?: number;
}
