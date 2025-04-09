
export interface DocumentCircuitHistory {
  id: number;
  documentId: number;
  circuitId: number;
  circuitDetailId: number;
  userId: number;
  userName: string;
  comments: string;
  isApproved: boolean;
  processedAt: string;
  processedBy: string;
  circuitDetail: {
    title: string;
    orderIndex: number;
  };
}

export interface ProcessCircuitRequest {
  documentId: number;
  comments: string;
  isApproved: boolean;
}

export interface MoveDocumentStepRequest {
  documentId: number;
  circuitDetailId: number;
}
