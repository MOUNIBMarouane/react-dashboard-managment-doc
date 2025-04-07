// src/services/api-client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the base API URL
const API_URL =  'http://192.168.1.94:5204/api';



// Create a class to manage API interactions
class ApiClient {
  private instance: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.instance.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor to handle token expiration
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // If error is 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Try to refresh the token
            const newTokenResponse = await this.refreshToken();
            
            if (newTokenResponse && newTokenResponse.data) {
              // Update token and retry the original request
              this.setToken(newTokenResponse.data.token);
              return this.instance(originalRequest);
            }
          } catch (refreshError) {
            // If refresh fails, log out user
            this.clearToken();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Set authentication token
  public setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // Get current token
  public getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  // Clear authentication token
  public clearToken(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Refresh token
  private async refreshToken(): Promise<AxiosResponse | null> {
    try {
      return await this.instance.post('/Auth/refresh-token');
    } catch (error) {
      return null;
    }
  }

  // Generic GET request
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  // Generic POST request
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  // Generic PUT request
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  // Generic DELETE request
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();

// Add method to get the base URL for constructing full URLs
ApiClient.prototype.getBaseUrl = function(): string {
  return API_URL;
};