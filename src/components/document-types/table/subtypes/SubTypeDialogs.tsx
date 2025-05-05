
import { useState } from 'react';
import { SubTypeFormProvider } from '@/components/sub-types/context/SubTypeFormContext';
import { MultiStepSubTypeForm } from '@/components/sub-types/components/MultiStepSubTypeForm';
import { SubType } from '@/models/subtype';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

export interface SubTypeDialogsProps {
  createDialogOpen: boolean;
  setCreateDialogOpen: (open: boolean) => void;
  editDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  selectedSubType: SubType | null;
  documentTypes: any[];
  onCreateSuccess: () => Promise<void>;
  onEditSuccess: () => Promise<void>;
  onDeleteConfirm: () => Promise<void>;
}

export const SubTypeDialogs = ({
  createDialogOpen,
  setCreateDialogOpen,
  editDialogOpen,
  setEditDialogOpen,
  deleteDialogOpen,
  setDeleteDialogOpen,
  selectedSubType,
  documentTypes,
  onCreateSuccess,
  onEditSuccess,
  onDeleteConfirm,
}: SubTypeDialogsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      {/* Create SubType Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create SubType</DialogTitle>
          </DialogHeader>
          <SubTypeFormProvider onSuccess={onCreateSuccess}>
            <MultiStepSubTypeForm onCancel={() => setCreateDialogOpen(false)} />
          </SubTypeFormProvider>
        </DialogContent>
      </Dialog>

      {/* Edit SubType Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit SubType</DialogTitle>
          </DialogHeader>
          {selectedSubType && (
            <SubTypeFormProvider initialData={selectedSubType} onSuccess={onEditSuccess}>
              <MultiStepSubTypeForm onCancel={() => setEditDialogOpen(false)} />
            </SubTypeFormProvider>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete SubType Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              SubType: <strong>{selectedSubType?.name}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isSubmitting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                try {
                  await onDeleteConfirm();
                } finally {
                  setIsSubmitting(false);
                  setDeleteDialogOpen(false);
                }
              }}
            >
              {isSubmitting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
