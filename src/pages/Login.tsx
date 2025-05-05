import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useSettings } from '@/context/SettingsContext';

const Login: React.FC = () => {
  const { login, user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const { toast } = useToast()
  const { theme } = useSettings();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({ usernameOrEmail: '', password: '' });

    if (!formData.usernameOrEmail) {
      setValidationErrors(prev => ({ ...prev, usernameOrEmail: 'Username or email is required' }));
      return;
    }

    if (!formData.password) {
      setValidationErrors(prev => ({ ...prev, password: 'Password is required' }));
      return;
    }

    try {
      await login(formData.usernameOrEmail, formData.password);
      toast({
        title: "Success",
        description: "Login successful!",
      })
      await router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "Invalid credentials"
      })
      setValidationErrors({ usernameOrEmail: '', password: 'Invalid credentials' });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-4 dark:bg-gray-800 shadow-md rounded-md border dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center dark:text-white">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username or Email
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                className={`bg-background ${validationErrors.usernameOrEmail ? "border-red-500" : ""}`}
                value={formData.usernameOrEmail}
                onChange={onChange}
              />
              {validationErrors.usernameOrEmail && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.usernameOrEmail}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`bg-background ${validationErrors.password ? "border-red-500" : ""}`}
                  value={formData.password}
                  onChange={onChange}
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                  size="icon"
                  variant="ghost"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
              )}
            </div>
            <div>
              <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
