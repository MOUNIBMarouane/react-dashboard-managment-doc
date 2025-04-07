
import React from "react";

interface DocumentTypeBadgeProps {
  type?: string;
}

const DocumentTypeBadge: React.FC<DocumentTypeBadgeProps> = ({ type }) => {
  if (!type) return null;

  // Generate a consistent color based on the type string
  const getColorFromString = (str: string) => {
    const colors = [
      "bg-purple-500/20 text-purple-500 border-purple-500/30",
      "bg-cyan-500/20 text-cyan-500 border-cyan-500/30",
      "bg-amber-500/20 text-amber-500 border-amber-500/30",
      "bg-pink-500/20 text-pink-500 border-pink-500/30",
      "bg-indigo-500/20 text-indigo-500 border-indigo-500/30",
      "bg-lime-500/20 text-lime-500 border-lime-500/30",
      "bg-teal-500/20 text-teal-500 border-teal-500/30",
      "bg-orange-500/20 text-orange-500 border-orange-500/30"
    ];
    
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getColorFromString(type)}`}>
      {type}
    </span>
  );
};

export default DocumentTypeBadge;
