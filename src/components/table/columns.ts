
import { Column } from './create-data-table';

export const columns: Column<any>[] = [
  {
    header: "Name",
    key: "name",
    cell: (row) => <span className="font-medium">{row.name}</span>,
  },
  {
    header: "Email",
    key: "email",
  },
  {
    header: "Status",
    key: "status",
    cell: (row) => (
      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
        row.status === 'active' ? 'bg-green-100 text-green-800' : 
        row.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
        'bg-yellow-100 text-yellow-800'
      }`}>
        {row.status}
      </span>
    ),
  },
  {
    header: "Type",
    key: "type",
  },
  {
    header: "Date",
    key: "date",
    cell: (row) => new Date(row.date).toLocaleDateString(),
  }
];
