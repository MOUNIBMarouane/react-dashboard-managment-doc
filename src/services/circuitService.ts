
import api from './api';
import { Circuit, CreateCircuitDto, CircuitValidation, Step } from '@/models/circuit';
import { DocumentWorkflowStatus, DocumentCircuitHistory } from '@/models/documentCircuit';

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

// Create a new circuit
const createCircuit = async (circuit: CreateCircuitDto): Promise<Circuit> => {
  const response = await api.post('/Circuit', circuit);
  return response.data;
};

// Update an existing circuit
const updateCircuit = async (id: number, circuit: Partial<Circuit>): Promise<Circuit> => {
  const response = await api.put(`/Circuit/${id}`, circuit);
  return response.data;
};

// Delete a circuit
const deleteCircuit = async (id: number): Promise<void> => {
  await api.delete(`/Circuit/${id}`);
};

// Assign document to circuit
const assignDocumentToCircuit = async (data: { documentId: number; circuitId: number }): Promise<void> => {
  await api.post(`/Workflow/assign-circuit`, data);
};

// Get circuit details by circuit ID
const getCircuitDetailsByCircuitId = async (circuitId: number): Promise<Step[]> => {
  const response = await api.get(`/Circuit/${circuitId}/steps`);
  return response.data;
};

// Create a circuit detail (step)
const createCircuitDetail = async (data: { 
  circuitId: number; 
  title: string; 
  descriptif: string; 
  orderIndex: number;
}): Promise<Step> => {
  const response = await api.post(`/Circuit/${data.circuitId}/steps`, data);
  return response.data;
};

// Update a circuit detail (step)
const updateCircuitDetail = async (stepId: number, data: Partial<Step>): Promise<Step> => {
  const response = await api.put(`/Circuit/steps/${stepId}`, data);
  return response.data;
};

// Validate circuit (check if it has all required statuses)
const validateCircuit = async (circuitId: number): Promise<CircuitValidation> => {
  const response = await api.get(`/Circuit/${circuitId}/validate`);
  return response.data;
};

// Get document current status in the workflow
const getDocumentCurrentStatus = async (documentId: number): Promise<DocumentWorkflowStatus> => {
  const response = await api.get(`/Workflow/document/${documentId}/current-status`);
  return response.data;
};

// Get document circuit history
const getDocumentCircuitHistory = async (documentId: number): Promise<DocumentCircuitHistory[]> => {
  const response = await api.get(`/Workflow/document/${documentId}/history`);
  return response.data;
};

// Move document to next step
const moveToNextStep = async (data: { documentId: number; comments?: string }): Promise<void> => {
  await api.post(`/Workflow/move-next`, data);
};

// Return to previous step
const returnToPreviousStep = async (data: { documentId: number; comments?: string }): Promise<void> => {
  await api.post(`/Workflow/return-to-previous`, data);
};

// Complete document status
const completeDocumentStatus = async (data: { 
  documentId: number; 
  statusId: number; 
  isComplete?: boolean; 
  comments?: string 
}): Promise<void> => {
  await api.post(`/Workflow/complete-status`, data);
};

// Perform action
const performAction = async (data: { 
  documentId: number; 
  actionId: number; 
  comments: string; 
  isApproved: boolean 
}): Promise<void> => {
  await api.post(`/Workflow/perform-action`, data);
};

// Get pending approvals
const getPendingApprovals = async (): Promise<any[]> => {
  const response = await api.get('/Workflow/pending-documents');
  return response.data;
};

const circuitService = {
  getAllCircuits,
  getCircuitById,
  createCircuit,
  updateCircuit,
  deleteCircuit,
  assignDocumentToCircuit,
  validateCircuit,
  getDocumentCurrentStatus,
  getDocumentCircuitHistory,
  moveToNextStep,
  returnToPreviousStep,
  completeDocumentStatus,
  performAction,
  getCircuitDetailsByCircuitId,
  createCircuitDetail,
  updateCircuitDetail,
  getPendingApprovals
};

export default circuitService;
