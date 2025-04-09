import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { ArrowLeft, Save, GitBranch } from 'lucide-react';
import documentService from '@/services/documentService';
import { Document, DocumentType, UpdateDocumentRequest } from '@/models/document';
import { Badge } from '@/components/ui/badge';

const EditDocument = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [document, setDocument] = useState<Document | null>(null);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [documentAlias, setDocumentAlias] = useState('');
  const [docDate, setDocDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  
  // Track which fields have been edited
  const [editedFields, setEditedFields] = useState<Record<string, boolean>>({
    typeId: false,
    title: false,
    documentAlias: false,
    docDate: false,
    content: false
  });

  useEffect(() => {
    if (!id) {
      toast.error('Invalid document ID');
      navigate('/documents');
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [documentData, typesData] = await Promise.all([
          documentService.getDocumentById(Number(id)),
          documentService.getAllDocumentTypes()
        ]);
        
        setDocument(documentData);
        setDocumentTypes(typesData);
        
        // Initialize form with document data
        setSelectedTypeId(documentData.typeId);
        setTitle(documentData.title);
        setDocumentAlias(documentData.documentAlias);
        setDocDate(new Date(documentData.docDate).toISOString().split('T')[0]);
        setContent(documentData.content);
      } catch (error) {
        console.error(`Failed to fetch document data:`, error);
        toast.error('Failed to load document data');
        navigate('/documents');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleTypeIdChange = (value: string) => {
    const numValue = Number(value);
    setSelectedTypeId(numValue);
    setEditedFields({...editedFields, typeId: numValue !== document?.typeId});
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTitle(newValue);
    setEditedFields({...editedFields, title: newValue !== document?.title});
  };

  const handleDocumentAliasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDocumentAlias(newValue);
    setEditedFields({...editedFields, documentAlias: newValue !== document?.documentAlias});
  };

  const handleDocDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDocDate(newValue);
    const originalDate = document?.docDate ? new Date(document.docDate).toISOString().split('T')[0] : '';
    setEditedFields({...editedFields, docDate: newValue !== originalDate});
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);
    setEditedFields({...editedFields, content: newValue !== document?.content});
  };

  const validateForm = () => {
    if (!Object.values(editedFields).some(edited => edited)) {
      toast.info('No changes detected');
      return false;
    }
    
    if (editedFields.typeId && !selectedTypeId) {
      toast.error('Please select a document type');
      return false;
    }
    if (editedFields.title && !title.trim()) {
      toast.error('Please enter a document title');
      return false;
    }
    if (editedFields.docDate && !docDate) {
      toast.error('Please select a document date');
      return false;
    }
    if (editedFields.content && !content.trim()) {
      toast.error('Please enter document content');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !id) return;

    try {
      setIsSubmitting(true);
      
      // Only include fields that have been edited
      const documentData: UpdateDocumentRequest = {};
      
      if (editedFields.typeId) documentData.typeId = selectedTypeId || undefined;
      if (editedFields.title) documentData.title = title;
      if (editedFields.documentAlias) documentData.documentAlias = documentAlias;
      if (editedFields.docDate) documentData.docDate = docDate;
      if (editedFields.content) documentData.content = content;

      console.log('Updating document with data:', documentData);
      
      await documentService.updateDocument(Number(id), documentData);
      toast.success('Document updated successfully');
      navigate(`/documents/${id}`);
    } catch (error) {
      console.error('Failed to update document:', error);
      toast.error('Failed to update document');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDocumentFlow = () => {
    if (id) {
      navigate(`/documents/${id}/flow`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-blue-400/80">
            <Link to="/documents" className="hover:text-blue-300">Documents</Link>
            <span>/</span>
            {document && (
              <>
                <Link to={`/documents/${id}`} className="hover:text-blue-300">
                  {document.documentKey}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-blue-100">Edit</span>
          </div>
          
          <h1 className="text-3xl font-bold text-white mt-2">
            Edit Document
          </h1>
        </div>
        
        <div className="flex space-x-3">
          {document?.circuitId && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleDocumentFlow}
              className="border-blue-900/30 text-white hover:bg-blue-900/20"
            >
              <GitBranch className="h-5 w-5 mr-2" /> Document Flow
            </Button>
          )}
          <Button
            variant="outline" 
            size="lg" 
            onClick={() => navigate(`/documents/${id}`)}
            className="border-blue-900/30 text-white hover:bg-blue-900/20"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Document
          </Button>
        </div>
      </div>
      
      {document && (
        <div className="flex items-center">
          <Badge variant="outline" className="font-mono text-sm mr-3">
            {document.documentKey}
          </Badge>
          <p className="text-sm text-gray-400">
            Last updated: {new Date(document.updatedAt).toLocaleDateString()}
          </p>
        </div>
      )}

      {isLoading ? (
        <Card className="animate-pulse bg-[#0a1033] border border-blue-900/30">
          <CardContent className="p-6 space-y-6">
            <div className="h-12 bg-[#111633] rounded"></div>
            <div className="h-12 bg-[#111633] rounded"></div>
            <div className="h-12 bg-[#111633] rounded"></div>
            <div className="h-40 bg-[#111633] rounded"></div>
          </CardContent>
        </Card>
      ) : document ? (
        <Card className="bg-[#0a1033] border border-blue-900/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Edit Document Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="documentType" className="text-base font-medium text-blue-100">Document Type*</Label>
                  <Select 
                    value={selectedTypeId?.toString() || ''} 
                    onValueChange={handleTypeIdChange}
                  >
                    <SelectTrigger className="h-12 text-base bg-[#111633] border-blue-900/30 text-white">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111633] border-blue-900/30 text-white">
                      {documentTypes.map(type => (
                        <SelectItem key={type.id} value={type.id!.toString()}>
                          {type.typeName} ({type.typeKey})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {editedFields.typeId && (
                    <p className="text-xs text-yellow-400">
                      ⚠️ Changing the document type may update the document key
                    </p>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="documentAlias" className="text-base font-medium text-blue-100">Document Alias</Label>
                  <Input 
                    id="documentAlias" 
                    value={documentAlias} 
                    onChange={handleDocumentAliasChange}
                    placeholder="e.g., INV for Invoice"
                    maxLength={10}
                    className="h-12 text-base bg-[#111633] border-blue-900/30 text-white"
                  />
                  <p className={`text-xs ${
                    editedFields.documentAlias 
                      ? "text-yellow-400" 
                      : "text-gray-400"
                  }`}>
                    {document.documentKey.includes(documentAlias) ? 
                      'Current document key contains this alias' : 
                      '⚠️ Changing this will update the document key'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="title" className="text-base font-medium text-blue-100">Document Title*</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={handleTitleChange}
                  placeholder="Enter document title"
                  className="h-12 text-base bg-[#111633] border-blue-900/30 text-white"
                />
                {editedFields.title && (
                  <p className="text-xs text-blue-400">
                    ℹ️ Title has been modified
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="docDate" className="text-base font-medium text-blue-100">Document Date*</Label>
                <Input 
                  id="docDate" 
                  type="date" 
                  value={docDate} 
                  onChange={handleDocDateChange}
                  className="h-12 text-base bg-[#111633] border-blue-900/30 text-white"
                />
                {editedFields.docDate && (
                  <p className="text-xs text-blue-400">
                    ℹ️ Date has been modified
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="content" className="text-base font-medium text-blue-100">Document Content*</Label>
                <Textarea 
                  id="content" 
                  value={content} 
                  onChange={handleContentChange}
                  placeholder="Enter document content"
                  rows={10}
                  className="text-base resize-y bg-[#111633] border-blue-900/30 text-white"
                />
                {editedFields.content && (
                  <p className="text-xs text-blue-400">
                    ℹ️ Content has been modified
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate(`/documents/${id}`)} 
                  className="px-6 border-blue-900/30 text-white hover:bg-blue-900/20"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting || !Object.values(editedFields).some(edited => edited)}
                  size="lg"
                  className={`px-6 ${
                    Object.values(editedFields).some(edited => edited) 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-blue-600/50 hover:bg-blue-700/50 cursor-not-allowed"
                  }`}
                >
                  <Save className="mr-2 h-5 w-5" /> 
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-[#0a1033] border border-blue-900/30 shadow-lg">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-gray-400">Document not found or you don't have permission to edit it.</p>
            <Button 
              onClick={() => navigate('/documents')} 
              className="mt-4"
              variant="outline"
              size="lg"
            >
              Back to Documents
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EditDocument;
