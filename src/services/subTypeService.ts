
import { SubType } from '@/models/subtype';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || '';

const subTypeService = {
  getAllSubTypes: async (): Promise<SubType[]> => {
    const response = await axios.get(`${API_URL}/api/SubType`);
    return response.data;
  },

  getSubTypeById: async (id: number): Promise<SubType> => {
    const response = await axios.get(`${API_URL}/api/SubType/${id}`);
    return response.data;
  },

  getSubTypesByDocType: async (docTypeId: number): Promise<SubType[]> => {
    const response = await axios.get(`${API_URL}/api/SubType/by-document-type/${docTypeId}`);
    return response.data;
  },
  
  // Adding alias for compatibility
  getSubTypesByDocumentTypeId: async (docTypeId: number): Promise<SubType[]> => {
    return subTypeService.getSubTypesByDocType(docTypeId);
  },

  createSubType: async (subType: any): Promise<SubType> => {
    const response = await axios.post(`${API_URL}/api/SubType`, subType);
    return response.data;
  },

  updateSubType: async (id: number, subType: any): Promise<SubType> => {
    const response = await axios.put(`${API_URL}/api/SubType/${id}`, subType);
    return response.data;
  },

  deleteSubType: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/api/SubType/${id}`);
  }
};

export default subTypeService;
