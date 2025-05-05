
import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Circuit } from '@/models/circuit';
import { AlertCircle } from 'lucide-react';
import circuitService from '@/services/circuitService';
import { CreateCircuitForm } from './CreateCircuitForm';

interface CreateCircuitDialogContainerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const CreateCircuitDialogContainer: React.FC<CreateCircuitDialogContainerProps> = ({
  open,
  onOpenChange,
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: createCircuit } = useMutation({
    mutationFn: (circuitData: Omit<Circuit, 'id' | 'circuitKey' | 'crdCounter'>) => 
      circuitService.createCircuit(circuitData),
    onSuccess: () => {
      toast.success('Circuit created successfully');
      onOpenChange(false);
      if (onSuccess) onSuccess();
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message || err.message || 'Failed to create circuit';
      setError(message);
      toast.error(`Error: ${message}`);
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const handleSubmit = useCallback((circuitData: Omit<Circuit, 'id' | 'circuitKey' | 'crdCounter'>) => {
    setError(null);
    setIsSubmitting(true);
    createCircuit(circuitData);
  }, [createCircuit]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f1642] border-blue-900/50 text-white sm:max-w-[600px] max-h-[90vh] overflow-auto">
        <CreateCircuitForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 p-2 rounded flex items-start gap-2 mt-4">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-red-200">{error}</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateCircuitDialogContainer;
