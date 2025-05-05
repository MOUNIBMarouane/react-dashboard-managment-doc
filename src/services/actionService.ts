
import { Action, ActionItem, CreateActionDto, UpdateActionDto, AssignActionToStepDto } from '@/models/action';

// Mock data and implementation - would typically be replaced with API calls
let actionIdCounter = 10;

const mockActions: Action[] = [
  {
    id: 1,
    actionId: 1,
    actionKey: 'ACT-001',
    title: 'Approve',
    description: 'Approve the document'
  },
  {
    id: 2,
    actionId: 2,
    actionKey: 'ACT-002',
    title: 'Reject',
    description: 'Reject the document'
  }
];

const actionService = {
  getAllActions: async (): Promise<Action[]> => {
    return [...mockActions];
  },

  getActionById: async (id: number): Promise<Action> => {
    const action = mockActions.find(a => a.id === id);
    if (!action) throw new Error(`Action with id ${id} not found`);
    return { ...action };
  },

  createAction: async (data: CreateActionDto): Promise<Action> => {
    const newAction: Action = {
      id: actionIdCounter,
      actionId: actionIdCounter++,
      actionKey: `ACT-${String(actionIdCounter).padStart(3, '0')}`,
      title: data.title,
      description: data.description
    };
    mockActions.push(newAction);
    return newAction;
  },

  updateAction: async (id: number, data: UpdateActionDto): Promise<Action> => {
    const index = mockActions.findIndex(a => a.id === id);
    if (index === -1) throw new Error(`Action with id ${id} not found`);
    
    mockActions[index] = {
      ...mockActions[index],
      ...data,
    };
    
    return mockActions[index];
  },

  deleteAction: async (id: number): Promise<void> => {
    const index = mockActions.findIndex(a => a.id === id);
    if (index === -1) throw new Error(`Action with id ${id} not found`);
    mockActions.splice(index, 1);
  },

  deleteMultipleActions: async (ids: number[]): Promise<void> => {
    ids.forEach(id => {
      const index = mockActions.findIndex(a => a.id === id);
      if (index !== -1) mockActions.splice(index, 1);
    });
  },
  
  assignToStep: async (data: AssignActionToStepDto): Promise<boolean> => {
    console.log("Assigning action to step:", data);
    // In a real implementation, this would interact with the backend
    return true;
  },

  getActionsByStep: async (stepId: number): Promise<ActionItem[]> => {
    // Return mock data for demonstration
    return mockActions
      .slice(0, 2)
      .map(action => ({
        id: action.id,
        actionId: action.actionId,
        actionKey: action.actionKey,
        title: action.title,
        description: action.description || ""
      }));
  },

  getStatusesByStep: async (stepId: number): Promise<any[]> => {
    // Return mock data for demonstration
    return [
      { id: 1, title: "Required Document Check", isRequired: true, isComplete: false },
      { id: 2, title: "Quality Control", isRequired: false, isComplete: false }
    ];
  },
};

export default actionService;
