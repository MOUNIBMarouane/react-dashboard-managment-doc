
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash, FileEdit, FileText, Search, FilePlus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DocumentsHeaderProps {
  selectedDocuments: string[];
  onOpenStatusDialog: () => void;
  onOpenDeleteDialog: () => void;
  onOpenAddDocumentDialog: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const DocumentsHeader: React.FC<DocumentsHeaderProps> = ({
  selectedDocuments,
  onOpenStatusDialog,
  onOpenDeleteDialog,
  onOpenAddDocumentDialog,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <FileText className="mr-2 text-dashboard-accent" />
          <h1 className="text-2xl font-bold text-white">Documents</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Button
            onClick={onOpenAddDocumentDialog}
            className="bg-dashboard-accent hover:bg-dashboard-accent/90 transition-all duration-300 hover:scale-105"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Add Document
          </Button>
          
          {selectedDocuments.length > 0 && (
            <>
              <Button 
                variant="outline" 
                onClick={onOpenStatusDialog}
                className="border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <FileEdit className="mr-2 h-4 w-4" />
                Change Status
              </Button>
              
              <Button 
                variant="destructive" 
                onClick={onOpenDeleteDialog}
                className="transition-all duration-300 hover:scale-105"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Selected
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search documents by title, type, status or content..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-dashboard-accent max-w-md w-full"
        />
      </div>
    </div>
  );
};

export default DocumentsHeader;
