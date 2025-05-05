
// Define RoleType directly since we can't import it from auth
interface RoleType {
  id: number;
  roleName: string;
}

export interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number | null;
  responsibleRole?: RoleType;
  nextStepId?: number | null;
  prevStepId?: number | null;
  isFinalStep: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateStepDto {
  circuitId: number;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number | null;
  isFinalStep?: boolean;
}

export interface UpdateStepDto {
  title?: string;
  descriptif?: string;
  orderIndex?: number;
  responsibleRoleId?: number | null;
  isFinalStep?: boolean;
}

export interface StepFilterOptions {
  circuit?: number;
  circuitId?: number;  // Added for compatibility
  search?: string;     // Added for compatibility
  responsibleRoleId?: number | null;
  isFinalStep?: boolean;
  searchTerm?: string;
}

export interface Status {
  id: number;
  statusKey: string;
  stepId: number;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
}
