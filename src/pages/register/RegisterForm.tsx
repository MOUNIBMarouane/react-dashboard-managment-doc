
import React, { useState } from 'react';
import { MultiStepFormProvider } from '@/context/form/MultiStepFormProvider';
import { Steps } from '@/components/ui/steps';
import { Card, CardContent } from '@/components/ui/card';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFiveSummary from './StepFiveSummary';
import { useMultiStepForm } from '@/context/form/MultiStepFormContext';

const RegisterForm: React.FC = () => {
  const { currentStep, formData } = useMultiStepForm();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour termsAccepted={acceptedTerms} onTermsChange={setAcceptedTerms} />;
      case 5:
        return (
          <StepFiveSummary 
            email={formData.email}
            username={formData.username}
            acceptedTerms={acceptedTerms}
          />
        );
      default:
        return <StepOne />;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Steps
        currentStep={currentStep}
        totalSteps={5}
      />
      <Card className="mt-4">
        <CardContent className="p-6">
          {getStepContent()}
        </CardContent>
      </Card>
    </div>
  );
};

const WrappedRegisterForm: React.FC = () => {
  return (
    <MultiStepFormProvider>
      <RegisterForm />
    </MultiStepFormProvider>
  );
};

export default WrappedRegisterForm;
