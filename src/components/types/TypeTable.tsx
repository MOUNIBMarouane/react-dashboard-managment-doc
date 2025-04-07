
import React from "react";
import { Type } from "@/types/type";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Tag } from "lucide-react";
import TypeActions from "./TypeActions";

interface TypeTableProps {
  types: Type[];
  selectedTypes: string[];
  onSelectType: (typeId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onSingleDelete: (typeId: string) => void;
  onEdit: (typeId: string) => void;
}

const TypeTable: React.FC<TypeTableProps> = ({ 
  types, 
  selectedTypes, 
  onSelectType, 
  onSelectAll,
  onSingleDelete,
  onEdit
}) => {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm shadow-lg transition-all duration-300">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-dashboard-blue-dark/80 backdrop-blur-sm">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="w-12 text-white/70">
                <Checkbox 
                  checked={selectedTypes.length === types.length && types.length > 0}
                  onCheckedChange={(checked) => onSelectAll(!!checked)}
                  className="border-white/30 data-[state=checked]:bg-dashboard-accent data-[state=checked]:border-dashboard-accent transition-all duration-300"
                />
              </TableHead>
              <TableHead className="text-white/70 font-medium">Type Name</TableHead>
              <TableHead className="text-white/70 font-medium">Attribute</TableHead>
              <TableHead className="text-white/70 font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.map((type) => (
              <TableRow 
                key={type.id} 
                className={`border-white/10 transition-colors duration-200 hover:bg-white/5 ${
                  selectedTypes.includes(type.id) ? 'bg-dashboard-accent/10' : ''
                }`}
              >
                <TableCell className="p-2">
                  <Checkbox 
                    checked={selectedTypes.includes(type.id)}
                    onCheckedChange={(checked) => onSelectType(type.id, !!checked)}
                    className="border-white/30 data-[state=checked]:bg-dashboard-accent data-[state=checked]:border-dashboard-accent transition-all duration-300"
                  />
                </TableCell>
                <TableCell className="flex items-center gap-3 py-3">
                  <div className="w-9 h-9 rounded-md bg-dashboard-blue-dark/50 border border-white/10 flex items-center justify-center">
                    <Tag size={16} className="text-dashboard-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{type.typename}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">{type.attribute || 'N/A'}</span>
                </TableCell>
                <TableCell className="text-right">
                  <TypeActions 
                    typeId={type.id} 
                    onSelect={onSelectType}
                    onDelete={onSingleDelete}
                    onEdit={onEdit}
                  />
                </TableCell>
              </TableRow>
            ))}
            
            {types.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-white/50">
                  <div className="flex flex-col items-center justify-center">
                    <Tag size={32} className="text-white/20 mb-2" />
                    <p>No types found</p>
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

export default TypeTable;
