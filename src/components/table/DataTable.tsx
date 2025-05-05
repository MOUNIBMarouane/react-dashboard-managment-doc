
// Re-export everything from create-data-table to ensure consistency
import { createDataTable, useDataTable } from './create-data-table';

// Create a DataTable component using createDataTable
export const DataTable = createDataTable();

// Export specific components needed
export { createDataTable, useDataTable };

// Re-export everything else from create-data-table
export * from './create-data-table';
