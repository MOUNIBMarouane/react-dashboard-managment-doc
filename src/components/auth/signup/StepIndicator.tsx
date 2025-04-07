
import React from "react";
import { CheckCircle2 } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === step 
              ? "bg-dashboard-accent text-white" 
              : currentStep > step 
              ? "bg-green-500 text-white" 
              : "bg-dashboard-blue-light text-gray-400"
          }`}>
            {currentStep > step ? <CheckCircle2 size={16} /> : step}
          </div>
          <span className="text-xs mt-1 text-gray-400">
            {step === 1 ? "Personal" : step === 2 ? "Account" : "Secret"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
