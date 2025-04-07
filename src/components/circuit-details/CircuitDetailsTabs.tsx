
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CircuitDetailsList from "@/components/circuit-details/CircuitDetailsList";
import CircuitDocumentBoard from "@/components/circuit-details/CircuitDocumentBoard";
import { CircuitDetail } from "@/types/circuit";
import { Document } from "@/types/document";

interface CircuitDetailsTabsProps {
  defaultTab: string;
  details: CircuitDetail[];
  documents: Document[];
  circuitId: string;
  currentDocumentId?: string;
  onAddDetail: () => void;
  onEditDetail: (detailId: string) => void;
  onDeleteDetail: (detailId: string) => void;
  isLoading: boolean;
}

const CircuitDetailsTabs: React.FC<CircuitDetailsTabsProps> = ({
  defaultTab,
  details,
  documents,
  circuitId,
  currentDocumentId,
  onAddDetail,
  onEditDetail,
  onDeleteDetail,
  isLoading
}) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-dashboard-blue-dark/50 border border-white/10">
        <TabsTrigger value="details" className="text-white data-[state=active]:bg-dashboard-accent">
          Circuit Steps
        </TabsTrigger>
        <TabsTrigger value="documents" className="text-white data-[state=active]:bg-dashboard-accent">
          Document Board
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="mt-4">
        <CircuitDetailsList
          details={details}
          onAddDetail={onAddDetail}
          onEditDetail={onEditDetail}
          onDeleteDetail={onDeleteDetail}
          isLoading={isLoading}
        />
      </TabsContent>
      
      <TabsContent value="documents" className="mt-4">
        <CircuitDocumentBoard
          circuitId={circuitId}
          circuitDetails={details}
          documents={documents}
          currentDocumentId={currentDocumentId}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CircuitDetailsTabs;
