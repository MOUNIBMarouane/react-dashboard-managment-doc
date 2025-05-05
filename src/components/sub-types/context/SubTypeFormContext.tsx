
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DocumentType } from '@/models/document';
import { SubType } from '@/models/subtype';

export interface SubTypeFormData {
  name: string;
  description: string;
  documentTypeId: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface SubTypeFormContextType {
  formData: SubTypeFormData;
  updateForm: (data: Partial<SubTypeFormData>) => void;
  documentTypes: DocumentType[];
  selectedDocumentTypeId?: number;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  submitForm: () => void;
}

const defaultFormData: SubTypeFormData = {
  name: '',
  description: '',
  documentTypeId: 0,
  startDate: new Date(),
  endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  isActive: true
};

const SubTypeFormContext = createContext<SubTypeFormContextType | undefined>(undefined);

interface SubTypeFormProviderProps {
  children: ReactNode;
  documentTypes: DocumentType[];
  selectedDocumentTypeId?: number;
  initialData?: SubType;
  onSubmit: (data: SubTypeFormData) => void;
}

export const SubTypeFormProvider: React.FC<SubTypeFormProviderProps> = ({ 
  children, 
  documentTypes, 
  selectedDocumentTypeId,
  initialData,
  onSubmit
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3; // Basic info, Dates, Review

  const [formData, setFormData] = useState<SubTypeFormData>(() => {
    if (initialData) {
      return {
        name: initialData.name,
        description: initialData.description || '',
        documentTypeId: initialData.documentTypeId,
        startDate: new Date(initialData.startDate),
        endDate: new Date(initialData.endDate),
        isActive: initialData.isActive
      };
    } else {
      return {
        ...defaultFormData,
        documentTypeId: selectedDocumentTypeId || 0
      };
    }
  });

  const updateForm = (data: Partial<SubTypeFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    setCurrentStep(Math.min(Math.max(step, 1), totalSteps));
  };

  const submitForm = () => {
    onSubmit(formData);
  };

  return (
    <SubTypeFormContext.Provider value={{
      formData,
      updateForm,
      documentTypes,
      selectedDocumentTypeId,
      currentStep,
      totalSteps,
      nextStep,
      prevStep,
      goToStep,
      submitForm
    }}>
      {children}
    </SubTypeFormContext.Provider>
  );
};

export const useSubTypeForm = () => {
  const context = useContext(SubTypeFormContext);
  if (context === undefined) {
    throw new Error('useSubTypeForm must be used within a SubTypeFormProvider');
  }
  return context;
};
