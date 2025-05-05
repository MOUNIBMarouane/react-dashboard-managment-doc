
export interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  prevStepId?: number;
  nextStepId?: number;
  isFinalStep: boolean;
}

export interface CreateStepDto {
  title: string;
  descriptif: string;
  orderIndex: number;
  circuitId: number;
  responsibleRoleId?: number;
}

export interface UpdateStepDto {
  title?: string;
  descriptif?: string;
  orderIndex?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
}
