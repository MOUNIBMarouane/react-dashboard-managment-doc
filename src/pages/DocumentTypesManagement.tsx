
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
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import documentService from '@/services/documentService';
import { Link } from 'react-router-dom';

// Import our components
import DocumentTypeTable from '@/components/document-types/DocumentTypeTable';
import DocumentTypeForm from '@/components/document-types/DocumentTypeForm';
import BottomActionBar from '@/components/document-types/BottomActionBar';
import EmptyState from '@/components/document-types/EmptyState';
import DeleteConfirmDialog from '@/components/document-types/DeleteConfirmDialog';
import LoadingState from '@/components/document-types/LoadingState';

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
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchTypes();
  }, [dateRange, currentPage]);

  const fetchTypes = async () => {
    try {
      setIsLoading(true);
      const data = await documentService.getAllDocumentTypes();
      
      // Filter by date if date range is set
      let filteredData = [...data];
      if (dateRange?.from) {
        filteredData = filteredData.filter(type => {
          const createdDate = new Date(type.createdAt || new Date());
          return createdDate >= dateRange.from! && 
                 (!dateRange.to || createdDate <= dateRange.to);
        });
      }
      
      setTypes(filteredData);
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

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTypes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedTypes.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
            {/* Date Range Filter */}
            <DateRangePicker
              date={dateRange}
              onDateChange={setDateRange}
            />
            
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
              </div>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <DocumentTypeTable 
                types={currentItems}
                selectedTypes={selectedTypes}
                onSelectType={handleSelectType}
                onSelectAll={handleSelectAll}
                onDeleteType={openDeleteDialog}
                onSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
              />
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center py-4">
                  <nav aria-label="Page navigation">
                    <ul className="flex items-center gap-1">
                      <li>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-blue-900/20 border-blue-800/40 text-blue-200 hover:bg-blue-800/30" 
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                      </li>
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <li key={index}>
                          <Button 
                            variant={currentPage === index + 1 ? "default" : "outline"}
                            size="sm"
                            className={currentPage === index + 1 
                              ? "bg-blue-600 hover:bg-blue-700" 
                              : "bg-blue-900/20 border-blue-800/40 text-blue-200 hover:bg-blue-800/30"
                            }
                            onClick={() => paginate(index + 1)}
                          >
                            {index + 1}
                          </Button>
                        </li>
                      ))}
                      <li>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-blue-900/20 border-blue-800/40 text-blue-200 hover:bg-blue-800/30" 
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
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
