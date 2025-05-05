
import api from './api';
import { Action, CreateActionDto, UpdateActionDto, AssignActionToStepDto } from '@/models/action';

// Get all actions
const getAllActions = async (): Promise<Action[]> => {
  const response = await api.get('/Action');
  return response.data;
};

// Get action by ID
const getActionById = async (id: number): Promise<Action> => {
  const response = await api.get(`/Action/${id}`);
  return response.data;
};

// Get actions for a specific step
const getActionsByStep = async (stepId: number): Promise<Action[]> => {
  const response = await api.get(`/Action/step/${stepId}`);
  return response.data;
};

// Create a new action
const createAction = async (data: CreateActionDto): Promise<Action> => {
  const response = await api.post('/Action', data);
  return response.data;
};

// Update an existing action
const updateAction = async (id: number, data: Partial<UpdateActionDto>): Promise<Action> => {
  const response = await api.put(`/Action/${id}`, data);
  return response.data;
};

// Delete an action
const deleteAction = async (id: number): Promise<void> => {
  await api.delete(`/Action/${id}`);
};

// Get statuses by step
const getStatusesByStep = async (stepId: number): Promise<any[]> => {
  const response = await api.get(`/Status/step/${stepId}`);
  return response.data;
};

// Assign action to step
const assignToStep = async (data: AssignActionToStepDto): Promise<void> => {
  await api.post(`/Action/assign-to-step`, data);
};

const actionService = {
  getAllActions,
  getActionById,
  createAction,
  updateAction,
  deleteAction,
  getStatusesByStep,
  assignToStep,
  getActionsByStep
};

export default actionService;
