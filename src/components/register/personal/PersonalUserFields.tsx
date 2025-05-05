
import React from 'react';
import { Label } from "@/components/ui/label";
import { CustomInput } from "@/components/ui/custom-input";
import { FormError } from '@/components/ui/form-error';

interface PersonalUserFieldsProps {
  formData: {
    firstName?: string;
    lastName?: string;
    cin?: string;
    personalPhone?: string;
  };
  localErrors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalUserFields: React.FC<PersonalUserFieldsProps> = ({
  formData,
  localErrors,
  handleChange
}) => {
  return (
    <div className="space-y-6">
      {/* First Name Field */}
      <div className="space-y-2">
        <Label htmlFor="firstName" className="text-sm font-medium">
          First Name
        </Label>
        <CustomInput
          id="firstName"
          name="firstName"
          placeholder="Enter your first name"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!localErrors.firstName}
          value={formData.firstName || ''}
          onChange={handleChange}
        />
        {localErrors.firstName && <FormError message={localErrors.firstName} />}
      </div>

      {/* Last Name Field */}
      <div className="space-y-2">
        <Label htmlFor="lastName" className="text-sm font-medium">
          Last Name
        </Label>
        <CustomInput
          id="lastName"
          name="lastName"
          placeholder="Enter your last name"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!localErrors.lastName}
          value={formData.lastName || ''}
          onChange={handleChange}
        />
        {localErrors.lastName && <FormError message={localErrors.lastName} />}
      </div>

      {/* CIN Field */}
      <div className="space-y-2">
        <Label htmlFor="cin" className="text-sm font-medium">
          CIN
        </Label>
        <CustomInput
          id="cin"
          name="cin"
          placeholder="Enter your identification number"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!localErrors.cin}
          value={formData.cin || ''}
          onChange={handleChange}
        />
        {localErrors.cin && <FormError message={localErrors.cin} />}
      </div>

      {/* Personal Phone Field */}
      <div className="space-y-2">
        <Label htmlFor="personalPhone" className="text-sm font-medium">
          Phone Number
        </Label>
        <CustomInput
          id="personalPhone"
          name="personalPhone"
          placeholder="Enter your phone number"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!localErrors.personalPhone}
          value={formData.personalPhone || ''}
          onChange={handleChange}
        />
        {localErrors.personalPhone && <FormError message={localErrors.personalPhone} />}
      </div>
    </div>
  );
};

export default PersonalUserFields;
