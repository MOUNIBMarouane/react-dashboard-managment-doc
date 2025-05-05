
import React from 'react';
import { Label } from '@/components/ui/label';
import { CustomInput } from '@/components/ui/custom-input';

interface CompanyUserFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
    jobTitle: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

const CompanyUserFields: React.FC<CompanyUserFieldsProps> = ({
  formData,
  onChange,
  errors
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
      {/* First Name Field */}
      <div className="space-y-1">
        <Label htmlFor="firstName">First Name</Label>
        <CustomInput
          id="firstName"
          name="firstName"
          placeholder="First Name"
          className="bg-gray-950 border-gray-800"
          error={!!errors.firstName}
          value={formData.firstName}
          onChange={onChange}
        />
        {errors.firstName && (
          <p className="text-xs text-red-500">{errors.firstName}</p>
        )}
      </div>

      {/* Last Name Field */}
      <div className="space-y-1">
        <Label htmlFor="lastName">Last Name</Label>
        <CustomInput
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          className="bg-gray-950 border-gray-800"
          error={!!errors.lastName}
          value={formData.lastName}
          onChange={onChange}
        />
        {errors.lastName && (
          <p className="text-xs text-red-500">{errors.lastName}</p>
        )}
      </div>

      {/* Job Title Field */}
      <div className="space-y-1 sm:col-span-2">
        <Label htmlFor="jobTitle">Job Title</Label>
        <CustomInput
          id="jobTitle"
          name="jobTitle"
          placeholder="Job Title"
          className="bg-gray-950 border-gray-800"
          error={!!errors.jobTitle}
          value={formData.jobTitle}
          onChange={onChange}
        />
        {errors.jobTitle && (
          <p className="text-xs text-red-500">{errors.jobTitle}</p>
        )}
      </div>
    </div>
  );
};

export default CompanyUserFields;
