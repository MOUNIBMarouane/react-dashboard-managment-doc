
import React from "react";
import { Input } from "@/components/ui/input";

interface SecretKeyStepProps {
  secretKey: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SecretKeyStep = ({ secretKey, handleChange }: SecretKeyStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="secretKey" className="text-sm font-medium text-gray-200">
          Secret Key (Optional)
        </label>
        <Input
          id="secretKey"
          name="secretKey"
          value={secretKey}
          onChange={handleChange}
          placeholder="Enter your secret key if you have one"
          className="bg-dashboard-blue-light text-white border-dashboard-blue-light"
        />
        <p className="text-xs text-gray-400 mt-1">
          Leave empty if you don't have a secret key.
        </p>
      </div>
    </div>
  );
};

export default SecretKeyStep;
