
export interface Action {
  id: number;
  actionId: number;  // Added for compatibility with ActionItem
  actionKey: string;
  title: string;
  description?: string;
}

export interface ActionItem {
  actionId: number;
  actionKey: string;
  title: string;
  description: string;
}

export interface CreateActionDto {
  title: string;
  description?: string;
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
