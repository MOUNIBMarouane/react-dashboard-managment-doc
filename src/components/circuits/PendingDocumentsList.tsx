
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileWarning, Hourglass, Clock, CalendarClock } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import circuitService from '@/services/circuitService';
import { useAuth } from '@/context/AuthContext';

// Mock data for testing the UI when API fails
const mockPendingDocuments = [
  {
    id: 101,
    documentKey: "DOC-2023-101",
    title: "Budget Approval Request",
    status: "Pending Approval",
    documentType: { typeName: "Financial" },
    stepName: "Manager Review",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day in future
  },
  {
    id: 102,
    documentKey: "DOC-2023-102",
    title: "Marketing Campaign Brief",
    status: "Awaiting Review",
    documentType: { typeName: "Marketing" },
    stepName: "Department Head Approval",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago (overdue)
  },
  {
    id: 103,
    documentKey: "DOC-2023-103",
    title: "Product Specification Update",
    status: "In Progress",
    documentType: { typeName: "Technical" },
    stepName: "Technical Review",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days in future
  }
];

export default function PendingDocumentsList() {
  const { user } = useAuth();
  const [useFakeData, setUseFakeData] = useState(false);

  const { data: pendingDocuments, isLoading, isError } = useQuery({
    queryKey: ['pendingApprovals', user?.userId], // Fixed: Changed 'id' to 'userId'
    queryFn: circuitService.getPendingDocuments, // Fixed: Using the correct function that exists
    onSettled: (data, error) => { // Fixed: Using onSettled instead of onError
      if (error) {
        console.error('Failed to fetch pending approvals:', error);
        toast.error('Failed to load pending approvals. Using test data instead.');
        setUseFakeData(true);
      }
    }
  });

  // Use mock data if API fails
  const displayedDocuments = useFakeData ? mockPendingDocuments : pendingDocuments || [];

  const getStatusBadge = (status) => {
    if (status?.toLowerCase().includes('pending') || status?.toLowerCase().includes('awaiting')) {
      return <Badge className="bg-amber-500">Pending</Badge>;
    }
    if (status?.toLowerCase().includes('progress')) {
      return <Badge className="bg-blue-500">In Progress</Badge>;
    }
    return <Badge>Unknown</Badge>;
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  // Show a toast for users to know they're viewing mock data
  useState(() => {
    if (useFakeData) {
      toast.info('You are viewing test data for pending documents', {
        duration: 5000,
      });
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="bg-[#161b22] border border-gray-800">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-2/3 bg-gray-700" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-gray-700" />
                <Skeleton className="h-4 w-3/4 bg-gray-700" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/3 bg-gray-700" />
                  <Skeleton className="h-4 w-1/4 bg-gray-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError && !useFakeData) {
    return (
      <div className="p-8 text-center bg-[#161b22] border border-gray-800 rounded-lg">
        <FileWarning className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-white">Failed to load pending documents</h3>
        <p className="text-gray-400 mb-4">There was an error fetching your pending documents.</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  if (Array.isArray(displayedDocuments) && displayedDocuments.length === 0) { // Fixed: Added Array.isArray check
    return (
      <div className="p-8 text-center bg-[#161b22] border border-gray-800 rounded-lg">
        <Hourglass className="h-12 w-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-white">No pending documents</h3>
        <p className="text-gray-400">You don't have any documents waiting for your approval.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {useFakeData && (
        <div className="bg-amber-900/30 border border-amber-700/50 rounded-md p-3 mb-4">
          <p className="text-amber-300 text-sm flex items-center">
            <FileWarning className="h-4 w-4 mr-2" />
            Currently showing test data because the API request failed
          </p>
        </div>
      )}
      
      {Array.isArray(displayedDocuments) && displayedDocuments.map((doc) => ( // Fixed: Added Array.isArray check
        <Card key={doc.id} className="bg-[#161b22] border border-gray-800 hover:border-blue-800 transition-colors">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-400">{doc.documentKey}</span>
                  {getStatusBadge(doc.status)}
                  <Badge variant="outline" className="text-xs">{doc.documentType.typeName}</Badge>
                </div>
                <CardTitle className="text-lg font-medium mt-1 text-white">{doc.title}</CardTitle>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-blue-400 hover:text-blue-300">
                <Link to={`/documents/${doc.id}`}>
                  View <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-400">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-gray-500" />
                  <span>Current Step: {doc.stepName || "Review"}</span>
                </div>
                <div className="flex items-center">
                  <CalendarClock className="h-4 w-4 mr-1.5 text-gray-500" />
                  {doc.dueDate && (
                    <span className={isOverdue(doc.dueDate) ? "text-red-400" : ""}>
                      Due: {new Date(doc.dueDate).toLocaleDateString()}
                      {isOverdue(doc.dueDate) && " (Overdue)"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
