
import React from 'react';
import { Label } from '@/components/ui/label';
import { CustomInput } from '@/components/ui/custom-input';
import { PasswordFields } from '../fields/PasswordFields';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { FormData } from '@/context/form/types';

interface StepTwoFormFieldsProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  localErrors: Record<string, string>;
  validationErrors: {
    username?: string;
    email?: string;
    registration?: string;
  };
  passwordStrength: number;
}

const StepTwoFormFields: React.FC<StepTwoFormFieldsProps> = ({
  formData,
  onChange,
  localErrors,
  validationErrors,
  passwordStrength
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <CustomInput
          id="username"
          name="username"
          placeholder="Choose a username"
          className="bg-gray-950 border-gray-800"
          error={!!(localErrors.username || validationErrors.username)}
          value={formData.username}
          onChange={onChange}
        />
        {(localErrors.username || validationErrors.username) && (
          <p className="text-xs text-red-500">{localErrors.username || validationErrors.username}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email Address</Label>
        <CustomInput
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          className="bg-gray-950 border-gray-800"
          error={!!(localErrors.email || validationErrors.email)}
          value={formData.email}
          onChange={onChange}
        />
        {(localErrors.email || validationErrors.email) && (
          <p className="text-xs text-red-500">{localErrors.email || validationErrors.email}</p>
        )}
      </div>

      <PasswordFields
        formData={{
          password: formData.password,
          confirmPassword: formData.confirmPassword
        }}
        onChange={onChange}
        localErrors={localErrors}
        passwordStrength={passwordStrength}
      />

      {validationErrors.registration && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {validationErrors.registration}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default StepTwoFormFields;
