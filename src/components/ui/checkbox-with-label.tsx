
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxWithLabelProps {
  label: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function CheckboxWithLabel({
  label,
  description,
  checked = false,
  onCheckedChange,
  disabled = false,
}: CheckboxWithLabelProps) {
  return (
    <div className="flex items-start space-x-2">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="mt-1"
      />
      <div>
        <label
          className={`text-sm font-medium ${
            disabled ? "text-muted-foreground" : "text-foreground"
          }`}
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
