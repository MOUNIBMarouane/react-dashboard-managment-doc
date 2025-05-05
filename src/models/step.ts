
export interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  responsibleRole?: {
    id: number;
    roleName: string;
  };
  prevStepId?: number;
  nextStepId?: number;
  isFinalStep: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  statuses?: any[];
  stepActions?: any[];
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

export interface StepFilterOptions {
  circuitId?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
  search?: string;
  searchTerm?: string;
  circuit?: number;
}
