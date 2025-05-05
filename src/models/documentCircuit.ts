
import { User } from './user';
import { Step } from './step';
import { Action } from './action';

// Define ActionDto explicitly to resolve the "declared locally but not exported" error
export interface ActionDto {
  actionId: number;
  actionKey?: string;
  title: string;
  description?: string;
}

export interface DocumentCircuitHistory {
  id: number;
  documentId: number;
  stepId: number;
  step?: Step;
  actionId?: number;
  action?: Action;
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
  statusKey?: string; // Add this property to fix errors
  title: string;
  isRequired: boolean;
  isComplete: boolean;
  completedBy?: string;
  completedAt?: string | Date;
}

// Export a type alias for compatibility
export type DocumentStatus = DocumentStatusDto;

// Add StatusEffectDto interface for AssignActionDialog
export interface StatusEffectDto {
  statusId: number;
  setsComplete: boolean;
}
