
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DocumentStatusDto } from "@/models/documentCircuit";

interface StatusTableProps {
  statuses: DocumentStatusDto[];
  onEdit?: (status: DocumentStatusDto) => void;
  onDelete?: (status: DocumentStatusDto) => void;
  isCircuitActive?: boolean;
}

export function StatusTable({ statuses, onEdit, onDelete, isCircuitActive = false }: StatusTableProps) {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Required</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {statuses.length > 0 ? (
            statuses.map((status) => (
              <TableRow key={status.statusId}>
                <TableCell className="font-medium">{status.title}</TableCell>
                <TableCell>
                  {status.isRequired ? (
                    <Badge variant="default" className="bg-blue-500">Required</Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500">Optional</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {!isCircuitActive && onEdit && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => onEdit(status)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                    {!isCircuitActive && onDelete && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => onDelete(status)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                No statuses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
