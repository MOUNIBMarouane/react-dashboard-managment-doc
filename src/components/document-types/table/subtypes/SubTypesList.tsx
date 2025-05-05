import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { SubTypesTable } from './SubTypesTable';
import { SubTypeDialogs } from './SubTypeDialogs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { DocumentType } from '@/models/document';
import { SubType } from '@/models/subtype';
import subTypeService from '@/services/subTypeService';
import documentService from '@/services/documentService';

interface SubTypesListProps {
  documentTypeId?: number;
  documentType?: DocumentType;
}

export function SubTypesList({ documentTypeId, documentType }: SubTypesListProps) {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOnly, setActiveOnly] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedSubType, setSelectedSubType] = useState<SubType | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [filteredSubTypes, setFilteredSubTypes] = useState<SubType[]>([]);
  // Derived state for filtering
  const startDateFilter = dateRange?.from;
  const endDateFilter = dateRange?.to;

  // Fetch all document types
  const { data: documentTypes = [] } = useQuery({
    queryKey: ['documentTypes'],
    queryFn: () => documentService.getAllDocumentTypes(),
  });

  // Fetch data
  const { data: subTypes = [], refetch } = useQuery({
    queryKey: ['subtypes', documentTypeId],
    queryFn: () => documentTypeId 
      ? subTypeService.getSubTypesByDocumentTypeId(documentTypeId) 
      : subTypeService.getAllSubTypes(),
  });

  // Apply filters to subTypes
  useEffect(() => {
    let result = [...subTypes];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(subType => 
        subType.name.toLowerCase().includes(query) || 
        subType.subTypeKey.toLowerCase().includes(query) || 
        subType.description?.toLowerCase().includes(query)
      );
    }
    
    // Filter by active status
    if (activeOnly) {
      result = result.filter(subType => subType.isActive);
    }
    
    // Filter by date range
    if (startDateFilter) {
      const startDate = new Date(startDateFilter);
      result = result.filter(subType => {
        const subTypeStartDate = new Date(subType.startDate);
        const subTypeEndDate = new Date(subType.endDate);
        
        if (endDateFilter) {
          const endDate = new Date(endDateFilter);
          // Check for overlap between date ranges
          return subTypeStartDate <= endDate && subTypeEndDate >= startDate;
        } else {
          // If only start date is provided, check if subType date range includes start date
          return subTypeStartDate <= startDate && subTypeEndDate >= startDate;
        }
      });
    }
    
    setFilteredSubTypes(result);
  }, [subTypes, searchQuery, activeOnly, startDateFilter, endDateFilter]);

  const handleCreateClick = () => {
    setSelectedSubType(null);
    setCreateDialogOpen(true);
  };
  
  const handleEditClick = (subType: SubType) => {
    setSelectedSubType(subType);
    setEditDialogOpen(true);
  };
  
  const handleDeleteClick = (subType: SubType) => {
    setSelectedSubType(subType);
    setDeleteDialogOpen(true);
  };

  const handleCreate = async (formData: any) => {
    try {
      await subTypeService.createSubType(formData);
      toast.success('Sub type created successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to create sub type');
      console.error(error);
    }
  };

  const handleEdit = async (formData: any) => {
    if (!selectedSubType) return;
    try {
      await subTypeService.updateSubType(selectedSubType.id, formData);
      toast.success('Sub type updated successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to update sub type');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedSubType) return;
    try {
      await subTypeService.deleteSubType(selectedSubType.id);
      toast.success('Sub type deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete sub type');
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="Search sub types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          
          <div className="flex items-center gap-2">
            <Checkbox
              id="active-only"
              checked={activeOnly}
              onCheckedChange={(checked) => setActiveOnly(checked as boolean)}
            />
            <label htmlFor="active-only" className="text-sm cursor-pointer">
              Active only
            </label>
          </div>
        </div>
        
        <DateRangePicker
          date={dateRange}
          onChange={setDateRange}
          className="max-w-sm"
        />
        
        <Button onClick={handleCreateClick} className="whitespace-nowrap">
          Create Sub Type
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <SubTypesTable
            subTypes={filteredSubTypes}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </CardContent>
      </Card>

      <SubTypeDialogs
        documentTypes={documentTypes}
        documentTypeId={documentTypeId}
        selectedSubType={selectedSubType}
        createDialogOpen={createDialogOpen}
        setCreateDialogOpen={setCreateDialogOpen}
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        onCreateSubmit={handleCreate}
        onEditSubmit={handleEdit}
        onDeleteConfirm={handleDelete}
      />
    </div>
  );
}

// Export as both default and named export for backward compatibility
export { SubTypesList };
export default SubTypesList;
