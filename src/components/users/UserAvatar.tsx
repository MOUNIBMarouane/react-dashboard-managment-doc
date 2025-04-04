
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";

interface UserAvatarProps {
  user: User;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <Avatar className="h-10 w-10 ring-2 ring-white/10 transition-all duration-300 hover:ring-dashboard-accent">
      <AvatarImage src={user.avatarUrl} />
      <AvatarFallback className="bg-gradient-to-br from-dashboard-accent to-dashboard-accent-light text-white">
        {user.name.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
