
import { Step } from './step';

export interface Circuit {
  id: number;
  circuitKey: string;
  title: string;
  descriptif: string;  // Make this required to align with all usages
  isActive?: boolean;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  steps: Step[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
  crdCounter?: number;
}

export interface CircuitDto {
  id: number;
  circuitKey: string;
  title: string;
  descriptif: string;
  isActive: boolean;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  steps: Step[];
}

export interface CreateCircuitDto {
  title: string;
  descriptif: string;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  isActive: boolean;
  steps?: Partial<Step>[];
}

export interface UpdateCircuitDto {
  title?: string;
  descriptif?: string;
  hasOrderedFlow?: boolean;
  allowBacktrack?: boolean;
  isActive?: boolean;
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
  circuitId?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
  search?: string;
}

// Use export type for re-exports to fix isolatedModules errors
export type { Step } from './step';
export type { CreateStepDto, UpdateStepDto } from './step';
