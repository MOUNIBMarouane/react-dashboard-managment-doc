
import React from 'react';
import StepFourAdminKey from '@/components/register/StepFourAdminKey';

interface StepFourProps {
  termsAccepted: boolean;
  onTermsChange: (value: boolean) => void;
}

const StepFour: React.FC<StepFourProps> = ({ termsAccepted, onTermsChange }) => {
  return <StepFourAdminKey />;
};

export default StepFour;
