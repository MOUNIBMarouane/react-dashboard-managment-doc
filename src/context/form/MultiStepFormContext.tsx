
import React, { createContext, useContext, useState } from 'react';

interface FormStep {
  id: string;
  label: string;
  description?: string;
  isOptional?: boolean;
  isComplete?: boolean;
}

interface MultiStepFormContextValue {
  // Current step
  currentStep: number;
  totalSteps: number;
  steps: FormStep[];
  isFirstStep: boolean;
  isLastStep: boolean;
  
  // Navigation
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (stepIndex: number) => void;
  
  // Data
  formData: Record<string, any>;
  updateFormData: (data: Record<string, any>) => void;
  
  // Validation & Submission
  isStepValid: (step: number) => boolean;
  validateCurrentStep: () => boolean;
  isSubmitting: boolean;
  submitForm: () => Promise<void>;
  
  // Status & Errors
  stepErrors: Record<number, string[]>;
  formErrors: string[];
  addStepError: (step: number, error: string) => void;
  clearStepErrors: (step: number) => void;
  hasStepBeenVisited: (step: number) => boolean;
}

const MultiStepFormContext = createContext<MultiStepFormContextValue | undefined>(undefined);

export interface MultiStepFormProviderProps {
  children: React.ReactNode;
  initialStep?: number;
  initialData?: Record<string, any>;
  steps: FormStep[];
  onSubmit: (data: Record<string, any>) => Promise<void>;
  validateStep?: (step: number, data: Record<string, any>) => string[] | boolean;
}

export const MultiStepFormProvider: React.FC<MultiStepFormProviderProps> = ({
  children,
  initialStep = 0,
  initialData = {},
  steps,
  onSubmit,
  validateStep
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([initialStep]);
  const [stepErrors, setStepErrors] = useState<Record<number, string[]>>({});
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) {
      const isValid = validateCurrentStep();
      if (isValid) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        
        // Mark as visited
        if (!visitedSteps.includes(nextStep)) {
          setVisitedSteps(prev => [...prev, nextStep]);
        }
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < totalSteps) {
      setCurrentStep(stepIndex);
      
      // Mark as visited
      if (!visitedSteps.includes(stepIndex)) {
        setVisitedSteps(prev => [...prev, stepIndex]);
      }
    }
  };

  const updateFormData = (data: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  const isStepValid = (step: number) => {
    if (!validateStep) return true;
    
    const result = validateStep(step, formData);
    if (Array.isArray(result)) {
      return result.length === 0;
    }
    return result === true;
  };

  const validateCurrentStep = () => {
    if (!validateStep) return true;
    
    const result = validateStep(currentStep, formData);
    if (Array.isArray(result)) {
      setStepErrors(prev => ({
        ...prev,
        [currentStep]: result
      }));
      return result.length === 0;
    }
    
    if (!result) {
      setStepErrors(prev => ({
        ...prev,
        [currentStep]: ['Invalid form data']
      }));
    }
    
    return result === true;
  };

  const addStepError = (step: number, error: string) => {
    setStepErrors(prev => ({
      ...prev,
      [step]: [...(prev[step] || []), error]
    }));
  };

  const clearStepErrors = (step: number) => {
    setStepErrors(prev => {
      const updated = { ...prev };
      delete updated[step];
      return updated;
    });
  };

  const hasStepBeenVisited = (step: number) => {
    return visitedSteps.includes(step);
  };

  const submitForm = async () => {
    // Validate all steps before submission
    let allValid = true;
    const errors: Record<number, string[]> = {};
    
    if (validateStep) {
      for (let i = 0; i < totalSteps; i++) {
        const result = validateStep(i, formData);
        if (Array.isArray(result) && result.length > 0) {
          errors[i] = result;
          allValid = false;
        } else if (result === false) {
          errors[i] = ['Invalid form data'];
          allValid = false;
        }
      }
    }
    
    if (!allValid) {
      setStepErrors(errors);
      // Go to the first step with errors
      const firstErrorStep = Object.keys(errors)[0];
      setCurrentStep(parseInt(firstErrorStep));
      return;
    }
    
    try {
      setIsSubmitting(true);
      setFormErrors([]);
      await onSubmit(formData);
    } catch (error) {
      if (error instanceof Error) {
        setFormErrors([error.message]);
      } else {
        setFormErrors(['An unexpected error occurred']);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const value: MultiStepFormContextValue = {
    currentStep,
    totalSteps,
    steps,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    formData,
    updateFormData,
    isStepValid,
    validateCurrentStep,
    isSubmitting,
    submitForm,
    stepErrors,
    formErrors,
    addStepError,
    clearStepErrors,
    hasStepBeenVisited
  };

  return (
    <MultiStepFormContext.Provider value={value}>
      {children}
    </MultiStepFormContext.Provider>
  );
};

export default MultiStepFormContext;
