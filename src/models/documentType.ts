
export interface DocumentType {
  id: number;
  typeKey: string;
  typeName: string;
  typeAttr: string;
  documentCounter: number;
  docCounter: number;
}

export interface DocumentTypeDto {
  typeAlias?: string;
  typeKey: string;
  typeName: string;
  typeAttr: string;
}

export interface DocumentTypeUpdateRequest {
  typeKey?: string;
  typeName?: string;
  typeAttr?: string;
}

export interface DocumentTypeCreateRequest {
  typeName: string;
  typeKey?: string;
  typeAttr?: string;
}
