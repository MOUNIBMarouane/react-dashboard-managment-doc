
import { useState } from "react";
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
import { AlertCircle, PlusCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import circuitService from "@/services/circuitService";
import { useQueryClient } from "@tanstack/react-query";

interface CreateCircuitDialogContainerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCircuitCreated?: (circuit: any) => void;
}

export default function CreateCircuitDialogContainer({
  open,
  onOpenChange,
  onCircuitCreated,
}: CreateCircuitDialogContainerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [descriptif, setDescriptif] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [hasOrderedFlow, setHasOrderedFlow] = useState(false);
  const [allowBacktrack, setAllowBacktrack] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newCircuit = await circuitService.createCircuit({
        title,
        descriptif,
        isActive: false,
        hasOrderedFlow: false,
        allowBacktrack: false
      });

      // Invalidate and refetch circuits
      queryClient.invalidateQueries({ queryKey: ["circuits"] });
      
      toast({
        title: "Success",
        description: "Circuit created successfully",
      });

      // Reset form
      setTitle("");
      setDescriptif("");
      setIsActive(false);
      setHasOrderedFlow(false);
      setAllowBacktrack(false);

      // Close dialog
      onOpenChange(false);

      // Callback
      if (onCircuitCreated) {
        onCircuitCreated(newCircuit);
      }
    } catch (err: any) {
      console.error("Error creating circuit:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create circuit. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescriptif("");
    setIsActive(false);
    setHasOrderedFlow(false);
    setAllowBacktrack(false);
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
          <DialogTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Create New Circuit
          </DialogTitle>
          <DialogDescription className="text-blue-300">
            Create a new document workflow circuit
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              {isLoading ? "Creating..." : "Create Circuit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
