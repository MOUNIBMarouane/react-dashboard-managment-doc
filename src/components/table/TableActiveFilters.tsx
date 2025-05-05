
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterOption } from './TableAdvancedFilters';

export interface TableActiveFiltersProps {
  filters?: Record<string, string | boolean | number | Date | undefined>;
  onClearFilter?: (filter: any) => void;
  onClearAll?: () => void;
}

export const TableActiveFilters = ({
  filters = {},
  onClearFilter,
  onClearAll
}: TableActiveFiltersProps) => {
  const hasFilters = Object.keys(filters).length > 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {hasFilters &&
        Object.entries(filters).map(([key, value]) => {
          if (!value || value === 'all' || value === 'any') {
            return null;
          }

          let displayValue: React.ReactNode = value;

          if (value instanceof Date) {
            displayValue = value.toLocaleDateString();
          }

          return (
            <Badge key={key} variant="secondary">
              {key}: {displayValue}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onClearFilter?.(key)}
              >
                <X className="h-4 w-4" />
              </Button>
            </Badge>
          );
        })}
      {hasFilters && (
        <Button variant="link" size="sm" onClick={onClearAll}>
          Clear All
        </Button>
      )}
    </div>
  );
};
