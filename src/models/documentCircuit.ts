
import { Action } from './action';

export interface DocumentWorkflowStatus {
  documentId: number;
  documentTitle: string;
  circuitId: number | null;
  circuitTitle: string;
  currentStepId: number | null;
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
  completedBy?: string | null;
  completedAt?: string | null;
}

// Export alias for backward compatibility
export type DocumentStatus = DocumentStatusDto;

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

export interface ActionDto {
  actionId: number;
  actionKey?: string;
  title: string;
  description?: string;
}

export interface ProcessCircuitRequest {
  documentId: number;
  actionId: number;
  comments: string;
  isApproved: boolean;
}
