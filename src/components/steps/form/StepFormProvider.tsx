
import { createContext, useContext, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Step as StepType, CreateStepDto } from '@/models/circuit';
import circuitService from '@/services/circuitService';
import { useNavigate } from 'react-router-dom';

const stepFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  descriptif: z.string().optional(),
  orderIndex: z.number().min(1, { message: "Order index must be at least 1." }),
  responsibleRoleId: z.number().optional(),
  isFinalStep: z.boolean().default(false),
  actionId: z.number().optional(),
});

export type StepFormData = z.infer<typeof stepFormSchema> & {
  circuitId?: number;
  form?: any;
};

interface StepFormContextProps {
  currentStep: number;
  totalSteps: number;
  formData: StepFormData;
  isEditMode: boolean;
  isSubmitting: boolean;
  prevStep: () => void;
  nextStep: () => void;
  setFormData: (data: Partial<StepFormData>) => void;
  submitForm: () => Promise<void>;
  form: any;
}

const StepFormContext = createContext<StepFormContextProps | undefined>(undefined);

interface StepFormProviderProps {
  children: React.ReactNode;
  editStep?: StepType;
  onSuccess?: () => void;
  circuitId?: number;
}

export const StepFormProvider: React.FC<StepFormProviderProps> = ({
  children,
  editStep,
  onSuccess,
  circuitId,
}) => {
  const navigate = useNavigate();
  const isEditMode = !!editStep;
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StepFormData>({
    resolver: zodResolver(stepFormSchema),
    defaultValues: {
      title: editStep?.title || '',
      descriptif: editStep?.descriptif || '',
      orderIndex: editStep?.orderIndex || 1,
      responsibleRoleId: editStep?.responsibleRoleId || undefined,
      isFinalStep: editStep?.isFinalStep || false,
      actionId: undefined,
      circuitId: circuitId,
    },
    mode: "onChange",
  });

  const [formData, setFormData] = useState<StepFormData>({
    title: editStep?.title || '',
    descriptif: editStep?.descriptif || '',
    orderIndex: editStep?.orderIndex || 1,
    responsibleRoleId: editStep?.responsibleRoleId || undefined,
    isFinalStep: editStep?.isFinalStep || false,
    actionId: undefined,
    circuitId: circuitId,
    form: form,
  });

  const prevStep = () => {
    setCurrentStep(currentStep => Math.max(1, currentStep - 1));
  };

  const nextStep = () => {
    form.trigger().then((isValid: boolean) => {
      if (isValid) {
        setCurrentStep(currentStep => Math.min(totalSteps, currentStep + 1));
      }
    });
  };

  const updateFormData = (data: Partial<StepFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const submitForm = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const data = form.getValues();
      const stepData: CreateStepDto = {
        circuitId: circuitId!,
        title: data.title,
        descriptif: data.descriptif || '',
        orderIndex: data.orderIndex,
        responsibleRoleId: data.responsibleRoleId,
        isFinalStep: data.isFinalStep
      };

      if (isEditMode && editStep) {
        await circuitService.updateStep(editStep.id, stepData);
        toast.success('Step updated successfully');
      } else {
        if (!circuitId) {
          console.error('Circuit ID is missing.');
          toast.error('Circuit ID is required to create a step.');
          return;
        }
        await circuitService.createStep(stepData);
        toast.success('Step created successfully');
      }
      onSuccess && onSuccess();
      navigate(`/circuits/${circuitId}`);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error?.message || 'Failed to submit step. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isEditMode, editStep, onSuccess, circuitId, navigate]);

  const value = {
    currentStep,
    totalSteps,
    formData,
    isEditMode,
    isSubmitting,
    prevStep,
    nextStep,
    setFormData: updateFormData,
    submitForm,
    form,
  };

  return (
    <StepFormContext.Provider value={value}>
      {children}
    </StepFormContext.Provider>
  );
};

export const useStepForm = () => {
  const context = useContext(StepFormContext);
  if (!context) {
    throw new Error('useStepForm must be used within a StepFormProvider');
  }
  return context;
};
