
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DocumentStatus } from "@/types/document";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChangeStatusDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  newStatus: DocumentStatus;
  setNewStatus: (status: DocumentStatus) => void;
  onChangeStatus: () => void;
}

const ChangeStatusDialog: React.FC<ChangeStatusDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedCount,
  newStatus,
  setNewStatus,
  onChangeStatus
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dashboard-blue-dark border-white/10 animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-white">Change Document Status</DialogTitle>
          <DialogDescription className="text-white/70">
            Update the status for {selectedCount} selected {selectedCount === 1 ? 'document' : 'documents'}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Label htmlFor="status-select" className="text-white mb-2 block">New Status</Label>
          <Select value={newStatus} onValueChange={(value: DocumentStatus) => setNewStatus(value)}>
            <SelectTrigger id="status-select" className="bg-white/5 border-white/20 text-white focus:ring-dashboard-accent">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-dashboard-blue-dark border-white/20 text-white">
              <SelectItem value="Draft" className="focus:bg-white/10 focus:text-white">Draft</SelectItem>
              <SelectItem value="Published" className="focus:bg-white/10 focus:text-white">Published</SelectItem>
              <SelectItem value="Archived" className="focus:bg-white/10 focus:text-white">Archived</SelectItem>
            </SelectContent>
          </Select>
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
            onClick={onChangeStatus}
            className="bg-dashboard-accent hover:bg-dashboard-accent/90 transition-all duration-300"
          >
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeStatusDialog;
