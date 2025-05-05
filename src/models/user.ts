
export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface Role {
  id: number;
  roleName: string;
}

export interface UserInfo {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}
