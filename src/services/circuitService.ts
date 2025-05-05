
import { Circuit, Step, CreateCircuitDto, AssignCircuitRequest } from '@/models/circuit';
import { ProcessCircuitRequest } from '@/models/action';
import { DocumentWorkflowStatus, DocumentCircuitHistory } from '@/models/documentCircuit';

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

  // Circuit Step (Detail) related methods
  getCircuitDetailsByCircuitId: async (circuitId: number) => {
    return [
      {
        id: 1,
        circuitId,
        title: 'Step 1',
        descriptif: 'First step description',
        orderIndex: 0,
        responsibleRoleId: null,
        stepKey: `CR-${circuitId}-STEP01`,
        isFinalStep: false
      },
      {
        id: 2,
        circuitId,
        title: 'Step 2',
        descriptif: 'Second step description',
        orderIndex: 1,
        responsibleRoleId: null,
        stepKey: `CR-${circuitId}-STEP02`,
        isFinalStep: true
      }
    ];
  },

  createCircuitDetail: async (detail: any) => {
    return {
      id: Math.floor(Math.random() * 1000),
      ...detail,
      stepKey: `CR-${detail.circuitId}-STEP-${Math.floor(Math.random() * 100)}`,
      isFinalStep: detail.isFinalStep || false
    };
  },

  updateCircuitDetail: async (id: number, detail: any) => {
    return {
      id,
      ...detail,
      isFinalStep: detail.isFinalStep || false
    };
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
  
  getDocumentCircuitHistory: async (documentId: number): Promise<DocumentCircuitHistory[]> => {
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
  
  moveDocumentToNextStep: async (data: { documentId: number; comments: string }): Promise<boolean> => {
    console.log('Moving document to next step:', data);
    return true;
  },
  
  returnToPreviousStep: async (data: { documentId: number; comments: string }): Promise<boolean> => {
    console.log('Returning document to previous step:', data);
    return true;
  },
  
  performAction: async (data: ProcessCircuitRequest): Promise<boolean> => {
    console.log('Performing action:', data);
    return true;
  },
  
  getStepStatuses: async (documentId: number) => {
    return [
      {
        statusId: 1,
        title: 'Required Check',
        isRequired: true,
        isComplete: false,
        completedBy: null,
        completedAt: null
      },
      {
        statusId: 2,
        title: 'Optional Check',
        isRequired: false,
        isComplete: false,
        completedBy: null,
        completedAt: null
      }
    ];
  },
  
  completeDocumentStatus: async (data: { 
    documentId: number; 
    statusId: number; 
    isComplete: boolean; 
    comments: string 
  }): Promise<boolean> => {
    console.log('Completing document status:', data);
    return true;
  },
  
  updateStepStatus: async (statusId: number, data: any): Promise<boolean> => {
    console.log('Updating step status:', statusId, data);
    return true;
  },

  getPendingApprovals: async () => {
    return [
      {
        id: 1,
        documentKey: 'DOC-001',
        title: 'Pending Document 1',
        createdBy: 'User 1',
        createdAt: new Date().toISOString(),
        circuitId: 1,
        circuitTitle: 'Mock Circuit',
        currentStepId: 1,
        currentStepTitle: 'Approval Step',
        daysInCurrentStep: 2
      }
    ];
  },
  
  deleteCircuit: async (id: number): Promise<boolean> => {
    console.log('Deleting circuit:', id);
    return true;
  },

  createStep: async (stepData: any): Promise<any> => {
    console.log('Creating step:', stepData);
    return {
      id: Math.floor(Math.random() * 1000),
      ...stepData,
      stepKey: `STEP-${Math.floor(Math.random() * 100)}`
    };
  },

  updateStep: async (id: number, stepData: any): Promise<any> => {
    console.log('Updating step:', id, stepData);
    return {
      id,
      ...stepData
    };
  },

  moveToNextStep: async (data: { documentId: number; comments: string }): Promise<boolean> => {
    console.log('Moving to next step:', data);
    return true;
  },

  completeStatus: async (data: any): Promise<boolean> => {
    console.log('Completing status:', data);
    return true;
  }
};

export default circuitService;
