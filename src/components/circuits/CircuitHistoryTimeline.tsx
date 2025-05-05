import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Separator,
} from "@/components/ui/separator";
import { useSettings } from "@/context/SettingsContext";
import { DocumentCircuitHistory } from "@/models/documentCircuit";

interface CircuitHistoryTimelineProps {
  circuitHistory: DocumentCircuitHistory[];
}

export function CircuitHistoryTimeline({
  circuitHistory,
}: CircuitHistoryTimelineProps) {
  const { theme } = useSettings();
  const isDark = theme === "dark";

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border border-blue-900/30 p-2">
      <div className="flex flex-col gap-1">
        {circuitHistory.map((history) => (
          <div
            key={history.id}
            className={`relative mb-2 rounded-md border-0 py-1 pl-8 pr-4 ${
              isDark ? "bg-blue-950/30" : "bg-blue-50"
            }`}
          >
            <div className="absolute left-2 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check-check h-4 w-4"
              >
                <path d="M12 5 3 14"></path>
                <polyline points="3 7 12 16 22 6"></polyline>
              </svg>
            </div>
            <p className="text-sm font-medium leading-none text-blue-50">
              {history.stepTitle || `Step ${history.circuitDetailTitle || history.circuitDetailId}`}
            </p>
            <p className="mt-0.5 text-xs text-blue-300">
              by {history.processedBy || "System"}
            </p>
            <Separator className="my-2 bg-blue-900/20" />
            <p className="text-xs text-blue-200">
              {history.comments || "No comments provided."}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
