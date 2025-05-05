
export interface Role {
  id: number;
  roleName: string;
  isAdmin: boolean;
  isSimpleUser: boolean;
  isFullUser: boolean;
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  role?: string;
  roleId?: number;
  profilePicture?: string;
  roleObject?: Role;
}
