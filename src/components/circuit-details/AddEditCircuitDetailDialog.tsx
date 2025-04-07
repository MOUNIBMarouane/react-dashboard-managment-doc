
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircuitDetail } from "@/types/circuit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Check, HelpCircle } from "lucide-react";

interface AddEditCircuitDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (detailData: Omit<CircuitDetail, 'id' | 'circuit_id' | 'created_at' | 'updated_at'>) => void;
  circuitId: string;
  detailToEdit?: CircuitDetail;
  isEditing: boolean;
}

const formSchema = z.object({
  circuit_detail_key: z.string().min(1, "Detail key is required"),
  title: z.string().min(1, "Title is required"),
  descriptif: z.string().min(1, "Description is required"),
});

const AddEditCircuitDetailDialog = ({
  isOpen,
  onOpenChange,
  onSave,
  circuitId,
  detailToEdit,
  isEditing
}: AddEditCircuitDetailDialogProps) => {
  // Define the steps of the wizard
  const steps = ["Detail Key", "Title", "Description", "Confirmation"];
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      circuit_detail_key: detailToEdit?.circuit_detail_key || "",
      title: detailToEdit?.title || "",
      descriptif: detailToEdit?.descriptif || "",
    },
    mode: "onChange", // Validate on change for better user experience
  });

  // Get the current values of the form
  const currentValues = form.watch();
  
  // Check if the current field is valid
  const isCurrentFieldValid = () => {
    const currentField = ["circuit_detail_key", "title", "descriptif"][currentStep];
    if (currentStep === 3) return true; // Confirmation step is always valid
    
    // Check if the current field has a value and no errors
    const hasValue = !!currentValues[currentField as keyof z.infer<typeof formSchema>];
    const hasNoErrors = !form.formState.errors[currentField as keyof z.infer<typeof formSchema>];
    
    return hasValue && hasNoErrors;
  };

  React.useEffect(() => {
    if (isOpen) {
      // Reset form and step when dialog opens
      form.reset({
        circuit_detail_key: detailToEdit?.circuit_detail_key || "",
        title: detailToEdit?.title || "",
        descriptif: detailToEdit?.descriptif || "",
      });
      setCurrentStep(0);
    }
  }, [isOpen, detailToEdit, form]);

  // Navigate to the next step
  const handleNext = async () => {
    // Get the field name for the current step
    const fieldNames = ["circuit_detail_key", "title", "descriptif"];
    const currentField = fieldNames[currentStep];
    
    // Validate current field before proceeding
    const result = await form.trigger(currentField as keyof z.infer<typeof formSchema>);
    
    if (result) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  // Navigate to the previous step
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <FormField
            control={form.control}
            name="circuit_detail_key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detail Key</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="CD-001" 
                    {...field} 
                    autoFocus 
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter a unique identifier for this circuit detail (e.g., CD-001)
                </p>
              </FormItem>
            )}
          />
        );
      case 1:
        return (
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Detail title" 
                    {...field} 
                    autoFocus 
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter a descriptive title for this circuit detail
                </p>
              </FormItem>
            )}
          />
        );
      case 2:
        return (
          <FormField
            control={form.control}
            name="descriptif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Detail description" 
                    {...field} 
                    autoFocus 
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground mt-1">
                  Provide a detailed description of this circuit detail
                </p>
              </FormItem>
            )}
          />
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Please review your circuit detail information:</h3>
            <div className="rounded-md border p-4 space-y-2">
              <div>
                <span className="text-sm font-semibold">Detail Key:</span>
                <span className="text-sm ml-2">{currentValues.circuit_detail_key}</span>
              </div>
              <div>
                <span className="text-sm font-semibold">Title:</span>
                <span className="text-sm ml-2">{currentValues.title}</span>
              </div>
              <div>
                <span className="text-sm font-semibold">Description:</span>
                <span className="text-sm ml-2">{currentValues.descriptif}</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
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
