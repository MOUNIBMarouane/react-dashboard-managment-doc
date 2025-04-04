
import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Type here..."
        className="bg-dashboard-blue-light/50 border border-dashboard-blue-light text-sm rounded-lg w-48 pl-9 pr-4 py-2 text-white/70 placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-dashboard-accent"
      />
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
    </div>
  );
};

export default SearchBar;
