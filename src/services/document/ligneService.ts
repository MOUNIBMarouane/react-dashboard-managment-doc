
import { ApiService } from '../api/apiService';
import { Ligne, CreateLigneRequest, UpdateLigneRequest } from '../../models/document';

class LigneService extends ApiService {
  async getAllLignes(): Promise<Ligne[]> {
    return this.get<Ligne[]>('/Lignes');
  }

  async getLigneById(id: number): Promise<Ligne> {
    return this.get<Ligne>(`/Lignes/${id}`);
  }

  async getLignesByDocumentId(documentId: number): Promise<Ligne[]> {
    return this.get<Ligne[]>(`/Lignes/by-document/${documentId}`);
  }

  async createLigne(ligne: CreateLigneRequest): Promise<Ligne> {
    return this.post<CreateLigneRequest, Ligne>('/Lignes', ligne);
  }

  async updateLigne(id: number, ligne: UpdateLigneRequest): Promise<void> {
    return this.put<UpdateLigneRequest>(`/Lignes/${id}`, ligne);
  }

  async deleteLigne(id: number): Promise<void> {
    return this.delete(`/Lignes/${id}`);
  }
}

export const ligneService = new LigneService();
