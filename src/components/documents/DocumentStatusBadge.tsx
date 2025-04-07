
import React from "react";
import { DocumentStatus } from "@/types/document";

interface DocumentStatusBadgeProps {
  status: DocumentStatus;
}

const DocumentStatusBadge: React.FC<DocumentStatusBadgeProps> = ({ status }) => {
  const getBadgeClasses = () => {
    switch (status) {
      case "Published":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "Draft":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      case "Archived":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getBadgeClasses()}`}>
      {status}
    </span>
  );
};

export default DocumentStatusBadge;
