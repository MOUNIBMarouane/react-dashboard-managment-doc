
import React from "react";
import { Circuit } from "@/types/circuit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { GitGraph } from "lucide-react";
import CircuitActions from "./CircuitActions";
import CircuitStatusBadge from "./CircuitStatusBadge";

interface CircuitTableProps {
  circuits: Circuit[];
  selectedCircuits: string[];
  onSelectCircuit: (circuitId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onSingleDelete: (circuitId: string) => void;
  onEdit: (circuitId: string) => void;
  isLoading?: boolean;
}

const CircuitTable: React.FC<CircuitTableProps> = ({ 
  circuits, 
  selectedCircuits, 
  onSelectCircuit, 
  onSelectAll,
  onSingleDelete,
  onEdit,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="border border-white/10 rounded-lg overflow-hidden bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm shadow-lg">
        <div className="p-8 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-white/10 mb-4"></div>
            <div className="h-4 w-48 bg-white/10 rounded mb-3"></div>
            <div className="h-3 w-36 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm shadow-lg transition-all duration-300">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-dashboard-blue-dark/80 backdrop-blur-sm">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="w-12 text-white/70">
                <Checkbox 
                  checked={selectedCircuits.length === circuits.length && circuits.length > 0}
                  onCheckedChange={(checked) => onSelectAll(!!checked)}
                  className="border-white/30 data-[state=checked]:bg-dashboard-accent data-[state=checked]:border-dashboard-accent transition-all duration-300"
                />
              </TableHead>
              <TableHead className="text-white/70 font-medium">Key</TableHead>
              <TableHead className="text-white/70 font-medium">Title</TableHead>
              <TableHead className="text-white/70 font-medium">Status</TableHead>
              <TableHead className="text-white/70 font-medium">Steps</TableHead>
              <TableHead className="text-white/70 font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {circuits.map((circuit) => (
              <TableRow 
                key={circuit.id} 
                className={`border-white/10 transition-colors duration-200 hover:bg-white/5 ${
                  selectedCircuits.includes(circuit.id) ? 'bg-dashboard-accent/10' : ''
                }`}
              >
                <TableCell className="p-2">
                  <Checkbox 
                    checked={selectedCircuits.includes(circuit.id)}
                    onCheckedChange={(checked) => onSelectCircuit(circuit.id, !!checked)}
                    className="border-white/30 data-[state=checked]:bg-dashboard-accent data-[state=checked]:border-dashboard-accent transition-all duration-300"
                  />
                </TableCell>
                <TableCell className="text-white">
                  {circuit.circuit_key}
                </TableCell>
                <TableCell className="flex items-center gap-3 py-3">
                  <div className="w-9 h-9 rounded-md bg-dashboard-blue-dark/50 border border-white/10 flex items-center justify-center">
                    <GitGraph size={16} className="text-dashboard-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{circuit.title}</p>
                    <p className="text-xs text-white/60 line-clamp-1 max-w-[200px]">{circuit.descriptif}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <CircuitStatusBadge isActive={circuit.is_active} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">{circuit.crd_counter}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <CircuitActions 
                    circuitId={circuit.id} 
                    onSelect={onSelectCircuit}
                    onDelete={onSingleDelete}
                    onEdit={onEdit}
                  />
                </TableCell>
              </TableRow>
            ))}
            
            {circuits.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-white/50">
                  <div className="flex flex-col items-center justify-center">
                    <GitGraph size={32} className="text-white/20 mb-2" />
                    <p>No circuits found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CircuitTable;
