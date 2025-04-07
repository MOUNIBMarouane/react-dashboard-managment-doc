
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { User } from "@/types/user";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { Card, CardContent } from "@/components/ui/card";
import UserProfileCard from "@/components/user-details/UserProfileCard";
import ActivityLogsCard from "@/components/user-details/ActivityLogsCard";
import { sampleUsers } from "@/data/sampleUsers";
import { UserLog, sampleLogs } from "@/types/userLog";

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      
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
        
        {/* Responsive Layout: Stacked on mobile, side by side on medium/large screens */}
        <div className="hidden md:block">
          <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
            <ResizablePanel defaultSize={50} minSize={30}>
              <UserProfileCard user={user} />
            </ResizablePanel>
            <ResizablePanel defaultSize={50} minSize={30}>
              <ActivityLogsCard userLogs={userLogs} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile Layout (stacked) */}
        <div className="md:hidden space-y-6">
          <UserProfileCard user={user} />
          <ActivityLogsCard userLogs={userLogs} />
        </div>
      </div>
    </Layout>
  );
};

export default UserDetails;
