
export interface Action {
  id: number;
  actionId: number;
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
  description?: string;
}

export interface CreateActionDto {
  title: string;
  description?: string;
  isActive?: boolean;
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
