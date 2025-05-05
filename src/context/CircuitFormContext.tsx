
import React, { createContext, useContext, useState } from 'react';

export interface CircuitFormData {
  title: string;
  descriptif: string;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  isActive: boolean;
  steps: {
    title: string;
    descriptif: string;
    orderIndex: number;
    responsibleRoleId?: number;
  }[];
}

export interface CircuitFormContextType {
  formData: CircuitFormData;
  updateFormData: (data: Partial<CircuitFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  submitForm: () => Promise<void>;
  isSubmitting: boolean; // Added missing property
  setCircuitData: (data: Partial<CircuitFormData>) => void; // Added missing property
  addStep: (step: any) => void; // Added missing property
  removeStep: (index: number) => void; // Added missing property
}

const defaultFormData: CircuitFormData = {
  title: '',
  descriptif: '',
  hasOrderedFlow: true,
  allowBacktrack: false,
  isActive: false,
  steps: []
};

const CircuitFormContext = createContext<CircuitFormContextType>({
  formData: defaultFormData,
  updateFormData: () => {},
  nextStep: () => {},
  prevStep: () => {},
  currentStep: 0,
  submitForm: async () => {},
  isSubmitting: false, // Added missing property
  setCircuitData: () => {}, // Added missing property
  addStep: () => {}, // Added missing property
  removeStep: () => {}, // Added missing property
});

export const useCircuitForm = () => useContext(CircuitFormContext);

export const CircuitFormProvider: React.FC<{
  children: React.ReactNode;
  onSubmit: (data: CircuitFormData) => Promise<void>;
}> = ({ children, onSubmit }) => {
  const [formData, setFormData] = useState<CircuitFormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (data: Partial<CircuitFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const setCircuitData = (data: Partial<CircuitFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const addStep = (step: any) => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, step]
    }));
  };

  const removeStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4)); // Assuming 5 steps (0-indexed)
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CircuitFormContext.Provider 
      value={{ 
        formData, 
        updateFormData, 
        nextStep, 
        prevStep, 
        currentStep,
        submitForm,
        isSubmitting,
        setCircuitData,
        addStep,
        removeStep
      }}
    >
      {children}
    </CircuitFormContext.Provider>
  );
};
