
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DEFAULT_STEP_SEARCH_FIELDS } from '@/components/table';

interface StepSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

export const StepSearchBar = ({
  searchQuery,
  onSearchChange,
  className = ''
}: StepSearchBarProps) => {
  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search steps..."
        className="w-full pl-10"
      />
    </div>
  );
};
