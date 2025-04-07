
import { useState, useEffect, useMemo } from "react";
import { User } from "@/types/user";
import { toast } from "sonner";

// Number of users per page
const USERS_PER_PAGE = 5;

export const useUserManagement = (initialUsers: User[]) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
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
  
  // Add new user
  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser]);
    toast.success(`User ${newUser.name} created successfully`);
  };

  return {
    users,
    selectedUsers,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isRoleDialogOpen,
    setIsRoleDialogOpen,
    isAddUserDialogOpen,
    setIsAddUserDialogOpen,
    newRole,
    setNewRole,
    searchQuery,
    currentPage,
    filteredUsers,
    totalPages,
    paginatedUsers,
    handlePageChange,
    handleSearchChange,
    handleSelectAll,
    handleSelectUser,
    deleteSelectedUsers,
    changeUserRole,
    handleSingleDelete,
    handleAddUser
  };
};
