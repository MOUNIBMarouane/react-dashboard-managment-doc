
import api from './api';
import { SubType } from '@/models/subtype';

const subTypeService = {
  getAllSubTypes: async (): Promise<SubType[]> => {
    const response = await api.get('/SubType');
    return response.data;
  },

  getSubTypesByDocumentTypeId: async (documentTypeId: number): Promise<SubType[]> => {
    const response = await api.get(`/SubType/by-document-type/${documentTypeId}`);
    return response.data;
  },
  
  // Add this alias method to fix the error
  getSubTypesByDocType: async (documentTypeId: number): Promise<SubType[]> => {
    const response = await api.get(`/SubType/by-document-type/${documentTypeId}`);
    return response.data;
  },

  // Add a new method for date filtering
  getSubTypesForDate: async (documentTypeId: number, date: Date): Promise<SubType[]> => {
    const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const response = await api.get(`/SubType/for-date/${documentTypeId}/${formattedDate}`);
    return response.data;
  },

  getSubTypeById: async (id: number): Promise<SubType> => {
    const response = await api.get(`/SubType/${id}`);
    return response.data;
  },

  createSubType: async (subType: any): Promise<SubType> => {
    const response = await api.post('/SubType', subType);
    return response.data;
  },

  updateSubType: async (id: number, subType: any): Promise<SubType> => {
    const response = await api.put(`/SubType/${id}`, subType);
    return response.data;
  },

  deleteSubType: async (id: number): Promise<void> => {
    await api.delete(`/SubType/${id}`);
  }
};

export default subTypeService;
