
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Circuit } from '@/models/circuit';

export interface CircuitFormContextType {
  formData: {
    title: string;
    descriptif: string;
    isActive: boolean;
    hasOrderedFlow: boolean;
    allowBacktrack: boolean;
    steps: any[];
  };
  setCircuitData: (data: Partial<{
    title: string;
    descriptif: string;
    isActive: boolean;
    hasOrderedFlow: boolean;
    allowBacktrack: boolean;
    steps: any[];
  }>) => void;
  addStep: (step: any) => void;
  removeStep: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  submitForm: () => void; 
  isSubmitting: boolean;
}

const defaultContext: CircuitFormContextType = {
  formData: {
    title: '',
    descriptif: '',
    isActive: false,
    hasOrderedFlow: false,
    allowBacktrack: false,
    steps: []
  },
  setCircuitData: () => {},
  addStep: () => {},
  removeStep: () => {},
  nextStep: () => {},
  prevStep: () => {},
  currentStep: 0,
  submitForm: () => {},
  isSubmitting: false
};

export const CircuitFormContext = createContext<CircuitFormContextType>(defaultContext);

interface CircuitFormProviderProps {
  children: ReactNode;
  onSubmit?: (data: any) => void;
}

export const CircuitFormProvider: React.FC<CircuitFormProviderProps> = ({ children, onSubmit }) => {
  const [formData, setFormData] = useState(defaultContext.formData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setCircuitData = (data: Partial<typeof formData>) => {
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
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const submitForm = async () => {
    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <CircuitFormContext.Provider
      value={{
        formData,
        setCircuitData,
        addStep,
        removeStep,
        nextStep,
        prevStep,
        currentStep,
        submitForm,
        isSubmitting
      }}
    >
      {children}
    </CircuitFormContext.Provider>
  );
};

export const useCircuitForm = () => useContext(CircuitFormContext);
