
import api from './api';
import { Action, CreateActionDto, AssignActionToStepDto, UpdateActionDto } from '@/models/action';

// Function to get all actions
const getAllActions = async (): Promise<Action[]> => {
  try {
    const response = await api.get('/Action');
    return response.data;
  } catch (error) {
    console.error('Error fetching actions:', error);
    throw new Error('Failed to fetch actions');
  }
};

// Function to get action by ID
const getActionById = async (id: number): Promise<Action> => {
  try {
    const response = await api.get(`/Action/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching action with ID ${id}:`, error);
    throw new Error(`Failed to fetch action with ID ${id}`);
  }
};

// Function to get actions by step ID
const getActionsByStep = async (stepId: number): Promise<Action[]> => {
  try {
    const response = await api.get(`/Action/step/${stepId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching actions for step ${stepId}:`, error);
    throw new Error(`Failed to fetch actions for step ${stepId}`);
  }
};

// Function to create a new action
const createAction = async (data: CreateActionDto): Promise<Action> => {
  try {
    const response = await api.post('/Action', data);
    return response.data;
  } catch (error) {
    console.error('Error creating action:', error);
    throw new Error('Failed to create action');
  }
};

// Function to update an action
const updateAction = async (id: number, data: Partial<Action>): Promise<Action> => {
  try {
    const response = await api.put(`/Action/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating action with ID ${id}:`, error);
    throw new Error(`Failed to update action with ID ${id}`);
  }
};

// Function to delete an action
const deleteAction = async (id: number): Promise<void> => {
  try {
    await api.delete(`/Action/${id}`);
  } catch (error) {
    console.error(`Error deleting action with ID ${id}:`, error);
    throw new Error(`Failed to delete action with ID ${id}`);
  }
};

// Function to get statuses by step ID
const getStatusesByStep = async (stepId: number): Promise<any[]> => {
  try {
    const response = await api.get(`/Status/step/${stepId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching statuses for step ${stepId}:`, error);
    throw new Error(`Failed to fetch statuses for step ${stepId}`);
  }
};

// Function to assign an action to a step
const assignToStep = async (data: AssignActionToStepDto): Promise<void> => {
  try {
    await api.post('/Action/assign-to-step', data);
  } catch (error) {
    console.error('Error assigning action to step:', error);
    throw new Error('Failed to assign action to step');
  }
};

const actionService = {
  getAllActions,
  getActionById,
  getActionsByStep,
  createAction,
  updateAction,
  deleteAction,
  getStatusesByStep,
  assignToStep
};

export default actionService;
