
import { ActionItem } from "./actionItem";

export interface AssignCircuitRequest {
  documentId: number;
  circuitId: number;
  comments?: string;
}

export interface MoveToNextStepRequest {
  documentId: number;
  comments?: string;
  nextStepId?: number;
  currentStepId?: number;
}

export interface ProcessCircuitRequest {
  documentId: number;
  actionId: number;
  comments?: string;
  isApproved?: boolean;
}

export interface DocumentCircuitHistory {
  id: number;
  documentId: number;
  circuitDetailId: number;
  processedByUserId: number;
  processedBy?: string;
  userName?: string; // Adding this for backward compatibility
  processedAt: string;
  comments: string;
  isApproved: boolean;
  stepTitle?: string;
  actionTitle?: string;
  statusTitle?: string;
  circuitDetail?: {
    title: string;
    orderIndex: number;
  };
}

export interface DocumentHistoryDto {
  id: number;
  stepTitle: string;
  actionTitle: string;
  statusTitle: string;
  processedBy: string;
  processedAt: string;
  comments: string;
  isApproved: boolean;
}

export interface DocumentStatus {
  statusId: number;
  statusKey?: string;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
  completedBy?: string;
  completedAt?: string;
}

export interface ActionDto {
  actionId: number;
  actionKey?: string;
  title: string;
  description?: string;
}

export interface StatusEffectDto {
  statusId: number;
  setsComplete: boolean;
}

export interface AssignActionToStepDto {
  stepId: number;
  actionId: number;
  statusEffects?: StatusEffectDto[];
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

export interface CircuitValidation {
  circuitId: number;
  circuitTitle: string;
  hasSteps: boolean;
  totalSteps: number;
  allStepsHaveStatuses: boolean;
  isValid: boolean;
  stepsWithoutStatuses: {
    stepId: number;
    stepTitle: string;
    order: number;
  }[];
}
