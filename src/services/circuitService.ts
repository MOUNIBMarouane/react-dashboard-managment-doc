
import api from './api';
import { Circuit, CreateCircuitDto, CircuitDetail, CircuitValidation } from '@/models/circuit';

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
const updateCircuit = async (id: number, circuit: Partial<CreateCircuitDto>): Promise<Circuit> => {
  const response = await api.put(`/Circuit/${id}`, circuit);
  return response.data;
};

// Delete a circuit
const deleteCircuit = async (id: number): Promise<void> => {
  await api.delete(`/Circuit/${id}`);
};

// Assign document to circuit
const assignDocumentToCircuit = async (data: { documentId: number; circuitId: number }): Promise<boolean> => {
  const response = await api.post('/Workflow/assign-circuit', data);
  return response.status === 200;
};

// Move document to next step
const moveDocumentToNextStep = async (data: { documentId: number; comments: string }): Promise<boolean> => {
  const response = await api.post('/Workflow/move-next', data);
  return response.status === 200;
};

// Get circuit details
const getCircuitDetailsByCircuitId = async (circuitId: number): Promise<CircuitDetail[]> => {
  const response = await api.get(`/Circuit/${circuitId}/steps`);
  return response.data;
};

// Perform an action on a document
const performAction = async (data: {
  documentId: number;
  actionId: number;
  comments: string;
  isApproved: boolean;
}): Promise<boolean> => {
  const response = await api.post('/Workflow/perform-action', data);
  return response.status === 200;
};

// Create a step
const createStep = async (data: {
  circuitId: number;
  title: string;
  descriptif: string;
  orderIndex: number;
  responsibleRoleId?: number | null;
}): Promise<any> => {
  const response = await api.post(`/Circuit/${data.circuitId}/steps`, data);
  return response.data;
};

// Update a step
const updateStep = async (stepId: number, data: {
  title?: string;
  descriptif?: string;
  orderIndex?: number;
  responsibleRoleId?: number | null;
  isFinalStep?: boolean;
}): Promise<any> => {
  const response = await api.put(`/Circuit/steps/${stepId}`, data);
  return response.data;
};

// Get pending approvals
const getPendingApprovals = async (): Promise<any[]> => {
  const response = await api.get('/Workflow/pending-documents');
  return response.data;
};

// Validate circuit
const validateCircuit = async (circuitId: number): Promise<CircuitValidation> => {
  const response = await api.get(`/Circuit/validate/${circuitId}`);
  return response.data;
};

const circuitService = {
  getAllCircuits,
  getCircuitById,
  createCircuit,
  updateCircuit,
  deleteCircuit,
  assignDocumentToCircuit,
  moveDocumentToNextStep,
  getCircuitDetailsByCircuitId,
  performAction,
  createStep,
  updateStep,
  getPendingApprovals,
  validateCircuit
};

export default circuitService;
