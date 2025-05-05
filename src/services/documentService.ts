
import { Document, DocumentType } from '@/models/document';
import { SubType } from '@/models/subtype';
import { Ligne, SousLigne } from '@/models/document';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || '';

const documentService = {
  // Document endpoints
  getAllDocuments: async (): Promise<Document[]> => {
    const response = await axios.get(`${API_URL}/api/Documents`);
    return response.data;
  },

  getDocumentById: async (id: number): Promise<Document> => {
    const response = await axios.get(`${API_URL}/api/Documents/${id}`);
    return response.data;
  },

  getRecentDocuments: async (limit = 5): Promise<Document[]> => {
    const response = await axios.get(`${API_URL}/api/Documents/recent?limit=${limit}`);
    return response.data;
  },

  createDocument: async (data: any): Promise<Document> => {
    const response = await axios.post(`${API_URL}/api/Documents`, data);
    return response.data;
  },

  updateDocument: async (id: number, data: any): Promise<Document> => {
    const response = await axios.put(`${API_URL}/api/Documents/${id}`, data);
    return response.data;
  },

  deleteDocument: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/api/Documents/${id}`);
  },

  // Document type endpoints
  getAllDocumentTypes: async (): Promise<DocumentType[]> => {
    const response = await axios.get(`${API_URL}/api/Documents/Types`);
    return response.data;
  },

  getDocumentType: async (id: number): Promise<DocumentType> => {
    const response = await axios.get(`${API_URL}/api/Documents/Types/${id}`);
    return response.data;
  },

  getDocumentTypeById: async (id: number): Promise<DocumentType> => {
    const response = await axios.get(`${API_URL}/api/Documents/Types/${id}`);
    return response.data;
  },

  createDocumentType: async (data: any): Promise<DocumentType> => {
    const response = await axios.post(`${API_URL}/api/Documents/Types`, data);
    return response.data;
  },

  updateDocumentType: async (id: number, data: any): Promise<DocumentType> => {
    const response = await axios.put(`${API_URL}/api/Documents/Types/${id}`, data);
    return response.data;
  },

  deleteDocumentType: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/api/Documents/Types/${id}`);
  },

  deleteMultipleDocumentTypes: async (ids: number[]): Promise<void> => {
    await axios.post(`${API_URL}/api/Documents/Types/delete-multiple`, { ids });
  },

  // SubType endpoints
  createSubType: async (subTypeData: any): Promise<SubType> => {
    const response = await axios.post(`${API_URL}/api/SubType`, subTypeData);
    return response.data;
  },

  // Ligne endpoints
  getLignesByDocumentId: async (documentId: number): Promise<Ligne[]> => {
    const response = await axios.get(`${API_URL}/api/Lignes/by-document/${documentId}`);
    return response.data;
  },

  createLigne: async (data: any): Promise<Ligne> => {
    const response = await axios.post(`${API_URL}/api/Lignes`, data);
    return response.data;
  },

  updateLigne: async (id: number, data: any): Promise<Ligne> => {
    const response = await axios.put(`${API_URL}/api/Lignes/${id}`, data);
    return response.data;
  },

  deleteLigne: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/api/Lignes/${id}`);
  },

  // SousLigne endpoints
  getSousLignesByLigneId: async (ligneId: number): Promise<SousLigne[]> => {
    const response = await axios.get(`${API_URL}/api/SousLignes/by_ligne/${ligneId}`);
    return response.data;
  },

  createSousLigne: async (data: any): Promise<SousLigne> => {
    const response = await axios.post(`${API_URL}/api/SousLignes`, data);
    return response.data;
  },

  updateSousLigne: async (id: number, data: any): Promise<SousLigne> => {
    const response = await axios.put(`${API_URL}/api/SousLignes/${id}`, data);
    return response.data;
  },

  deleteSousLigne: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/api/SousLignes/${id}`);
  },

  // Document validation methods
  validateTypeName: async (typeName: string): Promise<boolean> => {
    const response = await axios.post(`${API_URL}/api/Documents/valide-type`, { typeName });
    return response.data === "False";
  },

  validateTypeCode: async (typeKey: string): Promise<boolean> => {
    const response = await axios.post(`${API_URL}/api/Documents/valide-typeKey`, { typeKey });
    return response.data === "True";
  },

  generateTypeCode: async (typeName: string): Promise<string> => {
    // Simple client-side generation (first 2 characters uppercase)
    return typeName.slice(0, 2).toUpperCase();
  }
};

export default documentService;
