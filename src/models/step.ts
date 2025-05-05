
export interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  title: string;
  descriptif?: string;
  orderIndex: number;
  responsibleRoleId?: number | null;
  responsibleRole?: {
    id: number;
    roleName: string;
  };
  nextStepId?: number;
  prevStepId?: number;
  isFinalStep: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  statuses?: Status[];
  stepActions?: StepAction[];
}

export interface Status {
  id: number;
  statusKey: string;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
  stepId: number;
}

export interface StepAction {
  id: number;
  stepId: number;
  actionId: number;
  action?: Action;
}

export interface CreateStepDto {
  circuitId: number;
  title: string;
  descriptif?: string;
  orderIndex: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
}

export interface UpdateStepDto {
  title?: string;
  descriptif?: string;
  orderIndex?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
}

export interface StepFilterOptions {
  circuitId?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
  search?: string;
}

interface Action {
  id: number;
  actionKey: string;
  title: string;
  description?: string;
}
