
export interface Step {
  id: number;
  stepKey: string;
  circuitId: number;
  title: string;
  descriptif?: string;
  orderIndex: number;
  responsibleRoleId?: number | null;
  responsibleRole?: {
    id: number;
    roleName: string;
  };
  nextStepId?: number;
  prevStepId?: number;
  isFinalStep: boolean;
}

export interface StepFilterOptions {
  circuitId?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
  search?: string;
}
