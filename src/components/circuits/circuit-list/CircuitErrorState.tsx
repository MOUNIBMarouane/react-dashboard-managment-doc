
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface CircuitErrorStateProps {
  error: Error;
  onRetry?: () => void;
}

export function CircuitErrorState({ 
  error, 
  onRetry 
}: CircuitErrorStateProps) {
  const { theme } = useSettings();
  
  return (
    <div
      className={`p-8 rounded-lg text-center ${
        theme === "dark"
          ? "text-red-400 bg-red-900/10 border border-red-900/30"
          : "text-red-600 bg-red-50/80 border border-red-200 shadow-sm"
      }`}
    >
      <div className="flex flex-col items-center">
        <AlertCircle
          className={`h-12 w-12 mb-4 ${
            theme === "dark" ? "text-red-400" : "text-red-500"
          }`}
        />
        <p className="text-lg font-medium mb-2">Error loading circuits</p>
        <p className="text-sm mb-4 opacity-80">
          {error.message || "There was a problem loading the data. Please try again."}
        </p>
        {onRetry && (
          <Button
            onClick={onRetry}
            className={`mt-2 px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              theme === "dark"
                ? "bg-blue-800 hover:bg-blue-700 text-blue-100"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            }`}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
