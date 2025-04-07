
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Document } from "@/types/document";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDocumentManagement } from "@/hooks/useDocumentManagement";
import DocumentStatusBadge from "@/components/documents/DocumentStatusBadge";
import DocumentTypeBadge from "@/components/documents/DocumentTypeBadge";
import DocumentLineTable from "@/components/document-details/DocumentLineTable";
import DocumentDetailsCard from "@/components/document-details/DocumentDetailsCard";
import { format, parseISO } from "date-fns";

const DocumentDetails = () => {
  const { documentId } = useParams();
  const { documents } = useDocumentManagement();
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    if (documentId && documents) {
      const foundDocument = documents.find(doc => doc.id === documentId);
      setDocument(foundDocument || null);
    }
  }, [documentId, documents]);

  if (!document) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12 text-white/60">
            Document not found
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 md:p-8 space-y-6">
        <h1 className="text-2xl font-bold text-white">Document Details</h1>
        
        {/* Document Details Card */}
        <DocumentDetailsCard document={document} />
        
        {/* Lines Table */}
        <Card className="bg-dashboard-blue-dark border-white/10 shadow-md">
          <CardHeader>
            <CardTitle className="text-white">Document Lines</CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentLineTable documentId={document.id} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DocumentDetails;
