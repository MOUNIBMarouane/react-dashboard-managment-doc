
export interface ActivityScore {
  id: number;
  score: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  period: string;
  
  // User engagement metrics
  userEngagement: number;
  activeUsers: number;
  totalUsers: number;
  
  // Processing efficiency metrics
  processingEfficiency: number;
  documentsProcessed: number;
  totalDocuments: number;
  
  // Workflow progress metrics
  workflowProgress: number;
  activeCircuits: number;
  totalCircuits: number;
}
