// src/services/api-client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the base API URL
const API_URL = 'http://192.168.1.94:5204/api';

// Create a class to manage API interactions
class ApiClient {
  private instance: AxiosInstance;
  private token: string | null = null;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

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
          // Only attempt to refresh the token once per request
          originalRequest._retry = true;
          
          // If we're already refreshing, queue this request
          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.instance(originalRequest));
              });
            });
          }
          
          // Set refreshing flag
          this.isRefreshing = true;
          
          try {
            // Try to refresh the token
            const newTokenResponse = await this.refreshToken();
            
            if (newTokenResponse && newTokenResponse.data?.token) {
              const newToken = newTokenResponse.data.token;
              
              // Update token
              this.setToken(newToken);
              
              // Execute queued requests
              this.refreshSubscribers.forEach(callback => callback(newToken));
              this.refreshSubscribers = [];
              
              // Retry the original request
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.instance(originalRequest);
            } else {
              // If refresh fails without throwing an error but returns no token
              this.onRefreshFailure();
              return Promise.reject(error);
            }
          } catch (refreshError) {
            // If refresh fails with an error
            this.onRefreshFailure();
            return Promise.reject(refreshError);
          } finally {
            // Reset refreshing flag regardless of outcome
            this.isRefreshing = false;
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Handle refresh failure
  private onRefreshFailure(): void {
    // Clear token and notify subscribers of failure
    this.clearToken();
    this.refreshSubscribers = [];
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
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
      console.error('Token refresh failed:', error);
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

  // Get the base URL for constructing full URLs
  public getBaseUrl(): string {
    return API_URL;
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();