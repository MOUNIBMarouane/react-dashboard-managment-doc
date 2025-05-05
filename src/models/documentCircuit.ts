
import { ActionDto } from '@/models/action';

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

export interface ActionDto {
  actionId: number;
  title: string;
  description?: string;
}

export interface DocumentHistoryDto {
  id: number;
  stepTitle: string;
  actionTitle?: string;
  statusTitle?: string;
  processedBy: string;
  processedAt: string;
  comments: string;
  isApproved: boolean;
}
