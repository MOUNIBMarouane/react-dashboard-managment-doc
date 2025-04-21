
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import DocumentTypeForm from '@/components/document-types/DocumentTypeForm';
import { DocumentType } from '@/models/document';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DocumentTypeDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  documentType: DocumentType | null;
  isEditMode: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

const ANIMATION = {
  initial: { opacity: 0, scale: 0.95, y: 24 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }},
  exit: { opacity: 0, scale: 0.97, y: 16, transition: { duration: 0.22 } }
};

const DocumentTypeDrawer = ({
  isOpen,
  onOpenChange,
  documentType,
  isEditMode,
  onSuccess,
  onCancel
}: DocumentTypeDrawerProps) => {
  // Use AnimatePresence for portal/modal-like effect
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <motion.div
            className={cn(
              "w-full max-w-md bg-[#111633] p-4 sm:p-6 rounded-xl shadow-2xl border border-blue-900/30 flex flex-col",
              "animate-fade-in"
            )}
            initial={ANIMATION.initial}
            animate={ANIMATION.animate}
            exit={ANIMATION.exit}
            role="dialog"
            aria-modal="true"
          >
            <DrawerHeader className="text-center pb-4 px-0">
              <DrawerTitle className="text-xl font-bold text-white">
                {isEditMode ? 'Edit Document Type' : 'Create Document Type'}
              </DrawerTitle>
              <DrawerDescription className="text-sm text-blue-300">
                {isEditMode 
                  ? 'Modify an existing document type' 
                  : 'Create a new document type for your organization'}
              </DrawerDescription>
            </DrawerHeader>
        
            <div className="px-0">
              <DocumentTypeForm
                documentType={documentType}
                isEditMode={isEditMode}
                onSuccess={onSuccess}
                onCancel={onCancel}
              />
            </div>
          </motion.div>
          <button
            className="absolute top-0 right-0 m-6 text-xl text-blue-200 hover:text-white focus:outline-none"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
            tabIndex={0}
          >×</button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DocumentTypeDrawer;
