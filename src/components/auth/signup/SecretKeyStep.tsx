
import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Key } from "lucide-react";

interface SecretKeyStepProps {
  secretKey: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (checked: boolean) => void;
  isAdminAccount: boolean;
  errors?: {[key: string]: string};
}

const SecretKeyStep = ({ 
  secretKey, 
  handleChange, 
  handleCheckboxChange,
  isAdminAccount,
  errors = {}
}: SecretKeyStepProps) => {
  return (
    <div className="space-y-4">
      {errors.secretKey && (
        <Alert className="bg-red-500/10 border-red-500/30 text-red-500">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription>{errors.secretKey}</AlertDescription>
        </Alert>
      )}
      
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
          <div className="relative">
            <Input
              id="secretKey"
              name="secretKey"
              value={secretKey}
              onChange={handleChange}
              placeholder="Enter admin secret key"
              className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
                errors.secretKey ? "border-red-500" : secretKey ? "border-dashboard-accent" : ""
              }`}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Key className="h-4 w-4 text-gray-400" />
            </div>
            <span className="absolute inset-y-0 left-0 pl-10 flex items-center pointer-events-none"></span>
          </div>
          {errors.secretKey && (
            <p className="text-sm text-red-500 mt-1 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" /> {errors.secretKey}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">
            You must provide the admin secret key to register as an admin. Invalid keys will result in registration failure.
          </p>
        </div>
      )}
    </div>
  );
};

export default SecretKeyStep;
