import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, AlertCircle, RefreshCw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/context/SettingsContext";

interface CircuitStepsHeaderProps {
  circuit: Circuit;
  onAddStep: () => void;
  isSimpleUser: boolean;
  onRefresh?: () => void;
}

export const CircuitStepsHeader = ({
  circuit,
  onAddStep,
  isSimpleUser,
  onRefresh,
}: CircuitStepsHeaderProps) => {
  const isCircuitActive = circuit.isActive || false;
  const { theme } = useSettings();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className={
              isDark
                ? ""
                : "border-gray-300 hover:bg-gray-100 hover:text-gray-800"
            }
          >
            <Link to="/circuits">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <h1
            className={`text-3xl font-semibold ${
              isDark
                ? "bg-gradient-to-r from-blue-200 to-purple-200 text-transparent bg-clip-text"
                : "text-blue-800"
            }`}
          >
            {circuit.title} - Steps
          </h1>
          {isCircuitActive && (
            <Badge
              variant="outline"
              className={`${
                isDark
                  ? "bg-green-900/30 text-green-400 border-green-700/30"
                  : "bg-green-100 text-green-700 border-green-300"
              }`}
            >
              Active
            </Badge>
          )}
        </div>
        <p className={`mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Circuit Code:{" "}
          <span
            className={`font-mono ${
              isDark ? "text-blue-300" : "text-blue-600"
            }`}
          >
            {circuit.circuitKey}
          </span>
          {isCircuitActive && (
            <span
              className={`ml-2 font-semibold ${
                isDark ? "text-green-400" : "text-green-600"
              }`}
            >
              (Active Circuit)
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {onRefresh && (
          <Button
            variant="outline"
            size="icon"
            onClick={onRefresh}
            className={isDark ? "" : "border-gray-300 hover:bg-gray-100"}
            title="Refresh data"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}

        {!isSimpleUser &&
          (isCircuitActive ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={`cursor-not-allowed ${
                      isDark
                        ? "bg-blue-500/50 text-blue-200"
                        : "bg-gray-200 text-gray-500"
                    }`}
                    disabled
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Step
                    <AlertCircle className="ml-2 h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cannot add steps to an active circuit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              className={
                isDark
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
              onClick={onAddStep}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Step
            </Button>
          ))}
      </div>
    </div>
  );
};
