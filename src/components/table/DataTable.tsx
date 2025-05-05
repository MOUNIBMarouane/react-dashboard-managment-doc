
// Re-export everything from create-data-table to ensure consistency
import * as CreateDataTable from './create-data-table';

// Create a DataTable component using createDataTable
export const DataTable = CreateDataTable.createDataTable();

// Export specific components needed
export const { createDataTable, useDataTable } = CreateDataTable;

// Re-export everything else from create-data-table
export * from './create-data-table';
