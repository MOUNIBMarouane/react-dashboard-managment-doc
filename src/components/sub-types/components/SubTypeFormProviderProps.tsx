
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DocumentType, SubType } from '@/models/document';

// Create Zod schema
const subTypeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  documentTypeId: z.number().min(1, "Document type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  isActive: z.boolean().default(true),
});

export type SubTypeFormData = z.infer<typeof subTypeSchema>;

interface SubTypeFormContextType {
  form: ReturnType<typeof useForm<SubTypeFormData>>;
  isSubmitting: boolean;
  onSubmit: (data: SubTypeFormData) => void;
  resetForm: () => void;
  documentType?: DocumentType;
  documentTypes?: DocumentType[];
  subType?: SubType;
  isEditMode: boolean;
}

const SubTypeFormContext = createContext<SubTypeFormContextType | undefined>(undefined);

export interface SubTypeFormProviderProps {
  children: ReactNode;
  onSubmit: (data: SubTypeFormData) => void;
  documentType?: DocumentType;
  documentTypes?: DocumentType[];
  subType?: SubType;
  onClose?: () => void;
}

export const SubTypeFormProvider: React.FC<SubTypeFormProviderProps> = ({ 
  children, 
  onSubmit,
  documentType,
  documentTypes,
  subType,
  onClose 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!subType;
  
  const form = useForm<SubTypeFormData>({
    resolver: zodResolver(subTypeSchema),
    defaultValues: {
      name: subType?.name || '',
      description: subType?.description || '',
      documentTypeId: subType?.documentTypeId || documentType?.id || 0,
      startDate: subType?.startDate ? new Date(subType.startDate).toISOString().slice(0, 10) : '',
      endDate: subType?.endDate ? new Date(subType.endDate).toISOString().slice(0, 10) : '',
      isActive: subType?.isActive ?? true,
    },
  });

  const handleSubmit = async (data: SubTypeFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      form.reset();
      onClose?.();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    form.reset();
  };

  return (
    <SubTypeFormContext.Provider value={{
      form,
      isSubmitting,
      onSubmit: handleSubmit,
      resetForm,
      documentType,
      documentTypes,
      subType,
      isEditMode
    }}>
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
