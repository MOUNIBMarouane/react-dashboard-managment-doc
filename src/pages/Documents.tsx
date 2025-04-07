
import React, { useState } from "react";
import Layout from "../components/Layout";
import DocumentTable from "@/components/documents/DocumentTable";
import DeleteDocumentDialog from "@/components/documents/DeleteDocumentDialog";
import ChangeStatusDialog from "@/components/documents/ChangeStatusDialog";
import DocumentsHeader from "@/components/documents/DocumentsHeader";
import UserPagination from "@/components/users/UserPagination";  // Reusing from users
import AddEditDocumentDialog from "@/components/documents/AddEditDocumentDialog";
import { useDocumentManagement } from "@/hooks/useDocumentManagement";
import { Document } from "@/types/document";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Documents = () => {
  const navigate = useNavigate();
  const {
    documents,
    selectedDocuments,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isAddDocumentDialogOpen,
    setIsAddDocumentDialogOpen,
    newStatus,
    setNewStatus,
    searchQuery,
    currentPage,
    filteredDocuments,
    totalPages,
    paginatedDocuments,
    handlePageChange,
    handleSearchChange,
    handleSelectAll,
    handleSelectDocument,
    deleteSelectedDocuments,
    changeDocumentStatus,
    handleSingleDelete,
    handleAddDocument,
    handleEditDocument
  } = useDocumentManagement();

  const [documentToEdit, setDocumentToEdit] = useState<Document | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenAddDialog = () => {
    setIsEditing(false);
    setDocumentToEdit(undefined);
    setIsAddDocumentDialogOpen(true);
  };

  const handleOpenEditDialog = (documentId: string) => {
    const doc = documents.find(d => d.id === documentId);
    if (doc) {
      setDocumentToEdit(doc);
      setIsEditing(true);
      setIsAddDocumentDialogOpen(true);
    }
  };

  const handleCreateCircuit = (documentId: string) => {
    const doc = documents.find(d => d.id === documentId);
    if (doc) {
      toast.success(`Creating circuit from document: ${doc.title}`);
      // Navigate to circuits page or open a create circuit dialog
      navigate('/circuits', { state: { fromDocument: doc } });
    }
  };

  const handleSaveDocument = (document: Document) => {
    if (isEditing && documentToEdit) {
      handleEditDocument({
        ...document,
        id: documentToEdit.id,
        createdAt: documentToEdit.createdAt,
        createdBy: documentToEdit.createdBy
      });
    } else {
      handleAddDocument(document);
    }
  };

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <DocumentsHeader 
          selectedDocuments={selectedDocuments} 
          onOpenStatusDialog={() => setIsEditDialogOpen(true)}
          onOpenDeleteDialog={() => setIsDeleteDialogOpen(true)}
          onOpenAddDocumentDialog={handleOpenAddDialog}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        
        <DocumentTable 
          documents={paginatedDocuments}
          selectedDocuments={selectedDocuments}
          onSelectDocument={handleSelectDocument}
          onSelectAll={handleSelectAll}
          onSingleDelete={handleSingleDelete}
          onEdit={handleOpenEditDialog}
          onCreateCircuit={handleCreateCircuit}
        />
        
        {filteredDocuments.length === 0 && (
          <div className="text-center py-8 text-white/60">
            No documents found matching "{searchQuery}"
          </div>
        )}
        
        {filteredDocuments.length > 0 && (
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            filteredCount={filteredDocuments.length}
            totalCount={documents.length}
          />
        )}
      </div>
      
      <DeleteDocumentDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedCount={selectedDocuments.length}
        onDelete={deleteSelectedDocuments}
      />
      
      <ChangeStatusDialog 
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        selectedCount={selectedDocuments.length}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        onChangeStatus={changeDocumentStatus}
      />

      <AddEditDocumentDialog
        isOpen={isAddDocumentDialogOpen}
        onOpenChange={setIsAddDocumentDialogOpen}
        onSave={handleSaveDocument}
        documentToEdit={documentToEdit}
        isEditing={isEditing}
      />
    </Layout>
  );
};

export default Documents;
