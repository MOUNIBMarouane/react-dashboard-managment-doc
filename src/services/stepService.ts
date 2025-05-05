import api from './api';
import { toast } from 'sonner';

const stepService = {
  getAllSteps: async (): Promise<Step[]> => {
    try {
      const response = await api.get('/Steps');
      return response.data;
    } catch (error) {
      console.error('Error fetching steps:', error);
      toast.error('Failed to fetch steps');
      return [];
    }
  },

  getStepById: async (id: number): Promise<Step | null> => {
    try {
      const response = await api.get(`/Steps/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching step ${id}:`, error);
      toast.error('Failed to fetch step details');
      return null;
    }
  },

  getStepsByCircuitId: async (circuitId: number): Promise<Step[]> => {
    if (!circuitId) {
      console.warn('No circuit ID provided to getStepsByCircuitId');
      return [];
    }
    
    try {
      // First try to get the full circuit data with steps included
      try {
        console.log(`Fetching circuit with steps for circuit ID: ${circuitId}`);
        const response = await api.get(`http://192.168.1.94:5204/api/Circuit/${circuitId}`);
        
        if (response.data && Array.isArray(response.data.steps)) {
          console.log(`Successfully fetched ${response.data.steps.length} steps from circuit endpoint`);
          return response.data.steps || [];
        } else {
          console.warn(`Circuit endpoint returned data but steps array is missing or invalid: ${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        console.warn(`Could not get steps from circuit endpoint for circuit ${circuitId}:`, error);
        // Fall back to steps endpoint
      }
      
      // Fallback: fetch steps directly if the circuit endpoint fails
      try {
        console.log(`Trying fallback: fetching steps directly for circuit ID: ${circuitId}`);
        const fallbackResponse = await api.get(`http://192.168.1.94:5204/api/Steps/circuit/${circuitId}`);
        
        if (fallbackResponse.data && Array.isArray(fallbackResponse.data)) {
          console.log(`Successfully fetched ${fallbackResponse.data.length} steps from fallback endpoint`);
          return fallbackResponse.data;
        } else {
          console.warn(`Fallback endpoint returned data but it's not an array: ${JSON.stringify(fallbackResponse.data)}`);
          return [];
        }
      } catch (fallbackError) {
        console.error(`Error fetching steps for circuit ${circuitId} from fallback endpoint:`, fallbackError);
        throw fallbackError;
      }
      
      // If we get here and have no data, return an empty array
      return [];
    } catch (error) {
      console.error(`Error fetching steps for circuit ${circuitId}:`, error);
      // Not showing toast here as it might be called repeatedly by React Query
      return [];
    }
  },

  createStep: async (step: CreateStepDto): Promise<Step | null> => {
    try {
      const response = await api.post(`/Circuit/${step.circuitId}/steps`, step);
      toast.success('Step created successfully');
      return response.data;
    } catch (error) {
      console.error('Error creating step:', error);
      toast.error('Failed to create step');
      return null;
    }
  },

  updateStep: async (id: number, step: UpdateStepDto): Promise<boolean> => {
    try {
      await api.put(`/Circuit/steps/${id}`, step);
      toast.success('Step updated successfully');
      return true;
    } catch (error) {
      console.error(`Error updating step ${id}:`, error);
      toast.error('Failed to update step');
      return false;
    }
  },

  deleteStep: async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/Circuit/steps/${id}`);
      toast.success('Step deleted successfully');
      return true;
    } catch (error) {
      console.error(`Error deleting step ${id}:`, error);
      toast.error('Failed to delete step');
      return false;
    }
  },

  deleteMultipleSteps: async (ids: number[]): Promise<boolean> => {
    try {
      // Sequentially delete steps as there might not be a bulk delete endpoint
      for (const id of ids) {
        await api.delete(`/Circuit/steps/${id}`);
      }
      toast.success(`Successfully deleted ${ids.length} steps`);
      return true;
    } catch (error) {
      console.error('Error deleting multiple steps:', error);
      toast.error('Failed to delete some or all steps');
      return false;
    }
  },
};

export default stepService;
