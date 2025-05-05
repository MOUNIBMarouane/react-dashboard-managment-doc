
export interface Circuit {
  id: number;
  circuitKey: string;
  title: string;
  descriptif?: string;
  crdCounter?: number;
  isActive?: boolean;
  hasOrderedFlow?: boolean;
  allowBacktrack?: boolean;
  steps?: Step[];
  createdAt?: string | Date;
}

export interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  title: string;
  descriptif?: string;
  orderIndex: number;
  responsibleRoleId?: number | null;
  isFinalStep: boolean;
  nextStepId?: number | null;
  prevStepId?: number | null;
}

export interface CircuitDetail {
  id: number;
  circuitId: number;
  title: string;
  descriptif?: string;
  orderIndex: number;
  responsibleRoleId?: number | null;
  stepKey: string;
  isFinalStep: boolean;
}

export interface CreateCircuitDto {
  title: string;
  descriptif?: string;
  hasOrderedFlow?: boolean;
  allowBacktrack?: boolean;
  isActive?: boolean;
}

export interface AssignCircuitRequest {
  documentId: number;
  circuitId: number;
}

export interface Status {
  id: number;
  statusKey: string;
  stepId: number;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
}

export interface StepFilterOptions {
  searchQuery?: string;
  circuitId?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
}
