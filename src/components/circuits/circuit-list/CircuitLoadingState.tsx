
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings } from "@/context/SettingsContext";

interface CircuitLoadingStateProps {
  message?: string;
  rows?: number;
}

export function CircuitLoadingState({ message = "Loading circuits...", rows = 5 }: CircuitLoadingStateProps) {
  const { theme } = useSettings();
  
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-28" />
      </div>
      
      <div className={`${theme === "dark" ? "bg-slate-800/50" : "bg-white"} rounded-md border p-1`}>
        <div className="space-y-3">
          {Array(rows).fill(0).map((_, i) => (
            <div key={i} className="flex items-center p-2 rounded-md">
              <Skeleton className="h-4 w-16 mr-2" />
              <Skeleton className="h-4 w-48 mr-2" />
              <Skeleton className="h-4 w-32 mr-2" />
              <Skeleton className="h-4 w-24 ml-auto" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-4">
        <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
          {message}
        </p>
      </div>
    </div>
  );
}
