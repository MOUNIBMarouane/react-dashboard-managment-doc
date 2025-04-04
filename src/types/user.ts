
export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Editor";
  status: "Active" | "Inactive" | "Pending";
  avatarUrl?: string;
}

export const getStatusColor = (status: User["status"]) => {
  switch(status) {
    case "Active": return "bg-emerald-500/90 hover:bg-emerald-500";
    case "Inactive": return "bg-slate-500/90 hover:bg-slate-500";
    case "Pending": return "bg-amber-500/90 hover:bg-amber-500";
    default: return "bg-slate-500/90 hover:bg-slate-500";
  }
};
