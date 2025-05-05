
import api from './api';
import { Document } from '@/models/document';

export interface DashboardStats {
  totalDocuments: number;
  activeCircuits: number;
  pendingApprovals: number;
  teamMembers: number;
  documentActivity: Array<{ month: string; value: number }>;
  weeklyStats: Array<{ name: string; value: number }>;
  completionRate?: CompletionRate;
}

export interface CompletionRate {
  rate: number;
  completed: number;
  inProgress: number;
  pending: number;
}

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

// Helper function to get dashboard stats
const fetchDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await api.get('/Dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalDocuments: 150,
      activeCircuits: 5,
      pendingApprovals: 12,
      teamMembers: 8,
      documentActivity: [],
      weeklyStats: []
    };
  }
};

const dashboardService = {
  getDashboardStats: fetchDashboardStats,

  getDocumentActivity: async (startDate: Date, endDate: Date): Promise<Array<{ month: string; value: number }>> => {
    // Since this endpoint is not available, return mock data
    const mockData = [
      { month: 'Jan', value: 65 },
      { month: 'Feb', value: 75 },
      { month: 'Mar', value: 85 },
      { month: 'Apr', value: 78 },
      { month: 'May', value: 90 },
      { month: 'Jun', value: 95 }
    ];
    return mockData;
  },

  getWeeklyStats: async (): Promise<Array<{ name: string; value: number }>> => {
    // Generate mock weekly stats based on the current date
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const mockData = days.map(day => ({
      name: day,
      value: Math.floor(Math.random() * 50) + 50 // Random value between 50-100
    }));
    return mockData;
  },

  getCompletionRate: async (): Promise<CompletionRate> => {
    try {
      const stats = await fetchDashboardStats();
      const total = stats?.totalDocuments ?? 150;
      const completed = Math.floor(total * 0.78); // 78% completion rate
      const inProgress = Math.floor(total * 0.15); // 15% in progress
      const pending = total - completed - inProgress;

      return {
        rate: 78,
        completed,
        inProgress,
        pending
      };
    } catch (error) {
      console.error('Error calculating completion rate:', error);
      return {
        rate: 78,
        completed: 117,
        inProgress: 23,
        pending: 10
      };
    }
  },

  getActivityScore: async (): Promise<ActivityScore> => {
    try {
      const stats = await fetchDashboardStats();
      
      // Mock data for the ActivityScore
      return {
        score: 7.5,
        userEngagement: 75,
        processingEfficiency: 82,
        workflowProgress: 68,
        activeUsers: 6,
        totalUsers: 8,
        documentsProcessed: 123,
        totalDocuments: 150,
        activeCircuits: 3,
        totalCircuits: 5
      };
    } catch (error) {
      console.error('Error calculating activity score:', error);
      return {
        score: 7.5,
        userEngagement: 75,
        processingEfficiency: 82,
        workflowProgress: 68,
        activeUsers: 6,
        totalUsers: 8,
        documentsProcessed: 123,
        totalDocuments: 150,
        activeCircuits: 3,
        totalCircuits: 5
      };
    }
  }
};

export default dashboardService;
