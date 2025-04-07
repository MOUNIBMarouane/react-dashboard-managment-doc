
import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, ArrowRight } from "lucide-react";

interface ActionButtonProps {
  isLoading: boolean;
  currentStep: number;
  onClick: () => void;
}

const ActionButton = ({ isLoading, currentStep, onClick }: ActionButtonProps) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="w-full bg-dashboard-accent hover:bg-dashboard-accent-light"
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        <span className="flex items-center justify-center">
          {currentStep < 3 ? (
            <>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </>
          )}
        </span>
      )}
    </Button>
  );
};

export default ActionButton;
