
import React from "react";
import { MoreHorizontal, Eye, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface CircuitActionsProps {
  circuitId: string;
  onSelect: (circuitId: string, checked: boolean) => void;
  onDelete: (circuitId: string) => void;
  onEdit: (circuitId: string) => void;
}

const CircuitActions: React.FC<CircuitActionsProps> = ({ circuitId, onSelect, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleViewCircuit = () => {
    navigate(`/circuit-details/${circuitId}`);
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
          onClick={handleViewCircuit}
          className="cursor-pointer hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
        >
          <Eye size={14} />
          View
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onEdit(circuitId)}
          className="cursor-pointer hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
        >
          <Pencil size={14} />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onSelect(circuitId, true)}
          className="cursor-pointer hover:bg-white/10 transition-all duration-200"
        >
          Select
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-red-400 cursor-pointer hover:bg-white/10 transition-all duration-200"
          onClick={() => onDelete(circuitId)}
        >
          <Trash size={14} className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CircuitActions;
