
import { api } from './api';
import { Step, CreateStepDto, UpdateStepDto } from '@/models/step';

const getAllSteps = async (): Promise<Step[]> => {
  const response = await api.get('/steps');
  return response.data;
};

const getStepById = async (id: number): Promise<Step> => {
  const response = await api.get(`/steps/${id}`);
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

const stepService = {
  getAllSteps,
  getStepById,
  createStep,
  updateStep,
  deleteStep,
};

export default stepService;
