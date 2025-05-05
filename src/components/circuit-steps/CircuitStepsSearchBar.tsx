import { Search } from "lucide-react";
import { StepSearchBar } from "@/components/steps/table/StepSearchBar";
import { useSettings } from "@/context/SettingsContext";

interface CircuitStepsSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CircuitStepsSearchBar = ({
  searchQuery,
  onSearchChange,
}: CircuitStepsSearchBarProps) => {
  const { theme } = useSettings();
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-lg border ${
        isDark
          ? "bg-blue-900/20 border-blue-800/30"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <Search
          className={`h-4 w-4 ${isDark ? "text-blue-400" : "text-blue-600"}`}
        />
        <h2
          className={`font-medium ${
            isDark ? "text-blue-300" : "text-gray-700"
          }`}
        >
          Search Steps
        </h2>
      </div>
      <div className="relative flex-1 max-w-xl w-full">
        <StepSearchBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
      </div>
    </div>
  );
};
