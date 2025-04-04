
import React from "react";
import { Search } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const SearchBar = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className={`bg-white/10 border border-white/20 text-sm rounded-full ${isMobile ? 'w-36' : 'w-64'} pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-dashboard-accent`}
      />
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
    </div>
  );
};

export default SearchBar;
