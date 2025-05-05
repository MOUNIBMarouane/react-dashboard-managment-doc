
export interface Ligne {
  id: number;
  documentId: number;
  ligneKey: string;
  title: string;
  article: string;
  price?: number;
  sousLigneCounter?: number;
  createdAt: string;
  updatedAt: string;
  document?: any;
  sousLignes?: SousLigne[];
}

export interface SousLigne {
  id: number;
  ligneId: number;
  sousLigneKey: string;
  title: string;
  attribute: string;
  createdAt: string;
  updatedAt: string;
  ligne?: Ligne;
}

export interface CreateLigneRequest {
  documentId: number;
  title: string;
  article: string;
  price?: number;
}

export interface UpdateLigneRequest {
  title?: string;
  article?: string;
  price?: number;
}

export interface CreateSousLigneRequest {
  ligneId: number;
  title: string;
  attribute: string;
}

export interface UpdateSousLigneRequest {
  title?: string;
  attribute?: string;
}
