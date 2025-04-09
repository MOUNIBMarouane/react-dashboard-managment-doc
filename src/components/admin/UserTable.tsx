
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import adminService, { UserDto } from '@/services/adminService';
import { toast } from 'sonner';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  Edit, 
  Trash, 
  MoreVertical, 
  Mail,
  Eye,
  Download,
  Lock,
  AlertTriangle,
  UserPlus
} from 'lucide-react';
import { EditUserDialog } from './EditUserDialog';
import { EditUserEmailDialog } from './EditUserEmailDialog';
import { ViewUserLogsDialog } from './ViewUserLogsDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export function UserTable() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [editingUser, setEditingUser] = useState<UserDto | null>(null);
  const [editEmailUser, setEditEmailUser] = useState<UserDto | null>(null);
  const [viewingUserLogs, setViewingUserLogs] = useState<number | null>(null);
  const [deletingUser, setDeletingUser] = useState<number | null>(null);
  const [deleteMultipleOpen, setDeleteMultipleOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: users, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: adminService.getAllUsers,
  });

  const handleUserEdited = () => {
    refetch();
    setEditingUser(null);
  };

  const handleUserEmailEdited = () => {
    refetch();
    setEditEmailUser(null);
  };

  const handleUserDeleted = () => {
    refetch();
    setDeletingUser(null);
    setSelectedUsers([]);
  };

  const handleMultipleDeleted = () => {
    refetch();
    setSelectedUsers([]);
    setDeleteMultipleOpen(false);
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers?.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers?.map(user => user.id) || []);
    }
  };

  const filteredUsers = users?.filter(user => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase().includes(searchLower) ||
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return <div className="flex justify-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (isError) {
    return <div className="text-red-500 py-10 text-center">
      <AlertTriangle className="h-10 w-10 mx-auto mb-2" />
      Error loading users. Please try again.
    </div>;
  }

  // Helper function to safely get the role name as a string
  const getRoleString = (role: string | { roleId?: number; roleName?: string }): string => {
    if (typeof role === 'string') {
      return role;
    }
    
    if (role && typeof role === 'object' && 'roleName' in role) {
      return role.roleName || 'Unknown';
    }
    
    return 'Unknown';
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="relative w-full sm:w-64 md:w-80">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#0d1424] border-gray-700 text-white pl-10"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <Button 
          variant="outline" 
          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="rounded-md border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#0d1424]">
              <TableRow className="border-gray-700 hover:bg-transparent">
                <TableHead className="w-12 text-gray-300">
                  <Checkbox 
                    checked={selectedUsers.length > 0 && selectedUsers.length === filteredUsers?.length}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="w-12"></TableHead>
                <TableHead className="text-gray-300">User</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Role</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="w-16 text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers?.map((user) => (
                <TableRow 
                  key={user.id}
                  className={`border-gray-700 hover:bg-[#0d1424] transition-all ${
                    selectedUsers.includes(user.id) ? 'bg-blue-900/20 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <TableCell>
                    <Checkbox 
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleSelectUser(user.id)}
                      aria-label={`Select user ${user.username}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={user.profilePicture} alt={user.username} />
                      <AvatarFallback className="bg-blue-600">{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium text-white">
                    {user.firstName} {user.lastName}
                    <div className="text-xs text-gray-400">@{user.username}</div>
                  </TableCell>
                  <TableCell className="text-gray-300">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleString(user.role) === 'Admin' ? 'default' : getRoleString(user.role) === 'FullUser' ? 'secondary' : 'outline'}>
                      {getRoleString(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.isActive ? (
                      <Badge variant="secondary" className="bg-green-900/20 text-green-400 hover:bg-green-900/30">Active</Badge>
                    ) : (
                      <Badge variant="destructive" className="bg-red-900/20 text-red-400 hover:bg-red-900/30">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#161b22] border-gray-700 text-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem onClick={() => setEditingUser(user)} className="hover:bg-gray-800">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditEmailUser(user)} className="hover:bg-gray-800">
                          <Mail className="mr-2 h-4 w-4" />
                          Update Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setViewingUserLogs(user.id)} className="hover:bg-gray-800">
                          <Eye className="mr-2 h-4 w-4" />
                          View Logs
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem 
                          className="text-red-400 hover:bg-red-900/20 hover:text-red-300" 
                          onClick={() => setDeletingUser(user.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredUsers?.length === 0 && (
          <div className="p-8 text-center">
            <UserPlus className="h-10 w-10 mx-auto mb-2 text-gray-500" />
            <p className="text-gray-400">No users found. Try adjusting your search or add new users.</p>
          </div>
        )}
      </div>

      {/* Bottom action bar for bulk actions */}
      {selectedUsers.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#161b22] border-t border-gray-700 p-4 flex justify-between items-center transition-all duration-300 z-10">
          <div className="text-white">
            <span className="font-medium">{selectedUsers.length}</span> users selected
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Lock className="h-4 w-4 mr-2" /> Change Role
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Mail className="h-4 w-4 mr-2" /> Send Email
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => setDeleteMultipleOpen(true)}
              className="bg-red-900/20 text-red-400 hover:bg-red-900/30 hover:text-red-300 border border-red-900/30"
            >
              <Trash className="h-4 w-4 mr-2" /> Delete Selected
            </Button>
          </div>
        </div>
      )}

      {editingUser && (
        <EditUserDialog 
          user={editingUser} 
          open={!!editingUser} 
          onOpenChange={(open) => !open && setEditingUser(null)}
          onSuccess={handleUserEdited}
        />
      )}

      {editEmailUser && (
        <EditUserEmailDialog 
          user={editEmailUser}
          open={!!editEmailUser}
          onOpenChange={(open) => !open && setEditEmailUser(null)}
          onSuccess={handleUserEmailEdited}
        />
      )}

      {viewingUserLogs !== null && (
        <ViewUserLogsDialog
          userId={viewingUserLogs}
          open={viewingUserLogs !== null}
          onOpenChange={(open) => !open && setViewingUserLogs(null)}
        />
      )}

      {deletingUser !== null && (
        <DeleteConfirmDialog
          title="Delete User"
          description="Are you sure you want to delete this user? This action cannot be undone."
          open={deletingUser !== null}
          onOpenChange={(open) => !open && setDeletingUser(null)}
          onConfirm={async () => {
            try {
              if (deletingUser) {
                await adminService.deleteUser(deletingUser);
                toast.success('User deleted successfully');
                handleUserDeleted();
              }
            } catch (error) {
              toast.error('Failed to delete user');
              console.error(error);
            }
          }}
        />
      )}

      {deleteMultipleOpen && (
        <DeleteConfirmDialog
          title="Delete Multiple Users"
          description={`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`}
          open={deleteMultipleOpen}
          onOpenChange={setDeleteMultipleOpen}
          onConfirm={async () => {
            try {
              await adminService.deleteMultipleUsers(selectedUsers);
              toast.success(`${selectedUsers.length} users deleted successfully`);
              handleMultipleDeleted();
            } catch (error) {
              toast.error('Failed to delete users');
              console.error(error);
            }
          }}
        />
      )}
    </div>
  );
}
