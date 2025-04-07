
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Document, DocumentStatus } from "@/types/document";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddEditDocumentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (document: Document) => void;
  documentToEdit?: Document;
  isEditing: boolean;
}

const documentTypes = [
  "Report", "Strategy", "Planning", "Policy", "Proposal", 
  "Financial", "Technical", "Legal", "Contract", "Other"
];

const AddEditDocumentDialog: React.FC<AddEditDocumentDialogProps> = ({
  isOpen,
  onOpenChange,
  onSave,
  documentToEdit,
  isEditing
}) => {
  const [document, setDocument] = useState<Partial<Document>>({
    title: "",
    content: "",
    type: "Report",
    status: "Draft" as DocumentStatus,
  });

  useEffect(() => {
    if (documentToEdit && isEditing) {
      setDocument(documentToEdit);
    } else {
      setDocument({
        title: "",
        content: "",
        type: "Report",
        status: "Draft" as DocumentStatus,
      });
    }
  }, [documentToEdit, isEditing, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDocument(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!document.title?.trim()) {
      // Simple validation
      return;
    }
    
    onSave(document as Document);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dashboard-blue-dark border-white/10 animate-scale-in max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">{isEditing ? "Edit Document" : "Add New Document"}</DialogTitle>
          <DialogDescription className="text-white/70">
            {isEditing ? "Update the document information below." : "Fill in the information below to create a new document."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div>
            <Label htmlFor="title" className="text-white mb-2 block">Title</Label>
            <Input 
              id="title"
              name="title"
              value={document.title || ""}
              onChange={handleChange}
              placeholder="Enter document title"
              className="bg-white/5 border-white/20 text-white focus:ring-dashboard-accent"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type" className="text-white mb-2 block">Type</Label>
              <Select 
                value={document.type || "Report"} 
                onValueChange={(value) => setDocument(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger id="type" className="bg-white/5 border-white/20 text-white focus:ring-dashboard-accent">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-dashboard-blue-dark border-white/20 text-white">
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type} className="focus:bg-white/10 focus:text-white">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status" className="text-white mb-2 block">Status</Label>
              <Select 
                value={document.status || "Draft"} 
                onValueChange={(value: DocumentStatus) => setDocument(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger id="status" className="bg-white/5 border-white/20 text-white focus:ring-dashboard-accent">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-dashboard-blue-dark border-white/20 text-white">
                  <SelectItem value="Draft" className="focus:bg-white/10 focus:text-white">Draft</SelectItem>
                  <SelectItem value="Published" className="focus:bg-white/10 focus:text-white">Published</SelectItem>
                  <SelectItem value="Archived" className="focus:bg-white/10 focus:text-white">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="content" className="text-white mb-2 block">Content</Label>
            <Textarea 
              id="content"
              name="content"
              value={document.content || ""}
              onChange={handleChange}
              placeholder="Enter document content"
              className="bg-white/5 border-white/20 text-white focus:ring-dashboard-accent min-h-32"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-white/20 text-white hover:bg-white/10 transition-all duration-300"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-dashboard-accent hover:bg-dashboard-accent/90 transition-all duration-300"
          >
            {isEditing ? "Save Changes" : "Create Document"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditDocumentDialog;
