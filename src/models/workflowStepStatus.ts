
export interface WorkflowStepStatus {
  id: number;
  stepId: number;
  status: number;
  name: string;
  description?: string;
  isComplete?: boolean;
  isRequired?: boolean;
}
