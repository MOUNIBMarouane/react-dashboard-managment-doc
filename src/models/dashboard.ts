
export interface DashboardStats {
  documentCount: number;
  activeCircuitCount: number;
  userCount: number;
  completedCircuitCount: number;
  pendingActions: number;
  documentsByType: DocumentsByType[];
  circuitsCompletion: CircuitCompletion[];
  activeUsers: UserActivity[];
  recentActivity: ActivityRecord[];
  documentTrend: TrendData[];
  completionRate: number;
}

export interface DocumentsByType {
  type: string;
  count: number;
}

export interface CircuitCompletion {
  circuitName: string;
  completedCount: number;
  totalCount: number;
}

export interface UserActivity {
  username: string;
  actionsCount: number;
  lastActive: string;
}

export interface ActivityRecord {
  action: string;
  user: string;
  timestamp: string;
  documentId?: string;
}

export interface TrendData {
  date: string;
  count: number;
}

export interface ActivityScore {
  userEngagement: number;         // Adding missing properties for ActivityScoreCard
  activeUsers: number;
  totalUsers: number;
  processingEfficiency: number;
  documentsProcessed: number;
  totalDocuments: number;
  workflowProgress: number;
  activeCircuits: number;
  totalCircuits: number;
  overall: number;
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}
