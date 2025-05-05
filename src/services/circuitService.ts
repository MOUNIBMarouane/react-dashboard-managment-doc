
import api from './api';
import { Circuit, CreateCircuitDto, Step } from '@/models/circuit';
import { DocumentWorkflowStatus, DocumentCircuitHistory } from '@/models/documentCircuit';
import { CircuitValidation } from '@/models/circuitValidation';

const getAllCircuits = () => {
  return api.get<Circuit[]>('/Circuit').then(res => res.data);
};

const getCircuitById = (id: number) => {
  return api.get<Circuit>(`/Circuit/${id}`).then(res => res.data);
};

const createCircuit = (circuit: CreateCircuitDto) => {
  return api.post<Circuit>('/Circuit', circuit).then(res => res.data);
};

const updateCircuit = (id: number, circuit: Partial<Circuit>) => {
  return api.put<Circuit>(`/Circuit/${id}`, circuit).then(res => res.data);
};

const deleteCircuit = (id: number) => {
  return api.delete<void>(`/Circuit/${id}`).then(res => res.data);
};

const assignDocumentToCircuit = (data: { documentId: number; circuitId: number }) => {
  return api.post('/Workflow/assign-circuit', data).then(res => res.data);
};

const moveToNextStep = (data: { documentId: number; comments?: string }) => {
  return api.post('/Workflow/move-next', data).then(res => res.data);
};

const returnToPreviousStep = (data: { documentId: number; comments?: string }) => {
  return api.post('/Workflow/return-to-previous', data).then(res => res.data);
};

const getDocumentHistory = (documentId: number) => {
  return api.get<DocumentCircuitHistory[]>(`/Workflow/document/${documentId}/history`).then(res => res.data);
};

const getDocumentCurrentStatus = (documentId: number) => {
  return api.get<DocumentWorkflowStatus>(`/Workflow/document/${documentId}/current-status`).then(res => res.data);
};

const getPendingApprovals = () => {
  return api.get('/Workflow/pending-documents').then(res => res.data);
};

const validateCircuit = (circuitId: number) => {
  return api.get<CircuitValidation>(`/Circuit/validate/${circuitId}`).then(res => res.data);
};

// Circuit detail methods
const getCircuitDetailsByCircuitId = (circuitId: number) => {
  return api.get(`/CircuitDetail/by-circuit/${circuitId}`).then(res => res.data);
};

const createCircuitDetail = (circuitDetail: any) => {
  return api.post('/CircuitDetail', circuitDetail).then(res => res.data);
};

const updateCircuitDetail = (id: number, circuitDetail: any) => {
  return api.put(`/CircuitDetail/${id}`, circuitDetail).then(res => res.data);
};

const performAction = (data: { 
  documentId: number; 
  actionId: number; 
  comments: string; 
  isApproved: boolean 
}) => {
  return api.post('/Workflow/perform-action', data).then(res => res.data);
};

// Step management methods
const createStep = (step: { 
  circuitId: number; 
  title: string; 
  descriptif: string; 
  orderIndex: number; 
  responsibleRoleId?: number;
}) => {
  return api.post<Step>(`/Circuit/${step.circuitId}/steps`, step).then(res => res.data);
};

const updateStep = (stepId: number, step: Partial<Step>) => {
  return api.put<Step>(`/Circuit/steps/${stepId}`, step).then(res => res.data);
};

const circuitService = {
  getAllCircuits,
  getCircuitById,
  createCircuit,
  updateCircuit,
  deleteCircuit,
  assignDocumentToCircuit,
  moveToNextStep,
  returnToPreviousStep,
  getDocumentHistory,
  getDocumentCurrentStatus,
  getPendingApprovals,
  validateCircuit,
  getCircuitDetailsByCircuitId,
  createCircuitDetail,
  updateCircuitDetail,
  performAction,
  createStep,
  updateStep
};

export default circuitService;
