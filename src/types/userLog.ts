
export interface UserLog {
  id: string;
  action: string;
  timestamp: string;
  details: string;
}

// Sample logs data (in a real app, this would come from an API/database)
export const sampleLogs: Record<string, UserLog[]> = {
  "1": [
    { id: "1", action: "Login", timestamp: "2025-04-07 09:30:22", details: "Successfully logged in" },
    { id: "2", action: "Updated Profile", timestamp: "2025-04-07 10:15:45", details: "Changed role settings" },
    { id: "3", action: "Created Document", timestamp: "2025-04-06 14:22:10", details: "Created sales report" }
  ],
  "2": [
    { id: "1", action: "Login", timestamp: "2025-04-07 08:12:35", details: "Successfully logged in" },
    { id: "2", action: "Password Reset", timestamp: "2025-04-05 11:30:00", details: "Requested password reset" }
  ],
  // Add logs for other users as needed
};
