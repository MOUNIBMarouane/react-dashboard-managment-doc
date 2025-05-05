
import { Button } from "@/components/ui/button";
import { useStepForm } from "./StepFormProvider";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

interface StepFormActionsProps {
  onCancel: () => void;
}

export const StepFormActions = ({ onCancel }: StepFormActionsProps) => {
  const { 
    currentStep, 
    totalSteps, 
    prevStep, 
    nextStep, 
    isSubmitting, 
    isEditMode,
    submitForm 
  } = useStepForm();
  
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between mt-6">
      <div>
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={isSubmitting}
            className="h-9 text-sm bg-transparent border-blue-800/50 hover:bg-blue-900/30 text-gray-300"
          >
            <ArrowLeft className="mr-1 h-3.5 w-3.5" />
            Back
          </Button>
        )}
      </div>
      
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="h-9 text-sm bg-transparent border-blue-800/50 hover:bg-blue-900/30 text-gray-300"
        >
          Cancel
        </Button>
        
        {isLastStep ? (
          <Button
            type="button"
            onClick={submitForm}
            disabled={isSubmitting}
            className="h-9 text-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Check className="mr-1 h-3.5 w-3.5" />
                {isEditMode ? "Update Step" : "Create Step"}
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={nextStep}
            className="h-9 text-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};
