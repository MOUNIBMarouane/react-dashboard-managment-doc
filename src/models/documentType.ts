
export interface DocumentType {
  id?: number;
  typeKey: string;
  typeName: string;
  typeAttr?: string;
  documentCounter?: number;
  docCounter?: number;
}

export interface CreateDocumentTypeRequest {
  typeName: string;
  typeKey?: string;
  typeAttr?: string;
}

export interface UpdateDocumentTypeRequest {
  typeName?: string;
  typeKey?: string;
  typeAttr?: string;
  documentCounter?: number;
}

export interface DocumentTypeUpdateRequest extends UpdateDocumentTypeRequest {
  // Same fields as UpdateDocumentTypeRequest but explicitly defined for clarity
}
