
// Export all filter components
export { TableSearchBar } from './TableSearchBar';
export { TableAdvancedFilters } from './TableAdvancedFilters';
export { TableActiveFilters } from './TableActiveFilters';

// Export hooks
export { useTableFilters } from './hooks/useTableFilters';

// Export constants
export * from './constants/filters';

// Export types
export type { FilterState, FilterOptions } from './hooks/useTableFilters';
export type { FilterOption } from './TableAdvancedFilters';

// Add missing constants
export const DEFAULT_DOCUMENT_SEARCH_FIELDS = [
  { label: 'All Fields', value: 'all' },
  { label: 'Title', value: 'title' },
  { label: 'Content', value: 'content' },
  { label: 'Document ID', value: 'documentKey' },
  { label: 'Date', value: 'docDate' }
];

export const DEFAULT_STEP_SEARCH_FIELDS = [
  { label: 'All Fields', value: 'all' },
  { label: 'Title', value: 'title' },
  { label: 'Description', value: 'description' },
  { label: 'Step ID', value: 'stepKey' }
];

// Export DataTable from the correct location
export { DataTable } from './DataTable';
