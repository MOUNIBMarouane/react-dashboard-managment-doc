
import React, { createContext, useContext, useState } from 'react';
import { DocumentType } from '@/models/document';

export interface SubTypeFormData {
  name: string;
  description: string;
  documentTypeId: number;
  startDate: Date | string;
  endDate: Date | string;
  isActive: boolean;
}

export interface FormContextType {
  formData: SubTypeFormData;
  setFormData: React.Dispatch<React.SetStateAction<SubTypeFormData>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  documentTypes: DocumentType[];  // Add this property
  documentType?: DocumentType;    // Keep for backward compatibility
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export interface SubTypeFormProviderProps {
  children: React.ReactNode;
  onSubmit: (data: SubTypeFormData) => void;
  onClose: () => void;
  documentType?: DocumentType;
  documentTypes?: DocumentType[];  // Make this optional for compatibility
}

export const SubTypeFormProvider: React.FC<SubTypeFormProviderProps> = ({
  children,
  onSubmit,
  onClose,
  documentType,
  documentTypes = [],  // Default to empty array
}) => {
  const [formData, setFormData] = useState<SubTypeFormData>({
    name: '',
    description: '',
    documentTypeId: documentType?.id || (documentTypes[0]?.id || 0),
    startDate: new Date(),
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    isActive: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Failed to submit. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        isSubmitting,
        setIsSubmitting,
        errors,
        setErrors,
        currentStep,
        setCurrentStep,
        documentTypes: documentTypes.length > 0 ? documentTypes : (documentType ? [documentType] : []),
        documentType,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useSubTypeForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useSubTypeForm must be used within a SubTypeFormProvider');
  }
  return context;
};
