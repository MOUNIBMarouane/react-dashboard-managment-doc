
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Circuit } from "@/types/circuit";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AddEditCircuitDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (circuit: Omit<Circuit, 'id' | 'created_at' | 'updated_at'>) => void;
  circuitToEdit?: Circuit;
  isEditing: boolean;
}

const AddEditCircuitDialog: React.FC<AddEditCircuitDialogProps> = ({
  isOpen,
  onOpenChange,
  onSave,
  circuitToEdit,
  isEditing
}) => {
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  
  // Form state
  const [circuitKey, setCircuitKey] = useState('');
  const [title, setTitle] = useState('');
  const [descriptif, setDescriptif] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isOpen) {
      if (isEditing && circuitToEdit) {
        setCircuitKey(circuitToEdit.circuit_key);
        setTitle(circuitToEdit.title);
        setDescriptif(circuitToEdit.descriptif);
        setIsActive(circuitToEdit.is_active);
      } else {
        setCircuitKey('');
        setTitle('');
        setDescriptif('');
        setIsActive(true);
      }
      setStep(1);
      setShowPreview(false);
    }
  }, [isOpen, isEditing, circuitToEdit]);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setShowPreview(true);
    }
  };

  const handleBack = () => {
    if (showPreview) {
      setShowPreview(false);
    } else if (step === 2) {
      setStep(1);
    }
  };

  const handleSave = () => {
    const circuit = {
      circuit_key: circuitKey,
      title,
      descriptif,
      is_active: isActive,
      crd_counter: circuitToEdit?.crd_counter || 0
    };

    onSave(circuit);
    onOpenChange(false);
  };

  const isStepValid = () => {
    if (step === 1) {
      return !!title;
    }
    return true;
  };

  const renderStepContent = () => {
    if (showPreview) {
      return (
        <div className="py-4">
          <Card className="bg-dashboard-blue border-white/10">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-white/60">Circuit Key</h3>
                  <p className="text-white">{circuitKey}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/60">Title</h3>
                  <p className="text-white">{title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/60">Description</h3>
                  <p className="text-white">{descriptif || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/60">Status</h3>
                  <p className="text-white">{isActive ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="border-white/10 text-white hover:bg-white/10"
              >
                Edit Information
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-dashboard-accent hover:bg-dashboard-accent/90"
              >
                {isEditing ? 'Update Circuit' : 'Create Circuit'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Title*</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter circuit title"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="circuit_key" className="text-white">Circuit Key</Label>
              <Input
                id="circuit_key"
                value={circuitKey}
                onChange={(e) => setCircuitKey(e.target.value)}
                placeholder="Enter circuit key (e.g., CIR-001)"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button 
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-dashboard-accent hover:bg-dashboard-accent/90"
              >
                Next
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="descriptif" className="text-white">Description</Label>
              <Textarea
                id="descriptif"
                value={descriptif}
                onChange={(e) => setDescriptif(e.target.value)}
                placeholder="Enter circuit description"
                className="bg-white/5 border-white/20 text-white min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Status</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={isActive} 
                  onCheckedChange={setIsActive}
                  className="data-[state=checked]:bg-dashboard-accent"
                />
                <Label className="text-white">{isActive ? 'Active' : 'Inactive'}</Label>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="border-white/10 text-white hover:bg-white/10"
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-dashboard-accent hover:bg-dashboard-accent/90"
              >
                Preview
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dashboard-blue-dark border-white/10 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Circuit' : 'Add New Circuit'}</DialogTitle>
        </DialogHeader>
        
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};

export default AddEditCircuitDialog;
