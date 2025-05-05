
import { Action } from "@/models/circuit";
import { CreateActionDto } from "@/models/action";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const getAllActions = async (): Promise<Action[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/actions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching actions:", error);
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

const getActionsByStep = async (stepId: number): Promise<Action[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/actions/by-step/${stepId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching actions for step id ${stepId}:`, error);
    throw error;
  }
};

const createAction = async (action: CreateActionDto): Promise<Action> => {
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

const deleteAction = async (id: number): Promise<boolean> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/actions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting action with id ${id}:`, error);
    throw error;
  }
};

const assignActionToStep = async (stepId: number, actionId: number): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/actions/assign-to-step`, {
      stepId,
      actionId
    });
    return response.data;
  } catch (error) {
    console.error(`Error assigning action ${actionId} to step ${stepId}:`, error);
    throw error;
  }
};

const toggleActionStatus = async (id: number): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/actions/${id}/toggle-status`);
    return response.data;
  } catch (error) {
    console.error(`Error toggling action status for id ${id}:`, error);
    throw error;
  }
};

const actionService = {
  getAllActions,
  getActionById,
  getActionsByStep,
  createAction,
  updateAction,
  deleteAction,
  assignActionToStep,
  toggleActionStatus
};

export default actionService;
