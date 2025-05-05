
import React, { createContext, useContext, useState } from 'react';
import { CreateCircuitDto, Step } from '@/models/circuit';

export interface CircuitFormContextProps {
  currentStep: number;
  circuitData: CreateCircuitDto;
  setCircuitData: (data: Partial<CreateCircuitDto>) => void;
  nextStep: () => void;
  prevStep: () => void;
  addStep: (step: Partial<Step>) => void;
  removeStep: (index: number) => void;
  reset: () => void;
  totalSteps: number;
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
  setCircuitData: () => {},
  nextStep: () => {},
  prevStep: () => {},
  addStep: () => {},
  removeStep: () => {},
  reset: () => {},
  totalSteps: 5
});

export const useCircuitForm = () => useContext(CircuitFormContext);

interface CircuitFormProviderProps {
  children: React.ReactNode;
}

export const CircuitFormProvider: React.FC<CircuitFormProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [circuitData, setCircuitDataState] = useState<CreateCircuitDto>({
    ...defaultCircuitData,
    createdAt: new Date().toISOString()
  });
  
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

  return (
    <CircuitFormContext.Provider 
      value={{
        currentStep,
        circuitData,
        setCircuitData,
        nextStep,
        prevStep,
        addStep,
        removeStep,
        reset,
        totalSteps
      }}
    >
      {children}
    </CircuitFormContext.Provider>
  );
};
