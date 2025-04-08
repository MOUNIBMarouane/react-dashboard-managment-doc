
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface ActionButtonProps {
  isLoading?: boolean;
  currentStep?: number;
  onNext?: () => void;
  onBack?: () => void;
  isNextDisabled?: boolean;
  type?: "next" | "back";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode; // Add the children prop
}

const ActionButton = ({
  isLoading,
  currentStep,
  onNext,
  onBack,
  isNextDisabled = false,
  type = "next",
  onClick,
  disabled,
  className = "",
  children
}: ActionButtonProps) => {
  // Handle the case where we're using the simpler API with type, onClick, and children
  if (type && onClick !== undefined) {
    const isNextType = type === "next";
    
    return (
      <motion.div
        initial={{ opacity: 0, x: isNextType ? 10 : -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`w-full ${className}`}
      >
        <Button
          type="button"
          onClick={onClick}
          disabled={disabled || isLoading}
          className={`w-full ${isNextType 
            ? "bg-dashboard-accent hover:bg-dashboard-accent/90 text-white" 
            : "bg-transparent border border-white/10 hover:bg-white/5 text-white"}`}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {isNextType ? (
                <>
                  {children}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {children}
                </>
              )}
            </>
          )}
        </Button>
      </motion.div>
    );
  }
  
  // Original implementation for the multi-step form
  return (
    <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
      {currentStep && currentStep > 1 && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full sm:w-auto order-2 sm:order-1"
        >
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
            className="w-full bg-transparent border-white/10 hover:bg-white/5 text-white"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </motion.div>
      )}
      
      <motion.div 
        className="w-full sm:w-auto order-1 sm:order-2"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          type="button"
          onClick={onNext}
          disabled={isLoading || isNextDisabled}
          className="w-full bg-dashboard-accent hover:bg-dashboard-accent/90 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {currentStep === 3 ? 'Creating Account...' : 'Processing...'}
            </>
          ) : (
            <>
              {currentStep && currentStep < 3 ? 'Next' : 'Create Account'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default ActionButton;
