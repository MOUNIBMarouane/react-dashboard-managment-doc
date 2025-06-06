
import React, { useState, useEffect } from 'react';
import { useMultiStepForm } from '@/context/form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import CompanyAddressFields from './company/CompanyAddressFields';
import { ScrollArea } from '@/components/ui/scroll-area';

const validateCompanyAddress = (formData: {
  address?: string;
  city?: string;
  zipCode?: string;
}) => {
  const errors: Record<string, string> = {};
  
  // These fields are optional, only validate if provided
  if (formData.address && formData.address.trim().length === 0) {
    errors.address = 'Company address cannot be empty if provided';
  }
  
  if (formData.city && formData.city.trim().length === 0) {
    errors.city = 'City cannot be empty if provided';
  }
  
  if (formData.zipCode && formData.zipCode.trim().length === 0) {
    errors.zipCode = 'Zip code cannot be empty if provided';
  }
  
  return errors;
};

const StepTwoCompanyAddress = () => {
  const { formData, setFormData, prevStep, nextStep } = useMultiStepForm();
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState({
    address: false,
    city: false,
    zipCode: false
  });

  // Initialize default values if not already set
  useEffect(() => {
    const defaults = {
      address: formData.address || formData.companyAddress || '',
      city: formData.city || '',
      zipCode: formData.zipCode || ''
    };
    setFormData(defaults);
  }, []);

  useEffect(() => {
    const errors = validateCompanyAddress({
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode
    });
    setLocalErrors(errors);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
    
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
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode
    });
    
    // Set all fields as touched
    setTouchedFields({
      address: true,
      city: true,
      zipCode: true
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
  Object.keys(localErrors).forEach(key => {
    if (touchedFields[key as keyof typeof touchedFields]) {
      visibleErrors[key] = localErrors[key];
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
          formData={{
            address: formData.address || '',
            city: formData.city || '',
            zipCode: formData.zipCode || ''
          }}
          localErrors={visibleErrors}
          handleChange={handleChange}
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
