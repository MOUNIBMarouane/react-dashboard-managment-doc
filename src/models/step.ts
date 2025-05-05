
import { Circuit } from './circuit';

export interface Role {
  id: number;
  roleName: string;
  isAdmin: boolean;
  isSimpleUser: boolean;
  isFullUser: boolean;
}

export interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  circuit?: Circuit;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  responsibleRole?: Role;
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
}

export interface CreateStepDto {
  title: string;
  descriptif: string;
  circuitId: number;
  orderIndex?: number;
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
