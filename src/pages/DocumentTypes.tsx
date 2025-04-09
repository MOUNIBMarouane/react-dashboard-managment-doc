
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { DocumentType } from '@/models/document';
import { Layers, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import documentService from '@/services/documentService';
import { toast } from 'sonner';

const DocumentTypes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [types, setTypes] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    fetchTypes();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="bg-[#0a1033] border border-blue-900/30 rounded-lg p-6 mb-6 transition-all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-white flex items-center">
              <Layers className="mr-3 h-6 w-6 text-blue-400" /> Document Types
            </h1>
            <p className="text-sm md:text-base text-gray-400">
              Browse and manage document classification
            </p>
          </div>
          <Button 
            onClick={() => navigate('/document-types-management')} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Management View <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="bg-[#0f1642] border-blue-900/30 shadow-lg h-[180px] animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 bg-blue-800/30 rounded w-2/3"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-blue-800/30 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-blue-800/30 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((type) => (
            <Card key={type.id} className="bg-[#0f1642] border-blue-900/30 shadow-lg overflow-hidden hover:border-blue-700/50 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">{type.typeName || 'Unnamed Type'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-300">Key: <span className="text-white">{type.typeKey || 'N/A'}</span></p>
                {type.typeAttr && (
                  <p className="text-sm text-blue-300 mt-1">
                    Attributes: <span className="text-white">{type.typeAttr}</span>
                  </p>
                )}
                <p className="text-sm text-blue-300 mt-2">
                  Documents: <span className="text-white font-medium">{type.documentCounter || 0}</span>
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 p-0"
                  onClick={() => navigate(`/documents?typeId=${type.id}`)}
                >
                  View documents
                </Button>
              </CardFooter>
            </Card>
          ))}

          {types.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-blue-900/50 bg-blue-900/10">
              <Layers className="h-12 w-12 text-blue-500/50 mb-4" />
              <h3 className="text-xl font-medium text-blue-300 mb-2">No document types found</h3>
              <p className="text-blue-400 mb-4">Create document types to better organize your documents</p>
              <Button 
                onClick={() => navigate('/document-types-management')} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Document Type
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentTypes;
