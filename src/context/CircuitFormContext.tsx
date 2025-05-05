
import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Circuit, CreateCircuitDto, CreateStepDto } from '@/models/circuit';
import circuitService from '@/services/circuitService';
import { useNavigate } from 'react-router-dom';

interface CircuitFormContextType {
  circuitData: Partial<CreateCircuitDto>;
  isSubmitting: boolean;
  setCircuitData: React.Dispatch<React.SetStateAction<Partial<CreateCircuitDto>>>;
  updateCircuitData: (data: Partial<CreateCircuitDto>) => void;
  handleCreateCircuit: () => Promise<void>;
  handleUpdateCircuit: (id: number) => Promise<void>;
  steps: CreateStepDto[];
  addStep: (step: CreateStepDto) => void;
  updateStep: (index: number, step: CreateStepDto) => void;
  removeStep: (index: number) => void;
  reorderSteps: (steps: CreateStepDto[]) => void;
}

const defaultContext: CircuitFormContextType = {
  circuitData: {
    title: '',
    descriptif: '',
    hasOrderedFlow: false,
    allowBacktrack: false,
    isActive: false
  },
  isSubmitting: false,
  setCircuitData: () => {},
  updateCircuitData: () => {},
  handleCreateCircuit: async () => {},
  handleUpdateCircuit: async () => {},
  steps: [],
  addStep: () => {},
  updateStep: () => {},
  removeStep: () => {},
  reorderSteps: () => {},
};

const CircuitFormContext = createContext<CircuitFormContextType>(defaultContext);

export const useCircuitForm = () => useContext(CircuitFormContext);

interface CircuitFormProviderProps {
  children: React.ReactNode;
  existingCircuit?: Circuit;
}

export const CircuitFormProvider: React.FC<CircuitFormProviderProps> = ({
  children,
  existingCircuit,
}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize circuit data from existingCircuit if provided
  const initialCircuitData: Partial<CreateCircuitDto> = existingCircuit
    ? {
        title: existingCircuit.title,
        descriptif: existingCircuit.descriptif,
        hasOrderedFlow: existingCircuit.hasOrderedFlow,
        allowBacktrack: existingCircuit.allowBacktrack,
        isActive: existingCircuit.isActive,
      }
    : {
        title: '',
        descriptif: '',
        hasOrderedFlow: false,
        allowBacktrack: false,
        isActive: false,
      };

  const [circuitData, setCircuitData] = useState<Partial<CreateCircuitDto>>(initialCircuitData);
  
  // Initialize steps from existingCircuit if provided
  const initialSteps: CreateStepDto[] = existingCircuit?.steps?.map((step) => ({
    circuitId: step.circuitId,
    title: step.title,
    descriptif: step.descriptif,
    orderIndex: step.orderIndex,
    responsibleRoleId: step.responsibleRoleId || undefined,
    isFinalStep: step.isFinalStep
  })) || [];

  const [steps, setSteps] = useState<CreateStepDto[]>(initialSteps);

  const updateCircuitData = useCallback((data: Partial<CreateCircuitDto>) => {
    setCircuitData((prev) => ({ ...prev, ...data }));
  }, []);

  const addStep = useCallback((step: CreateStepDto) => {
    setSteps((prev) => [...prev, step]);
  }, []);

  const updateStep = useCallback((index: number, step: CreateStepDto) => {
    setSteps((prev) => {
      const newSteps = [...prev];
      newSteps[index] = step;
      return newSteps;
    });
  }, []);

  const removeStep = useCallback((index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const reorderSteps = useCallback((newSteps: CreateStepDto[]) => {
    setSteps(newSteps);
  }, []);

  const handleCreateCircuit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      
      // Convert the form data to API expected format
      const createCircuitData: CreateCircuitDto = {
        title: circuitData.title || '',
        descriptif: circuitData.descriptif || '',
        hasOrderedFlow: circuitData.hasOrderedFlow || false,
        allowBacktrack: circuitData.allowBacktrack || false,
        isActive: circuitData.isActive || false,
      };
      
      const response = await circuitService.createCircuit(createCircuitData);
      
      // If the circuit was created successfully and we have steps, create them
      if (response && response.id && steps.length > 0) {
        // Create steps for the new circuit
        for (let i = 0; i < steps.length; i++) {
          const step = steps[i];
          await circuitService.createStep({
            ...step,
            circuitId: response.id,
          });
        }
      }
      
      toast.success('Circuit created successfully!');
      navigate('/circuits');
    } catch (error) {
      console.error('Error creating circuit:', error);
      toast.error('Failed to create circuit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [circuitData, steps, navigate]);

  const handleUpdateCircuit = useCallback(async (id: number) => {
    try {
      setIsSubmitting(true);
      
      // Convert the form data to API expected format
      const updateCircuitData: Partial<CreateCircuitDto> = {
        title: circuitData.title,
        descriptif: circuitData.descriptif,
        hasOrderedFlow: circuitData.hasOrderedFlow,
        allowBacktrack: circuitData.allowBacktrack,
        isActive: circuitData.isActive,
      };
      
      await circuitService.updateCircuit(id, updateCircuitData);
      
      // Handle steps update logic here (create, update, delete as needed)
      // This is a simplified example - in a real app, you might need more complex logic
      
      toast.success('Circuit updated successfully!');
      navigate('/circuits');
    } catch (error) {
      console.error('Error updating circuit:', error);
      toast.error('Failed to update circuit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [circuitData, navigate]);

  const contextValue = {
    circuitData,
    isSubmitting,
    setCircuitData,
    updateCircuitData,
    handleCreateCircuit,
    handleUpdateCircuit,
    steps,
    addStep,
    updateStep,
    removeStep,
    reorderSteps,
  };

  return (
    <CircuitFormContext.Provider value={contextValue}>
      {children}
    </CircuitFormContext.Provider>
  );
};
