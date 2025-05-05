import { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Circuit } from "@/models/circuit";
import { circuitService } from "@/services";
import { DataTable } from "@/components/ui/data-table";
import { CircuitErrorState } from "./CircuitErrorState";
import { CircuitLoadingState } from "./CircuitLoadingState";
import { useSettings } from "@/context/SettingsContext";

interface UseCircuitListProps {
  initialCircuits?: Circuit[];
}

interface CircuitListProps extends UseCircuitListProps {
  columns: ColumnDef<Circuit>[];
}

const useCircuitList = ({ initialCircuits }: UseCircuitListProps = {}) => {
  const [circuits, setCircuits] = useState<Circuit[]>(initialCircuits || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    const fetchCircuits = async () => {
      setLoading(true);
      try {
        const data = await circuitService.getAllCircuits();
        setCircuits(data);
        setError(null);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCircuits();
  }, []);

  return {
    circuits,
    loading,
    error,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
  };
};

export function CircuitList({ columns }: CircuitListProps) {
  const { theme } = useSettings();
  const circuitListProps = useCircuitList();
  const {
    circuits,
    loading,
    error,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
  } = circuitListProps;

  const table = useReactTable({
    data: circuits,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      columnFilters: columnFilters,
    },
  });

  if (loading) {
    return <CircuitLoadingState />;
  }

  if (error) {
    return <CircuitErrorState error={error} />;
  }

  return (
    <div className="w-full">
      <DataTable table={table} />
    </div>
  );
}
