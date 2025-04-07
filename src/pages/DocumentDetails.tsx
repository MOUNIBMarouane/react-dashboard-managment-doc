
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, GitGraph } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DocumentDetails = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { documents } = useDocumentManagement();
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    if (documentId && documents) {
      const foundDocument = documents.find(doc => doc.id === documentId);
      setDocument(foundDocument || null);
    }
  }, [documentId, documents]);

  const handleCreateCircuit = () => {
    if (documentId) {
      navigate(`/select-circuit/${documentId}`);
    }
  };

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
        
        <Tabs defaultValue="lines" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-dashboard-blue-dark/50 border border-white/10">
            <TabsTrigger value="lines" className="text-white data-[state=active]:bg-dashboard-accent">
              Document Lines
            </TabsTrigger>
            <TabsTrigger value="circuits" className="text-white data-[state=active]:bg-dashboard-accent">
              Circuit Assignment
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="lines" className="mt-4">
            <Card className="bg-dashboard-blue-dark border-white/10 shadow-md">
              <CardHeader>
                <CardTitle className="text-white">Document Lines</CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentLineTable documentId={document.id} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="circuits" className="mt-4">
            <Card className="bg-dashboard-blue-dark border-white/10 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <GitGraph className="h-5 w-5 text-dashboard-accent" />
                  Circuit Assignments
                </CardTitle>
                <Button onClick={handleCreateCircuit} size="sm" className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Assign to Circuit
                </Button>
              </CardHeader>
              <CardContent>
                {/* This would be replaced with actual circuit assignments */}
                <div className="text-center py-8 text-white/60">
                  <GitGraph className="h-12 w-12 mx-auto mb-3 text-white/20" />
                  <p>This document is not assigned to any circuits yet</p>
                  <Button 
                    variant="outline" 
                    onClick={handleCreateCircuit}
                    className="mt-4 border-white/10 hover:bg-white/5"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Assign to Circuit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DocumentDetails;
