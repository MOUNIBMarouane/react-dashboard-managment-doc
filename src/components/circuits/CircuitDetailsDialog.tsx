
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CircuitDetail } from './CircuitDetailsList';
import { Button } from '@/components/ui/button';
import CircuitDetailsList from './CircuitDetailsList';
import circuitService from '@/services/circuitService';
import { toast } from 'sonner';

interface CircuitDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  circuitId: number;
  onAddDetailClick?: () => void;
  circuit?: Circuit; // Optional circuit prop
}

const CircuitDetailsDialog: React.FC<CircuitDetailsDialogProps> = ({
  open,
  onOpenChange,
  circuitId,
  onAddDetailClick,
  circuit
}) => {
  const [circuitDetails, setCircuitDetails] = useState<CircuitDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCircuitDetails = async () => {
    if (!circuitId) return;
    
    setIsLoading(true);
    try {
      const details = await circuitService.getCircuitDetailsByCircuitId(circuitId);
      // Transform the service response to match the CircuitDetail interface
      const transformedDetails: CircuitDetail[] = details.map(detail => ({
        id: detail.id,
        circuitDetailKey: detail.circuitDetailKey || "",
        circuitId: detail.circuitId,
        title: detail.title,
        descriptif: detail.descriptif || "",
        orderIndex: detail.orderIndex,
        responsibleRoleId: detail.responsibleRoleId || undefined,
        isFinalStep: detail.isFinalDetail || false,
        isFinalDetail: detail.isFinalDetail || false,
        nextCircuitDetailId: detail.nextCircuitDetailId,
        prevCircuitDetailId: detail.prevCircuitDetailId
      }));
      setCircuitDetails(transformedDetails);
    } catch (error) {
      console.error('Error fetching circuit details:', error);
      toast.error('Failed to load circuit details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open && circuitId) {
      fetchCircuitDetails();
    }
  }, [open, circuitId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Circuit Details</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {isLoading ? (
            <p>Loading circuit details...</p>
          ) : circuitDetails.length > 0 ? (
            <CircuitDetailsList circuitDetails={circuitDetails} />
          ) : (
            <p>No details found for this circuit.</p>
          )}
        </div>
        
        {onAddDetailClick && (
          <div className="flex justify-end">
            <Button onClick={onAddDetailClick}>
              Add Detail
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CircuitDetailsDialog;
