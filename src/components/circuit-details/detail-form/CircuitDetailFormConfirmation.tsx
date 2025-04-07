
import React from 'react';
import { UseFormReturn } from "react-hook-form";

interface CircuitDetailFormConfirmationProps {
  form: UseFormReturn<any>;
}

const CircuitDetailFormConfirmation: React.FC<CircuitDetailFormConfirmationProps> = ({ form }) => {
  const currentValues = form.getValues();
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Please review your circuit detail information:</h3>
      <div className="rounded-md border p-4 space-y-2">
        <div>
          <span className="text-sm font-semibold">Detail Key:</span>
          <span className="text-sm ml-2">{currentValues.circuit_detail_key}</span>
        </div>
        <div>
          <span className="text-sm font-semibold">Title:</span>
          <span className="text-sm ml-2">{currentValues.title}</span>
        </div>
        <div>
          <span className="text-sm font-semibold">Description:</span>
          <span className="text-sm ml-2">{currentValues.descriptif}</span>
        </div>
      </div>
    </div>
  );
};

export default CircuitDetailFormConfirmation;
