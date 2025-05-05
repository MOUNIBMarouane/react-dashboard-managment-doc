
import { Button } from "@/components/ui/button";
import { useSubTypeForm } from "../context/SubTypeFormContext";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

interface SubTypeFormActionsProps {
  onCancel: () => void;
}

export const SubTypeFormActions = ({ onCancel }: SubTypeFormActionsProps) => {
  const { 
    currentStep, 
    nextStep, 
    prevStep, 
    submitForm, 
    totalSteps, 
    isSubmitting 
  } = useSubTypeForm();

  return (
    <div className="flex justify-between pt-4 border-t">
      <Button 
        variant="ghost" 
        onClick={currentStep > 1 ? prevStep : onCancel}
        disabled={isSubmitting}
      >
        {currentStep > 1 ? (
          <>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </>
        ) : (
          <>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </>
        )}
      </Button>

      <Button 
        onClick={currentStep < totalSteps ? nextStep : submitForm}
        disabled={isSubmitting}
      >
        {currentStep < totalSteps ? (
          <>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            {isSubmitting ? 'Saving...' : 'Submit'}
            {!isSubmitting && <Check className="ml-2 h-4 w-4" />}
          </>
        )}
      </Button>
    </div>
  );
};
