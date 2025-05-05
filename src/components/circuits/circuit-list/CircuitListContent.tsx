import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EditCircuitDialog from "../EditCircuitDialog";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import CircuitDetailsDialog from "../CircuitDetailsDialog";
import { CircuitLoadingState } from "./CircuitLoadingState";
import { CircuitEmptyState } from "./CircuitEmptyState";
import { CircuitsTable } from "./CircuitsTable";
import { useSettings } from "@/context/SettingsContext";
import { RefreshCw, AlertCircle } from "lucide-react";

interface CircuitListContentProps {
  circuits: Circuit[] | undefined;
  isLoading: boolean;
  isError: boolean;
  isSimpleUser: boolean;
  searchQuery: string;
  selectedCircuit: Circuit | null;
  editDialogOpen: boolean;
  deleteDialogOpen: boolean;
  detailsDialogOpen: boolean;
  onEdit: (circuit: Circuit) => void;
  onDelete: (circuit: Circuit) => void;
  onViewDetails: (circuit: Circuit) => void;
  setEditDialogOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  setDetailsDialogOpen: (open: boolean) => void;
  confirmDelete: () => Promise<void>;
  refetch: () => void;
  hasNoSearchResults?: boolean;
  isRefreshing?: boolean;
}

export function CircuitListContent({
  circuits,
  isLoading,
  isError,
  isSimpleUser,
  searchQuery,
  selectedCircuit,
  editDialogOpen,
  deleteDialogOpen,
  detailsDialogOpen,
  onEdit,
  onDelete,
  onViewDetails,
  setEditDialogOpen,
  setDeleteDialogOpen,
  setDetailsDialogOpen,
  confirmDelete,
  refetch,
  hasNoSearchResults,
  isRefreshing = false,
}: CircuitListContentProps) {
  const { theme } = useSettings();

  // Determine if we're in initial loading or just refreshing
  const isInitialLoading = isLoading && !circuits;
  const isRefreshingData = isLoading && circuits && circuits.length > 0;

  if (isInitialLoading) {
    return <CircuitLoadingState message="Loading circuits..." />;
  }

  if (isError) {
    return (
      <div
        className={`p-8 rounded-lg text-center ${
          theme === "dark"
            ? "text-red-400 bg-red-900/10 border border-red-900/30"
            : "text-red-600 bg-red-50/80 border border-red-200 shadow-sm"
        }`}
      >
        <div className="flex flex-col items-center">
          <AlertCircle
            className={`h-12 w-12 mb-4 ${
              theme === "dark" ? "text-red-400" : "text-red-500"
            }`}
          />
          <p className="text-lg font-medium mb-2">Error loading circuits</p>
          <p className="text-sm mb-4 opacity-80">
            There was a problem loading the data. Please try again.
          </p>
          <button
            onClick={refetch}
            className={`mt-2 px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              theme === "dark"
                ? "bg-blue-800 hover:bg-blue-700 text-blue-100"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            }`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!circuits || circuits.length === 0) {
    return (
      <Card
        className={`w-full ${
          theme === "dark"
            ? "bg-[#111633]/70 border-blue-900/30 shadow-md"
            : "bg-white border-blue-200/60 shadow-lg"
        }`}
      >
        <CardHeader
          className={`flex flex-row items-center justify-between ${
            theme === "dark"
              ? "border-b border-blue-900/30 bg-blue-900/20"
              : "border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50/70"
          }`}
        >
          <CardTitle
            className={`text-xl ${
              theme === "dark"
                ? "text-blue-100"
                : "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 font-bold"
            }`}
          >
            Circuits
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CircuitEmptyState
            searchQuery={searchQuery}
            isSimpleUser={isSimpleUser}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`w-full ${
        theme === "dark"
          ? "bg-[#111633]/70 border-blue-900/30 shadow-md"
          : "bg-white border-blue-200/60 shadow-lg"
      }`}
    >
      <CardHeader
        className={`flex flex-row items-center justify-between ${
          theme === "dark"
            ? "border-b border-blue-900/30 bg-blue-900/20"
            : "border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50/70"
        }`}
      >
        <CardTitle
          className={`text-xl ${
            theme === "dark"
              ? "text-blue-100"
              : "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 font-bold"
          }`}
        >
          Circuits
        </CardTitle>
        <div className="flex items-center gap-2">
          {isRefreshingData && (
            <Badge
              variant="outline"
              className={
                theme === "dark"
                  ? "bg-blue-900/40 text-blue-200 border-blue-700/50 animate-pulse flex items-center"
                  : "bg-blue-50 text-blue-600 border-blue-300/80 animate-pulse flex items-center shadow-sm"
              }
            >
              <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
              Refreshing...
            </Badge>
          )}
          <Badge
            variant={theme === "dark" ? "outline" : "info"}
            className={
              theme === "dark"
                ? "bg-blue-900/50 text-blue-300 border-blue-700/50"
                : "text-blue-700 shadow-sm"
            }
          >
            {circuits.length} {circuits.length === 1 ? "Circuit" : "Circuits"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className={`p-0 ${isRefreshingData ? "opacity-70" : ""}`}>
        <CircuitsTable
          circuits={circuits}
          isSimpleUser={isSimpleUser}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewDetails={onViewDetails}
        />
      </CardContent>

      {selectedCircuit && (
        <>
          {!isSimpleUser && (
            <>
              <EditCircuitDialog
                circuit={selectedCircuit}
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                onSuccess={refetch}
              />

              <DeleteConfirmDialog
                title="Delete Circuit"
                description={`Are you sure you want to delete the circuit "${selectedCircuit.title}"? This action cannot be undone.`}
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={confirmDelete}
                confirmText="Delete"
                destructive={true}
              />
            </>
          )}

          <CircuitDetailsDialog
            circuitId={selectedCircuit?.id || 0}
            open={detailsDialogOpen}
            onOpenChange={setDetailsDialogOpen}
            circuit={selectedCircuit}
          />
        </>
      )}
    </Card>
  );
}
