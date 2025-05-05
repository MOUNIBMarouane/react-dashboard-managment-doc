
import api from './api';
import { DocumentWorkflowStatus, DocumentCircuitHistory, MoveDocumentRequest, ReturnToPreviousRequest, CompleteStatusRequest } from '@/models/documentCircuit';

const getDocumentWorkflowStatus = async (documentId: number): Promise<DocumentWorkflowStatus> => {
  const response = await api.get(`/Workflow/document/${documentId}/current-status`);
  return response.data;
};

const getDocumentHistory = async (documentId: number): Promise<DocumentCircuitHistory[]> => {
  const response = await api.get(`/Workflow/document/${documentId}/history`);
  return response.data;
};

// Alias for backward compatibility
const getDocumentCircuitHistory = async (documentId: number): Promise<DocumentCircuitHistory[]> => {
  return getDocumentHistory(documentId);
};

const moveDocumentToNextStep = async (request: MoveDocumentRequest): Promise<boolean> => {
  const response = await api.post('/Workflow/move-next', request);
  return response.data;
};

const moveToSpecificStep = async (request: MoveDocumentRequest): Promise<boolean> => {
  const response = await api.post('/Workflow/change-step', request);
  return response.data;
};

const returnToPreviousStep = async (request: ReturnToPreviousRequest): Promise<boolean> => {
  const response = await api.post('/Workflow/return-to-previous', request);
  return response.data;
};

const completeDocumentStatus = async (request: CompleteStatusRequest): Promise<boolean> => {
  const response = await api.post('/Workflow/complete-status', request);
  return response.data;
};

const workflowService = {
  getDocumentWorkflowStatus,
  getDocumentHistory,
  getDocumentCircuitHistory, // Added alias
  moveDocumentToNextStep,
  moveToSpecificStep,
  returnToPreviousStep,
  completeDocumentStatus
};

export default workflowService;
