
import React from "react";
import { MoreHorizontal, Eye, Pencil, Trash, CircuitBoard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface DocumentActionsProps {
  documentId: string;
  onSelect: (documentId: string, checked: boolean) => void;
  onDelete: (documentId: string) => void;
  onEdit: (documentId: string) => void;
  onCreateCircuit?: (documentId: string) => void;
}

const DocumentActions: React.FC<DocumentActionsProps> = ({ 
  documentId, 
  onSelect, 
  onDelete, 
  onEdit,
  onCreateCircuit 
}) => {
  const navigate = useNavigate();

  const handleViewDocument = () => {
    navigate(`/document-details/${documentId}`);
  };

  const handleCreateCircuit = () => {
    // Navigate to the circuit selection page with the document ID
    navigate(`/select-circuit/${documentId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0 hover:bg-white/10 transition-all duration-300"
          aria-label="Open menu"
        >
          <MoreHorizontal className="h-4 w-4 text-white/70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-dashboard-blue-dark border-white/10 text-white backdrop-blur-sm animate-fade-in">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem 
          onClick={handleViewDocument}
          className="cursor-pointer hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
        >
          <Eye size={14} />
          View
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onEdit(documentId)}
          className="cursor-pointer hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
        >
          <Pencil size={14} />
          Edit
        </DropdownMenuItem>
        {onCreateCircuit && (
          <DropdownMenuItem 
            onClick={handleCreateCircuit}
            className="cursor-pointer hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
          >
            <CircuitBoard size={14} className="mr-2" />
            Create Circuit
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          className="text-red-400 cursor-pointer hover:bg-white/10 transition-all duration-200"
          onClick={() => onDelete(documentId)}
        >
          <Trash size={14} className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocumentActions;
