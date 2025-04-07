
import React from "react";
import { BarChart2, Home, CreditCard, FileCode, User, LogIn, UserPlus, Settings, FileText, Users, LogOut, X, Tag, GitGraph } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
interface SidebarProps {
  onClose?: () => void;
}
const Sidebar = ({
  onClose
}: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, perform logout actions here
    console.log("User logged out");
    // You would typically clear auth tokens, user data, etc.
    navigate('/');
  };
  
  return <aside className="w-64 bg-dashboard-blue-dark border-r border-white/10 shrink-0 h-full overflow-y-auto">
      {/* Logo */}
      <div className="h-16 border-b border-white/10 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-dashboard-accent flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">aennaki</h2>
            <p className="text-xs text-white/50">Admin</p>
          </div>
        </div>
        {onClose && <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-white/70 md:hidden">
            <X size={18} />
          </button>}
      </div>
      
      {/* Navigation */}
      <nav className="p-4">
        <div className="mb-6">
          <div className="px-3 py-2 text-xs uppercase text-white/40 font-medium">
            MAIN
          </div>
          <Link to="/" className={`sidebar-item ${location.pathname === '/' ? 'active' : ''}`}>
            <Home size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/users" className={`sidebar-item ${location.pathname === '/users' ? 'active' : ''}`}>
            <Users size={18} />
            <span>Users</span>
          </Link>
          <Link to="/documents" className={`sidebar-item ${location.pathname === '/documents' ? 'active' : ''}`}>
            <FileText size={18} />
            <span>Documents</span>
          </Link>
          <Link to="/types" className={`sidebar-item ${location.pathname === '/types' ? 'active' : ''}`}>
            <Tag size={18} />
            <span>Types</span>
          </Link>
          <Link to="/circuits" className={`sidebar-item ${location.pathname === '/circuits' ? 'active' : ''}`}>
            <GitGraph size={18} />
            <span>Circuits</span>
          </Link>
        </div>
        
        <div className="mb-2">
          <div className="px-3 py-2 text-xs uppercase text-white/40 font-medium">
            ACCOUNT
          </div>
          <div className="sidebar-item">
            <User size={18} />
            <span>Profile</span>
          </div>
          <div className="sidebar-item">
            <Settings size={18} />
            <span>Settings</span>
          </div>
        </div>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>;
};
export default Sidebar;
