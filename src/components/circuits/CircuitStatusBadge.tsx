
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface CircuitStatusBadgeProps {
  isActive: boolean;
}

const CircuitStatusBadge: React.FC<CircuitStatusBadgeProps> = ({ isActive }) => {
  return isActive ? (
    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 flex items-center gap-1 px-2">
      <CheckCircle size={12} />
      <span>Active</span>
    </Badge>
  ) : (
    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 flex items-center gap-1 px-2">
      <XCircle size={12} />
      <span>Inactive</span>
    </Badge>
  );
};

export default CircuitStatusBadge;
