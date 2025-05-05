
import api from './api';
import { Step, CreateStepDto, UpdateStepDto } from '@/models/step';
import { Circuit } from '@/models/circuit';

const getAllSteps = async (): Promise<Step[]> => {
  const response = await api.get('/steps');
  return response.data;
};

const getStepById = async (id: number): Promise<Step> => {
  const response = await api.get(`/steps/${id}`);
  return response.data;
};

const getStepsByCircuitId = async (circuitId: number): Promise<Step[]> => {
  const response = await api.get(`/steps/circuit/${circuitId}`);
  return response.data;
};

const getAllCircuits = async (): Promise<Circuit[]> => {
  const response = await api.get('/circuits');
  return response.data;
};

const createStep = async (step: CreateStepDto): Promise<Step> => {
  const response = await api.post('/steps', step);
  return response.data;
};

const updateStep = async (id: number, step: UpdateStepDto): Promise<Step> => {
  const response = await api.put(`/steps/${id}`, step);
  return response.data;
};

const deleteStep = async (id: number): Promise<void> => {
  await api.delete(`/steps/${id}`);
};

// Add missing method
const deleteMultipleSteps = async (ids: number[]): Promise<void> => {
  await api.delete('/steps/batch', { data: { ids } });
};

const stepService = {
  getAllSteps,
  getStepById,
  getStepsByCircuitId,
  getAllCircuits,
  createStep,
  updateStep,
  deleteStep,
  deleteMultipleSteps
};

export default stepService;
