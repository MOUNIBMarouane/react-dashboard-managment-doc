
import { ActionItem } from "./actionItem";

export interface AssignCircuitRequest {
  documentId: number;
  circuitId: number;
}

export interface MoveToNextStepRequest {
  documentId: number;
  comments?: string;
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
  processedAt: string;
  comments: string;
  isApproved: boolean;
  stepTitle?: string;
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
  title: string;
  isRequired: boolean;
  isComplete: boolean;
  completedBy?: string;
  completedAt?: string;
}

export interface ActionDto {
  actionId: number;
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
