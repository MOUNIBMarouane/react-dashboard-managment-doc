
import { ApiService } from '../api/apiService';
import { Document, CreateDocumentRequest, UpdateDocumentRequest } from '../../models/document';

class DocumentService extends ApiService {
  async getAllDocuments(): Promise<Document[]> {
    return this.get<Document[]>('/Documents');
  }

  async getDocumentById(id: number): Promise<Document> {
    return this.get<Document>(`/Documents/${id}`);
  }

  async getRecentDocuments(limit: number = 5): Promise<Document[]> {
    try {
      return this.get<Document[]>(`/Documents/recent?limit=${limit}`);
    } catch (error) {
      console.error('Error fetching recent documents:', error);
      // If the API doesn't have this endpoint yet, fall back to getting all documents and sorting them
      const allDocs = await this.getAllDocuments();
      return allDocs
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, limit);
    }
  }

  async createDocument(document: CreateDocumentRequest): Promise<Document> {
    return this.post<CreateDocumentRequest, Document>('/Documents', document);
  }

  async updateDocument(id: number, document: UpdateDocumentRequest): Promise<void> {
    return this.put<UpdateDocumentRequest>(`/Documents/${id}`, document);
  }

  async deleteDocument(id: number): Promise<void> {
    return this.delete(`/Documents/${id}`);
  }

  async deleteMultipleDocuments(ids: number[]): Promise<void> {
    try {
      // Since the API doesn't support bulk deletion, we'll delete one by one
      await Promise.all(ids.map(id => this.delete(`/Documents/${id}`)));
    } catch (error) {
      console.error('Error deleting multiple documents:', error);
      throw error;
    }
  }
}

export const documentService = new DocumentService();
