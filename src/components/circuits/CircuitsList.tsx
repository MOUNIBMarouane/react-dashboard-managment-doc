import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { Edit, Trash2, FileText, Info, Search, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import circuitService from '@/services/circuitService';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EditCircuitDialog from './EditCircuitDialog';
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';
import CircuitDetailsDialog from './CircuitDetailsDialog';
import { useAuth } from '@/context/AuthContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CircuitsListProps {
  onApiError?: (errorMessage: string) => void;
  searchQuery?: string;
}

export default function CircuitsList({ onApiError, searchQuery = '' }: CircuitsListProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedCircuit, setSelectedCircuit] = useState<Circuit | null>(null);
  const { user } = useAuth();
  const isSimpleUser = user?.role === 'SimpleUser';

  const { data: circuits, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['circuits'],
    queryFn: circuitService.getAllCircuits,
  });

  if (isError && onApiError) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to load circuits. Please try again later.';
    onApiError(errorMessage);
  }

  const filteredCircuits = useMemo(() => {
    if (!searchQuery.trim() || !circuits) return circuits;
    
    const query = searchQuery.toLowerCase();
    return circuits.filter(circuit => 
      circuit.circuitKey?.toLowerCase().includes(query) || 
      circuit.title?.toLowerCase().includes(query) || 
      circuit.descriptif?.toLowerCase().includes(query)
    );
  }, [circuits, searchQuery]);

  const handleEdit = (circuit: Circuit) => {
    if (isSimpleUser) {
      toast.error('You do not have permission to edit circuits');
      return;
    }
    setSelectedCircuit(circuit);
    setEditDialogOpen(true);
  };

  const handleDelete = (circuit: Circuit) => {
    if (isSimpleUser) {
      toast.error('You do not have permission to delete circuits');
      return;
    }
    setSelectedCircuit(circuit);
    setDeleteDialogOpen(true);
  };

  const handleViewDetails = (circuit: Circuit) => {
    setSelectedCircuit(circuit);
    setDetailsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCircuit) return;
    
    try {
      await circuitService.deleteCircuit(selectedCircuit.id);
      toast.success("Circuit deleted successfully");
      refetch();
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to delete circuit';
      toast.error(errorMessage);
      if (onApiError) onApiError(errorMessage);
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full shadow-md bg-[#111633]/70 border-blue-900/30">
        <CardContent className="p-8">
          <div className="flex justify-center items-center h-24 text-blue-400">
            <div className="animate-pulse flex space-x-2">
              <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError && !onApiError) {
    return <div className="text-red-500 p-8">Error loading circuits</div>;
  }

  return (
    <Card className="w-full shadow-md bg-[#111633]/70 border-blue-900/30">
      <CardHeader className="flex flex-row items-center justify-between border-b border-blue-900/30 bg-blue-900/20">
        <CardTitle className="text-xl text-blue-100">Circuits</CardTitle>
        {filteredCircuits && filteredCircuits.length > 0 && (
          <Badge variant="outline" className="bg-blue-900/50 text-blue-300 border-blue-700/50">
            {filteredCircuits.length} {filteredCircuits.length === 1 ? 'Circuit' : 'Circuits'}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {filteredCircuits && filteredCircuits.length > 0 ? (
          <div className="rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-blue-900/30">
                  <TableHead className="text-blue-300">Circuit Key</TableHead>
                  <TableHead className="text-blue-300">Title</TableHead>
                  <TableHead className="text-blue-300">Description</TableHead>
                  <TableHead className="text-blue-300">Status</TableHead>
                  <TableHead className="text-blue-300">Flow Type</TableHead>
                  <TableHead className="text-right text-blue-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCircuits.map((circuit) => (
                  <TableRow 
                    key={circuit.id} 
                    className="border-blue-900/30 hover:bg-blue-900/20 transition-colors"
                  >
                    <TableCell className="font-medium text-blue-100">{circuit.circuitKey}</TableCell>
                    <TableCell className="text-blue-100">{circuit.title}</TableCell>
                    <TableCell className="max-w-xs truncate text-blue-200/70">
                      {circuit.descriptif || 'No description'}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={circuit.isActive ? "default" : "secondary"}
                        className={circuit.isActive 
                          ? "bg-green-900/50 text-green-300 hover:bg-green-900/70 border-green-700/50"
                          : "bg-gray-800/50 text-gray-400 hover:bg-gray-800/70 border-gray-700/50"
                        }
                      >
                        {circuit.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={circuit.hasOrderedFlow 
                          ? "border-blue-700/50 bg-blue-900/20 text-blue-300"
                          : "border-purple-700/50 bg-purple-900/20 text-purple-300"
                        }
                      >
                        {circuit.hasOrderedFlow ? 'Sequential' : 'Parallel'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <div className="flex justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-900/40"
                              onClick={() => handleViewDetails(circuit)}
                            >
                              {isSimpleUser ? <Info className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View details</TooltipContent>
                        </Tooltip>
                        
                        {!isSimpleUser && (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-900/40"
                                  onClick={() => handleEdit(circuit)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit circuit</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/30"
                                  onClick={() => handleDelete(circuit)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete circuit</TooltipContent>
                            </Tooltip>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            {searchQuery ? (
              <>
                <Search className="h-12 w-12 text-blue-500/40 mb-4" />
                <h3 className="text-lg font-medium text-blue-300 mb-1">No matching circuits</h3>
                <p className="text-blue-400/70 max-w-md">
                  We couldn't find any circuits matching "{searchQuery}". 
                  Try a different search term or clear your search.
                </p>
              </>
            ) : (
              <>
                <div className="rounded-full bg-blue-900/30 p-4 mb-4">
                  <FileText className="h-8 w-8 text-blue-400/70" />
                </div>
                <h3 className="text-lg font-medium text-blue-300 mb-1">No circuits found</h3>
                <p className="text-blue-400/70 max-w-md">
                  {!isSimpleUser ? 
                    'Create a new circuit to get started with document workflows.' : 
                    'There are no circuits available for viewing at the moment.'}
                </p>
                {!isSimpleUser && (
                  <Link to="/create-circuit" className="mt-4">
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                      <Plus className="mr-2 h-4 w-4" /> New Circuit
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        )}
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
              />
            </>
          )}
          
          <CircuitDetailsDialog
            circuit={selectedCircuit}
            open={detailsDialogOpen}
            onOpenChange={setDetailsDialogOpen}
          />
        </>
      )}
    </Card>
  );
}
