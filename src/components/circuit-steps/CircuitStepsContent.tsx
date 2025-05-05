
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StepHeader } from "@/components/steps/StepHeader";
import { StepTable } from "@/components/steps/StepTable";
import { StepEmptyState } from "@/components/steps/StepEmptyState";
import { useSettings } from "@/context/SettingsContext";
import { Step } from "@/models/circuit";

interface CircuitStepsContentProps {
  steps: Step[];
  selectedSteps: number[];
  onSelectStep: (id: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onEdit: (step: Step) => void;  // Changed back to (step: Step)
  onDelete: (stepId: number) => void;
  viewMode: "table" | "grid";
  onViewModeChange: (mode: "table" | "grid") => void;
  onAddStep: () => void;
  isSimpleUser: boolean;
  circuitId: string;
  circuit?: Circuit;
  apiError?: string;
}

export const CircuitStepsContent = ({
  steps,
  selectedSteps,
  onSelectStep,
  onSelectAll,
  onEdit,
  onDelete,
  viewMode,
  onViewModeChange,
  onAddStep,
  isSimpleUser,
  circuitId,
  circuit,
  apiError,
}: CircuitStepsContentProps) => {
  const hasError = !!apiError;
  const { theme } = useSettings();
  const isDark = theme === "dark";

  return (
    <Card
      className={`w-full shadow-md ${
        isDark
          ? "bg-[#111633]/70 border-blue-900/30"
          : "bg-white border-gray-200"
      }`}
    >
      <CardHeader
        className={`flex flex-row items-center justify-between border-b ${
          isDark
            ? "border-blue-900/30 bg-blue-900/20"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <CardTitle
          className={`text-xl ${isDark ? "text-blue-100" : "text-gray-800"}`}
        >
          Steps in Circuit
        </CardTitle>
        <StepHeader
          onAddStep={onAddStep}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />
      </CardHeader>
      <CardContent className="p-0">
        {hasError ? (
          <StepEmptyState
            onAddStep={onAddStep}
            showAddButton={false}
            isError={true}
            errorMessage={apiError || "Resource not found."}
          />
        ) : steps.length > 0 ? (
          viewMode === "table" ? (
            <StepTable
              steps={steps}
              selectedSteps={selectedSteps}
              onSelectStep={onSelectStep}
              onSelectAll={onSelectAll}
              onEdit={onEdit}
              onDelete={onDelete}
              circuits={circuit ? [circuit] : []}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {steps.map((step) => {
                const isCircuitActive = circuit?.isActive || false;
                return (
                  <div
                    key={step.id}
                    className={`${
                      isDark
                        ? "bg-blue-900/20 border-blue-800/30 hover:bg-blue-900/30"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    } border rounded-lg p-4 transition-colors ${
                      isCircuitActive
                        ? isDark
                          ? "border-l-green-500"
                          : "border-l-4 border-l-green-500"
                        : ""
                    }`}
                    onClick={() =>
                      (window.location.href = `/circuits/${circuitId}/steps/${step.id}/statuses`)
                    }
                  >
                    <h3
                      className={`text-lg font-medium ${
                        isDark ? "text-blue-200" : "text-gray-800"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm mt-1 line-clamp-2 ${
                        isDark ? "text-blue-300/70" : "text-gray-600"
                      }`}
                    >
                      {step.descriptif || "No description"}
                    </p>
                    <div
                      className={`text-xs font-mono mt-2 ${
                        isDark ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {step.stepKey}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center">
                        <span className={isDark ? "" : "text-gray-700"}>
                          Step {step.orderIndex + 1}
                        </span>
                        {isCircuitActive && (
                          <span
                            className={`ml-2 text-xs font-semibold ${
                              isDark ? "text-green-400" : "text-green-600"
                            }`}
                          >
                            (Active Circuit)
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!isCircuitActive ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`${
                              isDark
                                ? "text-blue-400 hover:text-blue-600 hover:bg-blue-100/10"
                                : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(step); // Changed back to onEdit(step)
                            }}
                          >
                            Edit
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`cursor-not-allowed ${
                              isDark ? "text-blue-400/50" : "text-gray-400"
                            }`}
                            disabled
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <StepEmptyState onAddStep={onAddStep} showAddButton={!isSimpleUser} />
        )}
      </CardContent>
    </Card>
  );
};
