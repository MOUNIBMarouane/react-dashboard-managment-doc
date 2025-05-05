
import { Label } from "@/components/ui/label";
import { CustomInput } from "@/components/ui/custom-input";

interface TitleStepProps {
  title: string;
  onTitleChange: (value: string) => void;
  titleError?: string;
}

export const TitleStep = ({ title, onTitleChange, titleError }: TitleStepProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="title" className="text-sm font-medium text-gray-200">Document Title*</Label>
      <CustomInput 
        id="title" 
        value={title} 
        onChange={e => onTitleChange(e.target.value)}
        placeholder="Enter document title"
        className="h-12 text-base bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
        error={!!titleError}
      />
      {titleError && (
        <p className="text-sm text-red-500">{titleError}</p>
      )}
    </div>
  );
};
