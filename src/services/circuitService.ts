
import api from './api';
import { Circuit } from '@/models/circuit';
import { DocumentCircuitHistory, DocumentWorkflowStatus } from '@/models/documentCircuit';

// Add these interfaces if they don't exist
interface CircuitValidation {
  isValid: boolean;
  errors: string[];
}

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

  getCircuitDetailsByCircuitId: async (id: number): Promise<any[]> => {
    const response = await api.get(`/Circuit/${id}`);
    return response.data.steps || [];
  },

  createCircuitDetail: async (circuitId: number, detail: any): Promise<any> => {
    const response = await api.post(`/Circuit/${circuitId}/steps`, detail);
    return response.data;
  },

  updateCircuitDetail: async (stepId: number, detail: any): Promise<any> => {
    const response = await api.put(`/Circuit/steps/${stepId}`, detail);
    return response.data;
  },

  deleteCircuitDetail: async (stepId: number): Promise<void> => {
    await api.delete(`/Circuit/steps/${stepId}`);
  },

  // Workflow methods
  assignDocumentToCircuit: async (data: { documentId: number, circuitId: number, comments?: string }): Promise<void> => {
    const response = await api.post('/Workflow/assign-circuit', data);
    return response.data;
  },

  moveDocumentToNextStep: async (data: { documentId: number, currentStepId?: number, nextStepId?: number, comments?: string }): Promise<void> => {
    const response = await api.post('/Workflow/change-step', data);
    return response.data;
  },

  moveDocumentToStep: async (data: { documentId: number, comments?: string }): Promise<void> => {
    const response = await api.post('/Workflow/move-next', data);
    return response.data;
  },

  performAction: async (data: { documentId: number, actionId: number, comments?: string, isApproved?: boolean }): Promise<void> => {
    const response = await api.post('/Workflow/perform-action', data);
    return response.data;
  },

  returnToPreviousStep: async (data: { documentId: number, comments?: string }): Promise<void> => {
    const response = await api.post('/Workflow/return-to-previous', data);
    return response.data;
  },

  completeStatus: async (data: { documentId: number, statusId: number, isComplete: boolean, comments?: string }): Promise<void> => {
    const response = await api.post('/Workflow/complete-status', data);
    return response.data;
  },

  getDocumentCircuitHistory: async (documentId: number): Promise<DocumentCircuitHistory[]> => {
    const response = await api.get(`/Workflow/document/${documentId}/history`);
    return response.data;
  },

  getStepStatuses: async (documentId: number): Promise<any[]> => {
    const response = await api.get(`/Workflow/document/${documentId}/step-statuses`);
    return response.data;
  },

  getDocumentCurrentStatus: async (documentId: number): Promise<DocumentWorkflowStatus> => {
    const response = await api.get(`/Workflow/document/${documentId}/current-status`);
    return response.data;
  },

  getPendingApprovals: async (): Promise<any[]> => {
    const response = await api.get('/Workflow/pending-documents');
    return response.data;
  },

  validateCircuit: (circuit: any): CircuitValidation => {
    const errors: string[] = [];
    
    if (!circuit.title || circuit.title.trim().length === 0) {
      errors.push('Title is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
};

export default circuitService;
