
// No need for the complete component rewrite, just modify the date picker props
// to accept Date or string values, the main issue is with the selected prop type
// which expects a Matcher type but receiving Date | string

// The issue can be solved by wrapping the value in new Date() when passing to DatePicker
// Example usage:
// <DatePicker selected={startDate ? new Date(startDate) : undefined} />

import React from 'react';
import { Calendar } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { FormLabel } from '@/components/ui/form';
import { useSubTypeForm } from '../SubTypeFormProvider';
import { Switch } from '@/components/ui/switch';

export const SubTypeDatesStatus: React.FC = () => {
  const { formData, setFormData, errors, setErrors } = useSubTypeForm();
  
  const handleStartDateChange = (date: Date | null) => {
    if (!date) return;
    
    setFormData(prev => {
      const newStartDate = date;
      let newEndDate = prev.endDate;
      
      // If the new start date is after the current end date, update the end date
      if (new Date(newStartDate) > new Date(newEndDate)) {
        // Set end date to start date + 1 year
        const yearLater = new Date(newStartDate);
        yearLater.setFullYear(yearLater.getFullYear() + 1);
        newEndDate = yearLater;
      }
      
      return {
        ...prev,
        startDate: newStartDate,
        endDate: newEndDate
      };
    });
    
    // Clear any related errors
    if (errors.startDate || errors.endDate) {
      const newErrors = { ...errors };
      delete newErrors.startDate;
      delete newErrors.endDate;
      setErrors(newErrors);
    }
  };
  
  const handleEndDateChange = (date: Date | null) => {
    if (!date) return;
    
    setFormData(prev => {
      const newEndDate = date;
      
      // If the new end date is before the current start date, show error
      if (new Date(newEndDate) < new Date(prev.startDate)) {
        setErrors(prev => ({
          ...prev,
          endDate: "End date cannot be before start date"
        }));
        return prev;
      }
      
      return {
        ...prev,
        endDate: newEndDate
      };
    });
    
    // Clear any related errors
    if (errors.endDate) {
      const newErrors = { ...errors };
      delete newErrors.endDate;
      setErrors(newErrors);
    }
  };
  
  const handleActiveChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      isActive: checked
    }));
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <FormLabel className="text-blue-300">Start Date</FormLabel>
        <div className="relative">
          <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
          <DatePicker 
            selected={formData.startDate ? new Date(formData.startDate) : undefined}
            onSelect={handleStartDateChange}
            className="w-full pl-10 bg-blue-950/40 border-blue-900/40 text-white"
          />
        </div>
        {errors.startDate && (
          <p className="text-red-400 text-xs mt-1">{errors.startDate}</p>
        )}
      </div>
      
      <div className="space-y-1">
        <FormLabel className="text-blue-300">End Date</FormLabel>
        <div className="relative">
          <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
          <DatePicker 
            selected={formData.endDate ? new Date(formData.endDate) : undefined}
            onSelect={handleEndDateChange}
            className="w-full pl-10 bg-blue-950/40 border-blue-900/40 text-white"
          />
        </div>
        {errors.endDate && (
          <p className="text-red-400 text-xs mt-1">{errors.endDate}</p>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-2 border-t border-blue-900/30">
        <FormLabel className="text-blue-300 cursor-pointer">Active Status</FormLabel>
        <Switch 
          checked={formData.isActive}
          onCheckedChange={handleActiveChange}
        />
      </div>
    </div>
  );
};
