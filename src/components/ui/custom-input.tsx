
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input, InputProps } from "@/components/ui/input";

export interface CustomInputProps extends InputProps {
  error?: boolean;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn(
          className,
          error && "border-red-500 focus-visible:ring-red-500"
        )}
        {...props}
      />
    );
  }
);

CustomInput.displayName = "CustomInput";
