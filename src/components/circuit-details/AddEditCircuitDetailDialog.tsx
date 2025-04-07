
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircuitDetail } from "@/types/circuit";
import { Form } from "@/components/ui/form";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useCircuitDetailForm } from "@/hooks/useCircuitDetailForm";
import CircuitDetailFormStep1 from "./detail-form/CircuitDetailFormStep1";
import CircuitDetailFormStep2 from "./detail-form/CircuitDetailFormStep2";
import CircuitDetailFormStep3 from "./detail-form/CircuitDetailFormStep3";
import CircuitDetailFormConfirmation from "./detail-form/CircuitDetailFormConfirmation";

interface AddEditCircuitDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (detailData: Omit<CircuitDetail, 'id' | 'circuit_id' | 'created_at' | 'updated_at'>) => void;
  circuitId: string;
  detailToEdit?: CircuitDetail | null;
  isEditing: boolean;
}

const AddEditCircuitDetailDialog = ({
  isOpen,
  onOpenChange,
  onSave,
  circuitId,
  detailToEdit,
  isEditing
}: AddEditCircuitDetailDialogProps) => {
  const {
    form,
    steps,
    currentStep,
    isCurrentFieldValid,
    handleNext,
    handlePrevious
  } = useCircuitDetailForm(isOpen, detailToEdit, isEditing);

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <CircuitDetailFormStep1 form={form} />;
      case 1:
        return <CircuitDetailFormStep2 form={form} />;
      case 2:
        return <CircuitDetailFormStep3 form={form} />;
      case 3:
        return <CircuitDetailFormConfirmation form={form} />;
      default:
        return null;
    }
  };

  const onSubmit = (values: any) => {
    // Submit the form data only at the confirmation step
    if (currentStep === steps.length - 1) {
      onSave({
        circuit_detail_key: values.circuit_detail_key,
        title: values.title,
        descriptif: values.descriptif
      });
    } else {
      handleNext();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Circuit Detail" : "Add Circuit Detail"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the circuit detail information below."
              : `Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep]}`}
          </DialogDescription>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="w-full bg-secondary h-1 rounded-full mt-2">
          <div 
            className="bg-primary h-1 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            {renderStepContent()}

            <DialogFooter className="pt-4 flex items-center gap-2">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex items-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              
              <div className="flex-1"></div>
              
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentFieldValid()}
                  className="flex items-center gap-1"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  type="submit"
                  className="flex items-center gap-1"
                >
                  <Check className="h-4 w-4" />
                  {isEditing ? "Save Changes" : "Add Detail"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditCircuitDetailDialog;
