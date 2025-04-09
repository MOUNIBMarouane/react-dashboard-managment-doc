
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { 
  FolderPlus, 
  Plus, 
  Trash, 
  ChevronRight, 
  Check, 
  Filter,
  ArrowUpDown,
  Download
} from 'lucide-react';
import { DocumentType } from '@/models/document';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import documentService from '@/services/documentService';

const typeSchema = z.object({
  typeName: z.string().min(2, "Type name must be at least 2 characters."),
  typeAttr: z.string().optional(),
});

const DocumentTypesManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [types, setTypes] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isTypeNameValid, setIsTypeNameValid] = useState<boolean | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const form = useForm<z.infer<typeof typeSchema>>({
    resolver: zodResolver(typeSchema),
    defaultValues: {
      typeName: "",
      typeAttr: "",
    },
  });

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

  const validateTypeName = async (typeName: string) => {
    if (typeName.length < 2) return;
    
    setIsValidating(true);
    try {
      const exists = await documentService.validateTypeName(typeName);
      setIsTypeNameValid(!exists);
      return !exists;
    } catch (error) {
      console.error('Error validating type name:', error);
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const typeName = form.getValues("typeName");
      const isValid = await validateTypeName(typeName);
      
      if (isValid) {
        setStep(2);
      } else {
        form.setError("typeName", { 
          type: "manual", 
          message: "This type name already exists." 
        });
      }
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const onSubmit = async (data: z.infer<typeof typeSchema>) => {
    try {
      await documentService.createDocumentType({
        typeName: data.typeName,
        typeAttr: data.typeAttr || undefined
      });
      toast.success('Document type created successfully');
      form.reset();
      setStep(1);
      setIsDrawerOpen(false);
      fetchTypes();
    } catch (error) {
      console.error('Failed to create document type:', error);
      toast.error('Failed to create document type');
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

  const areAllEligibleSelected = types.length > 0 && 
    types.filter(type => type.documentCounter === 0).length === selectedTypes.length;

  return (
    <div className="space-y-4 md:space-y-6 px-4 py-6 md:px-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Document Types Management</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Create, manage and organize document types for your organization
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={exportToCsv}
            className="h-9"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button className="h-9">
                <Plus className="mr-2 h-4 w-4" /> New Type
              </Button>
            </DrawerTrigger>
            <DrawerContent className="mx-auto max-w-md">
              <DrawerHeader className="text-center">
                <DrawerTitle className="text-xl font-bold">
                  {step === 1 ? "Create Document Type" : "Additional Attributes"}
                </DrawerTitle>
                <DrawerDescription className="mt-2">
                  {step === 1 
                    ? "Enter a unique name for this document type" 
                    : "Provide optional attributes for this document type"}
                </DrawerDescription>
              </DrawerHeader>

              <div className="flex justify-center mb-6">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                    ${step === 1 ? "bg-blue-600 text-white" : "bg-green-500 text-white"}`}>
                    {step === 1 ? "1" : <Check className="h-5 w-5"/>}
                  </div>
                  <div className={`h-1 w-16 ${step > 1 ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}></div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                    ${step === 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"}`}>
                    2
                  </div>
                </div>
              </div>

              <div className="px-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {step === 1 && (
                      <FormField
                        control={form.control}
                        name="typeName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Type Name*</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Enter document type name" 
                                className="h-12 text-base"
                                onChange={(e) => {
                                  field.onChange(e);
                                  setIsTypeNameValid(null);
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              This name must be unique and at least 2 characters long
                            </FormDescription>
                            {isTypeNameValid === false && (
                              <p className="text-sm text-red-500 flex items-center mt-1">
                                <span className="inline-block w-4 h-4 rounded-full bg-red-100 text-red-600 text-center mr-1.5 text-xs font-bold">!</span>
                                This type name already exists
                              </p>
                            )}
                            {isTypeNameValid === true && (
                              <p className="text-sm text-green-500 flex items-center mt-1">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-100 text-green-600 text-center mr-1.5 text-xs">✓</span>
                                Type name is available
                              </p>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {step === 2 && (
                      <FormField
                        control={form.control}
                        name="typeAttr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Type Attributes (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Enter attributes (optional)" 
                                className="h-12 text-base"
                              />
                            </FormControl>
                            <FormDescription>
                              Additional attributes for this document type
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </form>
                </Form>
              </div>
              <DrawerFooter className="px-6">
                {step === 1 ? (
                  <Button 
                    onClick={nextStep}
                    disabled={!form.getValues("typeName") || form.getValues("typeName").length < 2 || isValidating}
                    className="w-full h-12 text-base"
                  >
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex flex-col gap-3 w-full">
                    <Button onClick={form.handleSubmit(onSubmit)} className="w-full h-12 text-base bg-green-600 hover:bg-green-700">
                      Create Type
                    </Button>
                    <Button variant="outline" onClick={prevStep} className="w-full h-12 text-base">
                      Back
                    </Button>
                  </div>
                )}
                <DrawerClose asChild>
                  <Button variant="outline" onClick={() => {
                    setStep(1);
                    form.reset();
                  }} className="w-full h-10 text-sm mt-2">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6 animate-pulse">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-16 bg-gray-100 dark:bg-gray-800 rounded"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : types.length > 0 ? (
        <Card>
          <CardHeader className="pb-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-xl">Document Types</CardTitle>
                <CardDescription>Manage your document classification system</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="h-3.5 w-3.5 mr-2" /> Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <div className="rounded-md overflow-hidden border border-border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox 
                        checked={areAllEligibleSelected && types.some(t => t.documentCounter === 0)}
                        onCheckedChange={handleSelectAll}
                        disabled={!types.some(t => t.documentCounter === 0)}
                        aria-label="Select all types"
                      />
                    </TableHead>
                    <TableHead 
                      className="w-1/6 cursor-pointer"
                      onClick={() => handleSort('typeKey')}
                    >
                      <div className="flex items-center">
                        Type Key
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="w-1/3 cursor-pointer"
                      onClick={() => handleSort('typeName')}
                    >
                      <div className="flex items-center">
                        Type Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="w-1/4 cursor-pointer"
                      onClick={() => handleSort('typeAttr')}
                    >
                      <div className="flex items-center">
                        Attributes
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="w-1/6 cursor-pointer"
                      onClick={() => handleSort('documentCounter')}
                    >
                      <div className="flex items-center">
                        Document Count
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="w-1/12 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTypes.map((type) => (
                    <TableRow 
                      key={type.id} 
                      className={`hover:bg-muted/50 ${selectedTypes.includes(type.id!) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                    >
                      <TableCell>
                        <Checkbox 
                          checked={selectedTypes.includes(type.id!)}
                          onCheckedChange={(checked) => handleSelectType(type.id!, checked as boolean)}
                          disabled={type.documentCounter! > 0}
                          aria-label={`Select ${type.typeName}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <Badge variant="outline" className="px-2 py-1 text-sm font-mono">
                          {type.typeKey}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{type.typeName}</TableCell>
                      <TableCell>{type.typeAttr || "-"}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={type.documentCounter! > 0 ? "secondary" : "outline"} 
                          className="px-2 py-1"
                        >
                          {type.documentCounter}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 ${
                            type.documentCounter! > 0 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          onClick={() => type.documentCounter! === 0 && openDeleteDialog(type.id!)}
                          disabled={type.documentCounter! > 0}
                          title={type.documentCounter! > 0 ? "Cannot delete types with documents" : "Delete type"}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-dashed">
          <CardContent className="p-0">
            <div className="text-center py-20">
              <FolderPlus className="mx-auto h-16 w-16 text-muted-foreground/60 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No document types found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Document types help categorize your documents. Start by creating your first document type.
              </p>
              <Button 
                onClick={() => setIsDrawerOpen(true)} 
                className="px-6 py-2 text-base"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Document Type
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Confirm Delete</DialogTitle>
            <DialogDescription className="text-base py-3">
              Are you sure you want to delete this document type? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="sm:w-1/3">
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete} 
              className="sm:w-1/3"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Confirm Bulk Delete</DialogTitle>
            <DialogDescription className="text-base py-3">
              Are you sure you want to delete {selectedTypes.length} document type{selectedTypes.length !== 1 ? 's' : ''}? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setBulkDeleteDialogOpen(false)} className="sm:w-1/3">
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleBulkDelete} 
              className="sm:w-1/3"
            >
              Delete {selectedTypes.length} Type{selectedTypes.length !== 1 ? 's' : ''}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bottom action bar for bulk actions */}
      {selectedTypes.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg p-4 flex justify-between items-center z-10">
          <div>
            <span className="font-medium">{selectedTypes.length}</span> document type{selectedTypes.length !== 1 ? 's' : ''} selected
          </div>
          <div className="flex gap-2">
            <Button 
              variant="destructive" 
              onClick={() => setBulkDeleteDialogOpen(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash className="h-4 w-4 mr-2" /> Delete Selected
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentTypesManagement;
