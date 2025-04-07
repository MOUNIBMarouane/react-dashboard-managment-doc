
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CircuitDetailsHeaderProps {
  title: string;
}

const CircuitDetailsHeader: React.FC<CircuitDetailsHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => navigate('/circuits')} 
        className="border-white/10 text-white hover:bg-white/10"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Circuits
      </Button>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
    </div>
  );
};

export default CircuitDetailsHeader;
