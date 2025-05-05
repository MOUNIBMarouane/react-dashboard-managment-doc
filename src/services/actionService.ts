
import { Action, CreateActionDto, UpdateActionDto } from "@/models/action";
import { ActionItem } from "@/models/actionItem";

export const actionService = {
  getAllActions: async (): Promise<Action[]> => {
    // Mock implementation
    return [];
  },

  getActionById: async (id: number): Promise<Action> => {
    // Mock implementation
    return {
      actionId: id,
      actionKey: `ACT-${id}`,
      title: `Action ${id}`,
      description: `Description for action ${id}`
    };
  },

  createAction: async (action: CreateActionDto): Promise<Action> => {
    // Mock implementation
    return {
      actionId: Math.floor(Math.random() * 1000),
      actionKey: `ACT-${Math.floor(Math.random() * 1000)}`,
      title: action.title,
      description: action.description
    };
  },

  updateAction: async (id: number, action: UpdateActionDto): Promise<Action> => {
    // Mock implementation
    return {
      actionId: id,
      actionKey: `ACT-${id}`,
      title: action.title || `Action ${id}`,
      description: action.description || `Description for action ${id}`
    };
  },

  deleteAction: async (id: number): Promise<void> => {
    // Mock implementation
    return;
  }
};

export default actionService;
