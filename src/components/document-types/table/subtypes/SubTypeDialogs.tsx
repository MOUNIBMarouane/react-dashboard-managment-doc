
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { DocumentType, SubType } from '@/models/document';
import { SubTypeFormProvider } from '@/components/sub-types/context/SubTypeFormContext';
import { MultiStepSubTypeForm } from '@/components/sub-types/components/MultiStepSubTypeForm';

interface SubTypeDialogsProps {
  documentTypes: DocumentType[];
  createDialogOpen: boolean;
  setCreateDialogOpen: (open: boolean) => void;
  editDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  selectedSubType: SubType | null;
  documentTypeId: number;
  onCreateSubmit: (formData: any) => Promise<void>;
  onEditSubmit: (formData: any) => Promise<void>;
  onDeleteConfirm: () => Promise<void>;
}

export function SubTypeDialogs({
  documentTypes,
  createDialogOpen,
  setCreateDialogOpen,
  editDialogOpen,
  setEditDialogOpen,
  deleteDialogOpen,
  setDeleteDialogOpen,
  selectedSubType,
  documentTypeId,
  onCreateSubmit,
  onEditSubmit,
  onDeleteConfirm,
}: SubTypeDialogsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true);
      await onCreateSubmit(formData);
      toast.success('SubType created successfully');
      setCreateDialogOpen(false);
    } catch (error: any) {
      toast.error(`Failed to create SubType: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true);
      await onEditSubmit(formData);
      toast.success('SubType updated successfully');
      setEditDialogOpen(false);
    } catch (error: any) {
      toast.error(`Failed to update SubType: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsSubmitting(true);
      await onDeleteConfirm();
      toast.success('SubType deleted successfully');
      setDeleteDialogOpen(false);
    } catch (error: any) {
      toast.error(`Failed to delete SubType: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New SubType</DialogTitle>
          </DialogHeader>
          <SubTypeFormProvider
            onSubmit={handleCreateSubmit}
            onClose={() => setCreateDialogOpen(false)}
            documentTypes={documentTypes}
          >
            <MultiStepSubTypeForm onCancel={() => setCreateDialogOpen(false)} />
          </SubTypeFormProvider>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit SubType</DialogTitle>
          </DialogHeader>
          {selectedSubType && (
            <SubTypeFormProvider
              onSubmit={handleEditSubmit}
              onClose={() => setEditDialogOpen(false)}
              documentTypes={documentTypes}
            >
              <MultiStepSubTypeForm 
                onCancel={() => setEditDialogOpen(false)}
                initialData={selectedSubType}
              />
            </SubTypeFormProvider>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this SubType?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedSubType ? (
                <>
                  You are about to delete <span className="font-medium">{selectedSubType.name}</span>. This action cannot be undone.
                </>
              ) : (
                'This action cannot be undone.'
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} disabled={isSubmitting}>
              {isSubmitting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// Export as default too for backward compatibility
export default SubTypeDialogs;
