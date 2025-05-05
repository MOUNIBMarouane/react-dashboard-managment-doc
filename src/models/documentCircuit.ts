
export interface DocumentStatusDto {
  statusId: number;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
  completedBy?: string | null;
  completedAt?: string | Date | null;
}

export interface DocumentCircuitHistory {
  id: number;
  documentId: number;
  stepId: number;
  actionId?: number;
  statusId?: number;
  processedByUserId: number;
  processedAt: Date;
  comments: string;
  isApproved: boolean;
  // Add the missing properties used in components
  stepTitle: string;
  circuitDetailId?: number;
  circuitDetailTitle?: string;
  processedBy: string;
  actionTitle?: string;
  statusTitle?: string;
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

export interface MoveDocumentRequest {
  documentId: number;
  currentStepId?: number;
  nextStepId?: number;
  comments: string;
}

export interface ReturnToPreviousRequest {
  documentId: number;
  comments: string;
}

export interface CompleteStatusRequest {
  documentId: number;
  statusId: number;
  isComplete: boolean;
  comments: string;
}

export interface ActionDto {
  actionId: number;
  actionKey?: string;
  title: string;
  description?: string;
}

// Add DocumentStatus as an alias to DocumentStatusDto for backward compatibility
export type DocumentStatus = DocumentStatusDto;
