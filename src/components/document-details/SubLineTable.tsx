
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DocumentSubLine } from "@/types/documentLine";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample sub-lines data
const sampleSubLines: Record<string, DocumentSubLine[]> = {
  "1-1": [
    {
      id: "1-1-1",
      lineId: "1-1",
      title: "Revenue Analysis",
      description: "Analysis of revenue streams",
      quantity: 1,
      unitPrice: 500,
      totalAmount: 500,
      createdAt: "2025-01-17T11:00:00Z",
    },
    {
      id: "1-1-2",
      lineId: "1-1",
      title: "Cost Analysis",
      description: "Analysis of operational costs",
      quantity: 1,
      unitPrice: 400,
      totalAmount: 400,
      createdAt: "2025-01-17T13:30:00Z",
    },
    {
      id: "1-1-3",
      lineId: "1-1",
      title: "Profit Analysis",
      description: "Analysis of quarterly profits",
      quantity: 1,
      unitPrice: 300,
      totalAmount: 300,
      createdAt: "2025-01-17T16:15:00Z",
    },
  ],
  "1-2": [
    {
      id: "1-2-1",
      lineId: "1-2",
      title: "Competitor Benchmarking",
      description: "Analysis of top 5 competitors",
      quantity: 1,
      unitPrice: 450,
      totalAmount: 450,
      createdAt: "2025-01-18T15:30:00Z",
    },
    {
      id: "1-2-2",
      lineId: "1-2",
      title: "Market Trends Analysis",
      description: "Industry trends for Q1 2025",
      quantity: 1,
      unitPrice: 350,
      totalAmount: 350,
      createdAt: "2025-01-19T09:45:00Z",
    },
  ],
};

interface SubLineTableProps {
  lineId: string;
}

const SubLineTable: React.FC<SubLineTableProps> = ({ lineId }) => {
  const [selectedSubLines, setSelectedSubLines] = useState<string[]>([]);
  const subLines = sampleSubLines[lineId] || [];
  
  const handleSubLineSelection = (subLineId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedSubLines([...selectedSubLines, subLineId]);
    } else {
      setSelectedSubLines(selectedSubLines.filter(id => id !== subLineId));
    }
  };
  
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      {selectedSubLines.length > 0 && (
        <div className="bg-dashboard-blue-dark/80 p-3 border-b border-white/10 flex justify-between items-center">
          <span className="text-white text-sm">
            {selectedSubLines.length} {selectedSubLines.length === 1 ? 'item' : 'items'} selected
          </span>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setSelectedSubLines([])}
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
          {subLines.map((subLine) => (
            <TableRow 
              key={subLine.id}
              className={`border-white/10 hover:bg-white/5 transition-colors ${
                selectedSubLines.includes(subLine.id) ? 'bg-dashboard-accent/10' : ''
              }`}
              onClick={() => handleSubLineSelection(subLine.id, !selectedSubLines.includes(subLine.id))}
            >
              <TableCell className="font-medium text-white">{subLine.title}</TableCell>
              <TableCell className="text-white/80">{subLine.description}</TableCell>
              <TableCell className="text-white/80">{subLine.quantity}</TableCell>
              <TableCell className="text-white/80">${subLine.unitPrice?.toFixed(2)}</TableCell>
              <TableCell className="text-white/80">${subLine.totalAmount?.toFixed(2)}</TableCell>
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
                      className="cursor-pointer hover:bg-white/10 transition-all duration-200"
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer hover:bg-white/10 transition-all duration-200 text-red-400"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          
          {subLines.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-white/50">
                No sub-lines found for this line
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubLineTable;
