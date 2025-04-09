
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { ArrowLeft, MoveRight, Check, X, AlertCircle, Edit, GitBranch } from 'lucide-react';
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

  // Determine current circuit step
  const currentStepId = document?.currentCircuitDetailId;
  const currentStep = circuitDetails?.find(detail => detail.id === currentStepId);
  const isSimpleUser = user?.role === 'SimpleUser';

  return (
    <div className="p-6 space-y-6">
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
            Document Flow
          </h1>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline" 
            size="lg" 
            onClick={() => navigate(`/documents/${id}/edit`)}
          >
            <Edit className="h-5 w-5 mr-2" /> Edit Document
          </Button>
          <Button
            variant="outline" 
            size="lg" 
            onClick={() => navigate(`/documents/${id}`)}
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Document
          </Button>
        </div>
      </div>
      
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
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
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
          
          {/* Kanban-style board */}
          <div className="flex flex-col lg:flex-row gap-4 overflow-x-auto pb-4">
            {circuitDetails?.map(detail => {
              const isCurrentStep = detail.id === currentStepId;
              const historyForStep = circuitHistory?.filter(h => 
                h.circuitDetailId === detail.id
              ) || [];
              
              return (
                <div key={detail.id} className="w-full lg:w-64 xl:w-80 flex-shrink-0">
                  <Card className={`bg-[#0a1033] border ${
                    isCurrentStep ? 'border-green-500' : 'border-blue-900/30'
                  } shadow-lg h-full flex flex-col`}>
                    <CardHeader className={`pb-3 border-b ${
                      isCurrentStep ? 'border-green-500/30' : 'border-blue-900/30'
                    }`}>
                      <CardTitle className="text-lg flex items-center">
                        <Badge variant="outline" className="mr-2">{detail.orderIndex + 1}</Badge>
                        {detail.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-y-auto p-3">
                      <div className="text-sm text-gray-400 mb-2">
                        {detail.descriptif || 'No description'}
                      </div>
                      
                      {isCurrentStep && document && (
                        <Card className="bg-[#111633] border border-green-500/30 mb-3">
                          <CardContent className="p-4">
                            <div className="font-medium text-white mb-1">
                              {document.title}
                            </div>
                            <div className="text-xs font-mono text-blue-400/80 mb-2">
                              {document.documentKey}
                            </div>
                            <Badge variant="secondary" size="sm">Current</Badge>
                          </CardContent>
                        </Card>
                      )}
                      
                      {historyForStep.map(history => (
                        <Card key={history.id} className="bg-[#111633] border border-blue-900/30 mb-3">
                          <CardContent className="p-3">
                            <div className="flex justify-between items-start mb-2">
                              <div className="font-medium text-white truncate">
                                Processed
                              </div>
                              <Badge variant={history.isApproved ? "success" : "destructive"}>
                                {history.isApproved ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-400">
                              By: {history.processedBy || 'Unknown'}
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(history.processedAt).toLocaleString()}
                            </div>
                            {history.comments && (
                              <div className="text-xs text-blue-300 mt-2 border-t border-blue-900/30 pt-1">
                                "{history.comments}"
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </CardContent>
                    <CardFooter className="p-3 border-t border-blue-900/30 bg-[#060927]">
                      <div className="text-xs text-gray-500 w-full">
                        {detail.responsibleRole ? (
                          <div className="flex justify-between items-center">
                            <span>Responsible:</span>
                            <Badge variant="outline" className="ml-2">{detail.responsibleRole.name}</Badge>
                          </div>
                        ) : (
                          <span>No responsible role assigned</span>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
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
