
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Trash2, AlertCircle } from 'lucide-react';
import { SubTypeFormProvider } from '@/components/sub-types/context/SubTypeFormContext';
import { MultiStepSubTypeForm } from '@/components/sub-types/components/MultiStepSubTypeForm';
import { DocumentType } from '@/models/document';
import { SubType } from '@/models/subtype';

export interface SubTypeDialogsProps {
  documentTypes: DocumentType[];
  documentTypeId?: number;  // Added this property
  selectedSubType: SubType | null;
  createDialogOpen: boolean;
  setCreateDialogOpen: (open: boolean) => void;
  editDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  onCreateSubmit: (formData: any) => Promise<void>;
  onEditSubmit: (formData: any) => Promise<void>;
  onDeleteConfirm: () => Promise<void>;
}

export const SubTypeDialogs = ({
  documentTypes,
  documentTypeId,  // Now using this prop
  selectedSubType,
  createDialogOpen,
  setCreateDialogOpen,
  editDialogOpen,
  setEditDialogOpen,
  deleteDialogOpen,
  setDeleteDialogOpen,
  onCreateSubmit,
  onEditSubmit,
  onDeleteConfirm
}: SubTypeDialogsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      await onCreateSubmit(formData);
      setCreateDialogOpen(false);
    } catch (error) {
      console.error("Error creating subtype:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      await onEditSubmit(formData);
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating subtype:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onDeleteConfirm();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting subtype:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Sub Type</DialogTitle>
            <DialogDescription>
              Add a new sub type for document categorization
            </DialogDescription>
          </DialogHeader>
          
          <SubTypeFormProvider 
            documentTypes={documentTypes} 
            selectedDocumentTypeId={documentTypeId} // Pass the documentTypeId
            onSubmit={handleCreateSubmit}
          >
            <MultiStepSubTypeForm />
          </SubTypeFormProvider>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Sub Type</DialogTitle>
            <DialogDescription>
              Update sub type information
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubType && (
            <SubTypeFormProvider 
              documentTypes={documentTypes}
              selectedDocumentTypeId={selectedSubType.documentTypeId}
              initialData={selectedSubType}
              onSubmit={handleEditSubmit}
            >
              <MultiStepSubTypeForm />
            </SubTypeFormProvider>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-destructive">
              <AlertCircle className="h-5 w-5 mr-2" /> Confirm Delete
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>Are you sure you want to delete this sub type?</p>
            <p className="text-muted-foreground text-sm mt-2">
              This action cannot be undone. Any documents using this sub type may be affected.
            </p>
            
            {selectedSubType && (
              <div className="mt-4 p-3 border border-destructive/20 rounded-md bg-destructive/5">
                <p className="font-medium">{selectedSubType.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedSubType.subTypeKey} • {selectedSubType.description}
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm} 
              disabled={isSubmitting}
              className="gap-1"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" /> Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
