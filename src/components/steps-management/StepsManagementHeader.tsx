
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface StepsManagementHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function StepsManagementHeader({
  searchQuery,
  onSearchChange
}: StepsManagementHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search steps..."
          className="pl-8 w-full sm:w-[250px] bg-background"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
