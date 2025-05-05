
import { Step, CreateStepDto } from './step';

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
export { Step, CreateStepDto } from './step';

// Export Status
export interface Status {
  id: number;
  statusKey: string;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
  stepId: number;
}

// Export StepFilterOptions
export interface StepFilterOptions {
  circuitId?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
  search?: string;
  searchTerm?: string;
  circuit?: number;
}
