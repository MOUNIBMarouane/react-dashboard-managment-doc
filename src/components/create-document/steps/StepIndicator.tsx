import { useSettings } from "@/context/SettingsContext";

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const { theme } = useSettings();
  const isLightMode = theme === "light";

  const steps = [
    { number: 1, title: "Type" },
    { number: 2, title: "Title" },
    { number: 3, title: "Date" },
    { number: 4, title: "Content" },
    { number: 5, title: "Review" },
  ];

  return (
    <div className="flex justify-center space-x-2 mb-8">
      {steps.map((step) => (
        <div key={step.number} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
              ${
                step.number === currentStep
                  ? isLightMode
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white ring-4 ring-blue-500/20 shadow-md"
                    : "bg-blue-600 text-white ring-4 ring-blue-600/20"
                  : step.number < currentStep
                  ? isLightMode
                    ? "bg-blue-100 text-blue-700 border-2 border-blue-500 shadow-sm"
                    : "bg-blue-600/20 text-blue-600 border-2 border-blue-600"
                  : isLightMode
                  ? "bg-gray-100 text-gray-500 border border-gray-300 shadow-sm"
                  : "bg-gray-800 text-gray-400 border border-gray-700"
              }`}
          >
            {step.number < currentStep ? "✓" : step.number}
          </div>
          {step.number < 5 && (
            <div
              className={`h-[2px] w-12 transition-colors
                ${
                  step.number < currentStep
                    ? isLightMode
                      ? "bg-blue-500"
                      : "bg-blue-600"
                    : isLightMode
                    ? "bg-gray-300"
                    : "bg-gray-700"
                }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};
