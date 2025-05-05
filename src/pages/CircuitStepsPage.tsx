import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StepFormDialog } from "@/components/steps/dialogs/StepFormDialog";
import { DeleteStepDialog } from "@/components/steps/dialogs/DeleteStepDialog";
import { BulkActionBar } from "@/components/steps/BulkActionBar";
import { StepLoadingState } from "@/components/steps/StepLoadingState";
import { useAuth } from "@/context/AuthContext";
import { useCircuitSteps } from "@/hooks/useCircuitSteps";
import { CircuitStepsHeader } from "@/components/circuit-steps/CircuitStepsHeader";
import { CircuitStepsSearchBar } from "@/components/circuit-steps/CircuitStepsSearchBar";
import { CircuitStepsContent } from "@/components/circuit-steps/CircuitStepsContent";
import { CircuitStepsError } from "@/components/circuit-steps/CircuitStepsError";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CircuitService } from "@/services/circuitService";
import { Step } from "@/models/circuit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CircuitStepsPage() {
  const { circuitId = "" } = useParams<{ circuitId: string }>();
  const { user } = useAuth();
  const isSimpleUser = user?.role === "SimpleUser";

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [manualRefreshCounter, setManualRefreshCounter] = useState(0);

  const {
    circuit,
    steps,
    searchQuery,
    selectedSteps,
    apiError,
    viewMode,
    isLoading,
    isError,
    setSearchQuery,
    handleStepSelection,
    handleSelectAll,
    setViewMode,
    setSelectedSteps,
    refetchSteps,
  } = useCircuitSteps(circuitId);

  // Force a refetch when the component mounts
  useEffect(() => {
    if (circuitId) {
      console.log(`CircuitStepsPage mounted for circuit ID: ${circuitId}`);
      refetchSteps();
    }
  }, [circuitId, refetchSteps]);

  const isCircuitActive = circuit?.isActive || false;

  const handleAddStep = () => {
    if (isCircuitActive) {
      toast.error("Cannot add steps to an active circuit");
      return;
    }
    setSelectedStep(null);
    setFormDialogOpen(true);
  };

  const handleEditStep = (step: Step) => {
    if (isCircuitActive) {
      toast.error("Cannot edit steps in an active circuit");
      return;
    }
    setSelectedStep(step);
    setFormDialogOpen(true);
  };

  const handleDeleteStep = (step: Step) => {
    if (isCircuitActive) {
      toast.error("Cannot delete steps from an active circuit");
      return;
    }
    setSelectedStep(step);
    setDeleteDialogOpen(true);
  };

  const handleBulkDelete = () => {
    if (isCircuitActive) {
      toast.error("Cannot delete steps from an active circuit");
      return;
    }
    // Implement bulk delete functionality here
    // You would call a service method to delete multiple steps
    setSelectedSteps([]);
  };

  const handleManualRefresh = () => {
    refetchSteps();
    setManualRefreshCounter((prev) => prev + 1);
    toast.info("Refreshing data...");
  };

  if (isLoading) {
    return <StepLoadingState />;
  }

  if (isError) {
    return (
      <CircuitStepsError
        errorMessage={apiError}
        type="error"
        onRetry={handleManualRefresh}
      />
    );
  }

  // If circuit not found
  if (!circuit) {
    return <CircuitStepsError type="notFound" onRetry={handleManualRefresh} />;
  }

  return (
    <div className="container-fluid responsive-padding space-y-6">
      <CircuitStepsHeader
        circuit={circuit}
        onAddStep={handleAddStep}
        isSimpleUser={isSimpleUser}
        onRefresh={handleManualRefresh}
      />

      <CircuitStepsSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <CircuitStepsContent
        steps={steps}
        selectedSteps={selectedSteps}
        onSelectStep={handleStepSelection}
        onSelectAll={handleSelectAll}
        onEdit={handleEditStep}
        onDelete={handleDeleteStep}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddStep={handleAddStep}
        isSimpleUser={isSimpleUser}
        circuitId={circuitId}
        circuit={circuit}
        apiError={apiError}
      />

      {steps.length > 0 && (
        <BulkActionBar
          selectedCount={selectedSteps.length}
          onBulkDelete={handleBulkDelete}
          disabled={isCircuitActive}
        />
      )}

      {/* Step Form Dialog - Now passing the circuit ID */}
      <StepFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        onSuccess={refetchSteps}
        editStep={selectedStep ?? undefined}
        circuitId={parseInt(circuitId, 10)}
      />

      {/* Delete Step Dialog */}
      {selectedStep && (
        <DeleteStepDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          stepId={selectedStep.id}
          stepTitle={selectedStep.title}
          onSuccess={refetchSteps}
        />
      )}
    </div>
  );
}
