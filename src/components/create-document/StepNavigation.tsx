import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface StepNavigationProps {
  step: number;
  isSubmitting: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const StepNavigation = ({
  step,
  isSubmitting,
  onPrevStep,
  onNextStep,
  onSubmit,
  onCancel,
}: StepNavigationProps) => {
  const { theme } = useSettings();
  const isLightMode = theme === "light";

  return (
    <div className="flex justify-between pt-6">
      <Button
        variant="outline"
        className={
          isLightMode
            ? "border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            : "border-gray-700 hover:bg-gray-800"
        }
        onClick={step === 1 ? onCancel : onPrevStep}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {step === 1 ? "Cancel" : "Back"}
      </Button>
      {step === 5 ? (
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={
            isLightMode
              ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md"
              : "bg-green-600 hover:bg-green-700"
          }
        >
          <Save className="mr-2 h-5 w-5" />
          {isSubmitting ? "Creating..." : "Create Document"}
        </Button>
      ) : (
        <Button
          className={
            isLightMode
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
              : "bg-blue-600 hover:bg-blue-700"
          }
          onClick={onNextStep}
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
