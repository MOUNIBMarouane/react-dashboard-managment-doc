
interface Circuit {
  id: number;
  circuitKey: string;
  title: string;
  descriptif?: string;
  crdCounter: number;
  isActive: boolean;
  hasOrderedFlow: boolean;
  allowBacktrack?: boolean;
  createdAt?: string;
  updatedAt?: string;
  steps?: Step[];
}

interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  responsibleRole?: {
    id: number;
    roleName: string;
  };
  nextStepId?: number;
  prevStepId?: number;
  isFinalStep: boolean;
  createdAt?: string;
  updatedAt?: string;
  statuses?: Status[];
  stepActions?: StepAction[];
}

interface Status {
  id: number;
  statusKey: string;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
  stepId: number;
}

interface StepAction {
  id: number;
  stepId: number;
  actionId: number;
  action?: Action;
}

interface AssignCircuitRequest {
  documentId: number;
  circuitId: number;
  comments?: string;
}

interface ProcessCircuitRequest {
  documentId: number;
  actionId: number;
  comments: string;
  isApproved: boolean;
}

interface MoveDocumentStepRequest {
  documentId: number;
  currentStepId: number;
  nextStepId: number;
  comments: string;
}

interface DocumentCircuitHistoryDto {
  id: number;
  documentId: number;
  stepId: number;
  actionId?: number;
  statusId?: number;
  processedByUserId: number;
  processedBy: string;
  comments: string;
  isApproved: boolean;
  processedAt: string;
  stepTitle: string;
  actionTitle?: string;
  statusTitle?: string;
}

interface CreateStepDto {
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  circuitId: number;
}

interface UpdateStepDto {
  title?: string;
  descriptif?: string;
  orderIndex?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
}

interface StepFilterOptions {
  circuit?: number;
  responsibleRole?: number;
  isFinalStep?: boolean;
  search?: string;
  circuitId?: number;
}
