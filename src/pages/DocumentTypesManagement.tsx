
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Filter, Download, Plus, ArrowLeft } from 'lucide-react';
import { DocumentType } from '@/models/document';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import documentService from '@/services/documentService';

// Import our components
import DocumentTypeTable from '@/components/document-types/DocumentTypeTable';
import DocumentTypeForm from '@/components/document-types/DocumentTypeForm';
import BottomActionBar from '@/components/document-types/BottomActionBar';
import EmptyState from '@/components/document-types/EmptyState';
import DeleteConfirmDialog from '@/components/document-types/DeleteConfirmDialog';
import LoadingState from '@/components/document-types/LoadingState';
import { Link } from 'react-router-dom';

const DocumentTypesManagement = () => {
  const { user } = useAuth();
  const [types, setTypes] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      setIsLoading(true);
      const data = await documentService.getAllDocumentTypes();
      setTypes(data);
    } catch (error) {
      console.error('Failed to fetch document types:', error);
      toast.error('Failed to load document types');
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteDialog = (id: number) => {
    setTypeToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (typeToDelete) {
        await documentService.deleteDocumentType(typeToDelete);
        toast.success('Document type deleted successfully');
        fetchTypes();
      }
    } catch (error) {
      console.error('Failed to delete document type:', error);
      toast.error('Failed to delete document type');
    } finally {
      setDeleteDialogOpen(false);
      setTypeToDelete(null);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Only select types that can be deleted (document count is 0)
      const selectableTypeIds = types
        .filter(type => type.documentCounter === 0)
        .map(type => type.id!)
        .filter(id => id !== undefined);
      setSelectedTypes(selectableTypeIds);
    } else {
      setSelectedTypes([]);
    }
  };

  const handleSelectType = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedTypes(prev => [...prev, id]);
    } else {
      setSelectedTypes(prev => prev.filter(typeId => typeId !== id));
    }
  };

  const handleBulkDelete = async () => {
    try {
      await documentService.deleteMultipleDocumentTypes(selectedTypes);
      toast.success(`Successfully deleted ${selectedTypes.length} document types`);
      setSelectedTypes([]);
      fetchTypes();
    } catch (error) {
      console.error('Failed to delete document types in bulk:', error);
      toast.error('Failed to delete some or all document types');
    } finally {
      setBulkDeleteDialogOpen(false);
    }
  };

  const handleSort = (field: string) => {
    // If already sorting by this field, reverse direction
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTypes = [...types].sort((a, b) => {
    if (!sortField) return 0;
    
    let valueA: any, valueB: any;
    
    switch(sortField) {
      case 'typeKey':
        valueA = a.typeKey || '';
        valueB = b.typeKey || '';
        break;
      case 'typeName':
        valueA = a.typeName || '';
        valueB = b.typeName || '';
        break;
      case 'typeAttr':
        valueA = a.typeAttr || '';
        valueB = b.typeAttr || '';
        break;
      case 'documentCounter':
        valueA = a.documentCounter || 0;
        valueB = b.documentCounter || 0;
        break;
      default:
        return 0;
    }
    
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const exportToCsv = () => {
    // Create CSV content
    const headers = ['Type Key', 'Type Name', 'Attributes', 'Document Count'];
    const rows = types.map(type => [
      type.typeKey || '',
      type.typeName || '',
      type.typeAttr || '',
      type.documentCounter?.toString() || '0'
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    
    // Create download link
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'document-types.csv');
    document.body.appendChild(link);
    
    // Download it
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    toast.success('Document types exported to CSV');
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-[#0f1642] p-6 border-b border-blue-900/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/documents" className="inline-flex items-center text-blue-400 hover:text-blue-300">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </Link>
            <div className="h-4 w-px bg-blue-800/50"></div>
            <div>
              <h1 className="text-2xl font-bold text-white">Document Types</h1>
              <p className="text-sm text-blue-300 mt-1">
                Manage document classification system
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCsv}
              className="h-9 bg-blue-900/20 border-blue-800/40 text-blue-200 hover:bg-blue-800/30"
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button className="h-9 bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" /> New Type
                </Button>
              </DrawerTrigger>
              <DrawerContent className="mx-auto max-w-md bg-[#111633]">
                <DrawerHeader className="text-center">
                  <DrawerTitle className="text-xl font-bold text-white">
                    Create Document Type
                  </DrawerTitle>
                  <DrawerDescription className="mt-2 text-blue-300">
                    Create a new document type for your organization
                  </DrawerDescription>
                </DrawerHeader>
                
                <div className="px-6 pb-6">
                  <DocumentTypeForm
                    onSuccess={() => {
                      setIsDrawerOpen(false);
                      fetchTypes();
                      toast.success('Document type created successfully');
                    }}
                    onCancel={() => setIsDrawerOpen(false)}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6">
        {isLoading ? (
          <LoadingState />
        ) : types.length > 0 ? (
          <Card className="bg-[#0f1642] border-blue-900/30 shadow-xl">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="text-xl text-white">Document Types</CardTitle>
                  <CardDescription className="text-blue-300">
                    {types.length} {types.length === 1 ? 'type' : 'types'} available
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 bg-blue-900/20 border-blue-800/40 text-blue-200 hover:bg-blue-800/30">
                    <Filter className="h-3.5 w-3.5 mr-2" /> Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <DocumentTypeTable 
                types={sortedTypes}
                selectedTypes={selectedTypes}
                onSelectType={handleSelectType}
                onSelectAll={handleSelectAll}
                onDeleteType={openDeleteDialog}
                onSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
              />
            </CardContent>
          </Card>
        ) : (
          <EmptyState onAddType={() => setIsDrawerOpen(true)} />
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
      />

      {/* Bulk Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        onConfirm={handleBulkDelete}
        isBulk={true}
        count={selectedTypes.length}
      />

      {/* Bottom action bar */}
      <BottomActionBar
        selectedCount={selectedTypes.length}
        onBulkDelete={() => setBulkDeleteDialogOpen(true)}
      />
    </div>
  );
};

export default DocumentTypesManagement;
