
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
});

export const useCircuitForm = () => useContext(CircuitFormContext);

export const CircuitFormProvider: React.FC<{
  children: React.ReactNode;
  onSubmit: (data: CircuitFormData) => Promise<void>;
}> = ({ children, onSubmit }) => {
  const [formData, setFormData] = useState<CircuitFormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = (data: Partial<CircuitFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4)); // Assuming 5 steps (0-indexed)
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const submitForm = async () => {
    await onSubmit(formData);
  };

  return (
    <CircuitFormContext.Provider 
      value={{ 
        formData, 
        updateFormData, 
        nextStep, 
        prevStep, 
        currentStep,
        submitForm 
      }}
    >
      {children}
    </CircuitFormContext.Provider>
  );
};
