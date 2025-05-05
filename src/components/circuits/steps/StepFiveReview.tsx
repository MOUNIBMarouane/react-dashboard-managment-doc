
import { useCircuitForm } from "@/context/CircuitFormContext";
import { Button } from "@/components/ui/button";

export const StepFiveReview = () => {
  const { formData, submitForm, isSubmitting } = useCircuitForm();
  
  const handleSubmit = async () => {
    await submitForm();
    // Don't test void return value
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Review Circuit</h2>
      
      <div className="bg-blue-950/20 p-4 rounded-md border border-blue-900/30">
        <h3 className="font-medium">Circuit Details</h3>
        <div className="mt-2 space-y-2">
          <div>
            <span className="text-sm text-blue-300">Title:</span>
            <p>{formData.title}</p>
          </div>
          <div>
            <span className="text-sm text-blue-300">Description:</span>
            <p>{formData.descriptif}</p>
          </div>
          <div>
            <span className="text-sm text-blue-300">Has Ordered Flow:</span>
            <p>{formData.hasOrderedFlow ? "Yes" : "No"}</p>
          </div>
          <div>
            <span className="text-sm text-blue-300">Allow Backtrack:</span>
            <p>{formData.allowBacktrack ? "Yes" : "No"}</p>
          </div>
          <div>
            <span className="text-sm text-blue-300">Is Active:</span>
            <p>{formData.isActive ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-950/20 p-4 rounded-md border border-blue-900/30">
        <h3 className="font-medium">Circuit Steps ({formData.steps.length})</h3>
        <div className="mt-2 space-y-3">
          {formData.steps.map((step, index) => (
            <div key={index} className="p-3 bg-blue-950/30 rounded-md">
              <div>
                <span className="text-sm text-blue-300">Step {index + 1}:</span>
                <p className="font-medium">{step.title}</p>
              </div>
              <div>
                <span className="text-sm text-blue-300">Description:</span>
                <p>{step.descriptif}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        onClick={handleSubmit} 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Creating Circuit..." : "Create Circuit"}
      </Button>
    </div>
  );
};
