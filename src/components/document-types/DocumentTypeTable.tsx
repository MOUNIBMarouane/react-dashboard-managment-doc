
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
import { ArrowUpDown, Trash, Edit, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DocumentTypeTableProps {
  types: DocumentType[];
  selectedTypes: number[];
  onSelectType: (id: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onDeleteType: (id: number) => void;
  onEditType: (type: DocumentType) => void;
  onSort: (field: string) => void;
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const DocumentTypeTable: React.FC<DocumentTypeTableProps> = ({
  types,
  selectedTypes,
  onSelectType,
  onSelectAll,
  onDeleteType,
  onEditType,
  onSort,
  sortField,
  sortDirection,
  searchQuery,
  onSearchChange
}) => {
  const areAllEligibleSelected = types.length > 0 && 
    types.filter(type => type.documentCounter === 0).length === selectedTypes.length;

  const renderSortIcon = (field: string) => {
    if (sortField === field) {
      return sortDirection === 'asc' 
        ? <ArrowUpDown className="ml-2 h-4 w-4 text-blue-400" /> 
        : <ArrowUpDown className="ml-2 h-4 w-4 text-blue-400 rotate-180" />;
    }
    return <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
          <Input
            placeholder="Search document types..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-blue-900/10 border-blue-800/30 text-white placeholder:text-blue-300/50 w-full"
          />
        </div>
      </div>

      <div className="rounded-md overflow-hidden border border-blue-900/30 bg-[#0a1033]/50">
        <Table>
          <TableHeader className="bg-[#111942]/80">
            <TableRow className="hover:bg-transparent border-b border-blue-900/30">
              <TableHead className="w-[50px] text-blue-300">
                <Checkbox 
                  checked={areAllEligibleSelected && types.some(t => t.documentCounter === 0)}
                  onCheckedChange={onSelectAll}
                  disabled={!types.some(t => t.documentCounter === 0)}
                  aria-label="Select all types"
                />
              </TableHead>
              <TableHead 
                className="w-1/6 cursor-pointer text-blue-300 hover:text-blue-200"
                onClick={() => onSort('typeKey')}
              >
                <div className="flex items-center">
                  Type Key
                  {renderSortIcon('typeKey')}
                </div>
              </TableHead>
              <TableHead 
                className="w-1/3 cursor-pointer text-blue-300 hover:text-blue-200"
                onClick={() => onSort('typeName')}
              >
                <div className="flex items-center">
                  Type Name
                  {renderSortIcon('typeName')}
                </div>
              </TableHead>
              <TableHead 
                className="w-1/4 cursor-pointer text-blue-300 hover:text-blue-200"
                onClick={() => onSort('typeAttr')}
              >
                <div className="flex items-center">
                  Attributes
                  {renderSortIcon('typeAttr')}
                </div>
              </TableHead>
              <TableHead 
                className="w-1/6 cursor-pointer text-blue-300 hover:text-blue-200"
                onClick={() => onSort('documentCounter')}
              >
                <div className="flex items-center">
                  Document Count
                  {renderSortIcon('documentCounter')}
                </div>
              </TableHead>
              <TableHead className="w-1/12 text-right text-blue-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-blue-400">
                  No document types found
                </TableCell>
              </TableRow>
            ) : (
              types.map((type) => (
                <TableRow 
                  key={type.id} 
                  className={`border-b border-blue-900/20 hover:bg-blue-900/10 ${selectedTypes.includes(type.id!) ? 'bg-blue-900/20' : ''}`}
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
                    <Badge variant="outline" className="px-2 py-1 text-sm font-mono bg-blue-900/30 text-blue-200 border-blue-800/40">
                      {type.typeKey}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-white">{type.typeName}</TableCell>
                  <TableCell className="text-blue-300">{type.typeAttr || "-"}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={type.documentCounter! > 0 ? "secondary" : "outline"} 
                      className={`px-2 py-0.5 ${type.documentCounter! > 0 
                        ? 'bg-blue-600/30 text-blue-200 hover:bg-blue-600/40' 
                        : 'border-blue-800/40 text-blue-300'}`}
                    >
                      {type.documentCounter}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-blue-400 hover:text-blue-200 hover:bg-blue-900/30"
                            onClick={() => onEditType(type)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit type</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`text-red-400 hover:text-red-300 hover:bg-red-900/20 ${
                              type.documentCounter! > 0 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={() => type.documentCounter! === 0 && onDeleteType(type.id!)}
                            disabled={type.documentCounter! > 0}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {type.documentCounter! > 0 
                            ? "Cannot delete types with documents" 
                            : "Delete type"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DocumentTypeTable;
