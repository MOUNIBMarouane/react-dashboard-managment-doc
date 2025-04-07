
import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

interface DeleteCircuitDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  onDelete: () => void;
}

const DeleteCircuitDialog: React.FC<DeleteCircuitDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedCount,
  onDelete,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-dashboard-blue-dark border-white/10 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash size={18} className="text-red-400" />
            <span>Delete {selectedCount} {selectedCount === 1 ? 'Circuit' : 'Circuits'}</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/70">
            This action cannot be undone. This will permanently delete 
            {selectedCount === 1 
              ? ' the selected circuit.' 
              : ` ${selectedCount} selected circuits.`
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-white/10 text-white hover:bg-white/10 hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCircuitDialog;
