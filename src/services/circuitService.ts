
import { Circuit, CircuitDetail, CreateCircuitDto, Step } from '@/models/circuit';
import { DocumentStatusDto, DocumentWorkflowStatus, ProcessCircuitRequest } from '@/models/documentCircuit';

// Mock data and implementation - would typically be replaced with API calls
let circuitIdCounter = 10;
let stepIdCounter = 30;
let detailIdCounter = 50;

const mockCircuits: Circuit[] = [
  {
    id: 1,
    circuitKey: 'CIR-001',
    title: 'Approval Workflow',
    descriptif: 'Standard document approval process',
    crdCounter: 0,
    isActive: true,
    hasOrderedFlow: true,
    allowBacktrack: false,
    createdAt: new Date().toISOString(),
    steps: []
  }
];

const mockSteps: Step[] = [
  {
    id: 1,
    stepKey: 'STEP-001',
    circuitId: 1,
    title: 'Initial Review',
    descriptif: 'First stage review',
    orderIndex: 0,
    isFinalStep: false,
  }
];

const circuitService = {
  getAllCircuits: async (): Promise<Circuit[]> => {
    return [...mockCircuits];
  },

  getCircuitById: async (id: number): Promise<Circuit> => {
    const circuit = mockCircuits.find(c => c.id === id);
    if (!circuit) throw new Error(`Circuit with id ${id} not found`);
    return { ...circuit };
  },

  createCircuit: async (circuit: Omit<Circuit, 'id' | 'circuitKey' | 'crdCounter'>): Promise<Circuit> => {
    const newCircuit: Circuit = {
      ...circuit,
      id: circuitIdCounter++,
      circuitKey: `CIR-${String(circuitIdCounter).padStart(3, '0')}`,
      crdCounter: 0,
      steps: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCircuits.push(newCircuit);
    return newCircuit;
  },

  updateCircuit: async (id: number, circuit: Partial<Circuit>): Promise<Circuit> => {
    const index = mockCircuits.findIndex(c => c.id === id);
    if (index === -1) throw new Error(`Circuit with id ${id} not found`);
    
    mockCircuits[index] = {
      ...mockCircuits[index],
      ...circuit,
      updatedAt: new Date().toISOString(),
    };
    
    return mockCircuits[index];
  },

  deleteCircuit: async (id: number): Promise<void> => {
    const index = mockCircuits.findIndex(c => c.id === id);
    if (index === -1) throw new Error(`Circuit with id ${id} not found`);
    mockCircuits.splice(index, 1);
  },

  getCircuitDetailsByCircuitId: async (circuitId: number): Promise<CircuitDetail[]> => {
    return mockSteps
      .filter(s => s.circuitId === circuitId)
      .map(s => ({
        id: s.id,
        title: s.title,
        descriptif: s.descriptif,
        orderIndex: s.orderIndex,
        responsibleRoleId: s.responsibleRoleId,
        isFinalStep: s.isFinalStep,
        circuitId: s.circuitId,
        circuitDetailKey: s.stepKey
      }));
  },

  // Add missing methods that were causing build errors
  createCircuitDetail: async (detail: any): Promise<CircuitDetail> => {
    const newDetail = {
      ...detail,
      id: detailIdCounter++,
      circuitDetailKey: `DETAIL-${String(detailIdCounter).padStart(3, '0')}`,
      isFinalStep: detail.isFinalStep || false,
    };
    // In a real implementation, this would be saved to the database
    return newDetail;
  },

  updateCircuitDetail: async (id: number, detail: any): Promise<CircuitDetail> => {
    // In a real implementation, this would update the database
    return {
      ...detail,
      id,
      circuitDetailKey: `DETAIL-${String(id).padStart(3, '0')}`,
      isFinalStep: detail.isFinalStep || false,
    };
  },

  getPendingApprovals: async () => {
    // Mock data for pending approvals
    return [
      {
        id: 101,
        documentKey: "DOC-2023-101",
        title: "Budget Approval Request",
        status: "Pending Approval",
        documentType: { typeName: "Financial" },
        stepName: "Manager Review",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  },

  performAction: async (request: ProcessCircuitRequest) => {
    console.log("Performing action:", request);
    // In a real implementation, this would interact with the backend
    return true;
  },

  returnToPreviousStep: async (documentId: number, comments: string = "") => {
    console.log("Returning document to previous step:", documentId, comments);
    // In a real implementation, this would interact with the backend
    return true;
  },

  moveToNextStep: async (request: any) => {
    console.log("Moving document to next step:", request);
    // In a real implementation, this would interact with the backend
    return true;
  },

  completeDocumentStatus: async (request: any) => {
    console.log("Completing document status:", request);
    // In a real implementation, this would interact with the backend
    return true;
  },

  completeStatus: async (data: any) => {
    console.log("Completing status:", data);
    // In a real implementation, this would interact with the backend
    return true;
  },

  // Additional methods for step management
  createStep: async (step: any): Promise<Step> => {
    const newStep: Step = {
      ...step,
      id: stepIdCounter++,
      stepKey: `STEP-${String(stepIdCounter).padStart(3, '0')}`,
      isFinalStep: step.isFinalStep || false,
    };
    mockSteps.push(newStep);
    return newStep;
  },

  updateStep: async (id: number, step: any): Promise<Step> => {
    const index = mockSteps.findIndex(s => s.id === id);
    if (index === -1) throw new Error(`Step with id ${id} not found`);
    
    mockSteps[index] = {
      ...mockSteps[index],
      ...step,
    };
    
    return mockSteps[index];
  }
};

export default circuitService;
