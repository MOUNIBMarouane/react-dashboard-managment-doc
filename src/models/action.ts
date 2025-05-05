
export interface Action {
  id: number;
  actionId: number;  // Added for compatibility with ActionItem
  actionKey: string;
  title: string;
  description?: string;
  isActive?: boolean;
}

export interface ActionItem {
  id: number;  
  actionId: number;
  actionKey: string;
  title: string;
  description: string;
}

export interface CreateActionDto {
  title: string;
  description?: string;
}

export interface UpdateActionDto {
  title?: string;
  description?: string;
  isActive?: boolean;
}

export interface AssignActionToStepDto {
  stepId: number;
  actionId: number;
  statusEffects?: StatusEffectDto[];
}

export interface StatusEffectDto {
  statusId: number;
  setsComplete: boolean;
}

export interface ProcessCircuitRequest {
  documentId: number;
  actionId: number;
  comments: string;
  isApproved: boolean;
}
