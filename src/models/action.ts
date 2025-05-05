
export interface Action {
  id: number;
  actionKey: string;
  title: string;
  description?: string;
}

export interface ActionItem extends Action {
  // Additional fields that might be used in ActionsTable
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateActionDto {
  title: string;
  description?: string;
}

export interface UpdateActionDto extends Partial<CreateActionDto> {
  // Additional fields that might be needed for updates
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
