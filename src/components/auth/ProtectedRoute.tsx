
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { apiClient } from "@/services/api-client";
import { useToast } from "@/components/ui/use-toast";
import { authService } from "@/services/auth-service";

const ProtectedRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check if we have a token
        const token = localStorage.getItem('auth_token');
        
        if (!token) {
          console.log("No token found, redirecting to login");
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        
        console.log("Token found, verifying...");
        
        try {
          // Set the token in the API client
          apiClient.setToken(token);
          
          // Try to get user info to verify token
          await apiClient.get('/Account/user-info');
          console.log("Token is valid, user is authenticated");
          setIsAuthenticated(true);
        } catch (error: any) {
          console.error("Token validation failed:", error);
          
          // Try to refresh the token first before failing
          console.log("Attempting to refresh token...");
          const refreshed = await authService.refreshAuthToken();
          if (refreshed) {
            console.log("Token refresh successful");
            setIsAuthenticated(true);
          } else {
            // If refresh fails, clear the token and set authenticated to false
            console.log("Token refresh failed, clearing auth");
            authService.logout();
            setIsAuthenticated(false);
            
            // Only show the toast if it wasn't a navigation change that triggered this
            if (location.pathname !== '/login') {
              toast({
                variant: "destructive",
                title: "Session expired",
                description: "Please log in again to continue"
              });
            }
          }
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname, toast]);

  if (isLoading) {
    // Show a loading spinner while checking authentication
    return (
      <div className="flex items-center justify-center h-screen bg-dashboard-blue">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dashboard-accent"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated, otherwise render the protected route
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
