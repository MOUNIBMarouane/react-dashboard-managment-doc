
import React from "react";
import { Document } from "@/types/document";
import { CircuitDetail } from "@/types/circuit";
import DocumentCard from "./DocumentCard";

interface DetailDocumentListProps {
  detail: CircuitDetail;
  documents: Document[];
  assignedDocumentIds: string[];
  onMoveDocument: (documentId: string) => void;
}

const DetailDocumentList: React.FC<DetailDocumentListProps> = ({ 
  detail, 
  documents, 
  assignedDocumentIds, 
  onMoveDocument 
}) => {
  // Get documents assigned to this detail
  const detailDocuments = documents.filter(doc => assignedDocumentIds.includes(doc.id));
  
  return (
    <div className="bg-dashboard-blue-dark/50 border border-white/10 rounded-lg p-4">
      <h3 className="text-sm font-medium text-white mb-3">{detail.title}</h3>
      <div className="space-y-3">
        {detailDocuments.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onMoveDocument={onMoveDocument}
          />
        ))}
        {detailDocuments.length === 0 && (
          <div className="text-center py-6 bg-white/5 rounded-lg">
            <p className="text-white/40 text-sm">No documents in this step</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailDocumentList;
