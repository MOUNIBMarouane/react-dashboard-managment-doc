
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircuitDetail } from "@/types/circuit";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface CircuitDetailCardProps {
  detail: CircuitDetail;
  onEdit: (detailId: string) => void;
  onDelete: (detailId: string) => void;
}

const CircuitDetailCard = ({ detail, onEdit, onDelete }: CircuitDetailCardProps) => {
  return (
    <Card className="bg-card/50 h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{detail.title}</CardTitle>
            <CardDescription>{detail.circuit_detail_key}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => onEdit(detail.id)}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit detail</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10" 
              onClick={() => onDelete(detail.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete detail</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex-grow">
        <p className="text-sm text-white/70">{detail.descriptif}</p>
      </CardContent>
    </Card>
  );
};

export default CircuitDetailCard;
