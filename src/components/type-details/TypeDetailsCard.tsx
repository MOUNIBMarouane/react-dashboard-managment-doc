
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";
import { Type } from "@/types/type";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TypeDetailsCardProps {
  type: Type;
  onEdit: (typeId: string) => void;
}

const TypeDetailsCard: React.FC<TypeDetailsCardProps> = ({ type, onEdit }) => {
  const navigate = useNavigate();

  return (
    <Card className="bg-dashboard-blue-dark border-white/10 shadow-md overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-dashboard-blue-dark/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
              <Tag size={18} className="text-dashboard-accent" />
            </div>
            <CardTitle className="text-xl text-white">{type.typename}</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(type.id)}
              className="text-white border-white/10 hover:bg-white/10"
            >
              Edit Type
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/types')}
              className="text-white border-white/10 hover:bg-white/10"
            >
              Back to Types
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-white/60 mb-1">Type Name</h3>
            <p className="text-white font-medium">{type.typename}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-white/60 mb-1">Attribute</h3>
            <p className="text-white font-medium">{type.attribute || 'Not specified'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TypeDetailsCard;
