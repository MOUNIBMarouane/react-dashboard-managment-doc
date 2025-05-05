
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FormError } from "@/components/ui/form-error";
import authService from "@/services/authService";
import { useNavigate, useParams } from "react-router-dom";
import { CustomInput } from "@/components/ui/custom-input";

interface EmailVerificationProps {
  email?: string;
  onVerified?: () => void;
}

const EmailVerification = ({ email: propEmail, onVerified }: EmailVerificationProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Use email from props or from URL params
  const email = propEmail || params.email || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!verificationCode.trim()) {
      setError("Please enter your verification code");
      return;
    }

    if (!email) {
      setError("Email is missing. Please go back to the registration page.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await authService.verifyEmail(email, verificationCode);
      
      toast({
        title: "Email verified successfully"
      });
      
      if (onVerified) {
        onVerified();
      } else {
        // If not used as a component with callback, redirect to login
        navigate("/login");
      }
    } catch (err: any) {
      setError(err.response?.data || "Invalid verification code. Please try again.");
      toast({
        title: "Verification failed"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError("Email is missing. Please go back to the registration page.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await authService.resendVerificationCode(email);
      toast({
        title: "Verification code resent"
      });
    } catch (err: any) {
      toast({
        title: "Failed to resend code"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white">Verify Your Email</h2>
        <p className="text-sm text-gray-400 mt-1">
          We've sent a verification code to <span className="text-blue-400 font-medium">{email}</span>
        </p>
      </div>

      {error && <FormError message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="verification-code" className="block text-sm font-medium text-gray-200 mb-1">
            Verification Code
          </label>
          <CustomInput
            id="verification-code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter 6-digit code"
            className="bg-gray-800 border-gray-700"
            autoComplete="one-time-code"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <Button 
            type="submit" 
            variant="default" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify Email"}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleResendCode} 
            disabled={isSubmitting}
            className="text-gray-300 border-gray-700 hover:bg-gray-800"
          >
            Resend Code
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;
