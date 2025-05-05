
import { Action, CreateActionDto, UpdateActionDto, AssignActionToStepDto } from '@/models/action';
import { ActionDto } from '@/models/documentCircuit';

// Mock implementation for action service
const actionService = {
  getAllActions: async (): Promise<Action[]> => {
    return []; // Mock implementation
  },

  getActionById: async (id: number): Promise<Action> => {
    return {
      id,
      actionId: id,
      actionKey: `ACT-${id}`,
      title: 'Mock Action',
      description: 'This is a mock action'
    };
  },

  createAction: async (data: CreateActionDto): Promise<Action> => {
    return {
      id: 1,
      actionId: 1,
      actionKey: 'ACT-001',
      title: data.title,
      description: data.description
    };
  },

  updateAction: async (id: number, data: UpdateActionDto): Promise<Action> => {
    return {
      id,
      actionId: id,
      actionKey: `ACT-${id}`,
      title: data.title || 'Updated Action',
      description: data.description
    };
  },

  deleteAction: async (id: number): Promise<boolean> => {
    return true;
  },

  assignToStep: async (data: AssignActionToStepDto): Promise<boolean> => {
    console.log('Assigning action to step:', data);
    return true;
  },

  getActionsByStep: async (stepId: number): Promise<ActionDto[]> => {
    return [
      {
        actionId: 1,
        title: 'Approve Document',
        description: 'Approve this document for further processing'
      },
      {
        actionId: 2,
        title: 'Reject Document',
        description: 'Reject this document and send it back'
      }
    ];
  },

  getStatusesByStep: async (stepId: number) => {
    return [];
  }
};

export default actionService;
