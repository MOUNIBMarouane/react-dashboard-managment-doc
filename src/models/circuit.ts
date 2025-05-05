
import { Step } from './step';

export interface Circuit {
  id: number;
  circuitKey: string;
  title: string;
  descriptif: string;  // Make this required to align with all usages
  isActive: boolean;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  crdCounter: number;
  steps: Step[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CircuitDto {
  id: number;
  circuitKey: string;
  title: string;
  descriptif: string;
  isActive: boolean;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  crdCounter?: number;
  steps: Step[];
}

export interface CreateCircuitDto {
  title: string;
  descriptif: string;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  isActive: boolean;
  steps?: Step[];
}

export interface UpdateCircuitDto {
  title?: string;
  descriptif?: string;
  hasOrderedFlow?: boolean;
  allowBacktrack?: boolean;
  isActive?: boolean;
}

// Use export type for re-exports to fix isolatedModules errors
export type { Step } from './step';
export type { CreateStepDto, UpdateStepDto, StepFilterOptions } from './step';
