
import { Circuit, CreateCircuitDto, UpdateCircuitDto } from "@/models/circuit";
import { CircuitDetail } from "@/models/circuitDetail";
import { DocumentStatus } from "@/models/documentCircuit";
import { MoveToNextStepRequest, AssignCircuitRequest } from "@/models/documentCircuit";

// Define the CircuitValidation interface with all required fields
export interface CircuitValidation {
  circuitId: number;
  circuitTitle: string;
  hasSteps: boolean;
  totalSteps: number;
  allStepsHaveStatuses: boolean;
  isValid: boolean;
  stepsWithoutStatuses: {
    stepId: number;
    stepTitle: string;
    order: number;
  }[];
}

const circuitService = {
  getAllCircuits: async (): Promise<Circuit[]> => {
    // Mock data for demonstration
    const mockCircuits: Circuit[] = [
      {
        id: 1,
        circuitKey: "CIR-001",
        title: "Standard Approval Process",
        descriptif: "A basic approval workflow for all documents.",
        isActive: true,
        crdCounter: 5,
      },
      {
        id: 2,
        circuitKey: "CIR-002",
        title: "Expedited Review Process",
        descriptif: "A faster review process for urgent documents.",
        isActive: false,
        crdCounter: 3,
      },
    ];
    return Promise.resolve(mockCircuits);
  },

  getCircuitById: async (id: number): Promise<Circuit> => {
    const mockCircuit: Circuit = {
      id: id,
      circuitKey: `CIR-${id}`,
      title: `Circuit ${id}`,
      descriptif: `Description for circuit ${id}`,
      isActive: true,
      crdCounter: 5,
    };
    return Promise.resolve(mockCircuit);
  },

  createCircuit: async (
    circuit: Omit<Circuit, "id" | "circuitKey" | "crdCounter">
  ): Promise<Circuit> => {
    const newId = Math.floor(Math.random() * 1000);
    const newCircuit: Circuit = {
      id: newId,
      circuitKey: `CIR-${newId}`,
      title: circuit.title,
      descriptif: circuit.descriptif,
      isActive: false,
      crdCounter: 0,
    };
    return Promise.resolve(newCircuit);
  },

  updateCircuit: async (
    id: number,
    circuit: UpdateCircuitDto
  ): Promise<Circuit> => {
    const updatedCircuit: Circuit = {
      id: id,
      circuitKey: `CIR-${id}`,
      title: circuit.title || `Circuit ${id}`,
      descriptif: circuit.descriptif || `Description for circuit ${id}`,
      isActive: circuit.isActive || false,
      crdCounter: 0,
    };
    return Promise.resolve(updatedCircuit);
  },

  deleteCircuit: async (id: number): Promise<void> => {
    return Promise.resolve();
  },

  // Updated to getCircuitDetails instead of getCircuitDetailsByCircuitId
  getCircuitDetails: async (circuitId: number): Promise<CircuitDetail[]> => {
    const mockDetails: CircuitDetail[] = [
      {
        id: 1,
        circuitId: circuitId,
        stepKey: "STP-001",
        title: "Initial Draft",
        descriptif: "Draft the initial document.",
        orderIndex: 0,
      },
      {
        id: 2,
        circuitId: circuitId,
        stepKey: "STP-002",
        title: "Review by Supervisor",
        descriptif: "Review the document for accuracy.",
        orderIndex: 1,
      },
    ];
    return Promise.resolve(mockDetails);
  },

  // Add alias for the method to match what's being used
  getCircuitDetailsByCircuitId: async (circuitId: number): Promise<CircuitDetail[]> => {
    return circuitService.getCircuitDetails(circuitId);
  },

  getCircuitDetailById: async (id: number): Promise<CircuitDetail> => {
    const mockDetail: CircuitDetail = {
      id: id,
      circuitId: 1,
      stepKey: `STP-${id}`,
      title: `Step ${id}`,
      descriptif: `Description for step ${id}`,
      orderIndex: 0,
    };
    return Promise.resolve(mockDetail);
  },

  createCircuitDetail: async (
    detail: Omit<CircuitDetail, "id">
  ): Promise<CircuitDetail> => {
    const newId = Math.floor(Math.random() * 1000);
    const newDetail: CircuitDetail = {
      id: newId,
      circuitId: detail.circuitId,
      stepKey: `STP-${newId}`,
      title: detail.title,
      descriptif: detail.descriptif,
      orderIndex: detail.orderIndex,
    };
    return Promise.resolve(newDetail);
  },

  updateCircuitDetail: async (
    id: number,
    detail: UpdateCircuitDto
  ): Promise<CircuitDetail> => {
    const updatedDetail: CircuitDetail = {
      id: id,
      circuitId: 1,
      stepKey: `STP-${id}`,
      title: detail.title || `Step ${id}`,
      descriptif: detail.descriptif || `Description for step ${id}`,
      orderIndex: 0,
    };
    return Promise.resolve(updatedDetail);
  },

  deleteCircuitDetail: async (id: number): Promise<void> => {
    return Promise.resolve();
  },

  getStepStatuses: async (documentId: number): Promise<DocumentStatus[]> => {
    const mockStatuses: DocumentStatus[] = [
      {
        statusId: 1,
        statusKey: "ST-001",
        title: "Drafting",
        description: "Initial drafting of the document",
        isRequired: true,
        isComplete: false,
        stepId: 1,
      },
      {
        statusId: 2,
        statusKey: "ST-002",
        title: "Review",
        description: "Review by supervisor",
        isRequired: true,
        isComplete: false,
        stepId: 2,
      },
    ];
    return Promise.resolve(mockStatuses);
  },

  completeStatus: async (data: {
    documentId: number;
    statusId: number;
    isComplete: boolean;
    comments: string;
  }): Promise<void> => {
    return Promise.resolve();
  },

  moveDocumentToNextStep: async (
    data: MoveToNextStepRequest
  ): Promise<void> => {
    return Promise.resolve();
  },

  moveDocumentToStep: async (data: {
    documentId: number;
    comments?: string;
  }): Promise<void> => {
    return Promise.resolve();
  },

  // Add method to assign document to circuit
  assignDocumentToCircuit: async (request: AssignCircuitRequest): Promise<void> => {
    console.log("Assigning document", request.documentId, "to circuit", request.circuitId);
    return Promise.resolve();
  },

  // Add method to get document circuit history
  getDocumentCircuitHistory: async (documentId: number) => {
    return [
      {
        id: 1,
        documentId: documentId,
        processedBy: "John Doe",
        processedAt: new Date().toISOString(),
        comments: "Initial assignment to circuit",
        isApproved: true,
        stepTitle: "Draft",
        circuitDetail: {
          title: "Draft",
          orderIndex: 0
        }
      }
    ];
  },

  // Add method to get document current status
  getDocumentCurrentStatus: async (documentId: number) => {
    return {
      documentId,
      documentTitle: "Test Document",
      circuitId: 1,
      circuitTitle: "Standard Approval",
      currentStepId: 1,
      currentStepTitle: "Draft",
      status: 1,
      statusText: "In Progress",
      isCircuitCompleted: false,
      statuses: [],
      availableActions: [],
      canAdvanceToNextStep: true,
      canReturnToPreviousStep: false
    };
  },

  // Add method to validate circuit with expanded return type
  validateCircuit: async (circuitId: number): Promise<CircuitValidation> => {
    return {
      circuitId,
      circuitTitle: `Circuit ${circuitId}`,
      hasSteps: true,
      totalSteps: 3,
      allStepsHaveStatuses: false,
      isValid: false,
      stepsWithoutStatuses: [
        {
          stepId: 1,
          stepTitle: "Draft",
          order: 1
        }
      ]
    };
  },

  // Add method for perform action
  performAction: async (data: any): Promise<void> => {
    return Promise.resolve();
  },

  // Add method for returning to previous step
  returnToPreviousStep: async (data: any): Promise<void> => {
    return Promise.resolve();
  }
};

export default circuitService;
