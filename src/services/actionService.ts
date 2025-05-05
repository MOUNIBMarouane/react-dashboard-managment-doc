
import api from './api';
import { Action, CreateActionDto, AssignActionToStepDto } from '@/models/action';

export const actionService = {
  getAllActions: async (): Promise<Action[]> => {
    try {
      const response = await api.get('/Action');
      return response.data;
    } catch (error) {
      console.error('Error fetching actions:', error);
      throw error;
    }
  },

  getActionById: async (id: number): Promise<Action> => {
    try {
      const response = await api.get(`/Action/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching action with ID ${id}:`, error);
      throw error;
    }
  },

  createAction: async (data: CreateActionDto): Promise<Action> => {
    try {
      const response = await api.post('/Action', data);
      return response.data;
    } catch (error) {
      console.error('Error creating action:', error);
      throw error;
    }
  },

  updateAction: async (id: number, data: Partial<Action>): Promise<void> => {
    try {
      await api.put(`/Action/${id}`, data);
    } catch (error) {
      console.error(`Error updating action with ID ${id}:`, error);
      throw error;
    }
  },

  deleteAction: async (id: number): Promise<void> => {
    try {
      await api.delete(`/Action/${id}`);
    } catch (error) {
      console.error(`Error deleting action with ID ${id}:`, error);
      throw error;
    }
  },

  // Add missing method
  assignToStep: async (data: AssignActionToStepDto): Promise<void> => {
    try {
      await api.post('/Action/assign-to-step', data);
    } catch (error) {
      console.error('Error assigning action to step:', error);
      throw error;
    }
  },

  // Add missing method
  toggleActionStatus: async (id: number, isActive: boolean): Promise<void> => {
    try {
      await api.put(`/Action/${id}/status`, { isActive });
    } catch (error) {
      console.error(`Error toggling action status with ID ${id}:`, error);
      throw error;
    }
  },

  getCachedSteps: async (forceRefresh = false): Promise<Step[]> => {
    // This is a placeholder implementation
    try {
      // Implement caching logic if needed
      return await stepService.getAllSteps();
    } catch (error) {
      console.error('Error getting cached steps:', error);
      throw error;
    }
  },

  // Add missing method to get statuses by step
  getStatusesByStep: async (stepId: number): Promise<any[]> => {
    try {
      const response = await api.get(`/Status/step/${stepId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching statuses for step ${stepId}:`, error);
      throw error;
    }
  }
};

// Import stepService to avoid circular dependency
import { Step } from '@/models/circuit';
import stepService from './stepService';
