
import { WorkflowStepStatusEnum } from "@/enums/WorkflowStepStatusEnum";

export interface WorkflowStepStatus {
  id: number;
  stepId: number;
  status: WorkflowStepStatusEnum;
  name: string;
  description?: string;
}

export interface UpdateWorkflowStepStatusRequest {
  id: number;
  status: WorkflowStepStatusEnum;
}
