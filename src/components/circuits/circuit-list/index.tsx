
import React, { useState, useEffect } from 'react';
import { Circuit } from '@/models/circuit';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRange } from 'react-day-picker';
import { CircuitLoadingState } from './CircuitLoadingState';
import { CircuitErrorState } from './CircuitErrorState';
import { CircuitEmptyState } from './CircuitEmptyState';
import { CircuitDataTable } from './CircuitDataTable';
import { useCircuitList } from './hooks/useCircuitList';
import { useSettings } from '@/context/SettingsContext';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define the search column type
type SearchColumn = "code" | "title" | "description";

interface CircuitListProps {
  onApiError?: (errorMessage: string) => void;
  searchQuery?: string;
  dateRange?: DateRange;
  flowType?: string;
  searchColumns?: SearchColumn[];
  refreshTrigger?: number;
  isRefreshing?: boolean;
}

const CircuitsList: React.FC<CircuitListProps> = ({
  onApiError,
  searchQuery = "",
  dateRange,
  flowType,
  searchColumns = ["code", "title", "description"],
  refreshTrigger = 0,
  isRefreshing = false,
}) => {
  const { theme } = useSettings();
  const [handleCreateCircuitFn, setHandleCreateCircuitFn] = useState(() => () => {});
  
  const {
    circuits,
    isLoading,
    isError,
    selectedCircuit,
    editDialogOpen,
    setEditDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    detailsDialogOpen,
    setDetailsDialogOpen,
    handleEdit,
    handleDelete,
    handleViewDetails,
    confirmDelete,
    refetch
  } = useCircuitList({
    onError: (errMsg) => {
      if (onApiError) {
        onApiError(errMsg);
      } else {
        toast.error(errMsg);
      }
    },
    searchQuery,
    dateRange,
    flowType,
    searchColumns,
    refreshTrigger,
  });

  const [filteredCircuits, setFilteredCircuits] = useState<Circuit[]>([]);

  useEffect(() => {
    if (!circuits) return;

    // Type assertion to fix the Circuit[] compatibility issue
    const circuitsWithDescriptif = circuits.map(circuit => ({
      ...circuit,
      descriptif: circuit.descriptif || ''
    })) as Circuit[];

    setFilteredCircuits(circuitsWithDescriptif);
  }, [circuits, searchQuery, dateRange, flowType, searchColumns]);

  // Set the create circuit handler
  useEffect(() => {
    setHandleCreateCircuitFn(() => () => {
      // This would open a create circuit dialog
      toast.info("Create circuit functionality would be implemented here");
    });
  }, []);

  if (isLoading || isRefreshing) {
    return <CircuitLoadingState />;
  }

  if (isError) {
    return <CircuitErrorState error={new Error("Failed to load circuits")} onRetry={refetch} />;
  }

  if (!filteredCircuits || filteredCircuits.length === 0) {
    return <CircuitEmptyState searchQuery={searchQuery} isSimpleUser={false} />;
  }

  return (
    <Card
      className={`w-full shadow-md ${
        theme === "dark"
          ? "bg-[#111633]/70 border-blue-900/30"
          : "bg-white border-blue-200/60"
      }`}
    >
      <CardHeader
        className={`flex flex-row items-center justify-between ${
          theme === "dark"
            ? "border-b border-blue-900/30 bg-blue-900/20"
            : "border-b border-blue-100 bg-blue-50/50"
        }`}
      >
        <CardTitle
          className={`text-xl ${
            theme === "dark" ? "text-blue-100" : "text-blue-700"
          }`}
        >
          Circuits
        </CardTitle>
        <Button
          size="sm"
          onClick={handleCreateCircuitFn}
          className={
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Add Circuit
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <CircuitDataTable
          data={filteredCircuits}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />
      </CardContent>
    </Card>
  );
};

export default CircuitsList;
