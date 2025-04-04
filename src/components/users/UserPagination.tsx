
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const UserPagination: React.FC<UserPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Calculate page range to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at the beginning
      if (currentPage <= 3) {
        endPage = Math.min(4, totalPages - 1);
      }
      
      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push('ellipsis-start');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-white/10'} border-white/10 text-white transition-all duration-300`}
          />
        </PaginationItem>
        
        {getPageNumbers().map((page, index) => (
          page === 'ellipsis-start' || page === 'ellipsis-end' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <span className="flex h-9 w-9 items-center justify-center text-white">...</span>
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page as number)}
                className={`
                  transition-all duration-300
                  ${page === currentPage 
                    ? 'bg-dashboard-accent text-white border-none' 
                    : 'text-white hover:bg-white/10 border-white/10'}
                `}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        ))}
        
        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-white/10'} border-white/10 text-white transition-all duration-300`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default UserPagination;
