
import { useState } from 'react';
import { DocumentType } from '@/models/document';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, Trash } from 'lucide-react';

interface DocumentTypeTableProps {
  types: DocumentType[];
  selectedTypes: number[];
  onSelectType: (id: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onDeleteType: (id: number) => void;
  onSort: (field: string) => void;
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
}

const DocumentTypeTable: React.FC<DocumentTypeTableProps> = ({
  types,
  selectedTypes,
  onSelectType,
  onSelectAll,
  onDeleteType,
  onSort,
  sortField,
  sortDirection
}) => {
  const areAllEligibleSelected = types.length > 0 && 
    types.filter(type => type.documentCounter === 0).length === selectedTypes.length;

  return (
    <div className="rounded-md overflow-hidden border border-border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox 
                checked={areAllEligibleSelected && types.some(t => t.documentCounter === 0)}
                onCheckedChange={onSelectAll}
                disabled={!types.some(t => t.documentCounter === 0)}
                aria-label="Select all types"
              />
            </TableHead>
            <TableHead 
              className="w-1/6 cursor-pointer"
              onClick={() => onSort('typeKey')}
            >
              <div className="flex items-center">
                Type Key
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead 
              className="w-1/3 cursor-pointer"
              onClick={() => onSort('typeName')}
            >
              <div className="flex items-center">
                Type Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead 
              className="w-1/4 cursor-pointer"
              onClick={() => onSort('typeAttr')}
            >
              <div className="flex items-center">
                Attributes
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead 
              className="w-1/6 cursor-pointer"
              onClick={() => onSort('documentCounter')}
            >
              <div className="flex items-center">
                Document Count
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="w-1/12 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {types.map((type) => (
            <TableRow 
              key={type.id} 
              className={`hover:bg-muted/50 ${selectedTypes.includes(type.id!) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
            >
              <TableCell>
                <Checkbox 
                  checked={selectedTypes.includes(type.id!)}
                  onCheckedChange={(checked) => onSelectType(type.id!, checked as boolean)}
                  disabled={type.documentCounter! > 0}
                  aria-label={`Select ${type.typeName}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <Badge variant="outline" className="px-2 py-1 text-sm font-mono">
                  {type.typeKey}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold">{type.typeName}</TableCell>
              <TableCell>{type.typeAttr || "-"}</TableCell>
              <TableCell>
                <Badge 
                  variant={type.documentCounter! > 0 ? "secondary" : "outline"} 
                  className="px-2 py-1"
                >
                  {type.documentCounter}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 ${
                    type.documentCounter! > 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => type.documentCounter! === 0 && onDeleteType(type.id!)}
                  disabled={type.documentCounter! > 0}
                  title={type.documentCounter! > 0 ? "Cannot delete types with documents" : "Delete type"}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentTypeTable;
