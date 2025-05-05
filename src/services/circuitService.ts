
import { CircuitValidation, DocumentWorkflowStatus, ProcessCircuitRequest, AssignCircuitRequest, MoveDocumentStepRequest, CompleteStatusDto, MoveToNextStepRequest } from '@/models/documentCircuit';
import { Circuit, Step } from '@/models/circuit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const getAllCircuits = async (): Promise<Circuit[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/circuits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching circuits:", error);
    throw error;
  }
};

const getCircuitById = async (id: number): Promise<Circuit> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/circuits/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching circuit with id ${id}:`, error);
    throw error;
  }
};

const createCircuit = async (circuit: Omit<Circuit, 'id' | 'circuitKey' | 'crdCounter'>): Promise<Circuit> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/circuits`, circuit);
    return response.data;
  } catch (error) {
    console.error("Error creating circuit:", error);
    throw error;
  }
};

const updateCircuit = async (id: number, circuit: Partial<Circuit>): Promise<Circuit> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/circuits/${id}`, circuit);
    return response.data;
  } catch (error) {
    console.error(`Error updating circuit with id ${id}:`, error);
    throw error;
  }
};

const deleteCircuit = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/circuits/${id}`);
  } catch (error) {
    console.error(`Error deleting circuit with id ${id}:`, error);
    throw error;
  }
};

// Circuit detail methods
const createCircuitDetail = async (circuitId: number, step: Partial<Step>): Promise<Step> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/circuits/${circuitId}/steps`, step);
    return response.data;
  } catch (error) {
    console.error(`Error creating circuit detail for circuit id ${circuitId}:`, error);
    throw error;
  }
};

const updateCircuitDetail = async (stepId: number, step: Partial<Step>): Promise<Step> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/circuits/steps/${stepId}`, step);
    return response.data;
  } catch (error) {
    console.error(`Error updating circuit detail with id ${stepId}:`, error);
    throw error;
  }
};

const deleteCircuitDetail = async (stepId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/circuits/steps/${stepId}`);
  } catch (error) {
    console.error(`Error deleting circuit detail with id ${stepId}:`, error);
    throw error;
  }
};

const getDocumentCircuitHistory = async (documentId: number): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workflow/document/${documentId}/history`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching document circuit history for document id ${documentId}:`, error);
    throw error;
  }
};

const getCircuitDetailsByCircuitId = async (circuitId: number): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/circuits/${circuitId}/steps`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching circuit details for circuit id ${circuitId}:`, error);
        throw error;
    }
};

const assignDocumentToCircuit = async (request: AssignCircuitRequest): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/workflow/assign-circuit`, request);
    return response.data;
  } catch (error) {
    console.error(`Error assigning document ${request.documentId} to circuit ${request.circuitId}:`, error);
    throw error;
  }
};

const moveDocumentToStep = async (request: MoveDocumentStepRequest): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/workflow/move-step`, request);
    return response.data;
  } catch (error) {
    console.error(`Error moving document ${request.documentId} to step ${request.currentStepId}:`, error);
    throw error;
  }
};

const moveToNextStep = async (request: MoveToNextStepRequest): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/workflow/change-step`, request);
    return response.data;
  } catch (error) {
    console.error(`Error moving document ${request.documentId} to next step:`, error);
    throw error;
  }
};

const returnToPreviousStep = async (request: MoveDocumentStepRequest): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/workflow/return-to-previous`, request);
    return response.data;
  } catch (error) {
    console.error(`Error returning document ${request.documentId} to previous step:`, error);
    throw error;
  }
};

const completeStatus = async (request: CompleteStatusDto): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/workflow/complete-status`, request);
    return response.data;
  } catch (error) {
    console.error(`Error completing status ${request.statusId} for document ${request.documentId}:`, error);
    throw error;
  }
};

const getStepStatuses = async (documentId: number): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workflow/document/${documentId}/step-statuses`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching step statuses for document id ${documentId}:`, error);
    throw error;
  }
};

const getDocumentCurrentStatus = async (documentId: number): Promise<DocumentWorkflowStatus> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workflow/document/${documentId}/current-status`);
    return response.data;
  } catch (error) {
    console.error(`Error getting current status for document id ${documentId}:`, error);
    throw error;
  }
};

const performAction = async (request: ProcessCircuitRequest): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/workflow/perform-action`, request);
    return response.data;
  } catch (error) {
    console.error(`Error performing action ${request.actionId} for document id ${request.documentId}:`, error);
    throw error;
  }
};

const validateCircuit = async (circuitId: number): Promise<CircuitValidation> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/circuits/${circuitId}/validate`);
    return response.data;
  } catch (error) {
    console.error(`Error validating circuit with id ${circuitId}:`, error);
    throw error;
  }
};

// Add the pending approvals method
const getPendingApprovals = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workflow/pending-documents`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending approvals:", error);
    throw error;
  }
};

// Export all methods
const circuitService = {
  getAllCircuits,
  getCircuitById,
  createCircuit,
  updateCircuit,
  deleteCircuit,
  getDocumentCircuitHistory,
  getCircuitDetailsByCircuitId,
  assignDocumentToCircuit,
  moveDocumentToStep,
  returnToPreviousStep,
  moveToNextStep,
  completeStatus,
  getStepStatuses,
  getDocumentCurrentStatus,
  performAction,
  validateCircuit,
  createCircuitDetail,
  updateCircuitDetail,
  deleteCircuitDetail,
  getPendingApprovals
};

export default circuitService;
