
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Document } from "@/types/document";
import DocumentStatusBadge from "@/components/documents/DocumentStatusBadge";
import DocumentTypeBadge from "@/components/documents/DocumentTypeBadge";
import { format, parseISO } from "date-fns";
import { FileText, Calendar, User, Clock } from "lucide-react";

interface DocumentDetailsCardProps {
  document: Document;
}

const DocumentDetailsCard: React.FC<DocumentDetailsCardProps> = ({ document }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMMM d, yyyy 'at' h:mm a");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="bg-dashboard-blue-dark border-white/10 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-dashboard-accent" />
          {document.title}
        </CardTitle>
        <DocumentStatusBadge status={document.status} />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-1">Document Type</h3>
              <DocumentTypeBadge type={document.type} />
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-1">Content</h3>
              <p className="text-white/90 bg-white/5 p-3 rounded-md border border-white/10">
                {document.content || "No content available"}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-dashboard-accent" />
              <span className="text-sm text-white/70">Created: </span>
              <span className="text-sm text-white">{formatDate(document.createdAt)}</span>
            </div>
            
            {document.updatedAt && (
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-dashboard-accent" />
                <span className="text-sm text-white/70">Updated: </span>
                <span className="text-sm text-white">{formatDate(document.updatedAt)}</span>
              </div>
            )}
            
            {document.createdBy && (
              <div className="flex items-center gap-2">
                <User size={16} className="text-dashboard-accent" />
                <span className="text-sm text-white/70">Created By: </span>
                <span className="text-sm text-white">{document.createdBy}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentDetailsCard;
