
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash, UserCog, Users as UsersIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

// User type definition
interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Editor";
  status: "Active" | "Inactive" | "Pending";
  avatarUrl?: string;
}

// Sample user data
const sampleUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Admin",
    status: "Active",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: "2",
    name: "Sarah Miller",
    email: "sarah@example.com",
    role: "User",
    status: "Active",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: "3",
    name: "James Wilson",
    email: "james@example.com",
    role: "Editor",
    status: "Inactive"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "User",
    status: "Pending",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Editor",
    status: "Active"
  }
];

const Users = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<User["role"]>("User");
  
  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };
  
  // Handle individual user selection
  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };
  
  // Delete selected users
  const deleteSelectedUsers = () => {
    setUsers(users.filter(user => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
    setIsDeleteDialogOpen(false);
    toast.success(`${selectedUsers.length} users deleted successfully`);
  };
  
  // Change role for selected users
  const changeUserRole = () => {
    setUsers(users.map(user => {
      if (selectedUsers.includes(user.id)) {
        return { ...user, role: newRole };
      }
      return user;
    }));
    setSelectedUsers([]);
    setIsRoleDialogOpen(false);
    toast.success(`Role updated for ${selectedUsers.length} users`);
  };
  
  // Get status badge color
  const getStatusColor = (status: User["status"]) => {
    switch(status) {
      case "Active": return "bg-green-500";
      case "Inactive": return "bg-gray-500";
      case "Pending": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };
  
  return (
    <Layout>
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <UsersIcon className="mr-2 text-dashboard-accent" />
            <h1 className="text-2xl font-bold text-white">Users</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            {selectedUsers.length > 0 && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setIsRoleDialogOpen(true)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  Change Role
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-dashboard-blue-dark">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="w-12 text-white/50">
                    <Checkbox 
                      checked={selectedUsers.length === users.length && users.length > 0}
                      onCheckedChange={handleSelectAll}
                      className="border-white/30"
                    />
                  </TableHead>
                  <TableHead className="text-white/50">User</TableHead>
                  <TableHead className="text-white/50">Role</TableHead>
                  <TableHead className="text-white/50">Status</TableHead>
                  <TableHead className="text-white/50 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow 
                    key={user.id} 
                    className={`border-white/10 ${selectedUsers.includes(user.id) ? 'bg-white/5' : ''}`}
                  >
                    <TableCell className="p-2">
                      <Checkbox 
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked) => handleSelectUser(user.id, !!checked)}
                        className="border-white/30"
                      />
                    </TableCell>
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-white/10">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback className="bg-dashboard-accent/20 text-dashboard-accent">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-white/50">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/70">{user.role}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`text-white border-none ${getStatusColor(user.status)}`}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="h-8 w-8 p-0 hover:bg-white/10"
                            aria-label="Open menu"
                          >
                            <MoreHorizontal className="h-4 w-4 text-white/50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-dashboard-blue-dark border-white/10 text-white">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem 
                            onClick={() => handleSelectUser(user.id, true)}
                            className="cursor-pointer hover:bg-white/10"
                          >
                            Select
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-400 cursor-pointer hover:bg-white/10"
                            onClick={() => {
                              setSelectedUsers([user.id]);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-white/50">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-dashboard-blue-dark border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to delete {selectedUsers.length} {selectedUsers.length === 1 ? 'user' : 'users'}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteSelectedUsers}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Change Role Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="bg-dashboard-blue-dark border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Change User Role</DialogTitle>
            <DialogDescription className="text-white/70">
              Select a new role for {selectedUsers.length} {selectedUsers.length === 1 ? 'user' : 'users'}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={newRole === "User" ? "default" : "outline"} 
                className={newRole !== "User" ? "border-white/20 text-white hover:bg-white/10" : ""}
                onClick={() => setNewRole("User")}
              >
                User
              </Button>
              <Button 
                variant={newRole === "Editor" ? "default" : "outline"}
                className={newRole !== "Editor" ? "border-white/20 text-white hover:bg-white/10" : ""}
                onClick={() => setNewRole("Editor")}
              >
                Editor
              </Button>
              <Button 
                variant={newRole === "Admin" ? "default" : "outline"}
                className={newRole !== "Admin" ? "border-white/20 text-white hover:bg-white/10" : ""}
                onClick={() => setNewRole("Admin")}
              >
                Admin
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRoleDialogOpen(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button onClick={changeUserRole}>
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Users;
