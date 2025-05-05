
// Export all types from the .ts file
export * from './documentCircuit';

// Update and harmonize type definitions
export interface DocumentCircuitHistory {
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
  createdAt?: string;
  circuitDetailId?: number;
  circuitDetailTitle?: string;
  userName?: string;
}

export interface DocumentStatus {
  statusId: number;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
  completedBy?: string;
  completedAt?: string | Date;
}

export interface DocumentWorkflowStatus {
  documentId: number;
  documentTitle: string;
  circuitId?: number;
  circuitTitle?: string;
  currentStepId?: number;
  currentStepTitle?: string;
  status: number;
  statusText: string;
  isCircuitCompleted: boolean;
  statuses: DocumentStatus[];
  availableActions: ActionDto[];
  canAdvanceToNextStep: boolean;
  canReturnToPreviousStep: boolean;
}

export interface ActionDto {
  actionId: number;
  actionKey?: string;
  title: string;
  description?: string;
}
