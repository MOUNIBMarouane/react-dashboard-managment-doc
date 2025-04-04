
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User } from "@/types/user";

interface ChangeRoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  newRole: User["role"];
  setNewRole: (role: User["role"]) => void;
  onChangeRole: () => void;
}

const ChangeRoleDialog: React.FC<ChangeRoleDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedCount,
  newRole,
  setNewRole,
  onChangeRole
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dashboard-blue-dark border-white/10 animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-white">Change User Role</DialogTitle>
          <DialogDescription className="text-white/70">
            Select a new role for {selectedCount} {selectedCount === 1 ? 'user' : 'users'}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant={newRole === "User" ? "default" : "outline"} 
              className={`transition-all duration-300 ${newRole !== "User" ? "border-white/20 text-white hover:bg-white/10" : ""}`}
              onClick={() => setNewRole("User")}
            >
              User
            </Button>
            <Button 
              variant={newRole === "Editor" ? "default" : "outline"}
              className={`transition-all duration-300 ${newRole !== "Editor" ? "border-white/20 text-white hover:bg-white/10" : ""}`}
              onClick={() => setNewRole("Editor")}
            >
              Editor
            </Button>
            <Button 
              variant={newRole === "Admin" ? "default" : "outline"}
              className={`transition-all duration-300 ${newRole !== "Admin" ? "border-white/20 text-white hover:bg-white/10" : ""}`}
              onClick={() => setNewRole("Admin")}
            >
              Admin
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-white/20 text-white hover:bg-white/10 transition-all duration-300"
          >
            Cancel
          </Button>
          <Button 
            onClick={onChangeRole}
            className="transition-all duration-300"
          >
            Update Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRoleDialog;
