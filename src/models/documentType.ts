
export interface DocumentType {
  id: number;
  typeKey: string;
  typeName: string;
  typeAttr?: string;
  documentCounter?: number;
  docCounter?: number;
}

export interface DocumentTypeUpdateRequest {
  typeName?: string;
  typeKey?: string;
  typeAttr?: string;
  documentCounter?: number;
}

export interface CreateDocumentTypeRequest {
  typeName: string;
  typeKey?: string;
  typeAttr?: string;
}
