
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const goHome = () => {
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dashboard-blue">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold text-dashboard-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button 
            onClick={goHome}
            className="bg-dashboard-accent hover:bg-dashboard-accent-light"
          >
            Go to Home
          </Button>
          <Button 
            onClick={goBack}
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
