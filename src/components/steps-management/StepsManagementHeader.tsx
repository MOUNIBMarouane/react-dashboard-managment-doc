
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface StepsManagementHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function StepsManagementHeader({
  searchQuery,
  onSearchChange
}: StepsManagementHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search steps by title, description or key..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
