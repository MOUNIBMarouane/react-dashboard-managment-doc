import axios from 'axios';
import { Document, DocumentType } from '@/models/document';

const API_URL = import.meta.env.VITE_API_BASE_URL || '';

const documentService = {
  getAllDocuments: async (): Promise<Document[]> => {
    const response = await axios.get(`${API_URL}/api/Documents`);
    return response.data;
  },

  getDocumentById: async (id: number): Promise<Document> => {
    const response = await axios.get(`${API_URL}/api/Documents/${id}`);
    return response.data;
  },

  getRecentDocuments: async (limit: number = 5): Promise<Document[]> => {
    const response = await axios.get(`${API_URL}/api/Documents/recent?limit=${limit}`);
    return response.data;
  },

  createDocument: async (document: any): Promise<Document> => {
    const response = await axios.post(`${API_URL}/api/Documents`, document);
    return response.data;
  },

  updateDocument: async (id: number, document: any): Promise<Document> => {
    const response = await axios.put(`${API_URL}/api/Documents/${id}`, document);
    return response.data;
  },

  deleteDocument: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/api/Documents/${id}`);
  },

  getAllDocumentTypes: async (): Promise<DocumentType[]> => {
    const response = await axios.get(`${API_URL}/api/Documents/Types`);
    return response.data;
  },

  getDocumentType: async (id: number): Promise<DocumentType> => {
    const response = await axios.get(`${API_URL}/api/Documents/Types/${id}`);
    return response.data;
  },

  createDocumentType: async (type: any): Promise<DocumentType> => {
    const response = await axios.post(`${API_URL}/api/Documents/Types`, type);
    return response.data;
  },

  updateDocumentType: async (id: number, type: any): Promise<DocumentType> => {
    const response = await axios.put(`${API_URL}/api/Documents/Types/${id}`, type);
    return response.data;
  },

  deleteDocumentType: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/api/Documents/Types/${id}`);
  },

  getDocumentsByType: async (typeId: number): Promise<Document[]> => {
    const response = await axios.get(`${API_URL}/api/Documents/ByType/${typeId}`);
    return response.data;
  },

  getDocumentsByStatus: async (status: number): Promise<Document[]> => {
    const response = await axios.get(`${API_URL}/api/Documents/ByStatus/${status}`);
    return response.data;
  },

  searchDocuments: async (term: string): Promise<Document[]> => {
    const response = await axios.get(`${API_URL}/api/Documents/Search?term=${term}`);
    return response.data;
  },

  getDocumentHistory: async (documentId: number): Promise<any[]> => {
    const response = await axios.get(`${API_URL}/api/Documents/${documentId}/History`);
    return response.data;
  },

  generateTypeCode: async (typeName: string): Promise<string> => {
    const response = await axios.post(`${API_URL}/api/Documents/GenerateTypeCode`, { typeName });
    return response.data;
  },
  
  getDocumentTypeById: async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/api/Documents/Types/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching document type by ID:', error);
      throw error;
    }
  },
  
  createSubType: async (subTypeData: any) => {
    try {
      const response = await axios.post(`${API_URL}/api/SubType`, subTypeData);
      return response.data;
    } catch (error) {
      console.error('Error creating subtype:', error);
      throw error;
    }
  },
};

export default documentService;
