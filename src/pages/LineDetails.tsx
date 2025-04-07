
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Document } from "@/types/document";
import { DocumentLine, DocumentSubLine } from "@/types/documentLine";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useDocumentManagement } from "@/hooks/useDocumentManagement";
import { ChevronLeft } from "lucide-react";
import DocumentDetailsCard from "@/components/document-details/DocumentDetailsCard";
import LineDetailsCard from "@/components/document-details/LineDetailsCard";
import SubLineTable from "@/components/document-details/SubLineTable";

// Sample document lines data
const sampleDocumentLines: Record<string, DocumentLine[]> = {
  "1": [
    {
      id: "1-1",
      documentId: "1",
      title: "Financial Analysis",
      description: "Quarterly financial performance analysis",
      quantity: 1,
      unitPrice: 1200,
      totalAmount: 1200,
      createdAt: "2025-01-17T10:30:00Z",
    },
    {
      id: "1-2",
      documentId: "1",
      title: "Market Research",
      description: "Competitor analysis and market trends",
      quantity: 1,
      unitPrice: 800,
      totalAmount: 800,
      createdAt: "2025-01-18T14:45:00Z",
    },
    {
      id: "1-3",
      documentId: "1",
      title: "Executive Summary",
      description: "Summary of Q1 2025 performance",
      quantity: 1,
      unitPrice: 500,
      totalAmount: 500,
      createdAt: "2025-01-19T09:15:00Z",
    }
  ],
  "2": [
    {
      id: "2-1",
      documentId: "2",
      title: "Social Media Strategy",
      description: "Facebook, Instagram, LinkedIn campaigns",
      quantity: 3,
      unitPrice: 600,
      totalAmount: 1800,
      createdAt: "2025-02-04T11:20:00Z",
    },
    {
      id: "2-2",
      documentId: "2",
      title: "Content Calendar",
      description: "Editorial calendar for Q1-Q2",
      quantity: 1,
      unitPrice: 750,
      totalAmount: 750,
      createdAt: "2025-02-06T13:45:00Z",
    }
  ]
};

const LineDetails = () => {
  const { documentId, lineId } = useParams();
  const { documents } = useDocumentManagement();
  const [document, setDocument] = useState<Document | null>(null);
  const [line, setLine] = useState<DocumentLine | null>(null);

  useEffect(() => {
    if (documentId && documents) {
      const foundDocument = documents.find(doc => doc.id === documentId);
      setDocument(foundDocument || null);
      
      if (lineId) {
        const lines = sampleDocumentLines[documentId] || [];
        const foundLine = lines.find(line => line.id === lineId);
        setLine(foundLine || null);
      }
    }
  }, [documentId, lineId, documents]);

  if (!document || !line) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12 text-white/60">
            {!document ? "Document not found" : "Line not found"}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            asChild
            className="hover:bg-white/10 rounded-full"
          >
            <Link to={`/document-details/${documentId}`}>
              <ChevronLeft className="h-5 w-5 text-white" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-white">Line Details</h1>
        </div>
        
        {/* Document Details Card */}
        <DocumentDetailsCard document={document} />
        
        {/* Line Details Card */}
        <LineDetailsCard line={line} />
        
        {/* Sub Lines Table */}
        <Card className="bg-dashboard-blue-dark border-white/10 shadow-md">
          <CardHeader>
            <CardTitle className="text-white">Sub Lines</CardTitle>
          </CardHeader>
          <CardContent>
            <SubLineTable lineId={line.id} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LineDetails;
