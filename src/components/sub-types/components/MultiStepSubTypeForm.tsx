
import React from 'react';
import { useSubTypeForm } from '../context/SubTypeFormContext';
import { SubTypeBasicInfo } from './SubTypeBasicInfo';
import { SubTypeDates } from './SubTypeDates';
import { SubTypeReview } from './SubTypeReview';
import { SubTypeFormProgress } from './SubTypeFormProgress';
import { SubTypeFormActions } from './SubTypeFormActions';

export interface MultiStepSubTypeFormProps {
  onCancel: () => void;
  initialData?: any;
}

export const MultiStepSubTypeForm: React.FC<MultiStepSubTypeFormProps> = ({ onCancel, initialData }) => {
  const { currentStep } = useSubTypeForm();

  return (
    <div className="space-y-6">
      <SubTypeFormProgress />

      <div className="py-2">
        {currentStep === 1 && <SubTypeBasicInfo />}
        {currentStep === 2 && <SubTypeDates />}
        {currentStep === 3 && <SubTypeReview />}
      </div>

      <SubTypeFormActions onCancel={onCancel} />
    </div>
  );
};
