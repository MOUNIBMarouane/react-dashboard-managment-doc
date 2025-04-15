
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { FileText, Calendar, User, Tag, ArrowLeft, GitBranch } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import documentService from '@/services/documentService';
import { Document } from '@/models/document';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from 'framer-motion';

const DocumentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const canManageDocuments = user?.role === 'Admin' || user?.role === 'FullUser';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Fetch document details
  const { 
    data: document, 
    isLoading: isLoadingDocument, 
    error: documentError 
  } = useQuery({
    queryKey: ['document', Number(id)],
    queryFn: () => documentService.getDocumentById(Number(id)),
    enabled: !!id
  });

  // Fetch lignes for this document
  const {
    data: lignes = [],
    isLoading: isLoadingLignes,
    error: lignesError
  } = useQuery({
    queryKey: ['documentLignes', Number(id)],
    queryFn: () => documentService.getLignesByDocumentId(Number(id)),
    enabled: !!id
  });

  // Handle errors from queries using useEffect
  useEffect(() => {
    if (documentError) {
      console.error(`Failed to fetch document with ID ${id}:`, documentError);
      toast.error('Failed to load document');
      navigate('/documents');
    }

    if (lignesError) {
      console.error(`Failed to fetch lignes for document ${id}:`, lignesError);
      toast.error('Failed to load document lignes');
    }
  }, [documentError, lignesError, id, navigate]);

  const getStatusBadge = (status: number) => {
    switch(status) {
      case 0:
        return <Badge className="bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 border-amber-500/30">Draft</Badge>;
      case 1:
        return <Badge className="bg-green-500/20 text-green-200 hover:bg-green-500/30 border-green-500/30">Active</Badge>;
      case 2:
        return <Badge className="bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border-purple-500/30">Archived</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusClass = (status: number) => {
    switch(status) {
      case 0:
        return 'from-amber-500/20 to-amber-600/10 border-l-amber-500';
      case 1:
        return 'from-green-500/20 to-green-600/10 border-l-green-500';
      case 2:
        return 'from-purple-500/20 to-purple-600/10 border-l-purple-500';
      default:
        return 'from-blue-500/20 to-blue-600/10 border-l-blue-500';
    }
  };

  if (!id) {
    navigate('/documents');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#070b28]">
      {/* Header */}
      <div className="border-b border-blue-900/50 bg-gradient-to-r from-blue-950 to-indigo-950 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center mb-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/documents')} 
              className="mr-4 border-blue-400/30 text-blue-300 hover:text-white hover:bg-blue-700/50"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Documents
            </Button>
          </div>

          {document && (
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-400" />
                  <div>
                    <span className="text-blue-300 text-sm font-medium">{document.documentKey}</span>
                    <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                      {document.title}
                      {getStatusBadge(document.status)}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-blue-300/80 mt-1">
                  <div className="flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" />
                    <span>{document.documentType.typeName}</span>
                  </div>
                  <span className="text-blue-400/50">•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(document.docDate).toLocaleDateString()}</span>
                  </div>
                  <span className="text-blue-400/50">•</span>
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    <span>{document.createdBy.firstName} {document.createdBy.lastName}</span>
                  </div>
                </div>
              </div>
              
              {document.circuitId && (
                <Button 
                  variant="outline" 
                  className="border-blue-400/30 text-blue-300 hover:text-white hover:bg-blue-700/50"
                  asChild
                >
                  <Link to={`/documents/${document.id}/flow`}>
                    <GitBranch className="h-4 w-4 mr-2" /> Document Flow
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <motion.main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {isLoadingDocument ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="animate-pulse bg-blue-950/30 rounded-lg h-96 lg:col-span-1"></div>
            <div className="animate-pulse bg-blue-950/30 rounded-lg h-96 lg:col-span-2"></div>
          </div>
        ) : document ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Document Details Card (Left Side) */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className={`overflow-hidden border-l-4 bg-gradient-to-br ${getStatusClass(document.status)} shadow-xl h-full`}>
                <CardHeader className="bg-gradient-to-r from-blue-800/30 to-indigo-800/20 border-b border-white/5">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-300" />
                      Document Details
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-blue-100">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-blue-300 mb-1">Document Type</h3>
                      <p className="font-medium">{document.documentType.typeName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-300 mb-1">Document Date</h3>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-blue-400" />
                        {new Date(document.docDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-300 mb-1">Created By</h3>
                      <p className="font-medium flex items-center gap-1">
                        <User className="h-4 w-4 text-blue-400" />
                        {document.createdBy.firstName} {document.createdBy.lastName}
                      </p>
                      <p className="text-sm text-blue-300/70">({document.createdBy.username})</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-300 mb-1">Created At</h3>
                      <p className="font-medium">
                        {new Date(document.createdAt).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-blue-400/20">
                      <h3 className="text-sm font-medium text-blue-300 mb-3">Content</h3>
                      <div className="p-4 bg-blue-950/40 rounded-md min-h-[200px] whitespace-pre-wrap border border-blue-400/20 text-blue-100 overflow-auto max-h-64">
                        {document.content || "No content available."}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Lines Table (Right Side) */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="overflow-hidden border-none shadow-xl bg-transparent h-full">
                <CardHeader className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-white">
                      Document Lines
                    </CardTitle>
                    <Badge className="bg-blue-800/50 text-blue-200 border border-blue-500/30 py-1.5 px-4">
                      {lignes.length} {lignes.length === 1 ? 'Line' : 'Lines'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-gray-900/95 to-blue-900/70 backdrop-blur-sm">
                    {isLoadingLignes ? (
                      <div className="p-8 space-y-4">
                        <div className="h-14 bg-blue-900/50 rounded-md animate-pulse"></div>
                        <div className="h-14 bg-blue-900/50 rounded-md animate-pulse"></div>
                        <div className="h-14 bg-blue-900/50 rounded-md animate-pulse"></div>
                      </div>
                    ) : lignes.length === 0 ? (
                      <div className="text-center py-16">
                        <h3 className="text-xl font-medium text-blue-300 mb-2">No Lines Found</h3>
                        <p className="text-blue-400/70 mb-6">This document doesn't have any lines yet.</p>
                        {canManageDocuments && (
                          <Button 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => navigate(`/documents/${document.id}/lignes`)}
                          >
                            Add Lines
                          </Button>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="border-b border-blue-500/20 hover:bg-blue-800/20">
                                <TableHead className="text-blue-300">Title</TableHead>
                                <TableHead className="text-blue-300">Article</TableHead>
                                <TableHead className="text-right text-blue-300">Price</TableHead>
                                <TableHead className="text-center text-blue-300">Sub-lines</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {lignes.map((ligne) => (
                                <TableRow 
                                  key={ligne.id}
                                  className="border-b border-blue-500/20 hover:bg-blue-800/20"
                                >
                                  <TableCell className="font-medium text-white">{ligne.title}</TableCell>
                                  <TableCell className="text-blue-200">{ligne.article}</TableCell>
                                  <TableCell className="text-right text-green-400">
                                    ${ligne.prix.toFixed(2)}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge variant="outline" className="text-blue-300">
                                      {ligne.sousLignesCount || 0}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        
                        <div className="p-4 border-t border-blue-500/20 flex justify-between items-center">
                          <span className="text-blue-300">
                            Total Lines: <span className="font-medium text-white">{lignes.length}</span>
                          </span>
                          <span className="text-lg font-medium text-white">
                            Total: <span className="text-green-400 ml-1">
                              ${lignes.reduce((sum, ligne) => sum + ligne.prix, 0).toFixed(2)}
                            </span>
                          </span>
                        </div>
                        
                        <div className="p-4 bg-blue-900/20 border-t border-blue-500/20">
                          <Button 
                            className="w-full bg-blue-700 hover:bg-blue-600"
                            onClick={() => navigate(`/documents/${document.id}/lignes`)}
                          >
                            Manage All Lines
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-16 text-blue-300">
            <h2 className="text-2xl mb-4">Document not found</h2>
            <Button 
              onClick={() => navigate('/documents')}
              className="bg-blue-700 hover:bg-blue-600"
            >
              Back to Documents
            </Button>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default DocumentPage;
