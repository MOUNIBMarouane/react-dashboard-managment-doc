
export interface Document {
  id: number;
  documentKey: string;
  title: string;
  content?: string;
  documentAlias?: string;
  status: number;
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
  createdAt: string;
  updatedAt: string;
  docDate: string;
  isCircuitCompleted: boolean;
  documentType?: {
    id: number;
    typeKey: string;
    typeName: string;
    typeAttr?: string;
  };
  createdBy?: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    role?: string;
  };
  lignes: any[];
}
