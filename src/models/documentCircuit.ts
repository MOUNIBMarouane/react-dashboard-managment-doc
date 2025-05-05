
import { User } from './user';
import { Step } from './step';
import { ActionDto } from './action';

export interface DocumentCircuitHistory {
  id: number;
  documentId: number;
  stepId: number;
  step?: Step;
  actionId?: number;
  action?: ActionDto;
  statusId?: number;
  status?: any;
  processedByUserId: number;
  processedBy?: string;
  processedAt: string | Date;
  comments: string;
  isApproved: boolean;
  circuitDetailId?: number;
  circuitDetailTitle?: string;
  // Add missing properties referenced in components
  stepTitle?: string;
  actionTitle?: string;
  statusTitle?: string;
  userName?: string;
  createdAt?: string | Date;
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

export interface DocumentStatusDto {
  statusId: number;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
  completedBy?: string;
  completedAt?: string | Date;
}

// Alias to maintain compatibility with existing code
export type DocumentStatus = DocumentStatusDto;

// Explicit export of ActionDto to resolve import issues
export { ActionDto };
