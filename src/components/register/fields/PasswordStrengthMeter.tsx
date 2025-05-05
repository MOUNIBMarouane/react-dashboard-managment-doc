
import React from 'react';

interface PasswordStrengthMeterProps {
  strength: number;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ strength }) => {
  const getStrengthLabel = () => {
    if (strength === 0) return '';
    if (strength <= 2) return 'Weak';
    if (strength <= 4) return 'Medium';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (strength === 0) return 'bg-gray-200';
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full transition-all ${getStrengthColor()}`}
          style={{ width: `${strength * 20}%` }}
        ></div>
      </div>
      <p className="text-xs mt-1">
        Strength: <span className="font-medium">{getStrengthLabel()}</span>
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;
