
import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="bg-white/10 border border-white/20 text-sm rounded-full w-64 pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-dashboard-accent"
      />
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
    </div>
  );
};

export default SearchBar;
