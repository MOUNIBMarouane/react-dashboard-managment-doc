
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash, UserCog, Ban } from "lucide-react";

interface UserSelectionActionBarProps {
  selectedCount: number;
  onOpenRoleDialog: () => void;
  onOpenDeleteDialog: () => void;
  onOpenBlockDialog: () => void;
}

const UserSelectionActionBar: React.FC<UserSelectionActionBarProps> = ({
  selectedCount,
  onOpenRoleDialog,
  onOpenDeleteDialog,
  onOpenBlockDialog
}) => {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 py-3 px-4 flex items-center justify-between bg-white/5 backdrop-blur-lg">
      <div className="text-white">
        <span className="font-medium">{selectedCount}</span> users selected
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={onOpenRoleDialog}
          className="border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
        >
          <UserCog className="mr-2 h-4 w-4" />
          Change Role
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onOpenBlockDialog}
          className="border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
        >
          <Ban className="mr-2 h-4 w-4" />
          Block/Unblock
        </Button>
        
        <Button 
          variant="destructive" 
          onClick={onOpenDeleteDialog}
          className="transition-all duration-300 hover:scale-105"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default UserSelectionActionBar;
