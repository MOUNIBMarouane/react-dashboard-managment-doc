
import React from 'react';
import { useMultiStepForm } from '@/context/form/useMultiStepForm';
import StepTwoEmailPassword from '@/components/register/StepTwoEmailPassword';
import StepTwoCompanyAddress from '@/components/register/StepTwoCompanyAddress';

const StepTwo: React.FC = () => {
  const { formData } = useMultiStepForm();
  
  // Different content based on user type
  return formData.userType === 'personal' ? (
    <StepTwoEmailPassword />
  ) : (
    <StepTwoCompanyAddress />
  );
};

export default StepTwo;
