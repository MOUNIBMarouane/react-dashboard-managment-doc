
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DocumentType } from '@/models/document';

// Interface for form data
export interface SubTypeFormData {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  documentTypeId: number;
  isActive: boolean;
  [key: string]: any;
}

// Interface for context props
interface SubTypeFormContextType {
  formData: SubTypeFormData;
  setFormData: React.Dispatch<React.SetStateAction<SubTypeFormData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  validateField: (name: string, value: any) => boolean;
  documentTypes: DocumentType[]; // Add this line
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  onSubmit: (data: SubTypeFormData) => void;
}

// Default context values
const SubTypeFormContext = createContext<SubTypeFormContextType>({
  formData: {
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    documentTypeId: 0,
    isActive: true,
  },
  setFormData: () => {},
  errors: {},
  setErrors: () => {},
  validateField: () => true,
  documentTypes: [], // Add this line
  isSubmitting: false,
  setIsSubmitting: () => {},
  handleSubmit: () => {},
  onSubmit: () => {},
});

// Props for the provider component
export interface SubTypeFormProviderProps {
  children: ReactNode;
  onSubmit: (data: SubTypeFormData) => void;
  documentTypes: DocumentType[]; // Add this line
  onClose: () => void;
}

// Form provider component
export const SubTypeFormProvider = ({
  children,
  onSubmit,
  documentTypes,
  onClose,
}: SubTypeFormProviderProps) => {
  // State for form data
  const [formData, setFormData] = useState<SubTypeFormData>({
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    documentTypeId: documentTypes.length > 0 ? documentTypes[0].id : 0,
    isActive: true,
  });
  
  // State for validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
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

  // Context value
  const contextValue: SubTypeFormContextType = {
    formData,
    setFormData,
    errors,
    setErrors,
    validateField,
    documentTypes, // Add this line
    isSubmitting,
    setIsSubmitting,
    handleSubmit,
    onSubmit,
  };

  return (
    <SubTypeFormContext.Provider value={contextValue}>
      {children}
    </SubTypeFormContext.Provider>
  );
};

// Hook for using the form context
export const useSubTypeForm = () => useContext(SubTypeFormContext);
