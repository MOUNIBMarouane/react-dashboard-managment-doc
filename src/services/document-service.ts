// src/services/document-service.ts
import { apiClient } from './api-client';
import { 
  Document, 
  DocumentType, 
  CreateDocumentRequest, 
  UpdateDocumentRequest 
} from '../types/api-types';

class DocumentService {
  // Get all documents
  async getAllDocuments(): Promise<Document[]> {
    try {
      return await apiClient.get<Document[]>('/Documents');
    } catch (error) {
      console.error('Get all documents error:', error);
      throw error;
    }
  }

  // Get document by ID
  async getDocumentById(id: number): Promise<Document> {
    try {
      return await apiClient.get<Document>(`/Documents/${id}`);
    } catch (error) {
      console.error(`Get document with ID ${id} error:`, error);
      throw error;
    }
  }

  // Create new document
  async createDocument(document: CreateDocumentRequest): Promise<Document> {
    try {
      return await apiClient.post<Document>('/Documents', document);
    } catch (error) {
      console.error('Create document error:', error);
      throw error;
    }
  }

  // Update document
  async updateDocument(id: number, document: UpdateDocumentRequest): Promise<any> {
    try {
      return await apiClient.put<any>(`/Documents/${id}`, document);
    } catch (error) {
      console.error(`Update document with ID ${id} error:`, error);
      throw error;
    }
  }

  // Delete document
  async deleteDocument(id: number): Promise<any> {
    try {
      return await apiClient.delete<any>(`/Documents/${id}`);
    } catch (error) {
      console.error(`Delete document with ID ${id} error:`, error);
      throw error;
    }
  }

  // Get all document types
  async getAllDocumentTypes(): Promise<DocumentType[]> {
    try {
      return await apiClient.get<DocumentType[]>('/Documents/Types');
    } catch (error) {
      console.error('Get all document types error:', error);
      throw error;
    }
  }

  // Create new document type
  async createDocumentType(documentType: DocumentType): Promise<any> {
    try {
      return await apiClient.post<any>('/Documents/Types', documentType);
    } catch (error) {
      console.error('Create document type error:', error);
      throw error;
    }
  }

  // Validate document type
  async validateDocumentType(documentType: DocumentType): Promise<boolean> {
    try {
      const response = await apiClient.post('/Documents/valide-type', documentType);
      return !!response;
    } catch (error) {
      console.error('Validate document type error:', error);
      throw error;
    }
  }

  // Delete document type
  async deleteDocumentType(id: number): Promise<any> {
    try {
      return await apiClient.delete<any>(`/Documents/Types/${id}`);
    } catch (error) {
      console.error(`Delete document type with ID ${id} error:`, error);
      throw error;
    }
  }

  // Helper function to get document status as string
  getDocumentStatusText(status: number): string {
    switch (status) {
      case 0: return 'Draft';
      case 1: return 'In Review';
      case 2: return 'Approved';
      case 3: return 'Rejected';
      case 4: return 'Published';
      case 5: return 'Archived';
      default: return 'Unknown';
    }
  }
}

export const documentService = new DocumentService();
