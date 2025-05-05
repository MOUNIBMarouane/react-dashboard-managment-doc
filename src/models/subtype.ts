
import { DocumentType } from './document';

export interface SubType {
  id: number;
  subTypeKey: string;
  name: string;
  description?: string;
  startDate: Date | string;
  endDate: Date | string;
  documentTypeId: number;
  isActive: boolean;
  documentType?: DocumentType;
}
