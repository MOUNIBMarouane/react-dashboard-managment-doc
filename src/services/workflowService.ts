
import api from './api';
import { DocumentWorkflowStatus, DocumentStatusDto, MoveDocumentRequest } from '@/models/documentCircuit';

const getDocumentWorkflowStatus = async (documentId: number): Promise<DocumentWorkflowStatus> => {
  const response = await api.get(`/Workflow/document/${documentId}/current-status`);
  return response.data;
};

const getDocumentStepStatuses = async (documentId: number): Promise<DocumentStatusDto[]> => {
  const response = await api.get(`/Workflow/document/${documentId}/step-statuses`);
  return response.data;
};

const getDocumentHistory = async (documentId: number): Promise<any[]> => {
  const response = await api.get(`/Workflow/document/${documentId}/history`);
  return response.data;
};

const completeDocumentStatus = async (data: {
  documentId: number;
  statusId: number;
  isComplete: boolean;
  comments: string;
}): Promise<void> => {
  await api.post('/Workflow/complete-status', data);
};

const moveToNextStep = async (data: MoveDocumentRequest): Promise<void> => {
  await api.post('/Workflow/change-step', data);
};

const moveDocumentToNextStep = async (data: {
  documentId: number;
  comments: string;
}): Promise<void> => {
  await api.post('/Workflow/move-next', data);
};

const returnToPreviousStep = async (data: {
  documentId: number;
  comments: string;
}): Promise<void> => {
  await api.post('/Workflow/return-to-previous', data);
};

const workflowService = {
  getDocumentWorkflowStatus,
  getDocumentStepStatuses,
  getDocumentHistory,
  completeDocumentStatus,
  moveToNextStep,
  moveDocumentToNextStep,
  returnToPreviousStep,
};

export default workflowService;
