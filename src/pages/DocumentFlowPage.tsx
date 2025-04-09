
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { ArrowLeft, MoveRight, Check, X, AlertCircle, Edit, GitBranch, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import documentService from '@/services/documentService';
import circuitService from '@/services/circuitService';
import { Document } from '@/models/document';
import MoveDocumentStepDialog from '@/components/circuits/MoveDocumentStepDialog';

const DocumentFlowPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [document, setDocument] = useState<Document | null>(null);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);

  // Fetch document data
  const { data: documentData, isLoading: isLoadingDocument, refetch: refetchDocument } = useQuery({
    queryKey: ['document', id],
    queryFn: () => documentService.getDocumentById(Number(id)),
  });

  // Fetch circuit details
  const { data: circuitDetails, isLoading: isLoadingCircuitDetails } = useQuery({
    queryKey: ['circuit-details', documentData?.circuitId],
    queryFn: () => circuitService.getCircuitDetailsByCircuitId(documentData?.circuitId || 0),
    enabled: !!documentData?.circuitId,
  });

  // Fetch document circuit history
  const { data: circuitHistory, isLoading: isLoadingHistory, refetch: refetchHistory } = useQuery({
    queryKey: ['document-circuit-history', id],
    queryFn: () => circuitService.getDocumentCircuitHistory(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (documentData) {
      setDocument(documentData);
    }
  }, [documentData]);

  if (!id) {
    navigate('/documents');
    return null;
  }

  const handleMoveSuccess = () => {
    refetchDocument();
    refetchHistory();
    toast.success("Document moved successfully");
  };

  // If document is not in a circuit
  if (documentData && !documentData.circuitId) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-blue-400/80">
              <Link to="/documents" className="hover:text-blue-300">Documents</Link>
              <span>/</span>
              <Link to={`/documents/${id}`} className="hover:text-blue-300">
                {documentData.documentKey}
              </Link>
              <span>/</span>
              <span className="text-blue-100">Flow</span>
            </div>
            
            <h1 className="text-3xl font-bold text-white mt-2">
              Document Flow
            </h1>
          </div>
          
          <Button
            variant="outline" 
            size="lg" 
            onClick={() => navigate(`/documents/${id}`)}
            className="border-blue-900/30 text-white hover:bg-blue-900/20"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Document
          </Button>
        </div>
        
        <Card className="bg-[#0a1033] border border-blue-900/30 shadow-lg">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <AlertCircle className="w-16 h-16 text-blue-400/50 mb-4" />
            <h2 className="text-xl font-medium text-white mb-2">
              This document is not assigned to any circuit
            </h2>
            <p className="text-gray-400 mb-6">
              Assign this document to a circuit to track its progress through a workflow.
            </p>
            <Button 
              onClick={() => navigate(`/documents/${id}`)}
              className="mt-2"
            >
              <GitBranch className="mr-2 h-4 w-4" /> Assign to Circuit
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLoading = isLoadingDocument || isLoadingCircuitDetails || isLoadingHistory;
  const currentStepId = document?.currentCircuitDetailId;
  const currentStep = circuitDetails?.find(detail => detail.id === currentStepId);
  const isSimpleUser = user?.role === 'SimpleUser';

  return (
    <div className="p-6 space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-blue-400/80">
            <Link to="/documents" className="hover:text-blue-300">Documents</Link>
            <span>/</span>
            <Link to={`/documents/${id}`} className="hover:text-blue-300">
              {document?.documentKey || id}
            </Link>
            <span>/</span>
            <span className="text-blue-100">Flow</span>
          </div>
          
          <h1 className="text-3xl font-bold text-white mt-2">
            Document Circuit
          </h1>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline" 
            size="lg" 
            onClick={() => navigate(`/documents/${id}/edit`)}
            className="border-blue-900/30 text-white hover:bg-blue-900/20"
          >
            <Edit className="h-5 w-5 mr-2" /> Edit Document
          </Button>
          <Button
            variant="outline" 
            size="lg" 
            onClick={() => navigate(`/documents/${id}`)}
            className="border-blue-900/30 text-white hover:bg-blue-900/20"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Document
          </Button>
        </div>
      </div>
      
      {/* Document metadata */}
      {document && (
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="font-mono text-sm">
            {document.documentKey}
          </Badge>
          <Badge variant={document.circuitId ? "secondary" : "outline"} className="text-xs">
            <GitBranch className="mr-1 h-3 w-3" /> {document.circuitId ? document?.circuit?.title || 'Circuit' : 'No Circuit'}
          </Badge>
          <p className="text-sm text-gray-400">
            Last updated: {new Date(document.updatedAt).toLocaleDateString()}
          </p>
        </div>
      )}
      
      {/* Loading state */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="bg-[#0a1033] border border-blue-900/30 animate-pulse shadow-lg">
              <CardHeader className="pb-3">
                <div className="h-6 bg-blue-900/30 rounded w-3/4"></div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-20 bg-blue-900/30 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Action buttons */}
          <div className="flex justify-end">
            {!isSimpleUser && (
              <Button 
                onClick={() => setMoveDialogOpen(true)}
                variant="outline"
                className="border-blue-900/30 text-white hover:bg-blue-900/20"
              >
                <MoveRight className="mr-2 h-4 w-4" /> Move Document
              </Button>
            )}
          </div>
          
          {/* Trello-like board layout */}
          <div className="grid grid-cols-1 gap-6">
            {/* Document Card */}
            <Card className="bg-[#0a1033] border border-blue-900/30 shadow-lg overflow-hidden">
              <CardHeader className="border-b border-blue-900/30 bg-[#060927]/50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-300" />
                  {document?.title || 'Document'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-blue-300 mb-1">Document Key</h3>
                    <p className="font-medium font-mono">{document?.documentKey}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-300 mb-1">Document Type</h3>
                    <p className="font-medium">{document?.documentType?.typeName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-300 mb-1">Created By</h3>
                    <p className="font-medium">{document?.createdBy?.firstName} {document?.createdBy?.lastName}</p>
                  </div>
                </div>
                
                <div className="border-t border-blue-900/30 pt-4 mt-2">
                  <h3 className="text-sm font-medium text-blue-300 mb-2">Document Content</h3>
                  <div className="bg-[#111633]/50 p-3 rounded-md border border-blue-900/30 max-h-32 overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap">
                      {document?.content || 'No content available'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Circuit Steps */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <GitBranch className="mr-2 h-5 w-5" /> Circuit Flow Steps
              </h2>
              
              <div className="overflow-x-auto">
                <div className="flex space-x-4 pb-4 min-w-full">
                  {circuitDetails?.map((detail) => {
                    const isCurrentStep = detail.id === currentStepId;
                    const historyForStep = circuitHistory?.filter(h => h.circuitDetailId === detail.id) || [];
                    
                    return (
                      <div 
                        key={detail.id} 
                        className="w-80 flex-shrink-0"
                      >
                        <Card 
                          className={`h-full ${
                            isCurrentStep 
                              ? 'bg-[#0a1033] border-green-500 shadow-md shadow-green-500/20' 
                              : 'bg-[#0a1033] border-blue-900/30'
                          }`}
                        >
                          <CardHeader className={`pb-3 ${
                            isCurrentStep ? 'border-b border-green-500/30 bg-[#060927]' : 'border-b border-blue-900/30'
                          }`}>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg flex items-center">
                                <Badge 
                                  variant={isCurrentStep ? "success" : "outline"} 
                                  className="mr-2"
                                >
                                  {detail.orderIndex + 1}
                                </Badge>
                                {detail.title}
                              </CardTitle>
                              {isCurrentStep && (
                                <Badge variant="success" className="ml-2">Current</Badge>
                              )}
                            </div>
                          </CardHeader>
                          
                          <CardContent className="p-4">
                            <p className="text-sm text-gray-400 mb-4">
                              {detail.descriptif || 'No description provided for this step'}
                            </p>

                            {/* History items for this step */}
                            <div className="space-y-3">
                              {historyForStep.length > 0 ? (
                                historyForStep.map(history => (
                                  <Card key={history.id} className="bg-[#070b28] border border-blue-900/30">
                                    <CardContent className="p-3">
                                      <div className="flex justify-between items-start mb-1">
                                        <span className="font-medium text-sm">
                                          Processed by: {history.userName}
                                        </span>
                                        <Badge variant={history.isApproved ? "success" : "destructive"}>
                                          {history.isApproved ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                        </Badge>
                                      </div>
                                      <p className="text-xs text-gray-400">
                                        {new Date(history.processedAt).toLocaleString()}
                                      </p>
                                      {history.comments && (
                                        <div className="mt-2 p-2 bg-[#111633]/40 rounded text-xs border border-blue-900/30">
                                          "{history.comments}"
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>
                                ))
                              ) : (
                                <div className="text-center text-gray-500 text-sm p-2">
                                  No history for this step yet
                                </div>
                              )}
                            </div>
                          </CardContent>
                          
                          <CardFooter className="p-3 border-t border-blue-900/30 bg-[#060927] flex justify-between">
                            {detail.responsibleRoleId ? (
                              <Badge variant="outline" className="text-xs">
                                Responsible: Role #{detail.responsibleRoleId}
                              </Badge>
                            ) : (
                              <span className="text-xs text-gray-500">No responsible role</span>
                            )}
                            
                            {isCurrentStep && !isSimpleUser && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-xs"
                                onClick={() => setMoveDialogOpen(true)}
                              >
                                <MoveRight className="h-3 w-3 mr-1" /> Move
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {document && (
        <MoveDocumentStepDialog
          documentId={Number(id)}
          documentTitle={document.title}
          circuitId={document.circuitId!}
          currentStepId={document.currentCircuitDetailId}
          open={moveDialogOpen}
          onOpenChange={setMoveDialogOpen}
          onSuccess={handleMoveSuccess}
        />
      )}
    </div>
  );
};

export default DocumentFlowPage;
