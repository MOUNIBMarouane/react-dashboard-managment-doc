
import React, { useEffect } from "react";
import { Document } from "@/types/document";
import { CircuitDetail } from "@/types/circuit";
import { toast } from "sonner";
import DetailDocumentList from "./document-board/DetailDocumentList";
import MoveDocumentDialog from "./document-board/MoveDocumentDialog";
import { useDocumentAssignments } from "@/hooks/useDocumentAssignments";

interface CircuitDocumentBoardProps {
  circuitId: string;
  circuitDetails: CircuitDetail[];
  documents: Document[];
  currentDocumentId?: string;
}

const CircuitDocumentBoard: React.FC<CircuitDocumentBoardProps> = ({
  circuitId,
  circuitDetails,
  documents,
  currentDocumentId,
}) => {
  const {
    documentAssignments,
    documentToMove,
    isMoveDialogOpen,
    setIsMoveDialogOpen,
    handleMoveDocument,
    moveDocumentToDetail,
    initializeDetailAssignment
  } = useDocumentAssignments(circuitId);
  
  // Initialize with current document assignment if provided
  useEffect(() => {
    if (currentDocumentId && circuitDetails.length > 0) {
      const firstDetailId = circuitDetails[0].id;
      initializeDetailAssignment(firstDetailId, currentDocumentId);
      toast.success("Document added to first step of the circuit");
    }
  }, [currentDocumentId, circuitDetails]);
  
  // Get assigned document IDs for a specific circuit detail
  const getDetailDocumentIds = (detailId: string) => {
    return documentAssignments[detailId] || [];
  };

  if (circuitDetails.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-lg">
        <p className="text-white/60">No circuit steps found. Create steps first.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {circuitDetails.map((detail) => (
          <DetailDocumentList
            key={detail.id}
            detail={detail}
            documents={documents}
            assignedDocumentIds={getDetailDocumentIds(detail.id)}
            onMoveDocument={handleMoveDocument}
          />
        ))}
      </div>

      <MoveDocumentDialog
        isOpen={isMoveDialogOpen}
        onOpenChange={setIsMoveDialogOpen}
        circuitDetails={circuitDetails}
        onMoveDocument={moveDocumentToDetail}
      />
    </div>
  );
};

export default CircuitDocumentBoard;
