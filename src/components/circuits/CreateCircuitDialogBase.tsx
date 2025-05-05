
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import circuitService from "@/services/circuitService";
import { useQueryClient } from "@tanstack/react-query";

interface CreateCircuitDialogBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  dialogTitle: React.ReactNode;
  dialogDescription: string;
  submitButtonText: string;
  initialValues?: {
    title: string;
    descriptif: string;
    isActive: boolean;
    hasOrderedFlow: boolean;
    allowBacktrack: boolean;
  };
  onFormSubmit: (circuit: any) => void;
}

export default function CreateCircuitDialogBase({
  open,
  onOpenChange,
  title,
  dialogTitle,
  dialogDescription,
  submitButtonText,
  initialValues,
  onFormSubmit,
}: CreateCircuitDialogBaseProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [circuitTitle, setCircuitTitle] = useState("");
  const [descriptif, setDescriptif] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [hasOrderedFlow, setHasOrderedFlow] = useState(false);
  const [allowBacktrack, setAllowBacktrack] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Set initial values if provided
  useEffect(() => {
    if (initialValues) {
      setCircuitTitle(initialValues.title);
      setDescriptif(initialValues.descriptif);
      setIsActive(initialValues.isActive);
      setHasOrderedFlow(initialValues.hasOrderedFlow);
      setAllowBacktrack(initialValues.allowBacktrack);
    }
  }, [initialValues, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!circuitTitle.trim()) {
      setError("Title is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const circuitData = {
        title: circuitTitle,
        descriptif,
        isActive, 
        hasOrderedFlow,
        allowBacktrack
      };

      onFormSubmit(circuitData);
      
      // Reset form
      setCircuitTitle("");
      setDescriptif("");
      setIsActive(false);
      setHasOrderedFlow(false);
      setAllowBacktrack(false);

    } catch (err: any) {
      console.error("Error with circuit:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (!initialValues) {
      setCircuitTitle("");
      setDescriptif("");
      setIsActive(false);
      setHasOrderedFlow(false);
      setAllowBacktrack(false);
    } else {
      setCircuitTitle(initialValues.title);
      setDescriptif(initialValues.descriptif);
      setIsActive(initialValues.isActive);
      setHasOrderedFlow(initialValues.hasOrderedFlow);
      setAllowBacktrack(initialValues.allowBacktrack);
    }
    setError(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleReset();
        }
        onOpenChange(value);
      }}
    >
      <DialogContent className="sm:max-w-[425px] bg-[#0a1033] border-blue-800/40">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription className="text-blue-300">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={circuitTitle}
              onChange={(e) => setCircuitTitle(e.target.value)}
              placeholder="Enter circuit title"
              className="bg-[#060927]/80 border-blue-900/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descriptif">Description</Label>
            <Textarea
              id="descriptif"
              value={descriptif}
              onChange={(e) => setDescriptif(e.target.value)}
              placeholder="Enter circuit description"
              className="bg-[#060927]/80 border-blue-900/40"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={isActive}
                onCheckedChange={(checked) => setIsActive(checked as boolean)}
              />
              <Label htmlFor="isActive" className="text-sm cursor-pointer">
                Active
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasOrderedFlow"
                checked={hasOrderedFlow}
                onCheckedChange={(checked) => setHasOrderedFlow(checked as boolean)}
              />
              <Label htmlFor="hasOrderedFlow" className="text-sm cursor-pointer">
                Ordered Flow
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowBacktrack"
                checked={allowBacktrack}
                onCheckedChange={(checked) => setAllowBacktrack(checked as boolean)}
              />
              <Label htmlFor="allowBacktrack" className="text-sm cursor-pointer">
                Allow Backtrack
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-blue-900/40"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : submitButtonText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
