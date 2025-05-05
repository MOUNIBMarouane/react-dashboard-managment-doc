
import { Step } from './step';

export interface Circuit {
  id: number;
  circuitKey: string;
  title: string;
  descriptif?: string;
  isActive?: boolean;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  steps: Step[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
  crdCounter?: number; // Added to match the other definition
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

// Exporting Step from here for compatibility with existing imports
export { Step } from './step';
export { CreateStepDto, UpdateStepDto } from './step';
