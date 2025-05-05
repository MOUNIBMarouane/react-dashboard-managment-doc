
import React from 'react';
import { useMultiStepForm } from '@/context/form/useMultiStepForm';
import StepThreePersonalAddress from '@/components/register/StepThreePersonalAddress';
import StepThreeCompanyCredentials from '@/components/register/StepThreeCompanyCredentials';

const StepThree: React.FC = () => {
  const { formData } = useMultiStepForm();

  // Different content based on user type
  return formData.userType === 'personal' ? (
    <StepThreePersonalAddress />
  ) : (
    <StepThreeCompanyCredentials />
  );
};

export default StepThree;
