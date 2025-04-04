
import React from "react";
import { BarChart2, Home, CreditCard, FileCode, User, LogIn, UserPlus, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-dashboard-blue-dark border-r border-dashboard-blue-light shrink-0">
      {/* Logo */}
      <div className="h-16 border-b border-dashboard-blue-light px-6 flex items-center">
        <h1 className="font-bold text-xl flex items-center">
          <span className="text-dashboard-accent-light mr-2">VISION</span>
          <span className="text-white">UI</span>
          <span className="text-xs text-dashboard-accent ml-1">FREE</span>
        </h1>
      </div>
      
      {/* Navigation */}
      <nav className="p-4">
        <div className="mb-6">
          <div className="sidebar-item active">
            <Home size={18} />
            <span>Dashboard</span>
          </div>
          <div className="sidebar-item">
            <BarChart2 size={18} />
            <span>Tables</span>
          </div>
          <div className="sidebar-item">
            <CreditCard size={18} />
            <span>Billing</span>
          </div>
          <div className="sidebar-item">
            <FileCode size={18} />
            <span>RTL</span>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="px-4 py-2 text-xs uppercase text-white/40 font-medium">
            Account Pages
          </div>
          <div className="sidebar-item">
            <User size={18} />
            <span>Profile</span>
          </div>
          <div className="sidebar-item">
            <LogIn size={18} />
            <span>Sign In</span>
          </div>
          <div className="sidebar-item">
            <UserPlus size={18} />
            <span>Sign Up</span>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-dashboard-blue rounded-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-full bg-dashboard-accent flex items-center justify-center mb-3">
              <Settings size={18} className="text-white" />
            </div>
            <h3 className="font-medium text-sm mb-1">Need help?</h3>
            <p className="text-xs text-white/60 mb-2">Please check our docs</p>
            <button className="w-full py-2 bg-dashboard-blue-dark text-xs rounded text-center">
              DOCUMENTATION
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-dashboard-accent/20 blur-xl"></div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
