
import { createContext, useState, useContext, ReactNode } from 'react';
import { Step } from '@/models/circuit';
import circuitService from '@/services/circuitService';
import { toast } from 'sonner';

interface CircuitFormData {
  title: string;
  descriptif: string;
  isActive: boolean;
  hasOrderedFlow: boolean;
  allowBacktrack?: boolean;
  steps: {
    title: string;
    descriptif: string;
    orderIndex: number;
    responsibleRoleId?: number;
    isFinalStep?: boolean;
  }[];
}

interface CircuitFormContextType {
  formData: CircuitFormData;
  setCircuitData: (data: Partial<CircuitFormData>) => void;
  addStep: (step: { title: string; descriptif: string; orderIndex: number }) => void;
  removeStep: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  submitForm: () => Promise<boolean>;
  isSubmitting: boolean;
  currentStep: number;
  validateForm: (step: number) => Promise<boolean>;
}

const CircuitFormContext = createContext<CircuitFormContextType | undefined>(undefined);

export const CircuitFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<CircuitFormData>({
    title: '',
    descriptif: '',
    isActive: true,
    hasOrderedFlow: true,
    steps: []
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setCircuitData = (data: Partial<CircuitFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const addStep = (step: { title: string; descriptif: string; orderIndex: number }) => {
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

  const validateForm = async (step: number): Promise<boolean> => {
    // Validate based on current step
    if (step === 1) {
      if (!formData.title || formData.title.length < 3) {
        toast.error('Please enter a valid title (minimum 3 characters)');
        return false;
      }
    }
    return true;
  };

  const submitForm = async (): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      const circuitToCreate = {
        title: formData.title,
        descriptif: formData.descriptif,
        isActive: formData.isActive,
        hasOrderedFlow: formData.hasOrderedFlow,
        allowBacktrack: formData.allowBacktrack || false,
      };

      // Create the circuit first
      const createdCircuit = await circuitService.createCircuit(circuitToCreate);
      
      // If there are steps, create them too
      if (formData.steps.length > 0 && createdCircuit.id) {
        // Create each step in sequence
        for (const step of formData.steps) {
          await circuitService.createCircuitDetail(createdCircuit.id, {
            title: step.title,
            descriptif: step.descriptif,
            orderIndex: step.orderIndex,
            responsibleRoleId: step.responsibleRoleId,
            isFinalStep: step.isFinalStep || false,
          });
        }
      }
      
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

  return (
    <CircuitFormContext.Provider value={{ 
      formData, 
      setCircuitData, 
      addStep, 
      removeStep, 
      nextStep, 
      prevStep, 
      submitForm,
      isSubmitting,
      currentStep,
      validateForm
    }}>
      {children}
    </CircuitFormContext.Provider>
  );
};

export const useCircuitForm = () => {
  const context = useContext(CircuitFormContext);
  if (context === undefined) {
    throw new Error('useCircuitForm must be used within a CircuitFormProvider');
  }
  return context;
};
