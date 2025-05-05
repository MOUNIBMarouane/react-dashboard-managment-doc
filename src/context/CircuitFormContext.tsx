import { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';
import circuitService from '@/services/circuitService';
import { CreateCircuitDto, CircuitDto } from '@/models/circuit';

interface CircuitFormContextProps {
  formData: CreateCircuitDto;
  setFormData: (data: Partial<CreateCircuitDto>) => void;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
}

const CircuitFormContext = createContext<CircuitFormContextProps | undefined>(undefined);

export const useCircuitForm = () => {
  const context = useContext(CircuitFormContext);
  if (!context) {
    throw new Error('useCircuitForm must be used within a CircuitFormProvider');
  }
  return context;
};

interface CircuitFormProviderProps {
  children: React.ReactNode;
  onSubmit: (circuit: CircuitDto) => void;
}

export const CircuitFormProvider: React.FC<CircuitFormProviderProps> = ({ children, onSubmit }) => {
  const [formData, setFormData] = useState<CreateCircuitDto>({
    title: '',
    descriptif: '',
    hasOrderedFlow: false,
    allowBacktrack: false,
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (data: Partial<CreateCircuitDto>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const submitForm = async () => {
    setIsSubmitting(true);

    try {
      const circuitData = {
        title: formData.title,
        descriptif: formData.descriptif,
        hasOrderedFlow: formData.hasOrderedFlow,
        allowBacktrack: formData.allowBacktrack,
        isActive: formData.isActive
      };

      const newCircuit = await circuitService.createCircuit(circuitData);
      onSubmit(newCircuit);
      toast.success('Circuit created successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create circuit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    formData,
    setFormData: updateFormData,
    submitForm,
    isSubmitting,
  };

  return (
    <CircuitFormContext.Provider value={value}>
      {children}
    </CircuitFormContext.Provider>
  );
};
