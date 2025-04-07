
import React from "react";
import { MoreHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface UserActionsProps {
  userId: string;
  onSelect: (userId: string, checked: boolean) => void;
  onDelete: (userId: string) => void;
}

const UserActions: React.FC<UserActionsProps> = ({ userId, onSelect, onDelete }) => {
  const navigate = useNavigate();

  const handleViewUser = () => {
    navigate(`/user-details/${userId}`);
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
          onClick={handleViewUser}
          className="cursor-pointer hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
        >
          <Eye size={14} />
          View
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onSelect(userId, true)}
          className="cursor-pointer hover:bg-white/10 transition-all duration-200"
        >
          Select
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-red-400 cursor-pointer hover:bg-white/10 transition-all duration-200"
          onClick={() => onDelete(userId)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;
