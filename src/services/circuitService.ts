
import { api } from './api';
import { Circuit, CircuitDto, CreateCircuitDto, CreateStepDto, Step, UpdateStepDto } from '@/models/circuit';
import { CircuitValidation } from '@/models/circuitValidation';
import { DocumentWorkflowStatus, DocumentCircuitHistory } from '@/models/documentCircuit';

export interface MoveDocumentRequest {
  documentId: number;
  currentStepId: number;
  nextStepId: number;
  comments: string;
}

export interface MoveToNextRequest {
  documentId: number;
  comments: string;
}

export interface ReturnToPreviousRequest {
  documentId: number;
  comments: string;
}

export interface AssignCircuitRequest {
  documentId: number;
  circuitId: number;
}

export interface PerformActionRequest {
  documentId: number;
  actionId: number;
  comments: string;
  isApproved: boolean;
}

export interface CompleteStatusRequest {
  documentId: number;
  statusId: number;
  isComplete: boolean;
  comments: string;
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

  createCircuit: async (circuit: CreateCircuitDto): Promise<CircuitDto> => {
    const response = await api.post('/Circuit', circuit);
    return response.data;
  },

  updateCircuit: async (id: number, circuit: Partial<CreateCircuitDto>): Promise<CircuitDto> => {
    const response = await api.put(`/Circuit/${id}`, circuit);
    return response.data;
  },

  deleteCircuit: async (id: number): Promise<void> => {
    await api.delete(`/Circuit/${id}`);
  },

  // Step methods
  createStep: async (step: CreateStepDto): Promise<Step> => {
    const response = await api.post(`/Circuit/${step.circuitId}/steps`, step);
    return response.data;
  },

  updateStep: async (stepId: number, step: Partial<UpdateStepDto>): Promise<Step> => {
    const response = await api.put(`/Circuit/steps/${stepId}`, step);
    return response.data;
  },

  deleteStep: async (stepId: number): Promise<void> => {
    await api.delete(`/Circuit/steps/${stepId}`);
  },

  // Document workflow methods
  assignDocumentToCircuit: async (data: AssignCircuitRequest): Promise<void> => {
    await api.post('/Workflow/assign-circuit', data);
  },

  getDocumentCurrentStatus: async (documentId: number): Promise<DocumentWorkflowStatus> => {
    const response = await api.get(`/Workflow/document/${documentId}/current-status`);
    return response.data;
  },

  getDocumentHistory: async (documentId: number): Promise<DocumentCircuitHistory[]> => {
    const response = await api.get(`/Workflow/document/${documentId}/history`);
    return response.data;
  },
  
  performAction: async (request: PerformActionRequest): Promise<void> => {
    await api.post('/Workflow/perform-action', request);
  },

  moveToNextStep: async (request: MoveDocumentRequest): Promise<void> => {
    await api.post('/Workflow/change-step', request);
  },
  
  moveDocumentToNextStep: async (request: MoveToNextRequest): Promise<void> => {
    await api.post('/Workflow/move-next', request);
  },

  returnToPreviousStep: async (request: ReturnToPreviousRequest): Promise<void> => {
    await api.post('/Workflow/return-to-previous', request);
  },

  completeDocumentStatus: async (request: CompleteStatusRequest): Promise<void> => {
    await api.post('/Workflow/complete-status', request);
  },

  getPendingApprovals: async () => {
    const response = await api.get('/Workflow/pending-documents');
    return response.data;
  },

  getStepStatuses: async (stepId: number) => {
    const response = await api.get(`/Status/step/${stepId}`);
    return response.data;
  },

  completeStatus: async (data: CompleteStatusRequest) => {
    await api.post('/Workflow/complete-status', data);
  },

  updateStepStatus: async (stepId: number, statusId: number, data: any) => {
    await api.put(`/Status/${statusId}`, data);
  },

  validateCircuit: async (circuitId: number): Promise<CircuitValidation> => {
    const response = await api.get(`/Circuit/validate/${circuitId}`);
    return response.data;
  }
};

export default circuitService;
