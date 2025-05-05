
import React, { createContext, useContext, useState } from 'react';
import { DocumentType } from '@/models/document';

export interface SubTypeFormData {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  documentTypeId: number;
  isActive: boolean;
}

export interface SubTypeFormContextType {
  formData: SubTypeFormData;
  updateForm: (data: Partial<SubTypeFormData>) => void;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  submitForm: () => void;
  isSubmitting: boolean;
  documentType?: DocumentType;
  documentTypes?: DocumentType[];
  subType?: any;
  isEditMode: boolean;
  // Also include the original props from the existing context
  setFormData: React.Dispatch<React.SetStateAction<SubTypeFormData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  validateField: (name: string, value: any) => boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  onSubmit: (data: SubTypeFormData) => void;
}

// Default context values
const SubTypeFormContext = createContext<SubTypeFormContextType | undefined>(undefined);

export interface SubTypeFormProviderProps {
  children: React.ReactNode;
  onSubmit: (formData: SubTypeFormData) => void;
  onClose: () => void;
  documentTypes: DocumentType[];
  documentType?: DocumentType;
  subType?: any;
}

export const SubTypeFormProvider: React.FC<SubTypeFormProviderProps> = ({
  children,
  onSubmit,
  onClose,
  documentTypes,
  documentType,
  subType,
}) => {
  const [formData, setFormData] = useState<SubTypeFormData>(
    subType ? {
      name: subType.name || '',
      description: subType.description || '',
      startDate: subType.startDate ? new Date(subType.startDate) : new Date(),
      endDate: subType.endDate ? new Date(subType.endDate) : new Date(new Date().setMonth(new Date().getMonth() + 12)),
      documentTypeId: subType.documentTypeId || (documentType ? documentType.id : 0),
      isActive: subType.isActive !== undefined ? subType.isActive : true,
    } : 
    documentType ? {
      ...{
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        documentTypeId: documentType.id,
        isActive: true,
      },
      documentTypeId: documentType.id,
    } : {
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      documentTypeId: documentTypes.length > 0 ? documentTypes[0].id : 0,
      isActive: true,
    }
  );
  
  // State for validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // State for current step in the multi-step form
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!subType;

  const validateField = (name: string, value: any): boolean => {
    let isValid = true;
    const newErrors = { ...errors };
    
    // Remove existing error for this field
    delete newErrors[name];
    
    // Field-specific validation
    switch (name) {
      case 'name':
        if (!value || value.trim() === '') {
          newErrors[name] = 'Name is required';
          isValid = false;
        }
        break;
      case 'documentTypeId':
        if (!value) {
          newErrors[name] = 'Document type is required';
          isValid = false;
        }
        break;
      case 'startDate':
        if (!value) {
          newErrors[name] = 'Start date is required';
          isValid = false;
        }
        break;
      case 'endDate':
        if (!value) {
          newErrors[name] = 'End date is required';
          isValid = false;
        } else if (
          formData.startDate && 
          new Date(value) <= new Date(formData.startDate)
        ) {
          newErrors[name] = 'End date must be after start date';
          isValid = false;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const updateForm = (data: Partial<SubTypeFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const submitForm = async () => {
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form submission handler
  const handleSubmit = () => {
    // Validate all fields
    let isFormValid = true;
    const newErrors: Record<string, string> = {};
    
    // Validate each field
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Name is required';
      isFormValid = false;
    }
    
    if (!formData.documentTypeId) {
      newErrors.documentTypeId = 'Document type is required';
      isFormValid = false;
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
      isFormValid = false;
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
      isFormValid = false;
    } else if (
      formData.startDate && 
      new Date(formData.endDate) <= new Date(formData.startDate)
    ) {
      newErrors.endDate = 'End date must be after start date';
      isFormValid = false;
    }
    
    setErrors(newErrors);
    
    // If valid, submit the form
    if (isFormValid) {
      setIsSubmitting(true);
      onSubmit(formData);
    }
  };

  const value: SubTypeFormContextType = {
    formData,
    updateForm,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    submitForm,
    isSubmitting,
    documentType,
    documentTypes,
    subType,
    isEditMode,
    // Original props
    setFormData,
    errors,
    setErrors,
    validateField,
    setIsSubmitting,
    handleSubmit,
    onSubmit,
  };

  return <SubTypeFormContext.Provider value={value}>{children}</SubTypeFormContext.Provider>;
};

export const useSubTypeForm = () => {
  const context = useContext(SubTypeFormContext);
  if (context === undefined) {
    throw new Error('useSubTypeForm must be used within a SubTypeFormProvider');
  }
  return context;
};
