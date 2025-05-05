import { Circuit, Step, CreateCircuitDto, AssignCircuitRequest } from '@/models/circuit';
import { ProcessCircuitRequest } from '@/models/action';
import { DocumentWorkflowStatus } from '@/models/documentCircuit';

// Mock implementation for circuit service
const circuitService = {
  // Existing methods
  getAllCircuits: async (): Promise<Circuit[]> => {
    return []; // Mock implementation
  },
  
  getCircuitById: async (id: number): Promise<Circuit> => {
    return { 
      id, 
      circuitKey: `CR-${id}`, 
      title: 'Mock Circuit', 
      descriptif: 'Mock Circuit Description',
      crdCounter: 0,
      isActive: true,
      hasOrderedFlow: true,
      steps: []
    }; 
  },
  
  createCircuit: async (circuit: Omit<Circuit, "id" | "circuitKey" | "crdCounter">): Promise<Circuit> => {
    return { 
      ...circuit, 
      id: 1, 
      circuitKey: 'CR-001', 
      crdCounter: 0 
    };
  },
  
  updateCircuit: async (id: number, circuit: Partial<Circuit>): Promise<Circuit> => {
    return { 
      ...circuit, 
      id, 
      circuitKey: `CR-${id}`,
      crdCounter: 0,
      title: circuit.title || 'Updated Circuit',
      descriptif: circuit.descriptif || 'Updated Description',
      isActive: circuit.isActive !== undefined ? circuit.isActive : true,
      hasOrderedFlow: circuit.hasOrderedFlow !== undefined ? circuit.hasOrderedFlow : true
    } as Circuit;
  },
  
  // New methods that were missing
  validateCircuit: async (circuitId: number) => {
    return {
      circuitId,
      circuitTitle: 'Mock Circuit',
      hasSteps: true,
      totalSteps: 3,
      allStepsHaveStatuses: true,
      isValid: true,
      stepsWithoutStatuses: []
    };
  },
  
  assignDocumentToCircuit: async (data: AssignCircuitRequest): Promise<boolean> => {
    console.log('Assigning document to circuit:', data);
    return true;
  },
  
  getDocumentCurrentStatus: async (documentId: number): Promise<DocumentWorkflowStatus> => {
    return {
      documentId,
      documentTitle: 'Mock Document',
      circuitId: 1,
      circuitTitle: 'Mock Circuit',
      currentStepId: 1,
      currentStepTitle: 'Mock Step',
      status: 1,
      statusText: 'Active',
      isCircuitCompleted: false,
      statuses: [],
      availableActions: [],
      canAdvanceToNextStep: true,
      canReturnToPreviousStep: false
    };
  },
  
  getDocumentCircuitHistory: async (documentId: number) => {
    return [
      {
        id: 1,
        documentId,
        stepId: 1,
        processedByUserId: 1,
        processedBy: 'Admin',
        comments: 'Document processed',
        isApproved: true,
        processedAt: new Date().toISOString(),
        stepTitle: 'Mock Step',
      }
    ];
  },
  
  moveDocumentToNextStep: async (data: { documentId: number; comments: string }) => {
    console.log('Moving document to next step:', data);
    return true;
  },
  
  returnToPreviousStep: async (data: { documentId: number; comments: string }) => {
    console.log('Returning document to previous step:', data);
    return true;
  },
  
  performAction: async (data: ProcessCircuitRequest) => {
    console.log('Performing action:', data);
    return true;
  },
  
  getStepStatuses: async (documentId: number) => {
    return [
      {
        statusId: 1,
        title: 'Required Check',
        isRequired: true,
        isComplete: false
      },
      {
        statusId: 2,
        title: 'Optional Check',
        isRequired: false,
        isComplete: false
      }
    ];
  },
  
  completeDocumentStatus: async (data: { 
    documentId: number; 
    statusId: number; 
    isComplete: boolean; 
    comments: string 
  }) => {
    console.log('Completing document status:', data);
    return true;
  },
  
  updateStepStatus: async (statusId: number, data: any) => {
    console.log('Updating step status:', statusId, data);
    return true;
  }
};

export default circuitService;
