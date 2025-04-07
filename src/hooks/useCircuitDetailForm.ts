
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CircuitDetail } from "@/types/circuit";

const formSchema = z.object({
  circuit_detail_key: z.string().min(1, "Detail key is required"),
  title: z.string().min(1, "Title is required"),
  descriptif: z.string().min(1, "Description is required"),
});

export function useCircuitDetailForm(
  isOpen: boolean,
  detailToEdit?: CircuitDetail | null,
  isEditing: boolean = false
) {
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

  // Reset form and step when dialog opens
  useEffect(() => {
    if (isOpen) {
      form.reset({
        circuit_detail_key: detailToEdit?.circuit_detail_key || "",
        title: detailToEdit?.title || "",
        descriptif: detailToEdit?.descriptif || "",
      });
      setCurrentStep(0);
    }
  }, [isOpen, detailToEdit, form]);

  // Check if the current field is valid
  const isCurrentFieldValid = () => {
    const currentField = ["circuit_detail_key", "title", "descriptif"][currentStep];
    if (currentStep === 3) return true; // Confirmation step is always valid
    
    // Check if the current field has a value and no errors
    const currentValues = form.watch();
    const hasValue = !!currentValues[currentField as keyof z.infer<typeof formSchema>];
    const hasNoErrors = !form.formState.errors[currentField as keyof z.infer<typeof formSchema>];
    
    return hasValue && hasNoErrors;
  };

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

  return {
    form,
    steps,
    currentStep,
    isCurrentFieldValid,
    handleNext,
    handlePrevious,
    formSchema
  };
}
