
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function useDocumentAssignments(circuitId: string, currentDocumentId?: string) {
  // State for document assignments and move dialog
  const [documentAssignments, setDocumentAssignments] = useState<Record<string, string[]>>({});
  const [documentToMove, setDocumentToMove] = useState<string | null>(null);
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
  
  // Initialize with current document assignment if provided
  useEffect(() => {
    if (currentDocumentId && circuitId) {
      setDocumentAssignments(prevAssignments => {
        // Only update if we have valid circuit details to add to
        return prevAssignments;
      });
    }
  }, [currentDocumentId, circuitId]);

  // Handle opening the move dialog
  const handleMoveDocument = (documentId: string) => {
    setDocumentToMove(documentId);
    setIsMoveDialogOpen(true);
  };
  
  // Handle moving document to a different detail
  const moveDocumentToDetail = (detailId: string) => {
    if (!documentToMove) return;
    
    // Create a copy of current assignments
    const newAssignments = { ...documentAssignments };
    
    // Remove document from any current assignment
    Object.keys(newAssignments).forEach(key => {
      newAssignments[key] = newAssignments[key]?.filter(id => id !== documentToMove) || [];
    });
    
    // Add document to new detail
    if (!newAssignments[detailId]) {
      newAssignments[detailId] = [];
    }
    newAssignments[detailId].push(documentToMove);
    
    setDocumentAssignments(newAssignments);
    setIsMoveDialogOpen(false);
    toast.success("Document moved successfully");
  };

  // Initialize assignments for a specific circuit detail
  const initializeDetailAssignment = (detailId: string, docId?: string) => {
    if (!detailId) return;
    
    setDocumentAssignments(prev => {
      const updated = { ...prev };
      
      if (!updated[detailId]) {
        updated[detailId] = [];
      }
      
      // Add document if provided and not already assigned
      if (docId && !updated[detailId].includes(docId)) {
        updated[detailId] = [...updated[detailId], docId];
        // Only show toast if this is an actual document assignment, not just initialization
        if (Object.keys(prev).length > 0) {
          toast.success("Document added to circuit step");
        }
      }
      
      return updated;
    });
  };

  return {
    documentAssignments,
    setDocumentAssignments,
    documentToMove,
    isMoveDialogOpen,
    setIsMoveDialogOpen,
    handleMoveDocument,
    moveDocumentToDetail,
    initializeDetailAssignment
  };
}
