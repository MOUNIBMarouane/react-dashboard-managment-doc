
import api from './api';
import { Circuit } from '@/models/circuit';
import { AssignCircuitRequest, DocumentCircuitHistory, MoveToNextStepRequest, CircuitValidation } from '@/models/documentCircuit';

const circuitService = {
  getAllCircuits: async (): Promise<Circuit[]> => {
    const response = await api.get('/Circuit');
    return response.data;
  },

  getCircuitById: async (id: number): Promise<Circuit> => {
    const response = await api.get(`/Circuit/${id}`);
    return response.data;
  },

  createCircuit: async (circuit: Omit<Circuit, 'id' | 'circuitKey' | 'crdCounter'>): Promise<Circuit> => {
    const response = await api.post('/Circuit', circuit);
    return response.data;
  },

  updateCircuit: async (id: number, circuit: Partial<Circuit>): Promise<Circuit> => {
    const response = await api.put(`/Circuit/${id}`, circuit);
    return response.data;
  },

  deleteCircuit: async (id: number): Promise<void> => {
    await api.delete(`/Circuit/${id}`);
  },

  getCircuitDetailById: async (id: number): Promise<any> => {
    const response = await api.get(`/Circuit/steps/${id}`);
    return response.data;
  },

  getCircuitDetailsByCircuitId: async (circuitId: number): Promise<any[]> => {
    const response = await api.get(`/Circuit/${circuitId}/steps`);
    return response.data;
  },

  createCircuitDetail: async (circuitId: number, detail: any): Promise<any> => {
    const response = await api.post(`/Circuit/${circuitId}/steps`, detail);
    return response.data;
  },

  updateCircuitDetail: async (id: number, detail: any): Promise<any> => {
    const response = await api.put(`/Circuit/steps/${id}`, detail);
    return response.data;
  },

  deleteCircuitDetail: async (id: number): Promise<void> => {
    await api.delete(`/Circuit/steps/${id}`);
  },

  assignDocumentToCircuit: async (data: AssignCircuitRequest): Promise<void> => {
    await api.post('/Workflow/assign-circuit', data);
  },

  moveDocumentToNextStep: async (data: MoveToNextStepRequest): Promise<void> => {
    await api.post('/Workflow/move-next', data);
  },

  moveDocumentToStep: async (data: any): Promise<void> => {
    await api.post('/Workflow/change-step', data);
  },

  returnToPreviousStep: async (data: any): Promise<void> => {
    await api.post('/Workflow/return-to-previous', data);
  },

  getStepStatuses: async (documentId: number): Promise<any[]> => {
    const response = await api.get(`/Workflow/document/${documentId}/step-statuses`);
    return response.data;
  },

  completeStatus: async (data: any): Promise<void> => {
    await api.post('/Workflow/complete-status', data);
  },

  getDocumentCircuitHistory: async (documentId: number): Promise<DocumentCircuitHistory[]> => {
    const response = await api.get(`/Workflow/document/${documentId}/history`);
    return response.data;
  },

  getPendingApprovals: async (): Promise<any[]> => {
    const response = await api.get('/Workflow/pending-documents');
    return response.data;
  },

  validateCircuit: (circuit: any): CircuitValidation => {
    // Implement client-side validation logic
    const hasSteps = circuit.steps && circuit.steps.length > 0;
    
    // Check if each step has at least one status
    const stepsWithoutStatuses = hasSteps ? 
      circuit.steps.filter((step: any) => !step.statuses || step.statuses.length === 0)
        .map((step: any) => ({
          stepId: step.id,
          stepTitle: step.title,
          order: step.orderIndex
        })) : [];
    
    return {
      circuitId: circuit.id,
      circuitTitle: circuit.title,
      hasSteps,
      totalSteps: hasSteps ? circuit.steps.length : 0,
      allStepsHaveStatuses: stepsWithoutStatuses.length === 0,
      isValid: hasSteps && stepsWithoutStatuses.length === 0,
      stepsWithoutStatuses
    };
  }
};

export default circuitService;
