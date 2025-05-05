
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FormError } from "@/components/ui/form-error";
import authService from "@/services/authService";

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
}

export const EmailVerification = ({ email, onVerified }: EmailVerificationProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!verificationCode.trim()) {
      setError("Please enter your verification code");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await authService.verifyEmail({
        email,
        verificationCode
      });
      
      toast({
        title: "Email verified successfully",
        variant: "success"
      });
      
      onVerified();
    } catch (err: any) {
      setError(err.response?.data || "Invalid verification code. Please try again.");
      toast({
        title: "Verification failed",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setIsSubmitting(true);
    
    try {
      await authService.resendVerificationCode({ email });
      toast({
        title: "Verification code resent",
        variant: "success"
      });
    } catch (err: any) {
      toast({
        title: "Failed to resend code",
        variant: "destructive"
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
          <Input
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
