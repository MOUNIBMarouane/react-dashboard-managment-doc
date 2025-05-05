import { Circuit, CreateCircuitDto, UpdateCircuitDto } from "@/models/circuit";
import { CircuitDetail } from "@/models/circuitDetail";
import { DocumentStatus } from "@/models/documentCircuit";
import { MoveToNextStepRequest } from "@/models/documentCircuit";

// Define the missing CircuitValidation interface
interface CircuitValidation {
  isValid: boolean;
  message?: string;
}

// Now update the method in circuitService that uses CircuitValidation
const validateCircuit = (circuit: any): CircuitValidation => {
  // Mock implementation
  return { isValid: true };
};

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
      isActive: false,
      crdCounter: 0,
    };
    return Promise.resolve(updatedCircuit);
  },

  deleteCircuit: async (id: number): Promise<void> => {
    return Promise.resolve();
  },

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
        id: 1,
        stepId: 1,
        status: 0,
        name: "Drafting",
        description: "Initial drafting of the document",
      },
      {
        id: 2,
        stepId: 2,
        status: 1,
        name: "Review",
        description: "Review by supervisor",
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

  validateCircuit: validateCircuit,
};

export default circuitService;
