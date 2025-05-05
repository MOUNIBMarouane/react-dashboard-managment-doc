
import React from 'react';
import { Button } from '@/components/ui/button';
import { useMultiStepForm } from '@/context/form/MultiStepFormContext';

export interface StepFiveSummaryProps {
  email: string;
  username: string;
  acceptedTerms: boolean;
  onComplete?: () => void;
}

const StepFiveSummary: React.FC<StepFiveSummaryProps> = ({
  email,
  username,
  acceptedTerms,
  onComplete,
}) => {
  const { formData, registerUser, stepValidation } = useMultiStepForm();
  const { isLoading, errors } = stepValidation;

  const handleRegisterClick = async () => {
    if (!acceptedTerms) {
      return;
    }
    const success = await registerUser();
    if (success && onComplete) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Review Your Information</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Username</h3>
            <p className="text-gray-800 font-medium">{username || formData.username}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="text-gray-800 font-medium">{email || formData.email}</p>
          </div>
        </div>
      </div>

      {errors.registration && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
          {errors.registration}
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          onClick={handleRegisterClick} 
          disabled={isLoading || !acceptedTerms}
          className="w-full"
        >
          {isLoading ? "Creating account..." : "Complete Registration"}
        </Button>
      </div>
    </div>
  );
};

export default StepFiveSummary;
