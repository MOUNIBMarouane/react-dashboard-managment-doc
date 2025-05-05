import React from 'react';
import { format } from 'date-fns';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SubTypeDetailsProps {
  id: number;
  name: string;
  description?: string;
  startDate: string | Date;
  endDate: string | Date;
  isActive: boolean;
  documentTypeName: string;
}

export const SubTypeDetails: React.FC<SubTypeDetailsProps> = ({
  id,
  name,
  description,
  startDate,
  endDate,
  isActive,
  documentTypeName,
}) => {
  // Format dates
  const formatDate = (date: Date | string): string => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'PP');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-white">{name}</h3>
        {description && <p className="text-sm text-blue-300 mt-1">{description}</p>}
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-blue-300">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Valid period</span>
        </div>
        <div className="text-white">
          {formattedStartDate} - {formattedEndDate}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-blue-300">
          <span>Document Type</span>
        </div>
        <div className="text-white">{documentTypeName}</div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-blue-300">
          <span>Status</span>
        </div>
        {isActive ? (
          <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Active
          </Badge>
        ) : (
          <Badge variant="outline" className="text-gray-400 border-gray-600">
            Inactive
          </Badge>
        )}
      </div>
    </div>
  );
};
