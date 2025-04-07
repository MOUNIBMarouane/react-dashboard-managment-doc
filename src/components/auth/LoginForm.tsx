import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authService } from "@/services/auth-service";

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  }, [emailOrUsername, password]);

  const fromPage = location.state?.from?.pathname || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailOrUsername.trim()) {
      setErrorMessage("Please enter your email or username");
      return;
    }
    
    if (!password) {
      setErrorMessage("Please enter your password");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await authService.login({
        emailOrUsername,
        password
      });
      
      toast({
        title: "Login Successful",
        description: "Welcome back to the dashboard",
      });
      
      console.log("Navigating to:", fromPage);
      setTimeout(() => {
        navigate(fromPage, { replace: true });
      }, 100);
    } catch (error: any) {
      setErrorMessage(error.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-dashboard-accent">aennaki</h1>
        <p className="mt-2 text-gray-400">Sign in to your account</p>
      </div>

      {errorMessage && (
        <Alert variant="destructive" className="bg-red-500/10 border-red-500/30 text-red-400">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="emailOrUsername" className="text-sm font-medium text-gray-200">
              Email or Username
            </label>
            <Input
              id="emailOrUsername"
              type="text"
              placeholder="Email or username"
              required
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="bg-dashboard-blue-light text-white border-dashboard-blue-light"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-200">
                Password
              </label>
              <a href="#" className="text-sm text-dashboard-accent hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-dashboard-blue-light text-white border-dashboard-blue-light"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-dashboard-accent hover:bg-dashboard-accent-light"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </span>
          )}
        </Button>
        
        <div className="text-center text-sm text-gray-400">
          <p>
            Don't have an account?{" "}
            <button 
              type="button" 
              className="text-dashboard-accent hover:underline"
              onClick={onSwitchToSignup}
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
