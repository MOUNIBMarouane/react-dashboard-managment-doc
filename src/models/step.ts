
export interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  isFinalStep: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStepDto {
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  circuitId: number;
}

export interface UpdateStepDto {
  title?: string;
  descriptif?: string;
  orderIndex?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
}

export interface StepFilterOptions {
  circuit?: number;
  responsibleRole?: number;
  isFinalStep?: boolean;
}
