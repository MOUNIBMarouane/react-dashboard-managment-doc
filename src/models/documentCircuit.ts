
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

export interface DocumentStatusDto {
  statusId: number;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
  completedBy?: string;
  completedAt?: string | Date;
}

export interface ActionDto {
  actionId: number;
  title: string;
  description: string;
}

export interface DocumentCircuitHistory {
  id: number;
  documentId: number;
  stepId: number;
  circuitDetailId?: number;
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
  createdAt?: string;
  circuitDetailTitle?: string;
  userName?: string;
}

export interface MoveDocumentRequest {
  documentId: number;
  currentStepId: number;
  nextStepId: number;
  comments: string;
}

export interface CircuitDetail {
  id: number;
  circuitId: number;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  isFinalStep: boolean;
  circuitDetailKey: string;
  nextStepId?: number;
  prevStepId?: number;
}
