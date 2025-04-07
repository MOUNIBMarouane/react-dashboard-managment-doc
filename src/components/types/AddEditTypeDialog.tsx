
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Type } from "@/types/type";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface AddEditTypeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (type: Type) => void;
  typeToEdit?: Type;
  isEditing: boolean;
}

const AddEditTypeDialog: React.FC<AddEditTypeDialogProps> = ({
  isOpen,
  onOpenChange,
  onSave,
  typeToEdit,
  isEditing
}) => {
  const [typename, setTypename] = useState('');
  const [attribute, setAttribute] = useState('');
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (isEditing && typeToEdit) {
        setTypename(typeToEdit.typename);
        setAttribute(typeToEdit.attribute || '');
      } else {
        setTypename('');
        setAttribute('');
      }
      setStep(1);
      setShowPreview(false);
    }
  }, [isOpen, isEditing, typeToEdit]);

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
    const newType: Type = {
      id: typeToEdit?.id || '',
      typename,
      attribute: attribute || undefined
    };

    onSave(newType);
    onOpenChange(false);
  };

  const renderStepContent = () => {
    if (showPreview) {
      return (
        <div className="py-4">
          <Card className="bg-dashboard-blue border-white/10">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-white/60">Type Name</h3>
                  <p className="text-white">{typename}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/60">Attribute</h3>
                  <p className="text-white">{attribute || 'Not specified'}</p>
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
                {isEditing ? 'Update Type' : 'Create Type'}
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
              <Label htmlFor="typename" className="text-white">Type Name</Label>
              <Input
                id="typename"
                value={typename}
                onChange={(e) => setTypename(e.target.value)}
                placeholder="Enter type name"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button 
                onClick={handleNext}
                disabled={!typename}
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
              <Label htmlFor="attribute" className="text-white">Attribute (Optional)</Label>
              <Input
                id="attribute"
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
                placeholder="Enter attribute"
                className="bg-white/5 border-white/20 text-white"
              />
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
          <DialogTitle>{isEditing ? 'Edit Type' : 'Add New Type'}</DialogTitle>
        </DialogHeader>
        
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTypeDialog;
