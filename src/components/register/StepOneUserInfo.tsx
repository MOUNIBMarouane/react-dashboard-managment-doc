
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { CustomInput } from '@/components/ui/custom-input';
import { useSettings } from '@/context/SettingsContext';
import { useMultiStepForm } from '@/context/form';
import { FormData } from '@/context/form/types';

interface StepOneUserInfoProps {
  localErrors: Record<string, string>;
}

const StepOneUserInfo: React.FC<StepOneUserInfoProps> = ({ localErrors }) => {
  const { theme } = useSettings();
  const isDark = theme === 'dark';
  const { register } = useFormContext();
  const { formData, setFormData } = useMultiStepForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
  };

  return (
    <div className="grid grid-cols-1 gap-4 mb-2">
      {/* First Name Field */}
      <div className="space-y-1">
        <Label htmlFor="firstName">First Name</Label>
        <CustomInput
          id="firstName"
          {...register("firstName")}
          placeholder="First Name"
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
        <Label htmlFor="lastName">Last Name</Label>
        <CustomInput
          id="lastName"
          {...register("lastName")}
          placeholder="Last Name"
          className="bg-gray-950 border-gray-800"
          error={!!localErrors.lastName}
          value={formData.lastName}
          onChange={handleChange}
        />
        {localErrors.lastName && (
          <p className="text-xs text-red-500">{localErrors.lastName}</p>
        )}
      </div>
    </div>
  );
};

export default StepOneUserInfo;
