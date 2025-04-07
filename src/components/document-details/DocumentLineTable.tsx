
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DocumentLine } from "@/types/documentLine";
import { Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample document lines data
const sampleDocumentLines: Record<string, DocumentLine[]> = {
  "1": [
    {
      id: "1-1",
      documentId: "1",
      title: "Financial Analysis",
      description: "Quarterly financial performance analysis",
      quantity: 1,
      unitPrice: 1200,
      totalAmount: 1200,
      createdAt: "2025-01-17T10:30:00Z",
    },
    {
      id: "1-2",
      documentId: "1",
      title: "Market Research",
      description: "Competitor analysis and market trends",
      quantity: 1,
      unitPrice: 800,
      totalAmount: 800,
      createdAt: "2025-01-18T14:45:00Z",
    },
    {
      id: "1-3",
      documentId: "1",
      title: "Executive Summary",
      description: "Summary of Q1 2025 performance",
      quantity: 1,
      unitPrice: 500,
      totalAmount: 500,
      createdAt: "2025-01-19T09:15:00Z",
    }
  ],
  "2": [
    {
      id: "2-1",
      documentId: "2",
      title: "Social Media Strategy",
      description: "Facebook, Instagram, LinkedIn campaigns",
      quantity: 3,
      unitPrice: 600,
      totalAmount: 1800,
      createdAt: "2025-02-04T11:20:00Z",
    },
    {
      id: "2-2",
      documentId: "2",
      title: "Content Calendar",
      description: "Editorial calendar for Q1-Q2",
      quantity: 1,
      unitPrice: 750,
      totalAmount: 750,
      createdAt: "2025-02-06T13:45:00Z",
    }
  ]
};

interface DocumentLineTableProps {
  documentId: string;
}

const DocumentLineTable: React.FC<DocumentLineTableProps> = ({ documentId }) => {
  const navigate = useNavigate();
  const [selectedLines, setSelectedLines] = useState<string[]>([]);
  const lines = sampleDocumentLines[documentId] || [];
  
  const handleViewLine = (lineId: string) => {
    navigate(`/document-details/${documentId}/line/${lineId}`);
  };
  
  const handleLineSelection = (lineId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedLines([...selectedLines, lineId]);
    } else {
      setSelectedLines(selectedLines.filter(id => id !== lineId));
    }
  };
  
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      {selectedLines.length > 0 && (
        <div className="bg-dashboard-blue-dark/80 p-3 border-b border-white/10 flex justify-between items-center">
          <span className="text-white text-sm">
            {selectedLines.length} {selectedLines.length === 1 ? 'item' : 'items'} selected
          </span>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setSelectedLines([])}
            >
              Clear Selection
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
            >
              Delete Selected
            </Button>
          </div>
        </div>
      )}
      
      <Table>
        <TableHeader className="bg-dashboard-blue-dark/80">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-white/70 font-medium">Title</TableHead>
            <TableHead className="text-white/70 font-medium">Description</TableHead>
            <TableHead className="text-white/70 font-medium">Quantity</TableHead>
            <TableHead className="text-white/70 font-medium">Unit Price</TableHead>
            <TableHead className="text-white/70 font-medium">Total</TableHead>
            <TableHead className="text-white/70 font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lines.map((line) => (
            <TableRow 
              key={line.id}
              className={`border-white/10 hover:bg-white/5 transition-colors ${
                selectedLines.includes(line.id) ? 'bg-dashboard-accent/10' : ''
              }`}
              onClick={() => handleLineSelection(line.id, !selectedLines.includes(line.id))}
            >
              <TableCell className="font-medium text-white">{line.title}</TableCell>
              <TableCell className="text-white/80">{line.description}</TableCell>
              <TableCell className="text-white/80">{line.quantity}</TableCell>
              <TableCell className="text-white/80">${line.unitPrice?.toFixed(2)}</TableCell>
              <TableCell className="text-white/80">${line.totalAmount?.toFixed(2)}</TableCell>
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="h-8 w-8 p-0 hover:bg-white/10"
                    >
                      <MoreHorizontal className="h-4 w-4 text-white/70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-dashboard-blue-dark border-white/10 text-white">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem 
                      onClick={() => handleViewLine(line.id)}
                      className="cursor-pointer hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
                    >
                      <Eye size={14} />
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          
          {lines.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-white/50">
                No lines found for this document
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentLineTable;
