import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSettings } from "@/context/SettingsContext";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Edit2,
  Copy,
  ChevronDown,
  Eye,
  MoreHorizontal,
  Archive,
  Download,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CircuitsTableProps {
  circuits: Circuit[];
  isSimpleUser: boolean;
  onEdit: (circuit: Circuit) => void;
  onDelete: (circuit: Circuit) => void;
  onViewDetails: (circuit: Circuit) => void;
}

export function CircuitsTable({
  circuits,
  isSimpleUser,
  onEdit,
  onDelete,
  onViewDetails,
}: CircuitsTableProps) {
  const { theme } = useSettings();
  const [selectedCircuits, setSelectedCircuits] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCircuits(paginatedCircuits.map((c) => c.id));
    } else {
      setSelectedCircuits([]);
    }
  };

  const handleSelectCircuit = (circuitId: number, checked: boolean) => {
    if (checked) {
      setSelectedCircuits((prev) => [...prev, circuitId]);
    } else {
      setSelectedCircuits((prev) => prev.filter((id) => id !== circuitId));
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(circuits.length / rowsPerPage);

  const paginatedCircuits = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return circuits.slice(startIndex, startIndex + rowsPerPage);
  }, [circuits, currentPage, rowsPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const isAllSelected =
    paginatedCircuits.length > 0 &&
    paginatedCircuits.every((circuit) => selectedCircuits.includes(circuit.id));

  const hasSelected = selectedCircuits.length > 0;

  // Styles for different themes
  const tableStyles = {
    background:
      theme === "dark"
        ? "bg-[#0c1228] border-b border-blue-900/40"
        : "bg-white border-b border-blue-100/80",
    stripedRow: theme === "dark" ? "bg-[#0e1531]/80" : "bg-blue-50/30",
    header:
      theme === "dark"
        ? "bg-[#111a3c] text-blue-300 border-blue-800/50"
        : "bg-gradient-to-r from-blue-50 to-indigo-50/70 text-blue-800 border-blue-200/70 font-medium",
    selectedRow:
      theme === "dark"
        ? "bg-blue-900/40 border-blue-700/50"
        : "bg-blue-100/80 border-blue-300/50 shadow-inner",
    hoverRow:
      theme === "dark"
        ? "hover:bg-blue-900/20"
        : "hover:bg-blue-100/70 hover:shadow-sm transition-all duration-200",
  };

  return (
    <div className="rounded-md overflow-hidden shadow-sm relative">
      <div
        className={`${
          theme === "dark" ? "bg-[#070d1f]" : "bg-white"
        } rounded-md`}
      >
        <Table>
          <TableHeader>
            <TableRow className={tableStyles.header}>
              <TableHead className="w-10 text-center">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={(checked) =>
                    handleSelectAll(checked as boolean)
                  }
                  className={`
                    ${
                      theme === "dark"
                        ? "border-blue-500/50 data-[state=checked]:bg-indigo-600"
                        : "border-blue-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    }
                  `}
                />
              </TableHead>
              <TableHead className="font-semibold">Circuit Code</TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Flow Type</TableHead>
              <TableHead className="text-right font-semibold pr-4">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCircuits.map((circuit, index) => {
              const isSelected = selectedCircuits.includes(circuit.id);
              const isEven = index % 2 === 0;

              return (
                <TableRow
                  key={circuit.id}
                  className={`
                    transition-colors
                    ${
                      isSelected
                        ? tableStyles.selectedRow
                        : isEven
                        ? tableStyles.background
                        : tableStyles.stripedRow
                    }
                    ${tableStyles.hoverRow}
                  `}
                >
                  <TableCell className="w-10 text-center">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        handleSelectCircuit(circuit.id, checked as boolean)
                      }
                      className={`
                        ${
                          theme === "dark"
                            ? "border-blue-500/50 data-[state=checked]:bg-indigo-600"
                            : "border-blue-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        }
                      `}
                    />
                  </TableCell>
                  <TableCell
                    className={`
                    font-medium
                    ${theme === "dark" ? "text-blue-100" : "text-blue-800"}
                  `}
                  >
                    <Link
                      to={`/circuits/${circuit.id}/steps`}
                      className="hover:underline flex items-center"
                    >
                      <span
                        className={`
                        px-2.5 py-1 rounded-md text-xs mr-2 font-semibold
                        ${
                          theme === "dark"
                            ? "bg-indigo-900/40 border border-indigo-700/50 text-indigo-300"
                            : "bg-indigo-100 border border-indigo-200 text-indigo-700 shadow-sm"
                        }
                      `}
                      >
                        {circuit.circuitKey}
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell
                    className={`
                    font-medium
                    ${theme === "dark" ? "text-blue-100" : "text-blue-800"}
                  `}
                  >
                    <Link
                      to={`/circuits/${circuit.id}/steps`}
                      className="hover:underline hover:text-blue-600 transition-colors"
                    >
                      {circuit.title}
                    </Link>
                  </TableCell>
                  <TableCell
                    className={`
                    max-w-xs truncate
                    ${
                      theme === "dark"
                        ? "text-blue-300/80"
                        : "text-blue-600/90 font-medium"
                    }
                  `}
                  >
                    {circuit.descriptif || "No description"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={circuit.isActive ? "success" : "secondary"}
                      className={
                        circuit.isActive
                          ? theme === "dark"
                            ? "bg-emerald-900/50 text-emerald-300 hover:bg-emerald-900/70 border-emerald-700/50"
                            : ""
                          : theme === "dark"
                          ? "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800/70 border-zinc-700/50"
                          : ""
                      }
                    >
                      {circuit.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={circuit.hasOrderedFlow ? "info" : "warning"}
                      className={
                        theme === "dark"
                          ? circuit.hasOrderedFlow
                            ? "bg-blue-900/50 text-blue-300 border-blue-700/50"
                            : "bg-amber-900/50 text-amber-300 border-amber-700/50"
                          : ""
                      }
                    >
                      {circuit.hasOrderedFlow ? "Sequential" : "Parallel"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewDetails(circuit)}
                        className={`
                          h-8 w-8 
                          ${
                            theme === "dark"
                              ? "text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
                              : "text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                          }
                        `}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {!isSimpleUser && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(circuit)}
                            className={`
                              h-8 w-8
                              ${
                                theme === "dark"
                                  ? "text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
                                  : "text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                              }
                            `}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(circuit)}
                            className={`
                              h-8 w-8
                              ${
                                theme === "dark"
                                  ? "text-red-400 hover:text-red-300 hover:bg-red-900/50"
                                  : "text-red-600 hover:text-red-700 hover:bg-red-100"
                              }
                            `}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {circuits.length > 0 && (
          <div
            className={`
              flex justify-between items-center px-4 py-2 sm:px-6
              ${
                theme === "dark"
                  ? "bg-[#0c1228] border-t border-blue-900/30"
                  : "bg-gray-50 border-t border-blue-100/50"
              }
            `}
          >
            <div className="flex items-center text-sm">
              <span
                className={`mr-2 ${
                  theme === "dark"
                    ? "text-blue-400"
                    : "text-blue-700 font-medium"
                }`}
              >
                Rows per page:
              </span>
              <Select
                value={String(rowsPerPage)}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger
                  className={`
                    w-16 h-8
                    ${
                      theme === "dark"
                        ? "bg-[#111a3c]/80 text-blue-300 border-blue-800/60"
                        : "bg-white text-blue-700 border-blue-200"
                    }
                  `}
                >
                  <SelectValue>{rowsPerPage}</SelectValue>
                </SelectTrigger>
                <SelectContent
                  className={
                    theme === "dark"
                      ? "bg-[#111633] border-blue-900/50"
                      : "bg-white border-blue-200"
                  }
                >
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className={`
                  h-8 w-8 md:h-9 md:w-9
                  ${
                    theme === "dark"
                      ? "border-blue-800/60 text-blue-300 bg-[#111a3c]/80 hover:bg-[#111a3c] disabled:text-blue-900/50 disabled:border-blue-900/30"
                      : "border-blue-200 text-blue-700 hover:bg-blue-50 disabled:text-blue-300 disabled:border-blue-200/50 disabled:bg-blue-50/50"
                  }
                `}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
                  h-8 w-8 md:h-9 md:w-9
                  ${
                    theme === "dark"
                      ? "border-blue-800/60 text-blue-300 bg-[#111a3c]/80 hover:bg-[#111a3c] disabled:text-blue-900/50 disabled:border-blue-900/30"
                      : "border-blue-200 text-blue-700 hover:bg-blue-50 disabled:text-blue-300 disabled:border-blue-200/50 disabled:bg-blue-50/50"
                  }
                `}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-blue-300" : "text-blue-700"
                }`}
              >
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
                  h-8 w-8 md:h-9 md:w-9
                  ${
                    theme === "dark"
                      ? "border-blue-800/60 text-blue-300 bg-[#111a3c]/80 hover:bg-[#111a3c] disabled:text-blue-900/50 disabled:border-blue-900/30"
                      : "border-blue-200 text-blue-700 hover:bg-blue-50 disabled:text-blue-300 disabled:border-blue-200/50 disabled:bg-blue-50/50"
                  }
                `}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className={`
                  h-8 w-8 md:h-9 md:w-9
                  ${
                    theme === "dark"
                      ? "border-blue-800/60 text-blue-300 bg-[#111a3c]/80 hover:bg-[#111a3c] disabled:text-blue-900/50 disabled:border-blue-900/30"
                      : "border-blue-200 text-blue-700 hover:bg-blue-50 disabled:text-blue-300 disabled:border-blue-200/50 disabled:bg-blue-50/50"
                  }
                `}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
