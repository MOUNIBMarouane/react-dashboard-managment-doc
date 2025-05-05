
import axios from 'axios';
import { ActionDto } from '@/models/documentCircuit';
import { Action } from '@/models/action';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAllActions = async (): Promise<ActionDto[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/actions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all actions:", error);
    throw error;
  }
};

const getActionById = async (id: number): Promise<Action> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/actions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching action with id ${id}:`, error);
    throw error;
  }
};

const createAction = async (action: any): Promise<Action> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/actions`, action);
    return response.data;
  } catch (error) {
    console.error("Error creating action:", error);
    throw error;
  }
};

const updateAction = async (id: number, action: Partial<Action>): Promise<Action> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/actions/${id}`, action);
    return response.data;
  } catch (error) {
    console.error(`Error updating action with id ${id}:`, error);
    throw error;
  }
};

const deleteAction = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/actions/${id}`);
  } catch (error) {
    console.error(`Error deleting action with id ${id}:`, error);
    throw error;
  }
};

const assignActionToStep = async (stepId: number, actionId: number): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/actions/assign-to-step`, { 
      stepId,
      actionId
    });
  } catch (error) {
    console.error(`Error assigning action ${actionId} to step ${stepId}:`, error);
    throw error;
  }
};

const getActionsByStep = async (stepId: number): Promise<ActionDto[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/actions/by-step/${stepId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching actions for step ${stepId}:`, error);
    throw error;
  }
};

const toggleActionStatus = async (actionId: number): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/actions/${actionId}/toggle-status`);
  } catch (error) {
    console.error(`Error toggling action status for action ${actionId}:`, error);
    throw error;
  }
};

const actionService = {
  getAllActions,
  getActionById,
  createAction,
  updateAction,
  deleteAction,
  assignActionToStep,
  getActionsByStep,
  toggleActionStatus
};

export default actionService;
