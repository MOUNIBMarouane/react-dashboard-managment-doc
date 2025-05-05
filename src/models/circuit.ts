
// Import the Step interface from step.ts
import { Step, Status, StepAction } from './step';
import { ActionDto } from './action';

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

export interface StepFilterOptions {
  circuit?: number;
  responsibleRole?: number;
  isFinalStep?: boolean;
  search?: string;
  circuitId?: number;
  status?: 'active' | 'inactive' | 'all';
}

// Re-export Step, Status, and StepAction to avoid circular references
export { Step, Status, StepAction } from './step';
