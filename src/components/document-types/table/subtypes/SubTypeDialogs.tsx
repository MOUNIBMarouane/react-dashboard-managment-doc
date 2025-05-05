
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
  isCreateOpen: boolean;
  setIsCreateOpen: (open: boolean) => void;
  isEditOpen: boolean;
  setIsEditOpen: (open: boolean) => void;
  isDeleteOpen: boolean;
  setIsDeleteOpen: (open: boolean) => void;
  selectedSubType: SubType | null;
  onCreateSubmit: (formData: any) => Promise<void>;
  onEditSubmit: (formData: any) => Promise<void>;
  onDeleteConfirm: () => Promise<void>;
  isSubmitting: boolean;
}

export function SubTypeDialogs({
  documentTypes,
  isCreateOpen,
  setIsCreateOpen,
  isEditOpen,
  setIsEditOpen,
  isDeleteOpen,
  setIsDeleteOpen,
  selectedSubType,
  onCreateSubmit,
  onEditSubmit,
  onDeleteConfirm,
  isSubmitting,
}: SubTypeDialogsProps) {
  const handleCreateSubmit = async (formData: any) => {
    try {
      await onCreateSubmit(formData);
      toast.success('SubType created successfully');
      setIsCreateOpen(false);
    } catch (error: any) {
      toast.error(`Failed to create SubType: ${error.message || 'Unknown error'}`);
    }
  };

  const handleEditSubmit = async (formData: any) => {
    try {
      await onEditSubmit(formData);
      toast.success('SubType updated successfully');
      setIsEditOpen(false);
    } catch (error: any) {
      toast.error(`Failed to update SubType: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await onDeleteConfirm();
      toast.success('SubType deleted successfully');
      setIsDeleteOpen(false);
    } catch (error: any) {
      toast.error(`Failed to delete SubType: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <>
      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New SubType</DialogTitle>
          </DialogHeader>
          <SubTypeFormProvider
            onSubmit={handleCreateSubmit}
            onClose={() => setIsCreateOpen(false)}
            documentTypes={documentTypes}
          >
            <MultiStepSubTypeForm />
          </SubTypeFormProvider>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit SubType</DialogTitle>
          </DialogHeader>
          {selectedSubType && (
            <SubTypeFormProvider
              onSubmit={handleEditSubmit}
              onClose={() => setIsEditOpen(false)}
              documentTypes={documentTypes}
            >
              <MultiStepSubTypeForm initialData={selectedSubType} />
            </SubTypeFormProvider>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
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
