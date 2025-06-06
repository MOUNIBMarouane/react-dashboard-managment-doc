import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/context/SettingsContext";

interface StepTableHeaderProps {
  onSelectAll: (checked: boolean) => void;
  areAllEligibleSelected: boolean;
  hasEligibleSteps: boolean;
  onSort: (field: string) => void;
  sortField: string | null;
  sortDirection: "asc" | "desc";
}

export const StepTableHeader = ({
  onSelectAll,
  areAllEligibleSelected,
  hasEligibleSteps,
  onSort,
  sortField,
  sortDirection,
}: StepTableHeaderProps) => {
  const { theme } = useSettings();
  const isDark = theme === "dark";

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 ml-1" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    );
  };

  return (
    <TableHeader className={isDark ? "" : "bg-gray-50"}>
      <TableRow className={isDark ? "border-blue-900/30" : "border-gray-200"}>
        <TableHead className="w-10 px-4 py-2">
          <Checkbox
            checked={hasEligibleSteps ? areAllEligibleSelected : false}
            onCheckedChange={(checked) => onSelectAll(!!checked)}
            disabled={!hasEligibleSteps}
          />
        </TableHead>
        <TableHead
          className={`px-4 py-2 ${isDark ? "" : "text-gray-700 font-medium"}`}
        >
          Step Code
        </TableHead>
        <TableHead className="px-4 py-2">
          <Button
            variant="ghost"
            className={`p-0 font-medium flex items-center text-left hover:bg-transparent ${
              isDark
                ? "hover:text-primary"
                : "text-gray-700 hover:text-blue-700"
            }`}
            onClick={() => onSort("title")}
          >
            Title {getSortIcon("title")}
          </Button>
        </TableHead>
        <TableHead
          className={`px-4 py-2 hidden md:table-cell ${
            isDark ? "" : "text-gray-700 font-medium"
          }`}
        >
          Description
        </TableHead>
        <TableHead className="px-4 py-2 hidden lg:table-cell">
          <Button
            variant="ghost"
            className={`p-0 font-medium flex items-center text-left hover:bg-transparent ${
              isDark
                ? "hover:text-primary"
                : "text-gray-700 hover:text-blue-700"
            }`}
            onClick={() => onSort("circuitId")}
          >
            Circuit {getSortIcon("circuitId")}
          </Button>
        </TableHead>
        <TableHead className="px-4 py-2 hidden md:table-cell text-center">
          <Button
            variant="ghost"
            className={`p-0 font-medium flex items-center justify-center hover:bg-transparent ${
              isDark
                ? "hover:text-primary"
                : "text-gray-700 hover:text-blue-700"
            }`}
            onClick={() => onSort("orderIndex")}
          >
            Order {getSortIcon("orderIndex")}
          </Button>
        </TableHead>
        <TableHead
          className={`px-4 py-2 hidden lg:table-cell ${
            isDark ? "" : "text-gray-700 font-medium"
          }`}
        >
          Final Step
        </TableHead>
        <TableHead
          className={`px-4 py-2 w-14 ${
            isDark ? "" : "text-gray-700 font-medium"
          }`}
        >
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
