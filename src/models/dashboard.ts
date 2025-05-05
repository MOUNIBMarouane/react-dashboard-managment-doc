
export interface ActivityScore {
  score: number;
  userEngagement: number;
  processingEfficiency: number;
  workflowProgress: number;
  activeUsers: number;
  totalUsers: number;
  documentsProcessed: number;
  totalDocuments: number;
  activeCircuits: number;
  totalCircuits: number;
}

export interface DashboardStats {
  completionRate: number;
  pendingDocuments: number;
  totalDocuments: number;
  completedDocuments: number;
  rejectedDocuments: number;
  processingRate: number;
  // Add other fields as needed
}

export interface ActivitySummary {
  recentActivity: RecentActivity[];
  topPerformers: UserPerformance[];
}

export interface RecentActivity {
  id: number;
  timestamp: string;
  userId: number;
  username: string;
  actionType: string;
  description: string;
}

export interface UserPerformance {
  userId: number;
  username: string;
  documentsProcessed: number;
  completionRate: number;
}
