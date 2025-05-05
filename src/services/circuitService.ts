
import api from './api';
import { Circuit, CircuitDetail, CreateCircuitDto } from '@/models/circuit';
import { DocumentCircuitHistory } from '@/models/documentCircuit';

const circuitService = {
  getAllCircuits: async (): Promise<Circuit[]> => {
    try {
      const response = await api.get('/Circuit');
      return response.data;
    } catch (error) {
      console.error('Error fetching circuits:', error);
      throw error;
    }
  },

  getCircuitById: async (id: number): Promise<Circuit> => {
    try {
      const response = await api.get(`/Circuit/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching circuit with ID ${id}:`, error);
      throw error;
    }
  },

  createCircuit: async (circuit: Omit<Circuit, 'id' | 'circuitKey' | 'crdCounter'>): Promise<Circuit> => {
    try {
      const response = await api.post('/Circuit', circuit);
      return response.data;
    } catch (error) {
      console.error('Error creating circuit:', error);
      throw error;
    }
  },

  updateCircuit: async (id: number, circuit: Partial<Circuit>): Promise<void> => {
    try {
      await api.put(`/Circuit/${id}`, circuit);
    } catch (error) {
      console.error(`Error updating circuit with ID ${id}:`, error);
      throw error;
    }
  },

  deleteCircuit: async (id: number): Promise<void> => {
    try {
      await api.delete(`/Circuit/${id}`);
    } catch (error) {
      console.error(`Error deleting circuit with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Add the method to get circuit details by ID
  getCircuitDetailsByCircuitId: async (circuitId: number): Promise<CircuitDetail[]> => {
    try {
      const response = await api.get(`/Circuit/${circuitId}/details`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching circuit details for circuit ${circuitId}:`, error);
      throw error;
    }
  },

  // Add the validation method
  validateCircuit: async (circuitId: number): Promise<any> => {
    try {
      const response = await api.get(`/Circuit/${circuitId}/validate`);
      return response.data;
    } catch (error) {
      console.error(`Error validating circuit ${circuitId}:`, error);
      throw error;
    }
  },
  
  // Add missing method for assign document to circuit
  assignDocumentToCircuit: async (data: { documentId: number; circuitId: number }) => {
    try {
      const response = await api.post('/Workflow/assign-circuit', data);
      return response.data;
    } catch (error) {
      console.error('Error assigning document to circuit:', error);
      throw error;
    }
  },
  
  // Add missing methods for workflow actions
  moveToNextStep: async (data: { documentId: number; currentStepId: number; nextStepId: number; comments?: string }) => {
    try {
      const response = await api.post('/Workflow/change-step', data);
      return response.data;
    } catch (error) {
      console.error('Error moving document to next step:', error);
      throw error;
    }
  },
  
  completeDocumentStatus: async (data: { documentId: number; statusId: number; isComplete: boolean; comments?: string }) => {
    try {
      const response = await api.post('/Workflow/complete-status', data);
      return response.data;
    } catch (error) {
      console.error('Error completing document status:', error);
      throw error;
    }
  },
  
  // API method aliases for compatibility with existing code
  completeStatus: async (data: { documentId: number; statusId: number; isComplete: boolean; comments?: string }) => {
    return circuitService.completeDocumentStatus(data);
  },
  
  // Add missing method for StepFormProvider
  createStep: async (step: any) => {
    try {
      const response = await api.post(`/Circuit/${step.circuitId}/steps`, step);
      return response.data;
    } catch (error) {
      console.error('Error creating step:', error);
      throw error;
    }
  },
  
  // Add missing method for StepFormProvider
  updateStep: async (id: number, step: any) => {
    try {
      const response = await api.put(`/Circuit/steps/${id}`, step);
      return response.data;
    } catch (error) {
      console.error(`Error updating step with ID ${id}:`, error);
      throw error;
    }
  }
};

export default circuitService;
