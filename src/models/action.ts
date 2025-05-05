
export interface Action {
  id: number;
  actionId: number;
  actionKey: string;
  title: string;
  description: string;
}

export interface ActionDto {
  actionId: number;
  actionKey: string;
  title: string;
  description: string;
}

export interface CreateActionDto {
  title: string;
  description: string;
}

export interface UpdateActionDto {
  title?: string;
  description?: string;
}

export interface ActionItem {
  id: number;
  actionId: number;
  actionKey: string;
  title: string;
  description: string;
}

export interface ActionStatusEffect {
  statusId: number;
  setsComplete: boolean;
}

export interface AssignActionToStepDto {
  stepId: number;
  actionId: number;
  statusEffects?: ActionStatusEffect[];
}

// Define MoveDocumentStepRequest with all required properties
export interface MoveDocumentStepRequest {
  documentId: number;
  currentStepId: number;
  nextStepId: number;
  comments: string;
}
