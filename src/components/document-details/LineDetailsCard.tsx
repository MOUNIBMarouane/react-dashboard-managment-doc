
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentLine } from "@/types/documentLine";
import { format, parseISO } from "date-fns";
import { FileText, Calendar, DollarSign, Hash } from "lucide-react";

interface LineDetailsCardProps {
  line: DocumentLine;
}

const LineDetailsCard: React.FC<LineDetailsCardProps> = ({ line }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMMM d, yyyy 'at' h:mm a");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="bg-dashboard-blue-dark border-white/10 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-dashboard-accent" />
          {line.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-1">Description</h3>
              <p className="text-white/90 bg-white/5 p-3 rounded-md border border-white/10">
                {line.description || "No description available"}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-dashboard-accent" />
              <span className="text-sm text-white/70">Created: </span>
              <span className="text-sm text-white">{formatDate(line.createdAt)}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Hash size={16} className="text-dashboard-accent" />
              <span className="text-sm text-white/70">Quantity: </span>
              <span className="text-sm text-white">{line.quantity}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-dashboard-accent" />
              <span className="text-sm text-white/70">Unit Price: </span>
              <span className="text-sm text-white">${line.unitPrice?.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-dashboard-accent" />
              <span className="text-sm text-white/70">Total Amount: </span>
              <span className="text-sm font-medium text-white">${line.totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineDetailsCard;
