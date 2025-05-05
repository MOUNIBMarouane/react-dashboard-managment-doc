import { Button } from "@/components/ui/button";
import { Layers, Plus } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface SubTypeListHeaderProps {
  documentTypeName: string;
  onCreateClick: () => void;
}

export default function SubTypeListHeader({
  documentTypeName,
  onCreateClick,
}: SubTypeListHeaderProps) {
  const { theme } = useSettings();
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 
      ${
        isDark ? "bg-[#0a1033]/60 border border-blue-900/30" : "subtypes-header"
      } 
      rounded-lg p-4 mb-4`}
    >
      <div>
        <h2
          className={`text-xl font-semibold ${
            isDark ? "text-white" : "subtypes-title"
          } flex items-center`}
        >
          <Layers
            className={`h-5 w-5 mr-2 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          />
          Subtypes
        </h2>
        <p
          className={`text-sm ${
            isDark ? "text-blue-300/80" : "subtypes-description"
          } mt-1`}
        >
          Manage subtypes for{" "}
          <span
            className={`${
              isDark ? "text-blue-300" : "text-blue-600"
            } font-medium`}
          >
            {documentTypeName}
          </span>
        </p>
      </div>
      <Button
        onClick={onCreateClick}
        className={`${
          isDark
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white px-3`}
      >
        <Plus className="h-4 w-4 mr-2" /> Add Subtype
      </Button>
    </div>
  );
}
