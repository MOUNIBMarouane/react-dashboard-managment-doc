
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import { Bell, User, Calendar, Menu, X } from "lucide-react";
import { format } from "date-fns";
import { useIsMobile } from "../hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className="h-screen w-full flex bg-dashboard-blue overflow-hidden">
      {/* Sidebar - Fixed */}
      {isMobile ? (
        <div className={`fixed inset-0 z-30 ${showMobileSidebar ? 'block' : 'hidden'}`}>
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleMobileSidebar}
          ></div>
          <div className="w-64 h-full relative z-40">
            <Sidebar onClose={toggleMobileSidebar} />
          </div>
        </div>
      ) : (
        <Sidebar />
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar - Fixed */}
        <header className="h-16 border-b border-white/10 px-4 md:px-6 flex items-center justify-between sticky top-0 z-10 bg-dashboard-blue bg-opacity-80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            {isMobile && (
              <button 
                onClick={toggleMobileSidebar} 
                className="p-2 rounded-lg hover:bg-white/10 text-white"
              >
                <Menu size={20} />
              </button>
            )}
            <h1 className="text-lg md:text-2xl font-bold text-white">Welcome back, <span className="text-dashboard-accent">admin</span></h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-2 text-white/50 text-sm">
              <Calendar size={16} />
              <span>{today}</span>
            </div>
            <SearchBar />
            <button className="p-2 rounded-lg hover:bg-white/10 relative">
              <Bell size={18} className="text-white/70" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white">
              <div className="w-8 h-8 rounded-full bg-dashboard-accent flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            </button>
          </div>
        </header>
        
        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
        
        {/* Footer - Moves with content scroll */}
        <footer className="h-16 border-t border-white/10 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 py-2">
          <div className="text-center md:text-left">
            © 2025. Made with ❤️ by Lovable for a better web
          </div>
          <div className="flex gap-4 mt-1 md:mt-0">
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
