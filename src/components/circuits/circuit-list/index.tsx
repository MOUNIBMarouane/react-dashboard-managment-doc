
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
  const {
    circuits,
    isLoading,
    error,
    handleCreateCircuit,
    handleEditCircuit,
    handleDeleteCircuit,
    handleViewDetails,
  } = useCircuitList({
    onError: (errMsg) => {
      if (onApiError) {
        onApiError(errMsg);
      } else {
        toast.error(errMsg);
      }
    },
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

    let filtered = [...circuitsWithDescriptif];

    // Search query filtering
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((circuit) => {
        return (
          (searchColumns.includes("code") && circuit.circuitKey.toLowerCase().includes(query)) ||
          (searchColumns.includes("title") && circuit.title.toLowerCase().includes(query)) ||
          (searchColumns.includes("description") && circuit.descriptif.toLowerCase().includes(query))
        );
      });
    }

    // Flow type filtering
    if (flowType && flowType !== "any") {
      if (flowType === "ordered") {
        filtered = filtered.filter((circuit) => circuit.hasOrderedFlow);
      } else if (flowType === "unordered") {
        filtered = filtered.filter((circuit) => !circuit.hasOrderedFlow);
      }
    }

    // Date range filtering (if we track created/updated dates)
    if (dateRange && dateRange.from) {
      filtered = filtered.filter((circuit) => {
        if (!circuit.createdAt) return true;
        
        const createdAt = new Date(circuit.createdAt);
        if (dateRange.from && createdAt < dateRange.from) {
          return false;
        }
        if (dateRange.to && createdAt > dateRange.to) {
          return false;
        }
        return true;
      });
    }

    setFilteredCircuits(filtered);
  }, [circuits, searchQuery, dateRange, flowType, searchColumns]);

  if (isLoading || isRefreshing) {
    return <CircuitLoadingState />;
  }

  if (error) {
    return <CircuitErrorState error={error} />;
  }

  if (!filteredCircuits || filteredCircuits.length === 0) {
    return <CircuitEmptyState onCreateCircuit={handleCreateCircuit} />;
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
          onClick={handleCreateCircuit}
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
          onEdit={handleEditCircuit}
          onDelete={handleDeleteCircuit}
          onViewDetails={handleViewDetails}
        />
      </CardContent>
    </Card>
  );
};

export default CircuitsList;
