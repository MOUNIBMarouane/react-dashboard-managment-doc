
import { Step, CreateStepDto, StepFilterOptions } from './step';

export interface Circuit {
  id: number;
  circuitKey: string;
  title: string;
  descriptif: string;
  isActive: boolean;
  crdCounter: number;  // Making this required 
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  steps?: Step[];
  createdAt?: string | Date; // Adding createdAt for CircuitDataTable and useCircuitList
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
  steps: Step[];
}

export interface CreateCircuitDto {
  title: string;
  descriptif: string;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  isActive: boolean;
}

// Re-export step types to maintain backward compatibility
export { Step, CreateStepDto, StepFilterOptions } from './step';

// Export Status
export { Status } from './step';
