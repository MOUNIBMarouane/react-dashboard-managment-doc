
export type DocumentStatus = "Draft" | "Published" | "Archived";

export interface Document {
  id: string;
  title: string;
  content?: string;
  type?: string;
  status: DocumentStatus;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
}
