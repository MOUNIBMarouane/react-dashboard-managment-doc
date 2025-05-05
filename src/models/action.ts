
export interface Action {
  id: number;
  actionId?: number; // Add for compatibility
  actionKey: string;
  title: string;
  description?: string;
}

export interface ActionForm {
  title: string;
  description?: string;
}

// Update ActionItem to be compatible with Action
export interface ActionItem extends Omit<Action, 'actionKey'> {
  // Additional fields that might be used in ActionsTable
  description: string; // Make description required for ActionItem
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

// Re-export ActionDto from documentCircuit using export type
export type { ActionDto } from './documentCircuit';
