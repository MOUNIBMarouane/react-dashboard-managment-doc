
export interface Action {
  id: number;
  actionKey: string;
  title: string;
  description?: string;
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

export interface ActionItem {
  id: number;
  actionKey: string;
  title: string;
  description: string;
}
