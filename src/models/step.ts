
import { Role } from './auth';

export interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number | null;
  responsibleRole?: Role;
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
