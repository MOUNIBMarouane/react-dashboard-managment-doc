
export interface Circuit {
  id: number;
  circuitKey: string;
  title: string;
  descriptif: string;
  isActive: boolean;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  crdCounter?: number;
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
}

export interface Status {
  id: number;
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
