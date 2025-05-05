
import api from './api';
import { Circuit, CreateCircuitDto, Step } from '@/models/circuit';
import { AssignCircuitRequest } from '@/models/circuit';
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

// Get circuit details
const getCircuitDetailsByCircuitId = async (circuitId: number): Promise<any[]> => {
  const response = await api.get(`/Circuit/${circuitId}/details`);
  return response.data;
};

// Create circuit detail
const createCircuitDetail = async (detail: any): Promise<any> => {
  const response = await api.post('/CircuitDetail', detail);
  return response.data;
};

// Update circuit detail
const updateCircuitDetail = async (id: number, detail: any): Promise<any> => {
  const response = await api.put(`/CircuitDetail/${id}`, detail);
  return response.data;
};

// Create step
const createStep = async (step: any): Promise<Step> => {
  const response = await api.post(`/Circuit/${step.circuitId}/steps`, step);
  return response.data;
};

// Update step
const updateStep = async (id: number, step: any): Promise<Step> => {
  const response = await api.put(`/Circuit/steps/${id}`, step);
  return response.data;
};

// Assign document to circuit
const assignDocumentToCircuit = async (request: AssignCircuitRequest): Promise<void> => {
  await api.post('/Workflow/assign-circuit', request);
};

// Get document current status
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
const moveToNextStep = async (documentId: number): Promise<void> => {
  await api.post('/Workflow/move-next', { documentId });
};

// Move document to next step with comments
const moveDocumentToNextStep = async (data: { documentId: number, comments: string }): Promise<void> => {
  await api.post('/Workflow/move-next', data);
};

// Validate circuit
const validateCircuit = async (circuitId: number): Promise<boolean> => {
  const response = await api.get(`/Circuit/${circuitId}/validate`);
  return response.data;
};

// Get pending approvals
const getPendingApprovals = async (): Promise<any[]> => {
  const response = await api.get('/Workflow/pending-documents');
  return response.data;
};

// Update step status
const updateStepStatus = async (statusId: number, data: any): Promise<void> => {
  await api.post('/Workflow/complete-status', data);
};

// Complete status
const completeStatus = async (data: any): Promise<void> => {
  await api.post('/Workflow/complete-status', data);
};

// Get step statuses
const getStepStatuses = async (documentId: number): Promise<any[]> => {
  const response = await api.get(`/Workflow/document/${documentId}/step-statuses`);
  return response.data;
};

// Perform action
const performAction = async (request: any): Promise<void> => {
  await api.post('/Workflow/perform-action', request);
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
  createStep,
  updateStep,
  assignDocumentToCircuit,
  getDocumentCurrentStatus,
  getDocumentCircuitHistory,
  moveToNextStep,
  moveDocumentToNextStep,
  validateCircuit,
  getPendingApprovals,
  updateStepStatus,
  completeStatus,
  getStepStatuses,
  performAction
};

export default circuitService;
