
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { apiClient } from "../services/api-client";
import { toast } from "@/components/ui/use-toast";

const ProtectedRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check if we have a token
        const token = apiClient.getToken();
        
        if (!token) {
          setIsAuthenticated(false);
          return;
        }
        
        // Verify token by fetching user info
        const userInfo = await apiClient.get('/Account/user-info');
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        apiClient.clearToken();
        setIsAuthenticated(false);
        toast({
          variant: "destructive",
          title: "Authentication expired",
          description: "Please log in again"
        });
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Still checking authentication
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dashboard-accent"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
