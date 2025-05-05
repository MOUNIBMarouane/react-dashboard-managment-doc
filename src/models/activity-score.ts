
export interface ActivityScore {
  score: number;
  overallScore: number;
  userEngagement: number;
  processingEfficiency: number;
  workflowProgress: number;
  activeUsers: number;
  totalUsers: number;
  documentsProcessed: number;
  totalDocuments: number;
  activeCircuits: number;
  totalCircuits: number;
  completionRate?: number;
  updatedAt: string;
}
