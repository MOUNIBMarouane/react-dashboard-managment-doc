
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface SecretKeyStepProps {
  secretKey: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (checked: boolean) => void;
  isAdminAccount: boolean;
}

const SecretKeyStep = ({ 
  secretKey, 
  handleChange, 
  handleCheckboxChange,
  isAdminAccount 
}: SecretKeyStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="isAdminAccount" 
          checked={isAdminAccount}
          onCheckedChange={(checked) => handleCheckboxChange(checked as boolean)} 
          className="border-dashboard-accent data-[state=checked]:bg-dashboard-accent data-[state=checked]:text-white"
        />
        <label htmlFor="isAdminAccount" className="text-sm font-medium text-gray-200 cursor-pointer">
          Register as admin account
        </label>
      </div>

      {isAdminAccount && (
        <div className="space-y-2">
          <label htmlFor="secretKey" className="text-sm font-medium text-gray-200">
            Admin Secret Key
          </label>
          <Input
            id="secretKey"
            name="secretKey"
            value={secretKey}
            onChange={handleChange}
            placeholder="Enter admin secret key"
            className="bg-dashboard-blue-light text-white border-dashboard-blue-light"
          />
          <p className="text-xs text-gray-400 mt-1">
            You must provide the admin secret key to register as an admin.
          </p>
        </div>
      )}
    </div>
  );
};

export default SecretKeyStep;
