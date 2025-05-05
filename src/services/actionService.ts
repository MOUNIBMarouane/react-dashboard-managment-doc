
import { Action } from "@/models/circuit";
import { CreateActionDto } from "@/models/action";

const getAllActions = async (): Promise<Action[]> => {
  // This is a mock implementation
  return [
    { id: 1, actionId: 1, actionKey: "ACT-001", title: "Approve", description: "Approve the document" },
    { id: 2, actionId: 2, actionKey: "ACT-002", title: "Reject", description: "Reject the document" },
    { id: 3, actionId: 3, actionKey: "ACT-003", title: "Request Changes", description: "Request changes to the document" }
  ];
};

const getActionById = async (id: number): Promise<Action> => {
  const actions = await getAllActions();
  const action = actions.find(a => a.actionId === id);
  
  if (!action) {
    throw new Error(`Action with ID ${id} not found`);
  }
  
  return action;
};

const createAction = async (action: CreateActionDto): Promise<Action> => {
  // Mock implementation - in a real app, this would call an API endpoint
  const newId = Math.floor(Math.random() * 1000) + 100;
  return {
    id: newId,
    actionId: newId,
    actionKey: `ACT-${newId}`,
    title: action.title,
    description: action.description || ""
  };
};

const updateAction = async (id: number, action: Partial<Action>): Promise<Action> => {
  // Mock implementation
  return {
    id,
    actionId: id,
    actionKey: action.actionKey || `ACT-${id}`,
    title: action.title || "Updated Action",
    description: action.description || ""
  };
};

const deleteAction = async (id: number): Promise<boolean> => {
  // Mock implementation
  return true;
};

const assignActionToStep = async (stepId: number, actionId: number): Promise<boolean> => {
  // Mock implementation
  return true;
};

const actionService = {
  getAllActions,
  getActionById,
  createAction,
  updateAction,
  deleteAction,
  assignActionToStep
};

export default actionService;
