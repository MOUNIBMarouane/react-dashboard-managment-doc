
import { useState } from 'react';
import { createDataTable } from '@/components/table/create-data-table';
import { Circuit } from '@/models/circuit';
import { Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

// Create a typed DataTable for Circuit
const CircuitTable = createDataTable<Circuit>();

const DataTableExample = () => {
  const [circuits, setCircuits] = useState<Circuit[]>([
    {
      id: 1,
      circuitKey: 'CIRC-001',
      title: 'Approval Workflow',
      descriptif: 'Standard document approval workflow',
      crdCounter: 15,
      isActive: true, 
      hasOrderedFlow: true,
      createdAt: '2023-05-05T12:00:00Z'
    },
    {
      id: 2,
      circuitKey: 'CIRC-002',
      title: 'Review Process',
      descriptif: 'Document review process with multiple steps',
      crdCounter: 8,
      isActive: false,
      hasOrderedFlow: true,
      createdAt: '2023-06-12T09:30:00Z'
    }
  ]);

  const columns = [
    {
      header: 'Circuit Key',
      key: 'circuitKey',
      cell: (item: Circuit) => (
        <div className="flex items-center">
          <Tag className="h-4 w-4 mr-2 text-blue-400" />
          <span className="font-mono text-xs">{item.circuitKey}</span>
        </div>
      )
    },
    {
      header: 'Title',
      key: 'title'
    },
    {
      header: 'Description',
      key: 'descriptif',
      cell: (item: Circuit) => (
        <span className="truncate max-w-[200px] block">
          {item.descriptif || 'No description'}
        </span>
      )
    },
    {
      header: 'Status',
      key: 'isActive',
      cell: (item: Circuit) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          item.isActive 
            ? 'bg-green-900/20 text-green-400 border border-green-800/50' 
            : 'bg-gray-900/20 text-gray-400 border border-gray-800/50'
        }`}>
          {item.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      header: 'Created',
      key: 'createdAt',
      cell: (item: Circuit) => (
        <span className="text-gray-400 text-sm">
          {item.createdAt ? formatDate(item.createdAt) : 'N/A'}
        </span>
      )
    },
  ];

  return (
    <CircuitTable
      data={circuits}
      columns={columns}
      getRowId={(item) => item.id}
    />
  );
};

export default DataTableExample;
