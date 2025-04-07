
import React from "react";
import { CircuitDetail } from "@/types/circuit";
import CircuitDetailCard from "./CircuitDetailCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface CircuitDetailsListProps {
  details: CircuitDetail[];
  onAddDetail: () => void;
  onEditDetail: (detailId: string) => void;
  onDeleteDetail: (detailId: string) => void;
  isLoading?: boolean;
}

const CircuitDetailsList = ({
  details,
  onAddDetail,
  onEditDetail,
  onDeleteDetail,
  isLoading = false,
}: CircuitDetailsListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Circuit Details</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-lg bg-white/5"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Circuit Details</h2>
        <Button onClick={onAddDetail} size="sm" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          Add Detail
        </Button>
      </div>

      {details.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-lg">
          <p className="text-white/60">No circuit details found</p>
          <Button variant="outline" className="mt-4" onClick={onAddDetail}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add your first detail
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {details.map((detail) => (
            <CircuitDetailCard
              key={detail.id}
              detail={detail}
              onEdit={onEditDetail}
              onDelete={onDeleteDetail}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CircuitDetailsList;
