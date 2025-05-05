
import { DocumentType } from './documentType';

export interface SubType {
  id: number;
  subTypeKey: string;
  name: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  documentTypeId: number;
  documentType?: DocumentType;
  isActive: boolean;
}

export interface CreateSubTypeDto {
  name: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  documentTypeId: number;
  isActive: boolean;
}

export interface UpdateSubTypeDto {
  name?: string;
  description?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  isActive?: boolean;
}

export interface SubTypeFilterOptions {
  search?: string;
  isActive?: boolean;
  documentTypeId?: number;
  startDate?: Date | string;
  endDate?: Date | string;
}
