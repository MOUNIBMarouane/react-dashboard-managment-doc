
import React from "react";
import { User } from "@/types/user";

interface UserRoleBadgeProps {
  role: User["role"];
}

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  const getBadgeClass = () => {
    switch(role) {
      case 'Admin': return 'bg-purple-500/20 text-purple-300';
      case 'Editor': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getBadgeClass()} transition-all duration-300`}>
      {role}
    </span>
  );
};

export default UserRoleBadge;
