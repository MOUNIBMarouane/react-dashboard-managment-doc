
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DocumentType } from '@/models/document';
import { SubType } from '@/models/subtype';
import { MultiStepSubTypeForm } from '@/components/sub-types/components/MultiStepSubTypeForm';
import { SubTypeFormProvider } from '@/components/sub-types/context/SubTypeFormContext';

interface SubTypeDialogsProps {
  documentTypes: DocumentType[];
  documentTypeId?: number;
  selectedSubType: SubType | null;
  createDialogOpen: boolean;
  setCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editDialogOpen: boolean;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateSubmit: (data: any) => void;
  onEditSubmit: (data: any) => void;
  onDeleteConfirm: () => void;
}

export function SubTypeDialogs({
  documentTypes,
  documentTypeId,
  selectedSubType,
  createDialogOpen,
  setCreateDialogOpen,
  editDialogOpen,
  setEditDialogOpen,
  deleteDialogOpen,
  setDeleteDialogOpen,
  onCreateSubmit,
  onEditSubmit,
  onDeleteConfirm,
}: SubTypeDialogsProps) {
  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Subtype</DialogTitle>
          </DialogHeader>
          <SubTypeFormProvider
            documentTypes={documentTypes}
            selectedDocumentTypeId={documentTypeId}
            onSubmit={onCreateSubmit}
          >
            <MultiStepSubTypeForm onCancel={handleCreateDialogClose} />
          </SubTypeFormProvider>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      {selectedSubType && (
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Subtype</DialogTitle>
            </DialogHeader>
            <SubTypeFormProvider
              documentTypes={documentTypes}
              selectedDocumentTypeId={selectedSubType.documentTypeId}
              initialData={selectedSubType}
              onSubmit={onEditSubmit}
            >
              <MultiStepSubTypeForm onCancel={handleEditDialogClose} />
            </SubTypeFormProvider>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Dialog */}
      {selectedSubType && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Subtype</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the subtype "{selectedSubType.name}"?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleDeleteDialogClose}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDeleteConfirm} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
