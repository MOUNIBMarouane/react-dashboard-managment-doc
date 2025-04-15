
import api from './core';

/**
 * Check if the API server is available
 * @returns {Promise<boolean>} True if API is reachable, false otherwise
 */
export const checkApiConnection = async (): Promise<boolean> => {
  try {
    // Use a small timeout to avoid long waits
    const response = await api.get('', { 
      timeout: 5000,
      allowAbsoluteUrls: true 
    });
    
    console.log('API connection check succeeded:', response.status);
    return true;
  } catch (error) {
    console.error('API connection check failed:', error);
    return false;
  }
};
