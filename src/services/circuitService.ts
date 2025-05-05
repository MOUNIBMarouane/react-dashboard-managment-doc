
import api from './api';
import { Circuit, CreateCircuitDto, CircuitValidation } from '@/models/circuit';

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

// Validate circuit (check if it has all required statuses)
const validateCircuit = async (circuitId: number): Promise<CircuitValidation> => {
  const response = await api.get(`/Circuit/${circuitId}/validate`);
  return response.data;
};

const circuitService = {
  getAllCircuits,
  getCircuitById,
  createCircuit,
  updateCircuit,
  deleteCircuit,
  assignDocumentToCircuit,
  validateCircuit
};

export default circuitService;
