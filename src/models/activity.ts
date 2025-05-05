
export interface ActivityScore {
  score: number;
  trend?: number;
  userEngagement?: {
    score: number;
    trend: number;
  };
  activeUsers?: number;
  totalUsers?: number;
  processingEfficiency?: {
    score: number;
    trend: number;
  };
  documentsProcessed?: number;
  totalDocuments?: number;
  workflowProgress?: {
    score: number;
    trend: number;
  };
  activeCircuits?: number;
  totalCircuits?: number;
  overallScore?: number;
  updatedAt?: string;
}
