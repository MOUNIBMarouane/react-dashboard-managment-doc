
import api from './api';
import { Circuit, CreateCircuitDto, CircuitDetail, CircuitValidation } from '@/models/circuit';
import { AssignCircuitRequest } from '@/models/circuit';
import { ProcessCircuitRequest } from '@/models/documentCircuit';

// Get all circuits
const getAllCircuits = async (): Promise<Circuit[]> => {
  const response = await api.get('/Circuit');
  return response.data;
};

// Get circuit by ID
const getCircuitById = async (id: number): Promise<Circuit> => {
  const response = await api.get(`/Circuit/${id}`);
  return response.data;
};

// Create new circuit
const createCircuit = async (circuit: Omit<Circuit, 'id' | 'circuitKey' | 'crdCounter'>): Promise<Circuit> => {
  const response = await api.post('/Circuit', circuit);
  return response.data;
};

// Update circuit
const updateCircuit = async (id: number, circuit: Partial<Circuit>): Promise<Circuit> => {
  const response = await api.put(`/Circuit/${id}`, circuit);
  return response.data;
};

// Delete circuit
const deleteCircuit = async (id: number): Promise<void> => {
  await api.delete(`/Circuit/${id}`);
};

// Get circuit details by circuit ID
const getCircuitDetailsByCircuitId = async (circuitId: number): Promise<CircuitDetail[]> => {
  const response = await api.get(`/Circuit/${circuitId}/details`);
  return response.data;
};

// Create circuit detail
const createCircuitDetail = async (detail: Partial<CircuitDetail>): Promise<CircuitDetail> => {
  const response = await api.post(`/Circuit/${detail.circuitId}/details`, detail);
  return response.data;
};

// Update circuit detail
const updateCircuitDetail = async (id: number, detail: Partial<CircuitDetail>): Promise<CircuitDetail> => {
  const response = await api.put(`/Circuit/details/${id}`, detail);
  return response.data;
};

// Delete circuit detail
const deleteCircuitDetail = async (id: number): Promise<void> => {
  await api.delete(`/Circuit/details/${id}`);
};

// Assign document to circuit
const assignDocumentToCircuit = async (request: AssignCircuitRequest): Promise<void> => {
  await api.post('/Workflow/assign-circuit', request);
};

// Perform action on document
const performAction = async (request: ProcessCircuitRequest): Promise<void> => {
  await api.post('/Workflow/perform-action', request);
};

// Move document to next step
const moveToNextStep = async (documentId: number, comments: string = ''): Promise<void> => {
  await api.post('/Workflow/move-next', { documentId, comments });
};

// Return document to previous step
const returnToPreviousStep = async (documentId: number, comments: string = ''): Promise<void> => {
  await api.post('/Workflow/return-to-previous', { documentId, comments });
};

// Complete document status
const completeStatus = async (documentId: number, statusId: number, isComplete: boolean, comments: string = ''): Promise<void> => {
  await api.post('/Workflow/complete-status', { documentId, statusId, isComplete, comments });
};

// Get document workflow status
const getDocumentWorkflowStatus = async (documentId: number): Promise<any> => {
  const response = await api.get(`/Workflow/document/${documentId}/current-status`);
  return response.data;
};

// Get document history
const getDocumentHistory = async (documentId: number): Promise<any[]> => {
  const response = await api.get(`/Workflow/document/${documentId}/history`);
  return response.data;
};

// Get document step statuses
const getDocumentStepStatuses = async (documentId: number): Promise<any[]> => {
  const response = await api.get(`/Workflow/document/${documentId}/step-statuses`);
  return response.data;
};

// Get pending approvals
const getPendingApprovals = async (): Promise<any[]> => {
  const response = await api.get('/Workflow/pending-documents');
  return response.data;
};

// Validate a circuit (check if it has all the required components)
const validateCircuit = async (circuitId: number): Promise<CircuitValidation> => {
  const response = await api.get(`/Circuit/${circuitId}/validate`);
  return response.data;
};

// Update status for a step
const updateStepStatus = async (statusId: number, data: any): Promise<any> => {
  const response = await api.put(`/Status/${statusId}`, data);
  return response.data;
};

// Create step
const createStep = async (step: any): Promise<any> => {
  const response = await api.post(`/Circuit/${step.circuitId}/steps`, step);
  return response.data;
};

// Update step
const updateStep = async (stepId: number, step: any): Promise<any> => {
  const response = await api.put(`/Circuit/steps/${stepId}`, step);
  return response.data;
};

const circuitService = {
  getAllCircuits,
  getCircuitById,
  createCircuit,
  updateCircuit,
  deleteCircuit,
  getCircuitDetailsByCircuitId,
  createCircuitDetail,
  updateCircuitDetail,
  deleteCircuitDetail,
  assignDocumentToCircuit,
  performAction,
  moveToNextStep,
  returnToPreviousStep,
  completeStatus,
  getDocumentWorkflowStatus,
  getDocumentHistory,
  getDocumentStepStatuses,
  getPendingApprovals,
  validateCircuit,
  updateStepStatus,
  createStep,
  updateStep
};

export default circuitService;
