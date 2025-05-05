import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface StepEmptyStateProps {
  onAddStep: () => void;
  title?: string;
  description?: string;
  showAddButton?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export const StepEmptyState = ({
  onAddStep,
  title = "No Steps Found",
  description = "You haven't created any steps yet. Steps are essential parts of circuits that define the workflow process.",
  showAddButton = true,
  isError = false,
  errorMessage = "Resource not found.",
}: StepEmptyStateProps) => {
  const { theme } = useSettings();
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col items-center justify-center 
      ${
        isDark ? "bg-muted/30 border-blue-900/30" : "bg-gray-50 border-gray-200"
      } 
      border border-dashed rounded-lg p-8 h-96`}
    >
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-full 
        ${isDark ? "bg-background" : "bg-white shadow-sm"}`}
      >
        {isError ? (
          <AlertCircle
            className={`h-10 w-10 ${isDark ? "text-red-500" : "text-red-500"}`}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`h-10 w-10 ${
              isDark ? "text-muted-foreground" : "text-gray-500"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
            />
          </svg>
        )}
      </div>
      <h3
        className={`mt-4 text-lg font-semibold ${
          isDark ? "" : isError ? "text-red-700" : "text-gray-900"
        }`}
      >
        {isError ? "API Error" : title}
      </h3>
      <p
        className={`mt-1 text-sm ${
          isDark
            ? isError
              ? "text-red-400"
              : "text-muted-foreground"
            : isError
            ? "text-red-600"
            : "text-gray-600"
        } text-center max-w-sm`}
      >
        {isError ? errorMessage : description}
      </p>
      {showAddButton && !isError && (
        <Button
          onClick={onAddStep}
          className={`mt-6 ${
            isDark
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Step
        </Button>
      )}
      {isError && (
        <Button
          onClick={() => window.location.reload()}
          className={`mt-6 ${
            isDark
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Retry
        </Button>
      )}
    </div>
  );
};
