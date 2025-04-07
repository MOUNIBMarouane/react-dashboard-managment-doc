
import React from "react";
import { Document } from "@/types/document";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react";
import DocumentStatusBadge from "./DocumentStatusBadge";
import DocumentTypeBadge from "./DocumentTypeBadge";
import DocumentActions from "./DocumentActions";
import { format, parseISO } from "date-fns";

interface DocumentTableProps {
  documents: Document[];
  selectedDocuments: string[];
  onSelectDocument: (documentId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onSingleDelete: (documentId: string) => void;
  onEdit: (documentId: string) => void;
}

const DocumentTable: React.FC<DocumentTableProps> = ({ 
  documents, 
  selectedDocuments, 
  onSelectDocument, 
  onSelectAll,
  onSingleDelete,
  onEdit
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm shadow-lg transition-all duration-300">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-dashboard-blue-dark/80 backdrop-blur-sm">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="w-12 text-white/70">
                <Checkbox 
                  checked={selectedDocuments.length === documents.length && documents.length > 0}
                  onCheckedChange={(checked) => onSelectAll(!!checked)}
                  className="border-white/30 data-[state=checked]:bg-dashboard-accent data-[state=checked]:border-dashboard-accent transition-all duration-300"
                />
              </TableHead>
              <TableHead className="text-white/70 font-medium">Document</TableHead>
              <TableHead className="text-white/70 font-medium">Type</TableHead>
              <TableHead className="text-white/70 font-medium">Status</TableHead>
              <TableHead className="text-white/70 font-medium">Created</TableHead>
              <TableHead className="text-white/70 font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document) => (
              <TableRow 
                key={document.id} 
                className={`border-white/10 transition-colors duration-200 hover:bg-white/5 ${
                  selectedDocuments.includes(document.id) ? 'bg-dashboard-accent/10' : ''
                }`}
              >
                <TableCell className="p-2">
                  <Checkbox 
                    checked={selectedDocuments.includes(document.id)}
                    onCheckedChange={(checked) => onSelectDocument(document.id, !!checked)}
                    className="border-white/30 data-[state=checked]:bg-dashboard-accent data-[state=checked]:border-dashboard-accent transition-all duration-300"
                  />
                </TableCell>
                <TableCell className="flex items-center gap-3 py-3">
                  <div className="w-9 h-9 rounded-md bg-dashboard-blue-dark/50 border border-white/10 flex items-center justify-center">
                    <FileText size={16} className="text-dashboard-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{document.title}</p>
                    <p className="text-xs text-white/50 line-clamp-1">{document.content}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <DocumentTypeBadge type={document.type} />
                </TableCell>
                <TableCell>
                  <DocumentStatusBadge status={document.status} />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm text-white/70">{formatDate(document.createdAt)}</span>
                    <span className="text-xs text-white/50">{document.createdBy}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DocumentActions 
                    documentId={document.id} 
                    onSelect={onSelectDocument}
                    onDelete={onSingleDelete}
                    onEdit={onEdit}
                  />
                </TableCell>
              </TableRow>
            ))}
            
            {documents.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-white/50">
                  <div className="flex flex-col items-center justify-center">
                    <FileText size={32} className="text-white/20 mb-2" />
                    <p>No documents found</p>
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

export default DocumentTable;
