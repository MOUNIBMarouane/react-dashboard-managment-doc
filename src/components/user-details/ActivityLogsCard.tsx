
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { UserLog } from "@/types/userLog";

interface ActivityLogsCardProps {
  userLogs: UserLog[];
}

const ActivityLogsCard: React.FC<ActivityLogsCardProps> = ({ userLogs }) => {
  return (
    <Card className="bg-dashboard-blue-dark border-white/10 text-white h-full">
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
  );
};

export default ActivityLogsCard;
