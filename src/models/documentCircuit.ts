
export interface DocumentCircuitHistory {
  id: number;
  documentId: number;
  circuitDetailId: number;
  processedByUserId: number;
  processedBy: string;
  processedAt: string;
  comments: string;
  isApproved: boolean;
  stepTitle: string;
  circuitDetail: {
    title: string;
    orderIndex: number;
  };
  actionTitle?: string;
  statusTitle?: string;
  userName?: string;
}

export interface DocumentWorkflowStatus {
  documentId: number;
  documentTitle: string;
  circuitId?: number;
  circuitTitle: string;
  currentStepId?: number;
  currentStepTitle: string;
  status: number;
  statusText: string;
  isCircuitCompleted: boolean;
  statuses: DocumentStatusDto[];
  availableActions: ActionDto[];
  canAdvanceToNextStep: boolean;
  canReturnToPreviousStep: boolean;
}

export interface ActionDto {
  actionId: number;
  title: string;
  description: string;
}

export interface DocumentStatusDto {
  statusId: number;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
  completedBy?: string;
  completedAt?: string;
}

export interface AssignCircuitRequest {
  documentId: number;
  circuitId: number;
  comments?: string;
}

export interface MoveToNextStepRequest {
  documentId: number;
  comments?: string;
  currentStepId?: number;
  nextStepId?: number;
}
