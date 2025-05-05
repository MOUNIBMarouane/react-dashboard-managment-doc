
import { ActionItem } from "@/models/actionItem";
import { WorkflowStepStatus } from "@/models/workflowStepStatus";
import actionService from "./actionService";
import { toast } from "sonner";

export const workflowStepService = {
  getActionsForStep: async (stepId: number): Promise<ActionItem[]> => {
    try {
      const actions = await actionService.getActionsByStep(stepId);
      return actions.map(action => ({
        id: action.id || action.actionId,
        actionId: action.actionId || action.id,
        actionKey: action.actionKey || "",
        title: action.title,
        description: action.description
      }));
    } catch (error) {
      console.error("Error fetching actions for step:", error);
      toast.error("Failed to load step actions");
      return [];
    }
  },

  getStatusesForStep: async (stepId: number): Promise<WorkflowStepStatus[]> => {
    // Placeholder implementation
    return [
      {
        id: 1,
        stepId: stepId,
        status: 0,
        name: "Pending Review",
        description: "Document is pending review"
      },
      {
        id: 2,
        stepId: stepId,
        status: 1,
        name: "In Progress",
        description: "Document review is in progress"
      }
    ];
  },

  updateStepStatus: async (statusData: any): Promise<void> => {
    // Placeholder implementation that would update the status
    console.log("Updating step status:", statusData);
    return Promise.resolve();
  }
};

export default workflowStepService;
