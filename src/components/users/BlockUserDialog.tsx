
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BlockUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  onBlock: () => void;
  blockAction: "block" | "unblock";
}

const BlockUserDialog: React.FC<BlockUserDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedCount,
  onBlock,
  blockAction
}) => {
  const isBlocking = blockAction === "block";
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dashboard-blue-dark border-white/10 animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isBlocking ? "Block Users" : "Unblock Users"}
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Are you sure you want to {isBlocking ? "block" : "unblock"} {selectedCount} {selectedCount === 1 ? 'user' : 'users'}?
            {isBlocking && " Blocked users will not be able to use the system."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-white/20 text-white hover:bg-white/10 transition-all duration-300"
          >
            Cancel
          </Button>
          <Button 
            variant={isBlocking ? "destructive" : "default"}
            onClick={onBlock}
            className="transition-all duration-300"
          >
            {isBlocking ? "Block" : "Unblock"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlockUserDialog;
