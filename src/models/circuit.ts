
export interface Circuit {
  id: number;
  circuitKey: string;
  title: string;
  descriptif: string;
  isActive: boolean;
  crdCounter?: number;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  steps?: Step[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCircuitDto {
  title: string;
  descriptif: string;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  isActive: boolean;
}

export interface CircuitDetail {
  id: number;
  circuitDetailKey: string;
  circuitId: number;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  isFinalStep: boolean;
  nextStepId?: number;
  prevStepId?: number;
}

export interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  isFinalStep: boolean;
  nextStepId?: number;
  prevStepId?: number;
  circuit?: Circuit;
  statuses?: Status[];
  stepActions?: StepAction[];
}

export interface Status {
  id: number;
  statusKey: string;
  stepId: number;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
}

export interface StepAction {
  id: number;
  stepId: number;
  actionId: number;
}

export interface ActionDto {
  actionId: number;
  actionKey?: string;
  title: string;
  description: string;
}

export interface StepFilterOptions {
  circuit?: number;
  responsibleRole?: number;
  isFinalStep?: boolean;
  search?: string;
  circuitId?: number;
  status?: 'active' | 'inactive' | 'all';
}

export interface UpdateActionDto {
  title?: string;
  description?: string;
}

export interface CreateActionDto {
  title: string;
  description: string;
}
