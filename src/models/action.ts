
export interface Action {
  id: number;
  actionId: number;  // Added for compatibility with ActionItem
  actionKey: string;
  title: string;
  description?: string;
}

export interface ActionItem {
  id: number;  // Adding id property to fix errors
  actionId: number;
  actionKey: string;
  title: string;
  description: string;
}

export interface CreateActionDto {
  title: string;
  description?: string;
}

// Add UpdateActionDto which was referenced but not defined
export interface UpdateActionDto {
  title?: string;
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
