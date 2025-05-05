
// Re-export everything from create-data-table to ensure consistency
import { createDataTable } from './create-data-table';
export { createDataTable } from './create-data-table';

// Create a DataTable component using createDataTable
export const DataTable = createDataTable();

// Export everything else from create-data-table
export * from './create-data-table';
