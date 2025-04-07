
export interface DocumentLine {
  id: string;
  documentId: string;
  title: string;
  description?: string;
  quantity: number;
  unitPrice?: number;
  totalAmount?: number;
  createdAt: string;
}

export interface DocumentSubLine {
  id: string;
  lineId: string;
  title: string;
  description?: string;
  quantity: number;
  unitPrice?: number;
  totalAmount?: number;
  createdAt: string;
}
