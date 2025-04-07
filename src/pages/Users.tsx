
import React from "react";
import Layout from "../components/Layout";
import { User } from "@/types/user";
import UserTable from "@/components/users/UserTable";
import DeleteUserDialog from "@/components/users/DeleteUserDialog";
import ChangeRoleDialog from "@/components/users/ChangeRoleDialog";
import UsersHeader from "@/components/users/UsersHeader";
import UserPagination from "@/components/users/UserPagination";
import AddUserDialog from "@/components/users/AddUserDialog";
import { useUserManagement } from "@/hooks/useUserManagement";

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

const Users = () => {
  const {
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
  } = useUserManagement(sampleUsers);

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <UsersHeader 
          selectedUsers={selectedUsers} 
          onOpenRoleDialog={() => setIsRoleDialogOpen(true)}
          onOpenDeleteDialog={() => setIsDeleteDialogOpen(true)}
          onOpenAddUserDialog={() => setIsAddUserDialogOpen(true)}
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
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-white/60">
            No users found matching "{searchQuery}"
          </div>
        )}
        
        {filteredUsers.length > 0 && (
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            filteredCount={filteredUsers.length}
            totalCount={sampleUsers.length}
          />
        )}
      </div>
      
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

      <AddUserDialog
        isOpen={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
        onAddUser={handleAddUser}
      />
    </Layout>
  );
};

export default Users;
