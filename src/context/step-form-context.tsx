
import React, { createContext, useContext, useState } from 'react';
import { Action } from '@/models/action';

export interface StepFormData {
  title: string;
  description: string;
  orderIndex: number;
  responsibleRoleId?: number | null;
  isFinalStep: boolean;
  actions: Action[];
}

interface StepFormContextType {
  formData: StepFormData;
  setFormData: (data: Partial<StepFormData>) => void;
  resetForm: () => void;
}

const initialFormData: StepFormData = {
  title: '',
  description: '',
  orderIndex: 0,
  responsibleRoleId: null,
  isFinalStep: false,
  actions: []
};

const StepFormContext = createContext<StepFormContextType>({
  formData: initialFormData,
  setFormData: () => {},
  resetForm: () => {}
});

export const StepFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormDataState] = useState<StepFormData>(initialFormData);

  const setFormData = (data: Partial<StepFormData>) => {
    setFormDataState(prev => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormDataState(initialFormData);
  };

  return (
    <StepFormContext.Provider value={{ formData, setFormData, resetForm }}>
      {children}
    </StepFormContext.Provider>
  );
};

export const useStepFormContext = () => useContext(StepFormContext);
