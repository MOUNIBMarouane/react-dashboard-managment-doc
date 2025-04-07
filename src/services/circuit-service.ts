// src/services/circuit-service.ts
import { apiClient } from './api-client';
import { Circuit, CircuitDetail } from '../types/api-types';

class CircuitService {
  // Get all circuits
  async getAllCircuits(): Promise<Circuit[]> {
    try {
      return await apiClient.get<Circuit[]>('/Circuit');
    } catch (error) {
      console.error('Get all circuits error:', error);
      throw error;
    }
  }

  // Get circuit by ID
  async getCircuitById(id: number): Promise<Circuit> {
    try {
      return await apiClient.get<Circuit>(`/Circuit/${id}`);
    } catch (error) {
      console.error(`Get circuit with ID ${id} error:`, error);
      throw error;
    }
  }

  // Create new circuit
  async createCircuit(circuit: Omit<Circuit, 'id'>): Promise<Circuit> {
    try {
      return await apiClient.post<Circuit>('/Circuit', circuit);
    } catch (error) {
      console.error('Create circuit error:', error);
      throw error;
    }
  }

  // Update circuit
  async updateCircuit(id: number, circuit: Partial<Circuit>): Promise<any> {
    try {
      return await apiClient.put<any>(`/Circuit/${id}`, circuit);
    } catch (error) {
      console.error(`Update circuit with ID ${id} error:`, error);
      throw error;
    }
  }

  // Delete circuit
  async deleteCircuit(id: number): Promise<any> {
    try {
      return await apiClient.delete<any>(`/Circuit/${id}`);
    } catch (error) {
      console.error(`Delete circuit with ID ${id} error:`, error);
      throw error;
    }
  }

  // Get all circuit details
  async getAllCircuitDetails(): Promise<CircuitDetail[]> {
    try {
      return await apiClient.get<CircuitDetail[]>('/CircuitDetail');
    } catch (error) {
      console.error('Get all circuit details error:', error);
      throw error;
    }
  }

  // Get circuit detail by ID
  async getCircuitDetailById(id: number): Promise<CircuitDetail> {
    try {
      return await apiClient.get<CircuitDetail>(`/CircuitDetail/${id}`);
    } catch (error) {
      console.error(`Get circuit detail with ID ${id} error:`, error);
      throw error;
    }
  }

  // Get circuit details by circuit ID
  async getCircuitDetailsByCircuitId(circuitId: number): Promise<CircuitDetail[]> {
    try {
      return await apiClient.get<CircuitDetail[]>(`/CircuitDetail/by-circuit/${circuitId}`);
    } catch (error) {
      console.error(`Get circuit details for circuit ID ${circuitId} error:`, error);
      throw error;
    }
  }

  // Create new circuit detail
  async createCircuitDetail(circuitDetail: Omit<CircuitDetail, 'id'>): Promise<CircuitDetail> {
    try {
      return await apiClient.post<CircuitDetail>('/CircuitDetail', circuitDetail);
    } catch (error) {
      console.error('Create circuit detail error:', error);
      throw error;
    }
  }

  // Update circuit detail
  async updateCircuitDetail(id: number, circuitDetail: Partial<CircuitDetail>): Promise<any> {
    try {
      return await apiClient.put<any>(`/CircuitDetail/${id}`, circuitDetail);
    } catch (error) {
      console.error(`Update circuit detail with ID ${id} error:`, error);
      throw error;
    }
  }

  // Delete circuit detail
  async deleteCircuitDetail(id: number): Promise<any> {
    try {
      return await apiClient.delete<any>(`/CircuitDetail/${id}`);
    } catch (error) {
      console.error(`Delete circuit detail with ID ${id} error:`, error);
      throw error;
    }
  }
}

export const circuitService = new CircuitService();
