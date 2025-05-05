import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import { DocumentType } from '@/models/document';
import { SubType } from '@/models/subtype';
import documentService from '@/services/documentService';
import subTypeService from '@/services/subTypeService';
import { useToast } from "@/components/ui/use-toast"

interface CreateDocumentModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  documentTypes: DocumentType[];
  onDocumentCreated: () => void;
}

const CreateDocumentModal: React.FC<CreateDocumentModalProps> = ({
  open,
  setOpen,
  documentTypes,
  onDocumentCreated
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [documentTypeId, setDocumentTypeId] = useState<number | null>(null);
  const [subTypeId, setSubTypeId] = useState<number | null>(null);
  const [isTemplate, setIsTemplate] = useState(false);
  const { toast } = useToast()

  const { data: subTypes = [] } = useQuery({
    queryKey: ['subtypes', documentTypeId],
    queryFn: () => subTypeService.getSubTypesByDocumentTypeId(documentTypeId || 0),
    enabled: !!documentTypeId,
  });

  const handleSubmit = async () => {
    if (!title || !documentTypeId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      })
      return;
    }

    try {
      await documentService.createDocument({
        title,
        description,
        documentTypeId,
        subTypeId,
        isTemplate,
      });
      toast({
        title: "Success",
        description: "Document created successfully.",
      })
      onDocumentCreated();
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create document.",
      })
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Document</DialogTitle>
          <DialogDescription>
            Add a new document to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="documentType" className="text-right">
              Document Type
            </Label>
            <Select onValueChange={(value) => setDocumentTypeId(Number(value))}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.typeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {documentTypeId && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subType" className="text-right">
                Sub Type
              </Label>
              <Select onValueChange={(value) => setSubTypeId(Number(value))}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a sub type" />
                </SelectTrigger>
                <SelectContent>
                  {subTypes.map((subType) => (
                    <SelectItem key={subType.id} value={subType.id.toString()}>
                      {subType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isTemplate" className="text-right">
              Is Template
            </Label>
            <div className="col-span-3 flex items-center">
              <Switch id="isTemplate" checked={isTemplate} onCheckedChange={setIsTemplate} />
            </div>
          </div>
        </div>
        <Button onClick={handleSubmit}>Create Document</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDocumentModal;
