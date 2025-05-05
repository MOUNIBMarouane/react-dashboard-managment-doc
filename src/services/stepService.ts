
import api from './api';
import { Step, StepFilterOptions } from '@/models/circuit';
import { Circuit } from '@/models/circuit';

// Get all steps
const getAllSteps = async (): Promise<Step[]> => {
  const response = await api.get('/Steps');
  return response.data;
};

// Get step by ID
const getStepById = async (id: number): Promise<Step> => {
  const response = await api.get(`/Steps/${id}`);
  return response.data;
};

// Get steps by circuit ID
const getStepsByCircuitId = async (circuitId: number): Promise<Step[]> => {
  const response = await api.get(`/Steps/circuit/${circuitId}`);
  return response.data;
};

// Create new step
const createStep = async (step: any): Promise<Step> => {
  const response = await api.post('/Steps', step);
  return response.data;
};

// Update step
const updateStep = async (id: number, step: any): Promise<Step> => {
  const response = await api.put(`/Steps/${id}`, step);
  return response.data;
};

// Delete step
const deleteStep = async (id: number): Promise<void> => {
  await api.delete(`/Steps/${id}`);
};

// Delete multiple steps
const deleteMultipleSteps = async (ids: number[]): Promise<void> => {
  await api.post('/Steps/delete-multiple', { stepIds: ids });
};

// Get steps with filters
const getStepsWithFilters = async (filters: StepFilterOptions): Promise<Step[]> => {
  const params = new URLSearchParams();
  
  if (filters.searchQuery) {
    params.append('query', filters.searchQuery);
  }
  
  if (filters.circuitId) {
    params.append('circuitId', filters.circuitId.toString());
  }
  
  if (filters.responsibleRoleId) {
    params.append('roleId', filters.responsibleRoleId.toString());
  }
  
  if (filters.isFinalStep !== undefined) {
    params.append('isFinal', filters.isFinalStep.toString());
  }
  
  const response = await api.get(`/Steps?${params.toString()}`);
  return response.data;
};

// Get all circuits (for filter)
const getAllCircuits = async (): Promise<Circuit[]> => {
  const response = await api.get('/Circuit');
  return response.data;
};

const stepService = {
  getAllSteps,
  getStepById,
  getStepsByCircuitId,
  createStep,
  updateStep,
  deleteStep,
  deleteMultipleSteps,
  getStepsWithFilters,
  getAllCircuits
};

export default stepService;
