
export interface Circuit {
  id: number;
  circuitKey: string;
  title: string;
  descriptif: string;  // Making this required since it's expected in some components
  crdCounter: number;
  isActive: boolean;
  hasOrderedFlow: boolean;
  allowBacktrack?: boolean;
  steps?: Step[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  responsibleRole?: {
    id: number;
    roleName: string;
  };
  nextStepId?: number;
  prevStepId?: number;
  isFinalStep: boolean;
  createdAt?: string;
  updatedAt?: string;
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

export interface CircuitDetail {
  id: number;
  title: string;
  descriptif?: string;
  orderIndex: number;
  responsibleRoleId?: number;
  isFinalStep: boolean;
  circuitId: number;
}

// Add new interfaces for use with services
export interface CreateCircuitDto {
  title: string;
  descriptif: string; // Making this required to match Circuit
  hasOrderedFlow: boolean;
  allowBacktrack?: boolean;
  isActive: boolean;
}

// Add StepFilterOptions for useStepsManagement.ts
export interface StepFilterOptions {
  search?: string;
  circuitId?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
}
