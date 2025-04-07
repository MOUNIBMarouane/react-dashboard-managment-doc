
import { Circuit } from "@/types/circuit";

// Filter circuits based on search query
export const filterCircuits = (circuits: Circuit[], searchQuery: string): Circuit[] => {
  if (!searchQuery.trim()) return circuits;
  
  const query = searchQuery.toLowerCase().trim();
  return circuits.filter(circuit => 
    circuit.title.toLowerCase().includes(query) || 
    circuit.circuit_key.toLowerCase().includes(query) ||
    circuit.descriptif.toLowerCase().includes(query)
  );
};

// Paginate circuits
export const paginateCircuits = (
  circuits: Circuit[], 
  currentPage: number,
  circuitsPerPage: number
): Circuit[] => {
  const startIndex = (currentPage - 1) * circuitsPerPage;
  const endIndex = startIndex + circuitsPerPage;
  return circuits.slice(startIndex, endIndex);
};

// Calculate total pages
export const calculateTotalPages = (
  circuitsLength: number, 
  circuitsPerPage: number
): number => {
  return Math.ceil(circuitsLength / circuitsPerPage);
};
