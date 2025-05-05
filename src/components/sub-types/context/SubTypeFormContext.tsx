
import React, { createContext, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SubType } from '@/models/subtype';
import subTypeService from '@/services/subTypeService';
import { toast } from 'sonner';

// Define form schema
const subTypeSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  description: z.string().optional(),
  documentTypeId: z.number().min(1, { message: "Document type is required" }),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  isActive: z.boolean().default(true)
});

export type SubTypeFormData = z.infer<typeof subTypeSchema>;

interface SubTypeFormContextType {
  currentStep: number;
  totalSteps: number;
  formData: SubTypeFormData;
  isEditMode: boolean;
  isSubmitting: boolean;
  updateForm: (data: Partial<SubTypeFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  submitForm: () => Promise<void>;
  form: ReturnType<typeof useForm<SubTypeFormData>>;
}

const SubTypeFormContext = createContext<SubTypeFormContextType | null>(null);

interface SubTypeFormProviderProps {
  children: React.ReactNode;
  initialData?: SubType;
  onSuccess?: () => void;
  documentTypeId?: number;
}

export const SubTypeFormProvider: React.FC<SubTypeFormProviderProps> = ({
  children,
  initialData,
  onSuccess,
  documentTypeId
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if we're in edit mode
  const isEditMode = !!initialData;

  // Get default values
  const defaultValues = {
    name: initialData?.name || '',
    description: initialData?.description || '',
    documentTypeId: initialData?.documentTypeId || documentTypeId || 0,
    startDate: initialData?.startDate ? new Date(initialData.startDate) : new Date(),
    endDate: initialData?.endDate ? new Date(initialData.endDate) : new Date(new Date().setMonth(new Date().getMonth() + 3)),
    isActive: initialData?.isActive ?? true
  };

  const form = useForm<SubTypeFormData>({
    resolver: zodResolver(subTypeSchema),
    defaultValues
  });

  const [formData, setFormData] = useState<SubTypeFormData>(defaultValues as SubTypeFormData);

  const updateForm = (data: Partial<SubTypeFormData>) => {
    setFormData(prev => ({...prev, ...data}));
    // Also update the form values
    Object.keys(data).forEach(key => {
      form.setValue(key as keyof SubTypeFormData, data[key as keyof SubTypeFormData] as any);
    });
  };

  const nextStep = () => {
    // Validate current step
    form.trigger().then(isValid => {
      if (isValid) {
        setCurrentStep(current => Math.min(current + 1, totalSteps));
      }
    });
  };

  const prevStep = () => {
    setCurrentStep(current => Math.max(current - 1, 1));
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const submitForm = async () => {
    try {
      setIsSubmitting(true);
      const values = form.getValues();
      
      if (isEditMode && initialData) {
        await subTypeService.updateSubType(initialData.id, values);
        toast.success("SubType updated successfully");
      } else {
        await subTypeService.createSubType(values);
        toast.success("SubType created successfully");
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to save SubType");
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    currentStep,
    totalSteps,
    formData,
    isEditMode,
    isSubmitting,
    updateForm,
    nextStep,
    prevStep,
    goToStep,
    submitForm,
    form
  };

  return (
    <SubTypeFormContext.Provider value={value}>
      {children}
    </SubTypeFormContext.Provider>
  );
};

export const useSubTypeForm = () => {
  const context = useContext(SubTypeFormContext);
  if (!context) {
    throw new Error('useSubTypeForm must be used within a SubTypeFormProvider');
  }
  return context;
};
