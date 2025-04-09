
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  FileText,
  GitBranch,
  CircleCheck,
  Settings,
  Users
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";

export function SidebarNav() {
  const { user } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2 px-2">
          <span className="text-xl font-semibold">DocuVerse</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              isActive={isActive('/dashboard')} 
              tooltip="Dashboard"
              asChild
            >
              <Link to="/dashboard">
                <Home className="mr-2 h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              isActive={isActive('/documents')} 
              tooltip="Documents"
              asChild
            >
              <Link to="/documents">
                <FileText className="mr-2 h-5 w-5" />
                <span>Documents</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              isActive={isActive('/circuits')} 
              tooltip="Circuits"
              asChild
            >
              <Link to="/circuits">
                <GitBranch className="mr-2 h-5 w-5" />
                <span>Circuits</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              isActive={isActive('/pending-approvals')} 
              tooltip="Approvals"
              asChild
            >
              <Link to="/pending-approvals">
                <CircleCheck className="mr-2 h-5 w-5" />
                <span>Approvals</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          {user?.role === 'Admin' && (
            <SidebarMenuItem>
              <SidebarMenuButton 
                isActive={isActive('/admin')} 
                tooltip="Admin"
                asChild
              >
                <Link to="/admin">
                  <Users className="mr-2 h-5 w-5" />
                  <span>Admin</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <SidebarMenuButton 
          isActive={isActive('/profile')} 
          variant="outline" 
          tooltip="Settings"
          asChild
        >
          <Link to="/profile" className="w-full">
            <Settings className="mr-2 h-5 w-5" />
            <span>Settings</span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
