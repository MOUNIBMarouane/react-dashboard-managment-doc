
import React, { createContext, useContext, useState } from 'react';
import { DocumentType } from '@/models/documentType';

export interface SubTypeFormData {
  name: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  documentTypeId: number;
  isActive: boolean;
}

export interface SubTypeFormErrors {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  documentTypeId?: string;
}

interface FormContextType {
  formData: SubTypeFormData;
  setFormData: React.Dispatch<React.SetStateAction<SubTypeFormData>>;
  errors: SubTypeFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<SubTypeFormErrors>>;
  documentTypes: DocumentType[];
}

const initialFormData: SubTypeFormData = {
  name: '',
  description: '',
  startDate: new Date(),
  endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  documentTypeId: 0,
  isActive: true,
};

const initialErrors: SubTypeFormErrors = {};

const SubTypeFormContext = createContext<FormContextType | undefined>(undefined);

export interface SubTypeFormProviderProps {
  children: React.ReactNode;
  onSubmit: (data: SubTypeFormData) => void;
  documentTypes: DocumentType[];
  onClose: () => void;
}

export const SubTypeFormProvider: React.FC<SubTypeFormProviderProps> = ({
  children,
  onSubmit,
  documentTypes,
  onClose,
}) => {
  const [formData, setFormData] = useState<SubTypeFormData>(initialFormData);
  const [errors, setErrors] = useState<SubTypeFormErrors>(initialErrors);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate before submitting
    const newErrors: SubTypeFormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.documentTypeId) {
      newErrors.documentTypeId = 'Document type is required';
    }
    
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <SubTypeFormContext.Provider value={{ formData, setFormData, errors, setErrors, documentTypes }}>
      <form onSubmit={handleSubmit}>
        {children}
      </form>
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
