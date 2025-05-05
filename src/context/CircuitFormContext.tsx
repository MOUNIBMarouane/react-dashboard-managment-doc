
import React, { createContext, useContext, useState } from 'react';
import { CreateCircuitDto, Step } from '@/models/circuit';
import circuitService from '@/services/circuitService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export interface CircuitFormContextProps {
  currentStep: number;
  circuitData: CreateCircuitDto;
  formData: CreateCircuitDto;
  setCircuitData: (data: Partial<CreateCircuitDto>) => void;
  nextStep: () => void;
  prevStep: () => void;
  addStep: (step: Partial<Step>) => void;
  removeStep: (index: number) => void;
  reset: () => void;
  totalSteps: number;
  submitForm: () => Promise<boolean>;
  isSubmitting: boolean;
}

const defaultCircuitData: CreateCircuitDto = {
  title: '',
  descriptif: '',
  hasOrderedFlow: true,
  allowBacktrack: true,
  isActive: false,
  steps: []
};

const CircuitFormContext = createContext<CircuitFormContextProps>({
  currentStep: 0,
  circuitData: defaultCircuitData,
  formData: defaultCircuitData,
  setCircuitData: () => {},
  nextStep: () => {},
  prevStep: () => {},
  addStep: () => {},
  removeStep: () => {},
  reset: () => {},
  totalSteps: 5,
  submitForm: async () => false,
  isSubmitting: false
});

export const useCircuitForm = () => useContext(CircuitFormContext);

interface CircuitFormProviderProps {
  children: React.ReactNode;
}

export const CircuitFormProvider: React.FC<CircuitFormProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [circuitData, setCircuitDataState] = useState<CreateCircuitDto>({
    ...defaultCircuitData,
    createdAt: new Date().toISOString(),
    steps: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const totalSteps = 5;

  const setCircuitData = (data: Partial<CreateCircuitDto>) => {
    setCircuitDataState(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addStep = (step: Partial<Step>) => {
    setCircuitDataState(prev => {
      const steps = [...(prev.steps || [])];
      steps.push(step as Step);
      return { ...prev, steps };
    });
  };

  const removeStep = (index: number) => {
    setCircuitDataState(prev => {
      const steps = [...(prev.steps || [])];
      steps.splice(index, 1);
      return { ...prev, steps };
    });
  };

  const reset = () => {
    setCurrentStep(0);
    setCircuitDataState(defaultCircuitData);
  };

  const submitForm = async (): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      // Create circuit without the "createdAt" property since it's not expected by the API
      const { createdAt, ...dataToSubmit } = circuitData;
      
      // Ensure steps are properly formatted
      const formattedData = {
        ...dataToSubmit,
        steps: circuitData.steps?.map(step => ({
          title: step.title,
          descriptif: step.descriptif,
          orderIndex: step.orderIndex || 0,
          responsibleRoleId: step.responsibleRoleId,
          isFinalStep: step.isFinalStep || false
        })) || []
      };
      
      await circuitService.createCircuit(formattedData);
      toast.success('Circuit created successfully');
      return true;
    } catch (error: any) {
      console.error('Error creating circuit:', error);
      toast.error(error?.message || 'Failed to create circuit');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CircuitFormContext.Provider 
      value={{
        currentStep,
        circuitData,
        formData: circuitData,
        setCircuitData,
        nextStep,
        prevStep,
        addStep,
        removeStep,
        reset,
        totalSteps,
        submitForm,
        isSubmitting
      }}
    >
      {children}
    </CircuitFormContext.Provider>
  );
};
