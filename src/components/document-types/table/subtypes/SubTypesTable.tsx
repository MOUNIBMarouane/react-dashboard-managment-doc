
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { SubType } from '@/models/subtype';
import { DocumentType } from '@/models/document';
import { Badge } from '@/components/ui/badge';

export interface SubTypesTableProps {
  subTypes: SubType[];
  documentTypes?: DocumentType[];
  onEdit: (subType: SubType) => void;
  onDelete: (subType: SubType) => void;
}

export function SubTypesTable({ subTypes, documentTypes = [], onEdit, onDelete }: SubTypesTableProps) {
  // Helper function to get document type name
  const getDocumentTypeName = (typeId: number) => {
    const docType = documentTypes.find(dt => dt.id === typeId);
    return docType ? docType.typeName : `Type ID: ${typeId}`;
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Document Type</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subTypes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                No subtypes found.
              </TableCell>
            </TableRow>
          ) : (
            subTypes.map((subType) => (
              <TableRow key={subType.id}>
                <TableCell className="font-mono">{subType.subTypeKey}</TableCell>
                <TableCell>{subType.name}</TableCell>
                <TableCell>
                  {subType.documentType ? subType.documentType.typeName : getDocumentTypeName(subType.documentTypeId)}
                </TableCell>
                <TableCell>{format(new Date(subType.startDate), 'MMM d, yyyy')}</TableCell>
                <TableCell>{format(new Date(subType.endDate), 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <Badge variant={subType.isActive ? "success" : "destructive"}>
                    {subType.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(subType)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onDelete(subType)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
