
import { ApiService } from '../api/apiService';
import { DocumentType } from '../../models/document';

class DocumentTypeService extends ApiService {
  async getAllDocumentTypes(): Promise<DocumentType[]> {
    return this.get<DocumentType[]>('/Documents/Types');
  }

  async createDocumentType(documentType: DocumentType): Promise<void> {
    return this.post<DocumentType, void>('/Documents/Types', documentType);
  }

  async updateDocumentType(id: number, documentType: DocumentType): Promise<void> {
    return this.put<DocumentType>(`/Documents/Types/${id}`, documentType);
  }

  async validateTypeName(typeName: string): Promise<boolean> {
    try {
      const response = await this.post<{ typeName: string }, string>('/Documents/valide-type', { typeName });
      return response === "True";
    } catch (error) {
      console.error('Error validating type name:', error);
      throw error;
    }
  }

  async deleteDocumentType(id: number): Promise<void> {
    return this.delete(`/Documents/Types/${id}`);
  }
  
  async deleteMultipleDocumentTypes(ids: number[]): Promise<void> {
    try {
      // Since the API doesn't support bulk deletion, we'll delete one by one
      await Promise.all(ids.map(id => this.delete(`/Documents/Types/${id}`)));
    } catch (error) {
      console.error('Error deleting multiple document types:', error);
      throw error;
    }
  }
}

export const documentTypeService = new DocumentTypeService();
