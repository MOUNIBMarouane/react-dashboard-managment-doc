
import React from "react";
import { Document } from "@/types/document";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MoveHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export default DocumentCard;
