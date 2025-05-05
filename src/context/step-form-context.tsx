
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Action } from '@/models/action';

export interface StepFormData {
  title?: string;
  descriptif?: string;
  orderIndex?: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
  actions?: Action[];
}

interface StepFormContextType {
  formData: StepFormData;
  setFormData: (data: Partial<StepFormData>) => void;
  resetForm: () => void;
}

const StepFormContext = createContext<StepFormContextType>({
  formData: {},
  setFormData: () => {},
  resetForm: () => {}
});

export const useStepFormContext = () => useContext(StepFormContext);

interface StepFormProviderProps {
  children: ReactNode;
  initialData?: StepFormData;
}

export const StepFormProvider: React.FC<StepFormProviderProps> = ({ 
  children,
  initialData = {}
}) => {
  const [formData, setFormDataState] = useState<StepFormData>(initialData);

  const setFormData = (newData: Partial<StepFormData>) => {
    setFormDataState(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  const resetForm = () => {
    setFormDataState({});
  };

  return (
    <StepFormContext.Provider value={{ formData, setFormData, resetForm }}>
      {children}
    </StepFormContext.Provider>
  );
};
