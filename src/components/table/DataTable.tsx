
// Re-export everything from create-data-table to ensure consistency
import { DataTable as DT, useDataTable } from './create-data-table';

// Export specific components needed
export const DataTable = DT;
export { useDataTable };

// Re-export everything else from create-data-table
export * from './create-data-table';
