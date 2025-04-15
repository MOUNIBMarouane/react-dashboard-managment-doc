
import { ApiService } from '../api/apiService';
import { SousLigne, CreateSousLigneRequest, UpdateSousLigneRequest } from '../../models/document';

class SousLigneService extends ApiService {
  async getAllSousLignes(): Promise<SousLigne[]> {
    return this.get<SousLigne[]>('/SousLignes');
  }

  async getSousLigneById(id: number): Promise<SousLigne> {
    return this.get<SousLigne>(`/SousLignes/${id}`);
  }

  async getSousLignesByLigneId(ligneId: number): Promise<SousLigne[]> {
    return this.get<SousLigne[]>(`/SousLignes/by_ligne/${ligneId}`);
  }

  async getSousLignesByDocumentId(documentId: number): Promise<SousLigne[]> {
    return this.get<SousLigne[]>(`/SousLignes/by_document/${documentId}`);
  }

  async createSousLigne(sousLigne: CreateSousLigneRequest): Promise<SousLigne> {
    return this.post<CreateSousLigneRequest, SousLigne>('/SousLignes', sousLigne);
  }

  async updateSousLigne(id: number, sousLigne: UpdateSousLigneRequest): Promise<void> {
    return this.put<UpdateSousLigneRequest>(`/SousLignes/${id}`, sousLigne);
  }

  async deleteSousLigne(id: number): Promise<void> {
    return this.delete(`/SousLignes/${id}`);
  }
}

export const sousLigneService = new SousLigneService();
