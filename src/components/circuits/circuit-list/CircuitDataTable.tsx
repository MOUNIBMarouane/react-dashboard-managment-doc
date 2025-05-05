
import { Circuit } from '@/models/circuit';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CircuitListActions } from './CircuitListActions';
import { useSettings } from '@/context/SettingsContext';

interface CircuitDataTableProps {
  data: Circuit[];
  onEdit: (circuit: Circuit) => void;
  onDelete: (circuit: Circuit) => void;
  onViewDetails: (circuit: Circuit) => void;
}

export function CircuitDataTable({
  data,
  onEdit,
  onDelete,
  onViewDetails
}: CircuitDataTableProps) {
  const { theme } = useSettings();
  
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader className={theme === "dark" ? "bg-blue-950/30" : "bg-blue-50/80"}>
          <TableRow>
            <TableHead className="w-[80px]">Code</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((circuit) => (
            <TableRow 
              key={circuit.id}
              className={theme === "dark" ? "hover:bg-blue-950/30" : "hover:bg-blue-50/80"}
            >
              <TableCell className="font-mono text-xs">
                {circuit.circuitKey}
              </TableCell>
              <TableCell className="font-medium">{circuit.title}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {circuit.descriptif || "-"}
              </TableCell>
              <TableCell>
                {circuit.hasOrderedFlow ? (
                  <Badge variant={theme === "dark" ? "outline" : "secondary"} className={theme === "dark" ? "border-blue-500/30 text-blue-400" : ""}>
                    Sequential
                  </Badge>
                ) : (
                  <Badge variant="outline" className={theme === "dark" ? "border-purple-500/30 text-purple-400" : "text-purple-600"}>
                    Parallel
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {circuit.isActive ? (
                  <Badge variant="success" className={theme === "dark" ? "bg-green-900/50" : ""}>Active</Badge>
                ) : (
                  <Badge variant="destructive" className={theme === "dark" ? "bg-red-900/50" : ""}>Inactive</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <CircuitListActions 
                  circuit={circuit}
                  isSimpleUser={false}
                  onEdit={() => onEdit(circuit)}
                  onDelete={() => onDelete(circuit)}
                  onViewDetails={() => onViewDetails(circuit)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
