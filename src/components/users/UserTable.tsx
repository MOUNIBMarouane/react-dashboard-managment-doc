
import React from "react";
import { User } from "@/types/user";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { UsersIcon } from "lucide-react";
import UserAvatar from "./UserAvatar";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import UserActions from "./UserActions";
import { Switch } from "@/components/ui/switch";

interface UserTableProps {
  users: User[];
  selectedUsers: string[];
  onSelectUser: (userId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onSingleDelete: (userId: string) => void;
  onToggleBlockUser: (userId: string, blocked: boolean) => void;
}

const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  selectedUsers, 
  onSelectUser, 
  onSelectAll,
  onSingleDelete,
  onToggleBlockUser
}) => {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm shadow-lg transition-all duration-300">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-dashboard-blue-dark/80 backdrop-blur-sm">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="w-12 text-white/70">
                <Checkbox 
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onCheckedChange={(checked) => onSelectAll(!!checked)}
                  className="border-white/30 data-[state=checked]:bg-dashboard-accent data-[state=checked]:border-dashboard-accent transition-all duration-300"
                />
              </TableHead>
              <TableHead className="text-white/70 font-medium">User</TableHead>
              <TableHead className="text-white/70 font-medium">Role</TableHead>
              <TableHead className="text-white/70 font-medium">Status</TableHead>
              <TableHead className="text-white/70 font-medium">Active</TableHead>
              <TableHead className="text-white/70 font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow 
                key={user.id} 
                className={`border-white/10 transition-colors duration-200 hover:bg-white/5 ${
                  selectedUsers.includes(user.id) ? 'bg-dashboard-accent/10' : ''
                }`}
              >
                <TableCell className="p-2">
                  <Checkbox 
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => onSelectUser(user.id, !!checked)}
                    className="border-white/30 data-[state=checked]:bg-dashboard-accent data-[state=checked]:border-dashboard-accent transition-all duration-300"
                  />
                </TableCell>
                <TableCell className="flex items-center gap-3 py-3">
                  <UserAvatar user={user} />
                  <div>
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-white/50">{user.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <UserRoleBadge role={user.role} />
                </TableCell>
                <TableCell>
                  <UserStatusBadge status={user.status} />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.status !== "Blocked"}
                    onCheckedChange={(checked) => onToggleBlockUser(user.id, !checked)}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <UserActions 
                    userId={user.id} 
                    onSelect={onSelectUser}
                    onDelete={() => onSingleDelete(user.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
            
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-white/50">
                  <div className="flex flex-col items-center justify-center">
                    <UsersIcon size={32} className="text-white/20 mb-2" />
                    <p>No users found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTable;
