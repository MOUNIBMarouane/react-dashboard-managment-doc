
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
