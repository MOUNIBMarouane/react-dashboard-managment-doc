import React, { useState, useEffect } from 'react';
import { useMultiStepForm } from '@/context/form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import CompanyAddressFields from './company/CompanyAddressFields';
import { ScrollArea } from '@/components/ui/scroll-area';

// Optional validation for company address
const validateCompanyAddress = (formData: {
  companyAddress?: string;
  companyCity?: string;
  companyCountry?: string;
}) => {
  const errors: Record<string, string> = {};
  
  // These fields are optional, only validate if provided
  if (formData.companyAddress && formData.companyAddress.trim().length === 0) {
    errors.companyAddress = 'Company address cannot be empty if provided';
  }
  
  if (formData.companyCity && formData.companyCity.trim().length === 0) {
    errors.companyCity = 'City cannot be empty if provided';
  }
  
  if (formData.companyCountry && formData.companyCountry.trim().length === 0) {
    errors.companyCountry = 'Country cannot be empty if provided';
  }
  
  return errors;
};

const StepTwoCompanyAddress = () => {
  const { formData, setFormData, prevStep, nextStep } = useMultiStepForm();
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState({
    address: false,
    city: false,
    country: false
  });

  useEffect(() => {
    const errors = validateCompanyAddress({
      companyAddress: formData.companyAddress,
      companyCity: formData.companyCity,
      companyCountry: formData.companyCountry
    });
    setLocalErrors(errors);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Map field names to formData properties
    const fieldMapping: Record<string, string> = {
      'address': 'companyAddress',
      'city': 'companyCity',
      'country': 'companyCountry'
    };
    
    const formDataKey = fieldMapping[name] || name;
    setFormData({ [formDataKey]: value });
    
    // Mark field as touched when the user interacts with it
    if (!touchedFields[name as keyof typeof touchedFields]) {
      setTouchedFields(prev => ({
        ...prev,
        [name]: true
      }));
    }
  };

  const validateStep = () => {
    const errors = validateCompanyAddress({
      companyAddress: formData.companyAddress,
      companyCity: formData.companyCity,
      companyCountry: formData.companyCountry
    });
    
    // Set all fields as touched
    setTouchedFields({
      address: true,
      city: true,
      country: true
    });
    
    setLocalErrors(errors);
    
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) {
      toast.error("Please correct the errors before proceeding");
      return;
    }
    
    nextStep();
  };

  // Filter errors to only show for touched fields
  const visibleErrors: Record<string, string> = {};
  Object.entries(localErrors).forEach(([key, value]) => {
    const fieldName = key.replace('company', '').toLowerCase();
    if (touchedFields[fieldName as keyof typeof touchedFields]) {
      visibleErrors[fieldName] = value;
    }
  });

  return (
    <div className="space-y-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1">Company Address</h2>
        <p className="text-gray-400 text-sm">
          This information is optional. You can provide it now or add it later.
        </p>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        <CompanyAddressFields
          address={formData.companyAddress || ''}
          city={formData.companyCity || ''}
          country={formData.companyCountry || ''}
          errors={visibleErrors}
          onChange={handleChange}
        />
      </ScrollArea>

      <div className="pt-2 flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          type="button"
          className="w-full max-w-[200px] bg-docuBlue hover:bg-docuBlue-700"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepTwoCompanyAddress;
