
import React, { useState, useEffect } from "react";
import { Document } from "@/types/document";
import { CircuitDetail } from "@/types/circuit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MoveHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CircuitDocumentBoardProps {
  circuitId: string;
  circuitDetails: CircuitDetail[];
  documents: Document[];
  currentDocumentId?: string;
}

interface DocumentCardProps {
  document: Document;
  onMoveDocument: (documentId: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onMoveDocument }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="bg-white/5 border-white/10 mb-3 hover:bg-white/10 transition-all cursor-pointer">
      <CardHeader className="p-3 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText size={14} className="text-dashboard-accent" />
            {document.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onMoveDocument(document.id);
            }}
          >
            <MoveHorizontal size={14} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0" onClick={() => navigate(`/document-details/${document.id}`)}>
        <p className="text-xs text-white/60 line-clamp-2">{document.content}</p>
      </CardContent>
    </Card>
  );
};

const CircuitDocumentBoard: React.FC<CircuitDocumentBoardProps> = ({
  circuitId,
  circuitDetails,
  documents,
  currentDocumentId,
}) => {
  // In a real app, you would maintain a state of which documents are assigned to which circuit detail
  // For now, we'll use a dummy state for demonstration
  const [documentAssignments, setDocumentAssignments] = useState<Record<string, string[]>>({});
  const [documentToMove, setDocumentToMove] = useState<string | null>(null);
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
  
  // Initialize with current document assignment if provided
  useEffect(() => {
    if (currentDocumentId && circuitDetails.length > 0) {
      const initialAssignments = { ...documentAssignments };
      const firstDetailId = circuitDetails[0].id;
      
      if (!initialAssignments[firstDetailId]) {
        initialAssignments[firstDetailId] = [];
      }
      
      if (!initialAssignments[firstDetailId].includes(currentDocumentId)) {
        initialAssignments[firstDetailId] = [...initialAssignments[firstDetailId], currentDocumentId];
        setDocumentAssignments(initialAssignments);
        toast.success("Document added to first step of the circuit");
      }
    }
  }, [currentDocumentId, circuitDetails]);
  
  const handleMoveDocument = (documentId: string) => {
    setDocumentToMove(documentId);
    setIsMoveDialogOpen(true);
  };
  
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
  
  // Get documents for a specific circuit detail
  const getDetailDocuments = (detailId: string) => {
    const assignedDocIds = documentAssignments[detailId] || [];
    return documents.filter(doc => assignedDocIds.includes(doc.id));
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
          <div key={detail.id} className="bg-dashboard-blue-dark/50 border border-white/10 rounded-lg p-4">
            <h3 className="text-sm font-medium text-white mb-3">{detail.title}</h3>
            <div className="space-y-3">
              {getDetailDocuments(detail.id).map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onMoveDocument={handleMoveDocument}
                />
              ))}
              {getDetailDocuments(detail.id).length === 0 && (
                <div className="text-center py-6 bg-white/5 rounded-lg">
                  <p className="text-white/40 text-sm">No documents in this step</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isMoveDialogOpen} onOpenChange={setIsMoveDialogOpen}>
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
                  onClick={() => moveDocumentToDetail(detail.id)}
                >
                  {detail.title}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CircuitDocumentBoard;
