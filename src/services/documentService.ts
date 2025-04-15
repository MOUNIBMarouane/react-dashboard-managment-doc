
import { documentService, documentTypeService, ligneService, sousLigneService } from './document';

// Re-export all services for backward compatibility
export default {
  // Document methods
  getAllDocuments: documentService.getAllDocuments.bind(documentService),
  getDocumentById: documentService.getDocumentById.bind(documentService),
  getRecentDocuments: documentService.getRecentDocuments.bind(documentService),
  createDocument: documentService.createDocument.bind(documentService),
  updateDocument: documentService.updateDocument.bind(documentService),
  deleteDocument: documentService.deleteDocument.bind(documentService),
  deleteMultipleDocuments: documentService.deleteMultipleDocuments.bind(documentService),

  // Document Types methods
  getAllDocumentTypes: documentTypeService.getAllDocumentTypes.bind(documentTypeService),
  createDocumentType: documentTypeService.createDocumentType.bind(documentTypeService),
  updateDocumentType: documentTypeService.updateDocumentType.bind(documentTypeService),
  validateTypeName: documentTypeService.validateTypeName.bind(documentTypeService),
  deleteDocumentType: documentTypeService.deleteDocumentType.bind(documentTypeService),
  deleteMultipleDocumentTypes: documentTypeService.deleteMultipleDocumentTypes.bind(documentTypeService),

  // Ligne methods
  getAllLignes: ligneService.getAllLignes.bind(ligneService),
  getLigneById: ligneService.getLigneById.bind(ligneService),
  getLignesByDocumentId: ligneService.getLignesByDocumentId.bind(ligneService),
  createLigne: ligneService.createLigne.bind(ligneService),
  updateLigne: ligneService.updateLigne.bind(ligneService),
  deleteLigne: ligneService.deleteLigne.bind(ligneService),

  // SousLigne methods
  getAllSousLignes: sousLigneService.getAllSousLignes.bind(sousLigneService),
  getSousLigneById: sousLigneService.getSousLigneById.bind(sousLigneService),
  getSousLignesByLigneId: sousLigneService.getSousLignesByLigneId.bind(sousLigneService),
  getSousLignesByDocumentId: sousLigneService.getSousLignesByDocumentId.bind(sousLigneService),
  createSousLigne: sousLigneService.createSousLigne.bind(sousLigneService),
  updateSousLigne: sousLigneService.updateSousLigne.bind(sousLigneService),
  deleteSousLigne: sousLigneService.deleteSousLigne.bind(sousLigneService)
};
