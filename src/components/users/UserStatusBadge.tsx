
import React from "react";
import { Badge } from "@/components/ui/badge";
import { User, getStatusColor } from "@/types/user";

interface UserStatusBadgeProps {
  status: User["status"];
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  return (
    <Badge 
      className={`text-white border-none transition-all duration-300 ${getStatusColor(status)}`}
    >
      {status}
    </Badge>
  );
};

export default UserStatusBadge;
