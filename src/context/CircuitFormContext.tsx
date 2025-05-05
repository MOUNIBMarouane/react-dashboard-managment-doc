import React, { createContext, useContext, useState } from 'react';
import { Step } from '@/models/circuit';

// Define the CircuitFormContextType with all the missing properties
export interface CircuitFormContextType {
  formData: any;
  setCircuitData: (data: any) => void;
  addStep: (step: any) => void;
  removeStep: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
  // Add any other properties needed
}

const CircuitFormContext = createContext<CircuitFormContextType | undefined>(undefined);

export const useCircuitForm = () => {
  const context = useContext(CircuitFormContext);
  if (!context) {
    throw new Error('useCircuitForm must be used within a CircuitFormProvider');
  }
  return context;
};

export const CircuitFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<any>({});
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const setCircuitData = (data: any) => {
    setFormData(data);
  };

  const addStep = (step: Step) => {
    setSteps([...steps, step]);
  };

  const removeStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const nextStep = () => {
    setCurrentStepIndex(prevIndex => Math.min(prevIndex + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStepIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  const contextValue: CircuitFormContextType = {
    formData,
    setCircuitData,
    addStep,
    removeStep,
    nextStep,
    prevStep,
    submitForm,
    isSubmitting,
  };

  return (
    <CircuitFormContext.Provider value={contextValue}>
      {children}
    </CircuitFormContext.Provider>
  );
};
