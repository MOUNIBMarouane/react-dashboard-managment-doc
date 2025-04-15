
import api from './core';

export class ApiService {
  protected async get<T>(url: string): Promise<T> {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  }

  protected async post<T, R>(url: string, data: T): Promise<R> {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      console.error(`Error posting data to ${url}:`, error);
      throw error;
    }
  }

  protected async put<T>(url: string, data: T): Promise<void> {
    try {
      await api.put(url, data);
    } catch (error) {
      console.error(`Error updating data at ${url}:`, error);
      throw error;
    }
  }

  protected async delete(url: string): Promise<void> {
    try {
      await api.delete(url);
    } catch (error) {
      console.error(`Error deleting data at ${url}:`, error);
      throw error;
    }
  }
}
