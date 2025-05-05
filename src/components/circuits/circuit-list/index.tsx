
import { useState, useEffect } from "react";
import { Circuit } from "@/models/circuit";
import circuitService from "@/services/circuitService";
import { CircuitErrorState } from "./CircuitErrorState";
import { CircuitLoadingState } from "./CircuitLoadingState";
import { useSettings } from "@/context/SettingsContext";

interface UseCircuitListProps {
  initialCircuits?: Circuit[];
  onApiError?: (errorMessage: string) => void;
  searchQuery?: string;
}

interface CircuitListProps extends UseCircuitListProps {
  searchQuery?: string;
  dateRange?: any;
  flowType?: string;
  searchColumns?: string[];
  refreshTrigger?: number;
  isRefreshing?: boolean;
}

const useCircuitList = ({ initialCircuits, onApiError, searchQuery }: UseCircuitListProps = {}) => {
  const [circuits, setCircuits] = useState<Circuit[]>(initialCircuits || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCircuits = async () => {
      setLoading(true);
      try {
        const data = await circuitService.getAllCircuits();
        setCircuits(data);
        setError(null);
      } catch (err: any) {
        setError(err);
        if (onApiError) onApiError(err.message || "Failed to load circuits");
      } finally {
        setLoading(false);
      }
    };

    fetchCircuits();
  }, [onApiError]);

  return {
    circuits,
    loading,
    isLoading: loading,
    error,
    isError: !!error
  };
};

export function CircuitList({ onApiError, searchQuery }: CircuitListProps) {
  const { theme } = useSettings();
  const { circuits, isLoading, isError } = useCircuitList({ 
    onApiError,
    searchQuery
  });

  if (isLoading) {
    return <CircuitLoadingState />;
  }

  if (isError) {
    return <CircuitErrorState error={new Error("Failed to load circuits")} />;
  }

  return (
    <div className="w-full">
      {/* Use your custom table component instead of DataTable */}
      <div className="border rounded-md">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-left">Code</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {circuits.map((circuit) => (
              <tr key={circuit.id}>
                <td className="p-2">{circuit.circuitKey}</td>
                <td className="p-2">{circuit.title}</td>
                <td className="p-2">{circuit.descriptif}</td>
                <td className="p-2">{circuit.isActive ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
