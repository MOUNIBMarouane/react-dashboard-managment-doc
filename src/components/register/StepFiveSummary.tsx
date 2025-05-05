
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface StepFiveSummaryProps {
  email: string;
  username: string;
  acceptedTerms: boolean;
}

export const StepFiveSummary = ({
  email,
  username,
  acceptedTerms,
}: StepFiveSummaryProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    // Here you would typically try to log the user in automatically
    
    toast({
      title: "Registration complete!",
      variant: "success"
    });
    
    // Navigate to login
    navigate("/login");
  };

  return (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-8 h-8 text-green-500" />
      </div>
      
      <h2 className="text-2xl font-semibold text-white">
        Registration Complete!
      </h2>
      
      <p className="text-gray-400">
        Your account has been created successfully. Please check your email at{" "}
        <span className="text-blue-400 font-medium">{email}</span> to verify 
        your account before logging in.
      </p>
      
      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-gray-300 font-medium">Account Information</p>
        <div className="mt-2 flex flex-col gap-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Username:</span>
            <span className="text-gray-200">{username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Email:</span>
            <span className="text-gray-200">{email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Terms Accepted:</span>
            <span className="text-green-500">Yes</span>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleContinue}
        className="w-full"
      >
        Continue to Login
      </Button>
    </div>
  );
};
