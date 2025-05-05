
import { useSubTypeForm } from "../context/SubTypeFormContext";
import { Progress } from "@/components/ui/progress";

export const SubTypeFormProgress = () => {
  const { currentStep, totalSteps, goToStep } = useSubTypeForm();
  
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="space-y-2">
      <Progress value={progressPercentage} className="h-2" />
      <div className="text-right text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};
