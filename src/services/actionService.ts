
import api from './api';
import { Action, ActionItem, CreateActionDto } from '@/models/action';
import { Status } from '@/models/circuit';
import { StatusEffectDto } from '@/models/documentCircuit';

let cachedActions: Action[] | null = null;
let cachedSteps: any[] | null = null;

interface AssignActionToStepRequest {
  stepId: number;
  actionId: number;
  statusEffects?: StatusEffectDto[];
}

export const actionService = {
  getAllActions: async (): Promise<Action[]> => {
    if (cachedActions) {
      return cachedActions;
    }
    const response = await api.get('/action');
    cachedActions = response.data;
    return response.data;
  },
  
  getActionById: async (id: number): Promise<Action> => {
    const response = await api.get(`/action/${id}`);
    return response.data;
  },
  
  createAction: async (data: CreateActionDto): Promise<Action> => {
    const response = await api.post('/action', data);
    // Invalidate cache
    cachedActions = null;
    return response.data;
  },
  
  deleteAction: async (id: number): Promise<void> => {
    await api.delete(`/action/${id}`);
    // Invalidate cache
    cachedActions = null;
  },
  
  updateAction: async (id: number, data: Partial<Action>): Promise<Action> => {
    const response = await api.put(`/action/${id}`, data);
    // Invalidate cache
    cachedActions = null;
    return response.data;
  },
  
  getActionsByStep: async (stepId: number): Promise<Action[]> => {
    const response = await api.get(`/action/step/${stepId}`);
    return response.data;
  },
  
  getStatusesByStepId: async (stepId: number): Promise<Status[]> => {
    const response = await api.get(`/status/step/${stepId}`);
    return response.data;
  },
  
  assignActionToStep: async (request: AssignActionToStepRequest): Promise<void> => {
    await api.post('/action/assign-to-step', request);
  },
  
  getAvailableActions: async (): Promise<ActionItem[]> => {
    const response = await api.get('/action/available');
    return response.data;
  },
  
  getCachedSteps: async (forceRefresh = false): Promise<any[]> => {
    if (cachedSteps && !forceRefresh) {
      return cachedSteps;
    }
    const response = await api.get('/circuits/steps');
    cachedSteps = response.data;
    return response.data;
  }
};
