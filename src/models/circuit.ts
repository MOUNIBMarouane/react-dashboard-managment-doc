
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
