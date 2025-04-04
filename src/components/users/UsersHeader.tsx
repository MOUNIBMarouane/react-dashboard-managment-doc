
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash, UserCog, Users as UsersIcon } from "lucide-react";

interface UsersHeaderProps {
  selectedUsers: string[];
  onOpenRoleDialog: () => void;
  onOpenDeleteDialog: () => void;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({
  selectedUsers,
  onOpenRoleDialog,
  onOpenDeleteDialog
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
      <div className="flex items-center mb-4 md:mb-0">
        <UsersIcon className="mr-2 text-dashboard-accent" />
        <h1 className="text-2xl font-bold text-white">Users</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        {selectedUsers.length > 0 && (
          <>
            <Button 
              variant="outline" 
              onClick={onOpenRoleDialog}
              className="border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <UserCog className="mr-2 h-4 w-4" />
              Change Role
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={onOpenDeleteDialog}
              className="transition-all duration-300 hover:scale-105"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersHeader;
