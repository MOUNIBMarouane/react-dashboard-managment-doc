
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { 
  Plus, Edit, Trash2, ChevronDown, ChevronUp, Package, 
  PlusCircle, DollarSign, FileText, CheckCircle2, Ban, AlertCircle
} from 'lucide-react';
import { Ligne, Document, CreateLigneRequest } from '@/models/document';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import documentService from '@/services/documentService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SousLignesList from './SousLignesList';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface LignesListProps {
  document: Document;
  lignes: Ligne[];
  canManageDocuments: boolean;
}

const LignesList = ({ document, lignes, canManageDocuments }: LignesListProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [expandedLigneId, setExpandedLigneId] = useState<number | null>(null);
  const [currentLigne, setCurrentLigne] = useState<Ligne | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [prix, setPrix] = useState<number>(0);

  const queryClient = useQueryClient();

  const resetForm = () => {
    setTitle('');
    setArticle('');
    setPrix(0);
    setCurrentLigne(null);
  };

  const handleCreateDialogOpen = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  const handleEditDialogOpen = (ligne: Ligne) => {
    setCurrentLigne(ligne);
    setTitle(ligne.title);
    setArticle(ligne.article);
    setPrix(ligne.prix);
    setIsEditDialogOpen(true);
  };

  const handleDeleteDialogOpen = (ligne: Ligne) => {
    setCurrentLigne(ligne);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateLigne = async () => {
    if (!title || !article) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const newLigne: CreateLigneRequest = {
        documentId: document.id,
        title,
        article,
        prix
      };

      await documentService.createLigne(newLigne);
      toast.success('Line created successfully');
      resetForm();
      setIsCreateDialogOpen(false);
      
      // Refresh document data
      queryClient.invalidateQueries({queryKey: ['document', document.id]});
      queryClient.invalidateQueries({queryKey: ['documentLignes', document.id]});
    } catch (error) {
      console.error('Failed to create line:', error);
      toast.error('Failed to create line');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateLigne = async () => {
    if (!currentLigne) return;
    
    try {
      setIsSubmitting(true);
      await documentService.updateLigne(currentLigne.id, {
        title,
        article,
        prix
      });
      toast.success('Line updated successfully');
      resetForm();
      setIsEditDialogOpen(false);
      
      // Refresh document data
      queryClient.invalidateQueries({queryKey: ['document', document.id]});
      queryClient.invalidateQueries({queryKey: ['documentLignes', document.id]});
    } catch (error) {
      console.error('Failed to update line:', error);
      toast.error('Failed to update line');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLigne = async () => {
    if (!currentLigne) return;
    
    try {
      setIsSubmitting(true);
      await documentService.deleteLigne(currentLigne.id);
      toast.success('Line deleted successfully');
      resetForm();
      setIsDeleteDialogOpen(false);
      
      // Refresh document data
      queryClient.invalidateQueries({queryKey: ['document', document.id]});
      queryClient.invalidateQueries({queryKey: ['documentLignes', document.id]});
    } catch (error) {
      console.error('Failed to delete line:', error);
      toast.error('Failed to delete line');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLigneExpansion = (ligneId: number) => {
    setExpandedLigneId(expandedLigneId === ligneId ? null : ligneId);
  };

  const getTotalPrice = () => {
    return lignes.reduce((total, ligne) => total + ligne.prix, 0).toFixed(2);
  };
  
  // Function to get a deterministic gradient based on ligne ID
  const getLigneGradient = (ligneId: number) => {
    const gradients = [
      'from-blue-900/60 to-indigo-900/40', 
      'from-blue-900/50 to-indigo-900/30',
      'from-indigo-900/60 to-blue-900/40',
      'from-violet-900/50 to-blue-900/30'
    ];
    return gradients[ligneId % gradients.length];
  };

  return (
    <div className="relative">
      {canManageDocuments && (
        <div className="sticky top-[72px] z-10 bg-gradient-to-r from-gray-900/95 to-blue-900/95 backdrop-blur-md p-4 border-b border-white/10 shadow-lg flex items-center justify-between">
          <div className="text-lg font-medium text-white flex items-center">
            <Package className="h-5 w-5 mr-2 text-blue-400" />
            Manage Document Lines
          </div>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)} 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg text-white"
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add New Line
          </Button>
        </div>
      )}

      {lignes.length === 0 ? (
        <div className="p-12 text-center bg-gradient-to-b from-blue-950/50 to-indigo-950/30">
          <div className="mx-auto w-20 h-20 bg-blue-900/30 text-blue-300 rounded-full flex items-center justify-center mb-5 border border-blue-400/30">
            <FileText className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-medium text-white mb-3">No Lines Found</h3>
          <p className="text-blue-300 max-w-md mx-auto mb-8">
            This document doesn't have any lines yet. Add your first line to get started.
          </p>
          {canManageDocuments && (
            <Button 
              onClick={() => setIsCreateDialogOpen(true)} 
              variant="outline" 
              size="lg"
              className="border-dashed border-2 border-blue-500/30 text-blue-300 hover:border-blue-500/50 hover:text-blue-200 hover:bg-blue-900/30"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Your First Line
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800/50 scrollbar-track-blue-950/30">
            <div className="p-4 space-y-3">
              {lignes.map((ligne) => (
                <motion.div 
                  key={ligne.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg border border-white/10 overflow-hidden shadow-md bg-gradient-to-br from-gray-900/90 to-blue-900/60 hover:shadow-lg transition-all duration-200"
                >
                  <div 
                    className={`p-4 cursor-pointer transition-colors duration-200 flex items-center justify-between group hover:bg-blue-900/20 ${
                      expandedLigneId === ligne.id ? 'bg-blue-900/20' : ''
                    }`}
                    onClick={() => toggleLigneExpansion(ligne.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-white">{ligne.title}</h3>
                        <Badge variant="outline" className="font-mono text-xs border-blue-500/30 bg-blue-900/30 text-blue-300">
                          {ligne.ligneKey}
                        </Badge>
                      </div>
                      <p className="text-sm text-blue-200 mt-1 line-clamp-1">{ligne.article}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center px-3 py-1.5 rounded-full bg-green-900/20 text-green-300 border border-green-500/30">
                        <DollarSign className="h-3.5 w-3.5 mr-1" />
                        {ligne.prix.toFixed(2)}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {canManageDocuments && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-900/40"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditDialogOpen(ligne);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/30"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteDialogOpen(ligne);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400">
                          {expandedLigneId === ligne.id ? 
                            <ChevronUp className="h-5 w-5" /> : 
                            <ChevronDown className="h-5 w-5" />
                          }
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedLigneId === ligne.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Separator className="bg-white/10" />
                        <div className="p-4 bg-gradient-to-br from-blue-950/50 to-indigo-950/40">
                          <SousLignesList 
                            document={document}
                            ligne={ligne}
                            canManageDocuments={canManageDocuments}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
          
          {lignes.length > 0 && (
            <div className="bg-gradient-to-r from-gray-900/90 to-blue-900/80 p-4 border-t border-white/10 flex justify-between items-center sticky bottom-0 shadow-lg">
              <div className="text-blue-300">
                Total Lines: <span className="font-medium text-white">{lignes.length}</span>
              </div>
              <div className="text-lg font-medium flex items-center">
                Total: <span className="text-green-400 ml-2 flex items-center">
                  <DollarSign className="h-4 w-4 mr-0.5" />
                  {getTotalPrice()}
                </span>
              </div>
            </div>
          )}
        </>
      )}

      {/* Create Ligne Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-gray-900/95 to-blue-900/90 border-white/10 text-white shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-blue-300">
              <PlusCircle className="h-5 w-5 mr-2" /> Add New Line
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-blue-200">Title<span className="text-red-400">*</span></Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter line title"
                className="bg-blue-950/40 border-blue-400/20 text-white placeholder:text-blue-400/50 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="article" className="text-blue-200">Article Description<span className="text-red-400">*</span></Label>
              <Textarea 
                id="article" 
                value={article} 
                onChange={(e) => setArticle(e.target.value)} 
                placeholder="Enter article description"
                rows={3}
                className="bg-blue-950/40 border-blue-400/20 text-white placeholder:text-blue-400/50 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prix" className="text-blue-200">Price (€)<span className="text-red-400">*</span></Label>
              <Input 
                id="prix" 
                type="number" 
                value={prix} 
                onChange={(e) => setPrix(Number(e.target.value))} 
                placeholder="0.00"
                min="0"
                step="0.01"
                className="bg-blue-950/40 border-blue-400/20 text-white placeholder:text-blue-400/50 focus:border-blue-400"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsCreateDialogOpen(false)}
              className="border-blue-400/30 text-blue-300 hover:text-white hover:bg-blue-700/50"
            >
              <Ban className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button 
              onClick={handleCreateLigne} 
              disabled={isSubmitting}
              className={`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 ${isSubmitting ? 'opacity-70' : ''}`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </div>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" /> Create Line
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Ligne Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-gray-900/95 to-blue-900/90 border-white/10 text-white shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-blue-300">
              <Edit className="h-5 w-5 mr-2" /> Edit Line
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="text-blue-200">Title<span className="text-red-400">*</span></Label>
              <Input 
                id="edit-title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter line title"
                className="bg-blue-950/40 border-blue-400/20 text-white placeholder:text-blue-400/50 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-article" className="text-blue-200">Article Description<span className="text-red-400">*</span></Label>
              <Textarea 
                id="edit-article" 
                value={article} 
                onChange={(e) => setArticle(e.target.value)} 
                placeholder="Enter article description"
                rows={3}
                className="bg-blue-950/40 border-blue-400/20 text-white placeholder:text-blue-400/50 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-prix" className="text-blue-200">Price (€)<span className="text-red-400">*</span></Label>
              <Input 
                id="edit-prix" 
                type="number" 
                value={prix} 
                onChange={(e) => setPrix(Number(e.target.value))} 
                placeholder="0.00"
                min="0"
                step="0.01"
                className="bg-blue-950/40 border-blue-400/20 text-white placeholder:text-blue-400/50 focus:border-blue-400"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              className="border-blue-400/30 text-blue-300 hover:text-white hover:bg-blue-700/50"
            >
              <Ban className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button 
              onClick={handleUpdateLigne} 
              disabled={isSubmitting}
              className={`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 ${isSubmitting ? 'opacity-70' : ''}`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Ligne Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-gray-900/95 to-red-900/80 border-white/10 text-white shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-300">
              <AlertCircle className="h-5 w-5 mr-2" /> Confirm Delete
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300 mb-4">Are you sure you want to delete this line? This will also delete all related sous-lignes.</p>
            {currentLigne && (
              <div className="p-4 bg-red-900/20 rounded-md border border-red-500/30 mt-4">
                <p className="font-medium text-white">{currentLigne.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="font-mono text-xs border-red-500/30 bg-red-900/30 text-red-300">
                    {currentLigne.ligneKey}
                  </Badge>
                  <span className="text-sm text-red-300">Price: ${currentLigne.prix.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-gray-400/30 text-gray-300 hover:text-white hover:bg-gray-700/50"
            >
              <Ban className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteLigne} 
              disabled={isSubmitting}
              className={`bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 ${isSubmitting ? 'opacity-70' : ''}`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </div>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete Line
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LignesList;
