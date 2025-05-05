
export interface Circuit {
  id: number;
  circuitKey: string;
  title: string;
  descriptif: string;
  isActive: boolean;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  crdCounter: number;
  createdAt?: string;
  updatedAt?: string;
  steps?: Step[];
}

export interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  nextStepId?: number;
  prevStepId?: number;
  isFinalStep: boolean;
  circuit?: Circuit;
  statuses?: Status[];
  stepActions?: StepAction[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Status {
  id: number;
  statusId: number;
  statusKey: string;
  stepId: number;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
  step?: Step;
}

export interface StepAction {
  id: number;
  stepId: number;
  actionId: number;
  step?: Step;
  action?: Action;
}

export interface StepFilterOptions {
  circuit?: string;
  responsible?: string;
  status?: string;
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface Action {
  id: number;
  actionId: number;
  actionKey: string;
  title: string;
  description: string;
}

export interface ActionItem {
  id: number;
  actionId: number; 
  actionKey: string;
  title: string;
  description: string;
}
