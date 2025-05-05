
export interface ActivityScore {
  score: number;
  trend?: number;
  overallScore?: number;
  updatedAt?: string;
  
  // User engagement metrics
  userEngagement: {
    score: number;
    trend: number;
  };
  activeUsers: number;
  totalUsers: number;
  
  // Processing efficiency metrics
  processingEfficiency: {
    score: number;
    trend: number;
  };
  documentsProcessed: number;
  totalDocuments: number;
  
  // Workflow progress metrics
  workflowProgress: {
    score: number;
    trend: number;
  };
  activeCircuits: number;
  totalCircuits: number;
}
