
import { ActionItem } from "@/models/actionItem";

export const workflowStepService = {
  getActionsForStep: async (stepId: number): Promise<ActionItem[]> => {
    // Placeholder implementation
    // In a real app, this would call an API
    return []; 
  }
};

export default workflowStepService;
