
import { Circuit } from './circuit';

export interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  circuit?: Circuit;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  responsibleRole?: any; // Using any to avoid circular dependency with Role
  nextStepId?: number;
  nextStep?: Step;
  prevStepId?: number;
  prevStep?: Step;
  isFinalStep: boolean;
  statuses?: Status[];
  stepActions?: StepAction[];
}

export interface Status {
  id: number;
  statusKey: string;
  stepId: number;
  step?: Step;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
}

export interface StepAction {
  id: number;
  stepId: number;
  step?: Step;
  actionId: number;
  action?: any;
}

export interface StepFilterOptions {
  search?: string;
  circuitId?: number;
  status?: 'active' | 'inactive' | 'all';
  responsibleRoleId?: number;
  circuit?: number;
  responsibleRole?: number;
  isFinalStep?: boolean;
}

export interface CreateStepDto {
  title: string;
  descriptif: string;
  orderIndex: number;
  circuitId: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
}

export interface UpdateStepDto {
  title?: string;
  descriptif?: string;
  orderIndex?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
}
