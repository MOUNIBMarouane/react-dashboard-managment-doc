
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitGraph } from "lucide-react";
import { Circuit } from "@/types/circuit";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CircuitStatusBadge from "../circuits/CircuitStatusBadge";

interface CircuitDetailsCardProps {
  circuit: Circuit;
  onEdit: (circuitId: string) => void;
}

const CircuitDetailsCard: React.FC<CircuitDetailsCardProps> = ({ circuit, onEdit }) => {
  const navigate = useNavigate();

  return (
    <Card className="bg-dashboard-blue-dark border-white/10 shadow-md overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-dashboard-blue-dark/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
              <GitGraph size={18} className="text-dashboard-accent" />
            </div>
            <CardTitle className="text-xl text-white">{circuit.title}</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(circuit.id)}
              className="text-white border-white/10 hover:bg-white/10"
            >
              Edit Circuit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/circuits')}
              className="text-white border-white/10 hover:bg-white/10"
            >
              Back to Circuits
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-white/60 mb-1">Circuit Key</h3>
            <p className="text-white font-medium">{circuit.circuit_key}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-white/60 mb-1">Status</h3>
            <div className="mt-1">
              <CircuitStatusBadge isActive={circuit.is_active} />
            </div>
          </div>
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-medium text-white/60 mb-1">Description</h3>
            <p className="text-white">{circuit.descriptif || 'No description available'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-white/60 mb-1">Steps Count</h3>
            <p className="text-white font-medium">{circuit.crd_counter}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-white/60 mb-1">Created At</h3>
            <p className="text-white font-medium">
              {circuit.created_at ? new Date(circuit.created_at).toLocaleString() : 'Not available'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CircuitDetailsCard;
