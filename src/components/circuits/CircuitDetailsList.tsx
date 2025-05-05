
import { Badge } from "@/components/ui/badge";
import { CircuitDetail } from "@/models/circuit";
import { CheckCircle } from "lucide-react";

interface CircuitDetailsListProps {
  circuitDetails: CircuitDetail[];
}

const CircuitDetailsList: React.FC<CircuitDetailsListProps> = ({ 
  circuitDetails
}) => {
  return (
    <div className="space-y-2 mt-2">
      <div className="text-xs text-gray-400 mb-1">Circuit Steps</div>
      <div className="space-y-1.5">
        {circuitDetails.map((detail, index) => (
          <div
            key={detail.id}
            className="bg-blue-900/10 rounded-md p-2 flex items-center border border-blue-900/30"
          >
            <div className="flex-shrink-0 mr-2">
              <Badge variant="outline" className="bg-blue-900/20 border-blue-800/50">
                {index + 1}
              </Badge>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-blue-200 truncate">
                {detail.title}
              </div>
              {detail.descriptif && (
                <div className="text-xs text-gray-400 truncate">
                  {detail.descriptif}
                </div>
              )}
            </div>
            {detail.isFinalStep && (
              <div className="flex-shrink-0 ml-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircuitDetailsList;
