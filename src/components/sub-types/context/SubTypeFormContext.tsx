
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
}

export interface SubTypeFormProviderProps {
  children: React.ReactNode;
  onSubmit: (formData: SubTypeFormData) => void;
  onClose: () => void;
  documentTypes: DocumentType[];
  documentType?: DocumentType;
  subType?: any;
}

const initialFormData: SubTypeFormData = {
  name: '',
  description: '',
  startDate: new Date(),
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 12)),
  documentTypeId: 0,
  isActive: true,
};

const SubTypeFormContext = createContext<SubTypeFormContextType | undefined>(undefined);

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
      ...initialFormData,
      documentTypeId: documentType.id,
    } : initialFormData
  );
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 3;
  const isEditMode = !!subType;

  const updateForm = (data: Partial<SubTypeFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
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
