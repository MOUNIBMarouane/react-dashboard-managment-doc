
import React from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import { Bell, User } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen w-full flex bg-dashboard-blue">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 border-b border-dashboard-blue-light px-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="font-semibold text-sm text-white/70">
              <span className="mr-2">Pages /</span>
              <span className="text-white">Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SearchBar />
            <button className="p-2 rounded-lg hover:bg-white/10">
              <Bell size={18} className="text-white/70" />
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white">
              <span>Sign In</span>
              <div className="w-8 h-8 rounded-full bg-dashboard-blue-light flex items-center justify-center">
                <User size={16} className="text-white/70" />
              </div>
            </button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="h-16 border-t border-dashboard-blue-light px-6 flex items-center justify-between text-xs text-white/50">
          <div>
            © 2025. Made with ❤️ by Lovable for a better web
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Marketplace</a>
            <a href="#" className="hover:text-white">Blog</a>
            <a href="#" className="hover:text-white">License</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
