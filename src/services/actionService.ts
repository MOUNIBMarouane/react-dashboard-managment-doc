
import api from './api';

// Define basic action types
export interface Action {
  actionId: number;
  actionKey: string;
  title: string;
  description: string;
}

export interface CreateActionDto {
  title: string;
  description?: string;
}

export interface UpdateActionDto {
  title?: string;
  description?: string;
}

const actionService = {
  getAllActions: async (): Promise<Action[]> => {
    const response = await api.get('/Action');
    return response.data;
  },

  getActionById: async (id: number): Promise<Action> => {
    const response = await api.get(`/Action/${id}`);
    return response.data;
  },

  createAction: async (action: CreateActionDto): Promise<Action> => {
    const response = await api.post('/Action', action);
    return response.data;
  },

  updateAction: async (id: number, action: UpdateActionDto): Promise<Action> => {
    const response = await api.put(`/Action/${id}`, action);
    return response.data;
  },

  deleteAction: async (id: number): Promise<void> => {
    await api.delete(`/Action/${id}`);
  },

  assignActionToStep: async (data: any): Promise<void> => {
    const response = await api.post('/Action/assign-to-step', data);
    return response.data;
  },

  getActionsByStep: async (stepId: number): Promise<Action[]> => {
    const response = await api.get(`/Action/step/${stepId}`);
    return response.data;
  },

  toggleActionStatus: async (actionId: number): Promise<void> => {
    await api.put(`/Action/${actionId}/toggle-status`);
  }
};

export default actionService;
