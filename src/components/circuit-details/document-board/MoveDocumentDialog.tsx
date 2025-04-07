
import React from "react";
import { CircuitDetail } from "@/types/circuit";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MoveDocumentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  circuitDetails: CircuitDetail[];
  onMoveDocument: (detailId: string) => void;
}

const MoveDocumentDialog: React.FC<MoveDocumentDialogProps> = ({
  isOpen,
  onOpenChange,
  circuitDetails,
  onMoveDocument,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dashboard-blue-dark border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Move Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          <p className="text-sm text-white/70">Select a step to move this document to:</p>
          <div className="grid grid-cols-1 gap-2">
            {circuitDetails.map((detail) => (
              <Button 
                key={detail.id}
                variant="outline"
                className="justify-start border-white/10 hover:bg-white/10"
                onClick={() => onMoveDocument(detail.id)}
              >
                {detail.title}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoveDocumentDialog;
