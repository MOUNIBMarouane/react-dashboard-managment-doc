
interface Step {
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
  circuit?: Circuit;
  responsibleRole?: Role;
  statuses?: Status[];
  stepActions?: StepAction[];
  nextStepId?: number;
  prevStepId?: number;
}

interface CreateStepDto {
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number;
  circuitId: number;
}

interface UpdateStepDto {
  title?: string;
  descriptif?: string;
  orderIndex?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
}

interface StepFilterOptions {
  circuit?: number;
  responsibleRole?: number;
  isFinalStep?: boolean;
  search?: string;
  circuitId?: number;
  status?: 'active' | 'inactive' | 'all';
}
