
import { useStepForm } from "./StepFormProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import circuitService from "@/services/circuitService";

export const StepReview = () => {
  const { formData } = useStepForm();
  
  // Fetch the circuit if we have a circuitId
  const { data: circuit } = useQuery({
    queryKey: ["circuit", formData.circuitId],
    queryFn: () => circuitService.getCircuitById(formData.circuitId),
    enabled: !!formData.circuitId,
  });

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-white">Review Step Details</h3>
      <p className="text-xs text-gray-400">
        Please review the information below before submitting.
      </p>

      <Card className="bg-[#0f1642] border-blue-900/30 shadow-md">
        <CardContent className="p-4 pt-4">
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="text-base font-medium text-blue-200">Step Information</h4>
                <Badge 
                  variant={formData.isFinalStep ? "default" : "outline"}
                  className={formData.isFinalStep 
                    ? "bg-blue-600 text-white" 
                    : "border-blue-700 text-blue-300"}
                >
                  {formData.isFinalStep ? "Final Step" : "Standard Step"}
                </Badge>
              </div>
              
              <div className="grid gap-2">
                <div>
                  <div className="text-xs font-medium text-gray-400">Title</div>
                  <div className="text-sm text-gray-200">{formData.title}</div>
                </div>
                
                {formData.descriptif && (
                  <div>
                    <div className="text-xs font-medium text-gray-400">Description</div>
                    <div className="text-sm text-gray-200 whitespace-pre-wrap">
                      {formData.descriptif}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Circuit Info */}
            <div className="space-y-2">
              <h4 className="text-base font-medium text-blue-200">Circuit Information</h4>
              <div className="grid gap-2">
                <div>
                  <div className="text-xs font-medium text-gray-400">Circuit</div>
                  <div className="text-sm text-gray-200">
                    {circuit ? circuit.title : `Circuit ID: ${formData.circuitId}`}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs font-medium text-gray-400">Order Index</div>
                  <div className="text-sm text-gray-200">{formData.orderIndex}</div>
                </div>
              </div>
            </div>
            
            {/* Role Assignment */}
            {formData.responsibleRoleId && (
              <div className="space-y-2">
                <h4 className="text-base font-medium text-blue-200">Role Assignment</h4>
                <div className="grid gap-2">
                  <div>
                    <div className="text-xs font-medium text-gray-400">Responsible Role ID</div>
                    <div className="text-sm text-gray-200">{formData.responsibleRoleId}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
