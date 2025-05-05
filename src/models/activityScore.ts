
export interface ActivityScore {
  score: number;
  userEngagement: number;
  activeUsers: number;
  totalUsers: number;
  processingEfficiency: number;
  documentsProcessed: number;
  totalDocuments: number;
  workflowProgress: number;
  activeCircuits: number;
  totalCircuits: number;
  overallScore?: number;
  completionRate?: number;
  updatedAt?: string;
}
