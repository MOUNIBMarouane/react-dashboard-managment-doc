
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useCircuitForm } from '@/context/CircuitFormContext';
import { Button } from "@/components/ui/button"; 

export default function StepFiveReview() {
  const { formData, prevStep, submitForm, isSubmitting } = useCircuitForm();
  
  const handleSubmit = async () => {
    await submitForm();
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Review Details</h2>
      <p className="text-muted-foreground">
        Review the circuit details before creating. Once created, you will be able to add steps.
      </p>
      
      <div className="space-y-6">
        <div className="p-4 bg-muted/20 rounded-md space-y-4 border">
          <div>
            <h3 className="font-medium mb-1">Circuit Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Title:</span>
                <p>{formData.title || "Not specified"}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Description:</span>
                <p>{formData.descriptif || "Not specified"}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Circuit Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Active:</span>
                <p>{formData.isActive ? "Yes" : "No"}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Ordered Flow:</span>
                <p>{formData.hasOrderedFlow ? "Yes" : "No"}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Allow Backtrack:</span>
                <p>{formData.allowBacktrack ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>
        
        <Alert variant="default" className="bg-blue-500/10 border-blue-500/30 text-blue-300">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            After creating the circuit, you'll be able to add steps and configure workflows.
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => prevStep()}
        >
          Back
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Circuit..." : "Create Circuit"}
        </Button>
      </div>
    </div>
  );
}
