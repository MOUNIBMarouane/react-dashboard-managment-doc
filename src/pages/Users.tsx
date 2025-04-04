
import React, { useState, useEffect, useMemo } from "react";
import Layout from "../components/Layout";
import { toast } from "sonner";
import { User } from "@/types/user";
import UserTable from "@/components/users/UserTable";
import DeleteUserDialog from "@/components/users/DeleteUserDialog";
import ChangeRoleDialog from "@/components/users/ChangeRoleDialog";
import UsersHeader from "@/components/users/UsersHeader";
import UserPagination from "@/components/users/UserPagination";

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
  },
  // Adding more users for pagination demonstration
  {
    id: "6",
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "User",
    status: "Active"
  },
  {
    id: "7",
    name: "Daniel Smith",
    email: "daniel@example.com",
    role: "User",
    status: "Inactive"
  },
  {
    id: "8",
    name: "Olivia Johnson",
    email: "olivia@example.com",
    role: "Editor",
    status: "Active"
  },
  {
    id: "9",
    name: "William Davis",
    email: "william@example.com",
    role: "Admin",
    status: "Active"
  },
  {
    id: "10",
    name: "Sophia Martinez",
    email: "sophia@example.com",
    role: "User",
    status: "Pending"
  },
  {
    id: "11",
    name: "Liam Taylor",
    email: "liam@example.com",
    role: "Editor",
    status: "Active"
  },
  {
    id: "12",
    name: "Ava Anderson",
    email: "ava@example.com",
    role: "User",
    status: "Inactive"
  }
];

// Number of users per page
const USERS_PER_PAGE = 5;

const Users = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<User["role"]>("User");
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    
    const query = searchQuery.toLowerCase().trim();
    return users.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      user.status.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);
  
  // Calculate total pages based on filtered users array length
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  
  // Get current page data
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);
  
  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedUsers([]);
  }, [searchQuery]);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedUsers([]);
  };
  
  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  // Handle select all checkbox (only for current page)
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(paginatedUsers.map(user => user.id));
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
    
    // Adjust current page if needed after deletion
    if (currentPage > 1 && currentPage > Math.ceil((filteredUsers.length - selectedUsers.length) / USERS_PER_PAGE)) {
      setCurrentPage(currentPage - 1);
    }
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

  // Handle single user deletion
  const handleSingleDelete = (userId: string) => {
    setSelectedUsers([userId]);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <Layout>
      <div className="p-6 md:p-8">
        <UsersHeader 
          selectedUsers={selectedUsers} 
          onOpenRoleDialog={() => setIsRoleDialogOpen(true)}
          onOpenDeleteDialog={() => setIsDeleteDialogOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        
        <UserTable 
          users={paginatedUsers}
          selectedUsers={selectedUsers}
          onSelectUser={handleSelectUser}
          onSelectAll={handleSelectAll}
          onSingleDelete={handleSingleDelete}
        />
        
        {/* Show empty state message when no results */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-white/60">
            No users found matching "{searchQuery}"
          </div>
        )}
        
        {/* Pagination component */}
        {filteredUsers.length > 0 && (
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            filteredCount={filteredUsers.length}
            totalCount={users.length}
          />
        )}
      </div>
      
      {/* Dialogs */}
      <DeleteUserDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedCount={selectedUsers.length}
        onDelete={deleteSelectedUsers}
      />
      
      <ChangeRoleDialog 
        isOpen={isRoleDialogOpen}
        onOpenChange={setIsRoleDialogOpen}
        selectedCount={selectedUsers.length}
        newRole={newRole}
        setNewRole={setNewRole}
        onChangeRole={changeUserRole}
      />
    </Layout>
  );
};

export default Users;
