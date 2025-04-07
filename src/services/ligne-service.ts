// src/services/ligne-service.ts
import { apiClient } from './api-client';
import { Ligne, CreateLigneRequest, SousLigne, CreateSousLigneRequest } from '../types/api-types';

class LigneService {
  // Get all lignes
  async getAllLignes(): Promise<Ligne[]> {
    try {
      return await apiClient.get<Ligne[]>('/Lignes');
    } catch (error) {
      console.error('Get all lignes error:', error);
      throw error;
    }
  }

  // Get ligne by ID
  async getLigneById(id: number): Promise<Ligne> {
    try {
      return await apiClient.get<Ligne>(`/Lignes/${id}`);
    } catch (error) {
      console.error(`Get ligne with ID ${id} error:`, error);
      throw error;
    }
  }

  // Get lignes by document ID
  async getLignesByDocumentId(documentId: number): Promise<Ligne[]> {
    try {
      return await apiClient.get<Ligne[]>(`/Lignes/by-document/${documentId}`);
    } catch (error) {
      console.error(`Get lignes for document ID ${documentId} error:`, error);
      throw error;
    }
  }

  // Create new ligne
  async createLigne(ligne: CreateLigneRequest): Promise<Ligne> {
    try {
      return await apiClient.post<Ligne>('/Lignes', ligne);
    } catch (error) {
      console.error('Create ligne error:', error);
      throw error;
    }
  }

  // Update ligne
  async updateLigne(id: number, ligne: Partial<CreateLigneRequest>): Promise<any> {
    try {
      return await apiClient.put<any>(`/Lignes/${id}`, ligne);
    } catch (error) {
      console.error(`Update ligne with ID ${id} error:`, error);
      throw error;
    }
  }

  // Delete ligne
  async deleteLigne(id: number): Promise<any> {
    try {
      return await apiClient.delete<any>(`/Lignes/${id}`);
    } catch (error) {
      console.error(`Delete ligne with ID ${id} error:`, error);
      throw error;
    }
  }

  // Get all sous-lignes
  async getAllSousLignes(): Promise<SousLigne[]> {
    try {
      return await apiClient.get<SousLigne[]>('/SousLignes');
    } catch (error) {
      console.error('Get all sous-lignes error:', error);
      throw error;
    }
  }

  // Get sous-ligne by ID
  async getSousLigneById(id: number): Promise<SousLigne> {
    try {
      return await apiClient.get<SousLigne>(`/SousLignes/${id}`);
    } catch (error) {
      console.error(`Get sous-ligne with ID ${id} error:`, error);
      throw error;
    }
  }

  // Get sous-lignes by ligne ID
  async getSousLignesByLigneId(ligneId: number): Promise<SousLigne> {
    try {
      return await apiClient.get<SousLigne>(`/SousLignes/by_ligne/${ligneId}`);
    } catch (error) {
      console.error(`Get sous-lignes for ligne ID ${ligneId} error:`, error);
      throw error;
    }
  }

  // Get sous-lignes by document ID
  async getSousLignesByDocumentId(documentId: number): Promise<SousLigne> {
    try {
      return await apiClient.get<SousLigne>(`/SousLignes/by_document/${documentId}`);
    } catch (error) {
      console.error(`Get sous-lignes for document ID ${documentId} error:`, error);
      throw error;
    }
  }

  // Create new sous-ligne
  async createSousLigne(sousLigne: CreateSousLigneRequest): Promise<SousLigne> {
    try {
      return await apiClient.post<SousLigne>('/SousLignes', sousLigne);
    } catch (error) {
      console.error('Create sous-ligne error:', error);
      throw error;
    }
  }

  // Update sous-ligne
  async updateSousLigne(id: number, sousLigne: Partial<CreateSousLigneRequest>): Promise<any> {
    try {
      return await apiClient.put<any>(`/SousLignes/${id}`, sousLigne);
    } catch (error) {
      console.error(`Update sous-ligne with ID ${id} error:`, error);
      throw error;
    }
  }

  // Delete sous-ligne
  async deleteSousLigne(id: number): Promise<any> {
    try {
      return await apiClient.delete<any>(`/SousLignes/${id}`);
    } catch (error) {
      console.error(`Delete sous-ligne with ID ${id} error:`, error);
      throw error;
    }
  }
}

export const ligneService = new LigneService();
