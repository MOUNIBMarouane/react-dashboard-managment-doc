
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { 
  PlusCircle, 
  ChevronLeft, 
  FileText, 
  Layers, 
  ClipboardList,
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import documentService from '@/services/documentService';
import LignesList from '@/components/document/LignesList';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DocumentLignesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const canManageDocuments = user?.role === 'Admin' || user?.role === 'FullUser';
  const [activeTab, setActiveTab] = useState<'details' | 'lines'>('lines');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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

  // Fetch document lines
  const {
    data: lignes = [],
    isLoading: isLoadingLignes,
    error: lignesError
  } = useQuery({
    queryKey: ['documentLignes', Number(id)],
    queryFn: () => documentService.getLignesByDocumentId(Number(id)),
    enabled: !!id
  });

  useEffect(() => {
    if (documentError) {
      toast.error('Failed to load document');
      navigate('/documents');
    }
    
    if (lignesError) {
      toast.error('Failed to load document lines');
    }
  }, [documentError, lignesError, navigate]);

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

  if (isLoadingDocument) {
    return (
      <div className="min-h-screen bg-[#070b28] py-4">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="outline" size="sm" disabled className="bg-blue-950/30 border-blue-400/20 text-blue-300/50">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Documents
            </Button>
          </div>
          
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-blue-900/30 rounded-md w-3/4"></div>
            <div className="flex space-x-4">
              <div className="h-28 w-28 bg-blue-900/30 rounded-lg"></div>
              <div className="flex-1 space-y-4 py-2">
                <div className="h-4 bg-blue-900/30 rounded w-3/4"></div>
                <div className="h-4 bg-blue-900/30 rounded w-1/2"></div>
                <div className="h-4 bg-blue-900/30 rounded w-1/3"></div>
              </div>
            </div>
            <div className="h-64 bg-blue-900/30 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-[#070b28] py-4">
        <div className="max-w-7xl mx-auto p-4">
          <Card className="border-red-400/20 bg-gradient-to-br from-red-900/10 to-red-800/5 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-red-400 mb-4">
                <FileText className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Document Not Found</h3>
              <p className="text-lg text-gray-400 mb-6">
                Document not found or you don't have permission to view it.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="mt-4 border-blue-400/30 text-blue-300 hover:text-white hover:bg-blue-700/50" 
                onClick={() => navigate('/documents')}
              >
                Return to Documents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-[#070b28] py-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Page header with document info */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/documents')} 
              className="mr-4 border-blue-400/30 text-blue-300 hover:text-white hover:bg-blue-700/50"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
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
            
            <div className="flex space-x-2">
              <Button variant="outline" className="border-blue-400/30 text-blue-300 hover:text-white hover:bg-blue-700/50" asChild>
                <Link to={`/documents/${id}`}>
                  <FileText className="h-4 w-4 mr-2" /> View Document
                </Link>
              </Button>
              
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link to={`/documents/${id}/edit`}>
                  <FileText className="h-4 w-4 mr-2" /> Edit Document
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tabs navigation */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="bg-[#0a1033] rounded-lg overflow-hidden border border-blue-900/30 shadow-lg">
            <div className="flex items-center p-4 bg-gradient-to-r from-blue-800/30 to-blue-900/20 border-b border-blue-800/30">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'details' | 'lines')} className="w-full">
                <TabsList className="bg-blue-900/40 border border-blue-400/20 p-1">
                  <TabsTrigger 
                    value="details"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Document Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="lines"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                  >
                    <Layers className="h-4 w-4 mr-2" />
                    Document Lines
                    <Badge variant="secondary" className="ml-2 bg-blue-900/50 text-blue-200">
                      {lignes.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="p-5">
              <TabsContent value="details" className="mt-0">
                <motion.div 
                  variants={itemVariants}
                  className={`border-l-4 bg-gradient-to-br ${getStatusClass(document.status)} rounded-lg shadow-xl overflow-hidden`}
                >
                  <div className="bg-gradient-to-r from-blue-800/30 to-purple-800/20 px-6 py-4 border-b border-white/5">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-300" />
                        Document Details
                      </h2>
                      <p className="text-sm text-blue-300/80">
                        Last updated: {new Date(document.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 text-blue-100">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-sm font-medium text-blue-300 mb-1">Document Type</h3>
                        <p className="font-medium">{document.documentType.typeName}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-blue-300 mb-1">Document Date</h3>
                        <p className="font-medium">{new Date(document.docDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-blue-300 mb-1">Created By</h3>
                        <p className="font-medium">{document.createdBy.firstName} {document.createdBy.lastName}</p>
                        <p className="text-sm text-blue-300/70">({document.createdBy.username})</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-blue-300 mb-1">Created At</h3>
                        <p className="font-medium">{new Date(document.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <Separator className="my-6 bg-blue-400/20" />
                    
                    <div>
                      <h3 className="text-sm font-medium text-blue-300 mb-3">Content</h3>
                      <div className="p-4 bg-blue-950/40 rounded-md min-h-[200px] whitespace-pre-wrap border border-blue-400/20 text-blue-100">
                        {document.content || "No content available."}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="lines" className="mt-0">
                <div className="space-y-6">
                  {/* Document Lines Panel Header */}
                  <div className="flex items-center justify-between bg-gradient-to-r from-blue-800/30 to-indigo-800/20 p-4 rounded-t-lg border border-blue-800/30">
                    <div className="flex items-center">
                      <Layers className="h-5 w-5 text-blue-300 mr-2" />
                      <h2 className="text-lg font-semibold text-white">Document Lines</h2>
                      <div className="bg-blue-900/40 px-3 py-1 rounded-full border border-blue-300/30 ml-3">
                        <span className="text-sm font-medium text-blue-100">{lignes.length} Lines</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Manage Document Lines Section */}
                  {canManageDocuments && (
                    <div className="bg-[#111b47] border border-blue-800/30 rounded-lg p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-900/40 text-blue-300 rounded-md mr-3">
                            <ClipboardList className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-white">Manage Document Lines</h3>
                            <p className="text-sm text-blue-300/80">Add, edit or remove document lines</p>
                          </div>
                        </div>
                        <Button 
                          onClick={() => setIsCreateDialogOpen(true)}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add New Line
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Document Lines List */}
                  <div className="bg-[#0f1642] border border-blue-800/30 rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-blue-800/30 bg-gradient-to-r from-blue-900/30 to-blue-800/20">
                      <h3 className="text-md font-medium text-white flex items-center">
                        <ClipboardList className="h-4 w-4 mr-2 text-blue-300" />
                        Lines List
                      </h3>
                    </div>
                    
                    {isLoadingLignes ? (
                      <div className="p-8">
                        <div className="animate-pulse space-y-4">
                          <div className="h-14 bg-blue-900/50 rounded-md"></div>
                          <div className="h-14 bg-blue-900/50 rounded-md"></div>
                          <div className="h-14 bg-blue-900/50 rounded-md"></div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <LignesList
                          document={document}
                          lignes={lignes}
                          canManageDocuments={canManageDocuments}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DocumentLignesPage;
