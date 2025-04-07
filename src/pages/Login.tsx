
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, you would authenticate with your backend
      console.log("Login attempt:", { email, password });
      
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demonstration, we'll just redirect to home
      toast({
        title: "Login Successful",
        description: "Welcome back to the dashboard",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Login Form Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-dashboard-accent">aennaki</h1>
            <p className="mt-2 text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-200">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-dashboard-blue-light text-white border-dashboard-blue-light"
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
                <a href="#" className="text-dashboard-accent hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      
      {/* Image Side */}
      <div className="hidden lg:block flex-1 bg-dashboard-blue-dark relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(7, 13, 27, 0.7)"
        }}>
          <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-white">
            <div className="max-w-md text-center">
              <h2 className="text-4xl font-bold mb-6">Welcome to Business Management Platform</h2>
              <p className="text-xl opacity-90">
                Streamline your business operations with our comprehensive management solution
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
