
import React from 'react';
import { Label } from '@/components/ui/label';
import { CustomInput } from '@/components/ui/custom-input';

interface PersonalUserFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
    jobTitle: string;
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
    <div className="grid grid-cols-1 gap-4 mb-2">
      {/* First Name Field */}
      <div className="space-y-1">
        <Label htmlFor="firstName">First Name*</Label>
        <CustomInput
          id="firstName"
          name="firstName"
          placeholder="Enter first name"
          className="bg-gray-950 border-gray-800"
          error={!!localErrors.firstName}
          value={formData.firstName}
          onChange={handleChange}
        />
        {localErrors.firstName && (
          <p className="text-xs text-red-500">{localErrors.firstName}</p>
        )}
      </div>

      {/* Last Name Field */}
      <div className="space-y-1">
        <Label htmlFor="lastName">Last Name*</Label>
        <CustomInput
          id="lastName"
          name="lastName"
          placeholder="Enter last name"
          className="bg-gray-950 border-gray-800"
          error={!!localErrors.lastName}
          value={formData.lastName}
          onChange={handleChange}
        />
        {localErrors.lastName && (
          <p className="text-xs text-red-500">{localErrors.lastName}</p>
        )}
      </div>

      {/* Job Title Field */}
      <div className="space-y-1">
        <Label htmlFor="jobTitle">Job Title*</Label>
        <CustomInput
          id="jobTitle"
          name="jobTitle"
          placeholder="Enter job title"
          className="bg-gray-950 border-gray-800"
          error={!!localErrors.jobTitle}
          value={formData.jobTitle}
          onChange={handleChange}
        />
        {localErrors.jobTitle && (
          <p className="text-xs text-red-500">{localErrors.jobTitle}</p>
        )}
      </div>

      {/* CIN Field */}
      <div className="space-y-1">
        <Label htmlFor="cin">CIN (Optional)</Label>
        <CustomInput
          id="cin"
          name="cin"
          placeholder="Enter CIN"
          className="bg-gray-950 border-gray-800"
          error={!!localErrors.cin}
          value={formData.cin || ''}
          onChange={handleChange}
        />
        {localErrors.cin && (
          <p className="text-xs text-red-500">{localErrors.cin}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalUserFields;
