
// Re-export everything from create-data-table to ensure consistency
export * from './create-data-table';

// Export specific components needed
import { DataTable as DataTableComponent } from './create-data-table';
export { DataTableComponent as DataTable };
