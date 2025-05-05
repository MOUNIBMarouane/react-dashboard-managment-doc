
interface Circuit {
  id: number;
  circuitKey: string;
  title: string;
  descriptif?: string;
  crdCounter: number;
  isActive: boolean;
  hasOrderedFlow: boolean;
  allowBacktrack?: boolean;
  createdAt?: string;
  updatedAt?: string;
  steps?: Step[];
}

interface CircuitDetail {
  id: number;
  circuitDetailKey: string;
  circuitId: number;
  title: string;
  descriptif?: string;
  orderIndex: number;
  responsibleRoleId?: number;
  responsibleRole?: {
    id: number;
    name: string;
    isAdmin?: boolean;
  };
  isFinalStep?: boolean;
  createdAt: string;
  updatedAt: string;
}
