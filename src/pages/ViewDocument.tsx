
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  Edit, 
  LayoutPanelLeft,
  Trash, 
  ArrowLeft, 
  FileText, 
  Layers,
  AlertCircle,
  Ban,
} from 'lucide-react';
import documentService from '@/services/documentService';

const ViewDocument = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Check if user has permissions to edit/delete documents
  const canManageDocuments = user?.role === 'Admin' || user?.role === 'FullUser';

  const handleDelete = async () => {
    if (!canManageDocuments) {
      toast.error('You do not have permission to delete documents');
      return;
    }
    
    try {
      if (id) {
        await documentService.deleteDocument(Number(id));
        toast.success('Document deleted successfully');
        navigate('/documents');
      }
    } catch (error) {
      console.error('Failed to delete document:', error);
      toast.error('Failed to delete document');
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  // Redirect to the new document page layout
  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center p-4">
      <div className="bg-blue-900/40 rounded-lg p-6 max-w-lg w-full text-center border border-blue-500/30 backdrop-blur-sm">
        <FileText className="h-16 w-16 mx-auto text-blue-300 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Document View</h1>
        <p className="mb-8 text-blue-300">
          You're being redirected to our new document details page...
        </p>
        
        <div className="flex flex-col gap-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate(`/document/${id}`)}
          >
            <LayoutPanelLeft className="h-4 w-4 mr-2" />
            View Document Details
          </Button>
          
          <Button
            variant="outline"
            className="border-blue-400/30 text-blue-300 hover:bg-blue-800/30"
            onClick={() => navigate('/documents')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Documents
          </Button>
        </div>
        
        {/* Delete dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="bg-gradient-to-br from-gray-900/95 to-red-900/80 border-white/10 text-white shadow-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center text-red-300">
                <AlertCircle className="h-5 w-5 mr-2" /> Confirm Delete
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Are you sure you want to delete this document? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button 
                variant="outline" 
                onClick={() => setDeleteDialogOpen(false)}
                className="border-gray-400/30 text-gray-300 hover:text-white hover:bg-gray-700/50"
              >
                <Ban className="h-4 w-4 mr-2" /> Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
              >
                <Trash className="h-4 w-4 mr-2" /> Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ViewDocument;
