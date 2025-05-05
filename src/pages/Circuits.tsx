import CircuitsList from "@/components/circuits/CircuitsList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  InfoIcon,
  Lock,
  AlertCircle,
  Plus,
  Search,
  Calendar,
  Filter,
  CalendarDays,
  Columns,
  X,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateCircuitDialog from "@/components/circuits/CreateCircuitDialog";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useSettings } from "@/context/SettingsContext";
import { toast } from "sonner";

// Available search columns
type SearchColumn = "code" | "title" | "description";

export default function CircuitsPage() {
  const { user } = useAuth();
  const { theme } = useSettings();
  const [apiError, setApiError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [flowType, setFlowType] = useState<string | undefined>(undefined);
  const [searchColumns, setSearchColumns] = useState<SearchColumn[]>([
    "code",
    "title",
    "description",
  ]);
  const isSimpleUser = user?.role === "SimpleUser";

  // For dialog open/close state and refetch trigger
  const [createOpen, setCreateOpen] = useState(false);
  const [refreshCircuits, setRefreshCircuits] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(new Date());

  // Clear any API errors when component mounts or when user changes
  useEffect(() => {
    setApiError("");
    // Trigger an initial refresh when page loads
    handleManualRefresh();
  }, [user]);

  // Function to handle API errors from child components
  const handleApiError = (errorMessage: string) => {
    setApiError(errorMessage);
  };

  // Refetch circuits list after creation
  const handleCircuitCreated = () => {
    setRefreshCircuits((c) => c + 1);
    setLastRefreshed(new Date());
    toast.success("Circuit created successfully");
  };

  // Handle manual refresh
  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setRefreshCircuits((c) => c + 1);

    // Set a timeout to ensure the refreshing state is visible
    // even if the refresh happens very quickly
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed(new Date());
    }, 500);
  };

  // Format time ago string (e.g., "2 minutes ago")
  const getTimeAgoString = () => {
    if (!lastRefreshed) return "Never";

    const seconds = Math.floor(
      (new Date().getTime() - lastRefreshed.getTime()) / 1000
    );

    if (seconds < 5) return "Just now";
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 120) return "1 minute ago";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 7200) return "1 hour ago";
    return `${Math.floor(seconds / 3600)} hours ago`;
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setDateRange(undefined);
    setFlowType(undefined);
  };

  // Toggle a search column
  const toggleSearchColumn = (column: SearchColumn) => {
    setSearchColumns((prev) => {
      if (prev.includes(column)) {
        // Don't allow removing the last column
        if (prev.length === 1) return prev;
        return prev.filter((c) => c !== column);
      } else {
        return [...prev, column];
      }
    });
  };

  // Check if any filters are active
  const hasActiveFilters = searchQuery || dateRange || flowType;

  return (
    <div className="p-6 space-y-6">
      <CreateCircuitDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={handleCircuitCreated}
      />

      <div className="flex justify-between items-center">
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-200 to-purple-200 text-transparent bg-clip-text"
                : "bg-gradient-to-r from-blue-700 to-indigo-800 text-transparent bg-clip-text"
            }`}
          >
            Circuit Management
          </h1>
          <p
            className={
              theme === "dark" ? "text-gray-400" : "text-gray-600 font-medium"
            }
          >
            {isSimpleUser
              ? "View document workflow circuits"
              : "Create and manage document workflow circuits"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className={`h-9 px-3 ${
                theme === "dark"
                  ? "border-blue-800/40 bg-blue-900/10"
                  : "border-blue-300 bg-blue-50 text-blue-700"
              } ${isRefreshing ? "opacity-70" : ""}`}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${
                  isRefreshing ? "animate-spin" : ""
                } ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
              />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </Button>

            {lastRefreshed && (
              <div
                className={`ml-2 text-xs ${
                  theme === "dark"
                    ? "text-blue-400/70"
                    : "text-blue-600/90 font-medium"
                }`}
              >
                Last updated {getTimeAgoString()}
              </div>
            )}
          </div>

          {!isSimpleUser && (
            <Button
              className={`${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
              }`}
              onClick={() => setCreateOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> New Circuit
            </Button>
          )}
        </div>
      </div>

      {apiError && (
        <Alert
          variant="destructive"
          className={
            theme === "dark"
              ? "mb-4 border-red-800 bg-red-950/50 text-red-300"
              : "mb-4 border-red-200 bg-red-50 text-red-700 shadow-sm"
          }
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}

      <div
        className={`flex flex-col gap-4 rounded-lg border p-4 ${
          theme === "dark"
            ? "bg-blue-900/20 border-blue-800/30"
            : "bg-gradient-to-r from-blue-50 to-indigo-50/70 border-blue-200/50 shadow-sm"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Search
              className={`h-4 w-4 ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <h2
              className={`font-medium ${
                theme === "dark" ? "text-blue-300" : "text-blue-700"
              }`}
            >
              Search Circuits
            </h2>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 max-w-xl w-full">
              <Input
                placeholder={`Search by ${searchColumns
                  .map((c) =>
                    c === "code"
                      ? "Code"
                      : c === "title"
                      ? "Title"
                      : "Description"
                  )
                  .join(", ")}...`}
                className={`
                  pr-10 
                  ${
                    theme === "dark"
                      ? "bg-[#0a1033]/80 border-blue-800/50 text-blue-100 focus:border-blue-500 focus:ring-blue-500/30"
                      : "bg-white border-blue-200 text-blue-900 focus:border-blue-500 focus:ring-blue-500/30"
                  }
                `}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full ${
                    theme === "dark"
                      ? "text-blue-400 hover:bg-blue-900/50"
                      : "text-blue-500 hover:bg-blue-100"
                  }`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`w-10 h-10 ${
                    theme === "dark"
                      ? "bg-blue-900/20 border-blue-800/40 text-blue-400 hover:bg-blue-900/30"
                      : "bg-white border-blue-200 text-blue-600 hover:bg-blue-50"
                  } ${
                    hasActiveFilters
                      ? theme === "dark"
                        ? "border-blue-500/70"
                        : "border-blue-400 bg-blue-50"
                      : ""
                  }`}
                >
                  <Filter
                    className={`h-4 w-4 ${
                      hasActiveFilters
                        ? theme === "dark"
                          ? "text-blue-300"
                          : "text-blue-600"
                        : ""
                    }`}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={`w-80 p-4 ${
                  theme === "dark"
                    ? "bg-[#0e183d] border-blue-900/30"
                    : "bg-white border-blue-200 shadow-md"
                }`}
                side="bottom"
                align="end"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`font-medium ${
                        theme === "dark" ? "text-blue-300" : "text-blue-700"
                      }`}
                    >
                      Filters
                    </h4>
                    {hasActiveFilters && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={clearFilters}
                        className={`text-xs h-8 px-2 py-1 ${
                          theme === "dark"
                            ? "text-blue-400 hover:text-blue-300 hover:bg-blue-950/70"
                            : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        }`}
                      >
                        Clear all
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label
                        className={`text-sm ${
                          theme === "dark" ? "text-blue-300" : "text-blue-700"
                        }`}
                      >
                        Flow Type
                      </label>
                      <Select value={flowType} onValueChange={setFlowType}>
                        <SelectTrigger
                          className={`w-full ${
                            theme === "dark"
                              ? "bg-blue-950/50 border-blue-800/50 text-blue-200"
                              : "bg-white border-blue-200 text-blue-800"
                          }`}
                        >
                          <SelectValue placeholder="Select flow type" />
                        </SelectTrigger>
                        <SelectContent
                          className={`${
                            theme === "dark"
                              ? "bg-[#111633] border-blue-900/50"
                              : "bg-white border-blue-200"
                          }`}
                        >
                          <SelectItem value="sequential">Sequential</SelectItem>
                          <SelectItem value="parallel">Parallel</SelectItem>
                          <SelectItem value="all">All Types</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center">
                        <CalendarDays
                          className={`h-4 w-4 mr-2 ${
                            theme === "dark" ? "text-blue-400" : "text-blue-600"
                          }`}
                        />
                        <label
                          className={`text-sm ${
                            theme === "dark" ? "text-blue-300" : "text-blue-700"
                          }`}
                        >
                          Creation Date Range
                        </label>
                      </div>
                      <DateRangePicker
                        date={dateRange}
                        onDateChange={setDateRange}
                        className="w-full"
                      />
                      {dateRange && dateRange.from && (
                        <div className="flex items-center mt-2">
                          <Badge
                            variant="info"
                            className={
                              theme === "dark"
                                ? "bg-blue-900/50 text-blue-200 border border-blue-700/50"
                                : "bg-blue-100/80 text-blue-800 border border-blue-200"
                            }
                          >
                            {dateRange.from
                              ? format(dateRange.from, "MMM dd, yyyy")
                              : ""}
                            {dateRange.to
                              ? ` to ${format(dateRange.to, "MMM dd, yyyy")}`
                              : ""}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setDateRange(undefined)}
                            className={`ml-2 h-6 w-6 p-0 rounded-full ${
                              theme === "dark"
                                ? "text-blue-400 hover:bg-blue-900/50"
                                : "text-blue-600 hover:bg-blue-100"
                            }`}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <CircuitsList
        onError={handleApiError}
        searchQuery={searchQuery}
        dateRange={dateRange}
        flowType={flowType}
        searchColumns={searchColumns}
        refreshTrigger={refreshCircuits}
        isRefreshing={isRefreshing}
      />
    </div>
  );
}
