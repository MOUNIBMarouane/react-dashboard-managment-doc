
import { useState, useEffect, useMemo } from "react";
import { Document, DocumentStatus } from "@/types/document";
import { toast } from "sonner";

// Number of documents per page
const DOCUMENTS_PER_PAGE = 5;

// Sample documents data
const sampleDocuments: Document[] = [
  {
    id: "1",
    title: "Quarterly Report Q1 2025",
    content: "Financial overview for Q1 2025",
    type: "Report",
    status: "Published",
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-01-20T14:45:00Z",
    createdBy: "Alex Johnson"
  },
  {
    id: "2",
    title: "Marketing Strategy 2025",
    content: "Comprehensive marketing plan for 2025",
    type: "Strategy",
    status: "Draft",
    createdAt: "2025-02-03T09:15:00Z",
    createdBy: "Sarah Miller"
  },
  {
    id: "3",
    title: "Product Roadmap",
    content: "Future product development plans",
    type: "Planning",
    status: "Draft",
    createdAt: "2025-02-10T11:20:00Z",
    updatedAt: "2025-02-12T16:30:00Z",
    createdBy: "James Wilson"
  },
  {
    id: "4",
    title: "HR Policies Update",
    content: "Updated company HR policies",
    type: "Policy",
    status: "Published",
    createdAt: "2025-01-25T13:45:00Z",
    createdBy: "Emily Davis"
  },
  {
    id: "5",
    title: "Client Proposal - XYZ Corp",
    content: "Proposal for XYZ Corporation project",
    type: "Proposal",
    status: "Archived",
    createdAt: "2024-12-05T15:10:00Z",
    updatedAt: "2025-01-10T09:30:00Z",
    createdBy: "Michael Brown"
  },
  {
    id: "6",
    title: "Budget Forecast 2025",
    content: "Annual budget planning",
    type: "Financial",
    status: "Published",
    createdAt: "2025-01-05T08:20:00Z",
    updatedAt: "2025-01-08T11:15:00Z",
    createdBy: "Emma Wilson"
  },
  {
    id: "7",
    title: "Systems Architecture",
    content: "Technical architecture documentation",
    type: "Technical",
    status: "Draft",
    createdAt: "2025-02-20T14:30:00Z",
    createdBy: "Daniel Smith"
  },
  {
    id: "8",
    title: "Customer Satisfaction Survey Results",
    content: "Analysis of recent customer survey",
    type: "Report",
    status: "Published",
    createdAt: "2025-02-15T10:45:00Z",
    createdBy: "Olivia Johnson"
  }
];

export const useDocumentManagement = (initialDocuments: Document[] = sampleDocuments) => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDocumentDialogOpen, setIsAddDocumentDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<DocumentStatus>("Draft");
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter documents based on search query
  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) return documents;
    
    const query = searchQuery.toLowerCase().trim();
    return documents.filter(document => 
      document.title.toLowerCase().includes(query) || 
      document.type?.toLowerCase().includes(query) ||
      document.status.toLowerCase().includes(query) ||
      document.createdBy?.toLowerCase().includes(query) ||
      document.content?.toLowerCase().includes(query)
    );
  }, [documents, searchQuery]);
  
  // Calculate total pages based on filtered documents array length
  const totalPages = Math.ceil(filteredDocuments.length / DOCUMENTS_PER_PAGE);
  
  // Get current page data
  const paginatedDocuments = useMemo(() => {
    const startIndex = (currentPage - 1) * DOCUMENTS_PER_PAGE;
    const endIndex = startIndex + DOCUMENTS_PER_PAGE;
    return filteredDocuments.slice(startIndex, endIndex);
  }, [filteredDocuments, currentPage]);
  
  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedDocuments([]);
  }, [searchQuery]);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedDocuments([]);
  };
  
  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  // Handle select all checkbox (only for current page)
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocuments(paginatedDocuments.map(doc => doc.id));
    } else {
      setSelectedDocuments([]);
    }
  };
  
  // Handle individual document selection
  const handleSelectDocument = (documentId: string, checked: boolean) => {
    if (checked) {
      setSelectedDocuments([...selectedDocuments, documentId]);
    } else {
      setSelectedDocuments(selectedDocuments.filter(id => id !== documentId));
    }
  };
  
  // Delete selected documents
  const deleteSelectedDocuments = () => {
    setDocuments(documents.filter(doc => !selectedDocuments.includes(doc.id)));
    setSelectedDocuments([]);
    setIsDeleteDialogOpen(false);
    toast.success(`${selectedDocuments.length} documents deleted successfully`);
    
    if (currentPage > 1 && currentPage > Math.ceil((filteredDocuments.length - selectedDocuments.length) / DOCUMENTS_PER_PAGE)) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Change status for selected documents
  const changeDocumentStatus = () => {
    setDocuments(documents.map(doc => {
      if (selectedDocuments.includes(doc.id)) {
        return { ...doc, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return doc;
    }));
    setSelectedDocuments([]);
    setIsEditDialogOpen(false);
    toast.success(`Status updated for ${selectedDocuments.length} documents`);
  };

  // Handle single document deletion
  const handleSingleDelete = (documentId: string) => {
    setSelectedDocuments([documentId]);
    setIsDeleteDialogOpen(true);
  };
  
  // Add new document
  const handleAddDocument = (newDocument: Document) => {
    setDocuments([...documents, {
      ...newDocument,
      id: (documents.length + 1).toString(),
      createdAt: new Date().toISOString()
    }]);
    toast.success(`Document "${newDocument.title}" created successfully`);
  };

  // Edit document
  const handleEditDocument = (updatedDocument: Document) => {
    setDocuments(documents.map(doc => 
      doc.id === updatedDocument.id 
        ? { ...updatedDocument, updatedAt: new Date().toISOString() } 
        : doc
    ));
    toast.success(`Document "${updatedDocument.title}" updated successfully`);
  };

  return {
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
  };
};
