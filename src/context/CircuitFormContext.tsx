
import React, { createContext, useContext, useState } from 'react';
import { CreateCircuitDto, CreateStepDto } from '@/models/circuit';
import circuitService from '@/services/circuitService';
import { toast } from 'sonner';

interface CircuitFormData {
  title: string;
  descriptif: string;
  isActive: boolean;
  hasOrderedFlow: boolean;
  allowBacktrack: boolean;
  steps: {
    title: string;
    descriptif: string;
    orderIndex: number;
    responsibleRoleId?: number;
    isFinalStep?: boolean;
  }[];
}

export interface CircuitFormContextType {
  currentStep: number;
  totalSteps: number;
  formData: CircuitFormData;
  isSubmitting: boolean;
  setCircuitData: (data: Partial<CircuitFormData>) => void;
  addStep: (step: Partial<CreateStepDto>) => void;
  removeStep: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  submitForm: () => Promise<boolean>;
}

const initialFormData: CircuitFormData = {
  title: '',
  descriptif: '',
  isActive: true,
  hasOrderedFlow: true,
  allowBacktrack: false,
  steps: [],
};

const CircuitFormContext = createContext<CircuitFormContextType | undefined>(undefined);

export const CircuitFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CircuitFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 5;

  const setCircuitData = (data: Partial<CircuitFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const addStep = (step: Partial<CreateStepDto>) => {
    setFormData(prev => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          title: step.title || '',
          descriptif: step.descriptif || '',
          orderIndex: step.orderIndex || prev.steps.length + 1,
          responsibleRoleId: step.responsibleRoleId,
          isFinalStep: step.isFinalStep || false,
        },
      ],
    }));
  };

  const removeStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const submitForm = async (): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      
      const circuitData: CreateCircuitDto = {
        title: formData.title,
        descriptif: formData.descriptif,
        isActive: formData.isActive,
        hasOrderedFlow: formData.hasOrderedFlow,
        allowBacktrack: formData.allowBacktrack,
        steps: formData.steps.map(step => ({
          ...step,
          circuitId: 0, // This will be assigned by the backend
        })),
      };
      
      const response = await circuitService.createCircuit(circuitData);
      toast.success('Circuit created successfully');
      return true;
    } catch (error) {
      console.error('Error creating circuit:', error);
      toast.error('Failed to create circuit');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const value: CircuitFormContextType = {
    currentStep,
    totalSteps,
    formData,
    isSubmitting,
    setCircuitData,
    addStep,
    removeStep,
    nextStep,
    prevStep,
    submitForm,
  };

  return <CircuitFormContext.Provider value={value}>{children}</CircuitFormContext.Provider>;
};

export const useCircuitForm = () => {
  const context = useContext(CircuitFormContext);
  if (!context) {
    throw new Error('useCircuitForm must be used within a CircuitFormProvider');
  }
  return context;
};
