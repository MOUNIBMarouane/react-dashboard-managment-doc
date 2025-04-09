
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircuitNavigation } from "@/components/navigation/CircuitNavigation";
import { useQuery } from "@tanstack/react-query";
import documentService from "@/services/documentService";
import { FileText, GitBranch, CircleCheck, Users } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch recent documents
  const { data: recentDocuments } = useQuery({
    queryKey: ["recent-documents"],
    queryFn: () => documentService.getRecentDocuments(5),
    enabled: !!user,
  });

  const stats = [
    { 
      id: 1, 
      name: "Documents", 
      value: recentDocuments?.length || 0, 
      icon: FileText,
      color: "bg-blue-500/20 text-blue-500",
      link: "/documents"
    },
    { 
      id: 2, 
      name: "Circuits", 
      value: "5", 
      icon: GitBranch,
      color: "bg-purple-500/20 text-purple-500",
      link: "/circuits"
    },
    { 
      id: 3, 
      name: "Pending Approvals", 
      value: "3", 
      icon: CircleCheck,
      color: "bg-green-500/20 text-green-500",
      link: "/pending-approvals"
    },
    { 
      id: 4, 
      name: "Team Members", 
      value: "12", 
      icon: Users,
      color: "bg-amber-500/20 text-amber-500",
      link: "/admin"
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Welcome back, {user?.firstName}</h1>
        <p className="text-muted-foreground">
          Here's an overview of your document management system
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card 
            key={stat.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(stat.link)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <p className="text-3xl font-semibold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-md ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Circuit Navigation */}
      <section>
        <h2 className="text-xl font-medium mb-4">Document Workflows</h2>
        <CircuitNavigation />
      </section>
      
      {/* Recent Documents */}
      {recentDocuments && recentDocuments.length > 0 && (
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>Recently created or modified documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentDocuments.map(doc => (
                  <div 
                    key={doc.id} 
                    className="p-3 rounded-md border flex justify-between items-center hover:bg-muted/50 cursor-pointer"
                    onClick={() => navigate(`/documents/${doc.id}`)}
                  >
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.documentType?.typeName || 'No document type'} • 
                        Last updated: {new Date(doc.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}
