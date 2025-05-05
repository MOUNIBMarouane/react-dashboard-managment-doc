
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSettings } from '@/context/SettingsContext';
import { useSubTypes } from '@/hooks/useSubTypes';
import SubTypeListHeader from './SubTypeListHeader';
import SubTypeCreateDialog from '@/components/sub-types/SubTypeCreateDialog';
import { columns } from './SubTypeColumns';
import { DocumentType } from '@/models/document';
import { SubType } from '@/models/subtype';
import documentService from '@/services/documentService';
import subTypeService from '@/services/subTypeService';
import { DateRange } from "@/components/ui/calendar";

// Define the missing DateRangePickerProps interface
export interface DateRangePickerProps {
  date: DateRange;
  onChange: React.Dispatch<React.SetStateAction<DateRange>>;
  onDateChange: (range: DateRange) => void;
  className?: string;
}

const SubTypesList = () => {
  const { documentTypeId } = useParams<{ documentTypeId: string }>();
  const { theme } = useSettings();
  const isDark = theme === 'dark';

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [documentType, setDocumentType] = useState<DocumentType | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [data, setData] = useState<SubType[]>([]);

  const { subTypes, isLoading, error } = useSubTypes(
    documentTypeId ? parseInt(documentTypeId, 10) : undefined
  );

  useEffect(() => {
    if (subTypes) {
      setData(subTypes);
    }
  }, [subTypes]);

  useEffect(() => {
    const fetchDocumentType = async () => {
      if (documentTypeId) {
        try {
          const typeId = parseInt(documentTypeId, 10);
          const fetchedType = await documentService.getDocumentTypeById(typeId);
          setDocumentType(fetchedType);
        } catch (fetchError: any) {
          console.error('Error fetching document type:', fetchError);
          toast.error(fetchError?.message || 'Failed to load document type details.');
        }
      }
    };

    fetchDocumentType();
  }, [documentTypeId]);

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCreate = async (data: any) => {
    try {
      await subTypeService.createSubType(data);
      toast.success('Subtype created successfully');
      handleCreateSuccess();
    } catch (createError: any) {
      console.error('Failed to create subtype:', createError);
      toast.error(createError?.message || 'Failed to create subtype');
    }
  };

  if (isLoading) {
    return <p>Loading subtypes...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <SubTypeListHeader
        documentTypeName={documentType?.typeName || 'Unknown'}
        onCreateClick={() => setIsCreateDialogOpen(true)}
      />

      <Card className={`${isDark ? 'bg-[#0a1033]' : 'bg-white'} shadow-md`}>
        <CardContent className="p-4">
          {data && data.length > 0 ? (
            <DataTable columns={columns} data={data} />
          ) : (
            <div className="text-center p-6">
              <p className="text-gray-500">No subtypes found for this document type.</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" /> Add New Subtype
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <SubTypeCreateDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
        documentTypes={documentType ? [documentType] : []}
      />
    </div>
  );
};

export default SubTypesList;
