import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types/user";
import { ArrowLeft, Clock, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Sample logs data structure
interface UserLog {
  id: string;
  action: string;
  timestamp: string;
  details: string;
}

// Sample logs data (in a real app, this would come from an API/database)
const sampleLogs: Record<string, UserLog[]> = {
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

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the user data from an API
    // For now, we'll use sample data from the Users.tsx page
    const fetchUser = async () => {
      setLoading(true);
      
      // Sample user data (in a real app, fetch from API)
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
        // Other users from the sample data
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
        }
      ];

      const foundUser = sampleUsers.find(u => u.id === userId);
      setUser(foundUser || null);
      
      // Set the user logs
      if (userId && sampleLogs[userId]) {
        setUserLogs(sampleLogs[userId]);
      } else {
        setUserLogs([]);
      }
      
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  const goBack = () => {
    navigate('/users');
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6 md:p-8">
          <div className="text-white">Loading user details...</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="p-6 md:p-8">
          <Button onClick={goBack} variant="outline" className="mb-4 bg-white/5 border-white/10 text-white hover:bg-white/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
          <Card className="bg-dashboard-blue-dark border-white/10 text-white p-6">
            <CardContent>
              <div className="text-center py-8">
                <div className="text-2xl font-semibold mb-2">User Not Found</div>
                <p className="text-white/60">The requested user could not be found</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <Button onClick={goBack} variant="outline" className="mb-4 bg-white/5 border-white/10 text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>
        
        {/* User Profile Card */}
        <Card className="bg-dashboard-blue-dark border-white/10 text-white mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <UserIcon className="text-dashboard-accent" />
              User Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-dashboard-blue-light flex items-center justify-center">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={40} className="text-white/70" />
                  )}
                </div>
              </div>
              
              {/* User Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <p className="text-white/60">{user.email}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Role</p>
                    <p className="font-medium text-white bg-white/10 inline-block px-3 py-1 rounded-full">
                      {user.role}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Status</p>
                    <p className={`font-medium inline-block px-3 py-1 rounded-full ${
                      user.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' :
                      user.status === 'Inactive' ? 'bg-slate-500/20 text-slate-300' :
                      'bg-amber-500/20 text-amber-300'
                    }`}>
                      {user.status}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-white/60 text-sm mb-1">User ID</p>
                  <p className="font-mono bg-white/5 px-3 py-1 rounded text-sm">{user.id}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* User Logs Card */}
        <Card className="bg-dashboard-blue-dark border-white/10 text-white">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Clock className="text-dashboard-accent" />
              Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userLogs.length > 0 ? (
              <div className="space-y-4">
                {userLogs.map((log, index) => (
                  <React.Fragment key={log.id}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <div className="font-medium">{log.action}</div>
                        <div className="text-sm text-white/60">{log.details}</div>
                      </div>
                      <div className="text-sm text-white/60 mt-1 md:mt-0">
                        {log.timestamp}
                      </div>
                    </div>
                    {index < userLogs.length - 1 && (
                      <Separator className="bg-white/10" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-white/60">
                No activity logs found for this user
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserDetails;
