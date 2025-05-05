
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import documentService from "@/services/documentService";
import circuitService from "@/services/circuitService";
import { Document } from "@/models/document";
import { useSettings } from "@/context/SettingsContext";
import { AlertTriangle, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import CircuitDetailsList from "./CircuitDetailsList";
import AssignCircuitDialog from "./AssignCircuitDialog";

interface DocumentCircuitPanelProps {
  documentId: number;
  document?: Document;
}

export function DocumentCircuitPanel({
  documentId,
  document: initialDocument,
}: DocumentCircuitPanelProps) {
  const { theme } = useSettings();
  const [assignCircuitDialogOpen, setAssignCircuitDialogOpen] = useState(false);

  const {
    data: document,
    isLoading: isLoadingDocument,
    refetch: refetchDocument,
  } = useQuery({
    queryKey: ["document", documentId],
    queryFn: () => documentService.getDocumentById(documentId),
    initialData: initialDocument,
    enabled: !!documentId,
  });

  const {
    data: circuitDetails,
    isLoading: isLoadingCircuitDetails,
  } = useQuery({
    queryKey: ["circuit-details", document?.circuitId],
    queryFn: () => circuitService.getCircuitDetailsByCircuitId(document?.circuitId || 0),
    enabled: !!document?.circuitId,
  });

  const {
    data: circuit,
    isLoading: isLoadingCircuit,
  } = useQuery({
    queryKey: ["circuit", document?.circuitId],
    queryFn: () => circuitService.getCircuitById(document?.circuitId || 0),
    enabled: !!document?.circuitId,
  });

  const handleCircuitAssigned = () => {
    refetchDocument();
  };

  const isDarkTheme = theme === "dark";
  const isLoading = isLoadingDocument || isLoadingCircuitDetails || isLoadingCircuit;

  const getStatusColor = (status: number) => {
    // 0 = Draft, 1 = In Progress, 2 = Completed, 3 = Rejected
    switch (status) {
      case 0:
        return isDarkTheme
          ? "bg-blue-900/40 text-blue-200 border-blue-700/50"
          : "bg-blue-50 text-blue-700 border-blue-200";
      case 1:
        return isDarkTheme
          ? "bg-amber-900/40 text-amber-200 border-amber-700/50"
          : "bg-amber-50 text-amber-700 border-amber-200";
      case 2:
        return isDarkTheme
          ? "bg-green-900/40 text-green-200 border-green-700/50"
          : "bg-green-50 text-green-700 border-green-200";
      case 3:
        return isDarkTheme
          ? "bg-red-900/40 text-red-200 border-red-700/50"
          : "bg-red-50 text-red-700 border-red-200";
      default:
        return isDarkTheme
          ? "bg-gray-900/40 text-gray-200 border-gray-700/50"
          : "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: number) => {
    switch (status) {
      case 0:
        return <Clock className="w-3.5 h-3.5 mr-1" />;
      case 1:
        return <ArrowRight className="w-3.5 h-3.5 mr-1" />;
      case 2:
        return <CheckCircle className="w-3.5 h-3.5 mr-1" />;
      case 3:
        return <AlertTriangle className="w-3.5 h-3.5 mr-1" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "Draft";
      case 1:
        return "In Progress";
      case 2:
        return "Completed";
      case 3:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  if (isLoading) {
    return (
      <Card
        className={
          isDarkTheme
            ? "bg-[#0f1642] border-blue-900/30 shadow-xl"
            : "bg-white border-blue-200/60 shadow-lg"
        }
      >
        <CardHeader className="pb-2">
          <CardTitle
            className={
              isDarkTheme
                ? "text-blue-100 text-lg"
                : "text-blue-900 text-lg"
            }
          >
            <Skeleton className="h-6 w-32" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-48" />
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full mr-4" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!document?.circuitId) {
    return (
      <Card
        className={
          isDarkTheme
            ? "bg-[#0f1642] border-blue-900/30 shadow-xl"
            : "bg-white border-blue-200/60 shadow-lg"
        }
      >
        <CardHeader className="pb-2">
          <CardTitle
            className={
              isDarkTheme
                ? "text-blue-100 text-lg"
                : "text-blue-900 text-lg"
            }
          >
            Document Workflow
          </CardTitle>
          <CardDescription>
            This document is not assigned to any workflow circuit
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center py-6">
            <p
              className={
                isDarkTheme
                  ? "text-gray-400 mb-4"
                  : "text-gray-500 mb-4"
              }
            >
              Assign this document to a workflow circuit to track its progress
              through defined steps.
            </p>
            <Button
              onClick={() => setAssignCircuitDialogOpen(true)}
              className={
                isDarkTheme
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            >
              Assign to Circuit
            </Button>
          </div>
          <AssignCircuitDialog
            documentId={documentId}
            documentTitle={document?.title}
            open={assignCircuitDialogOpen}
            onOpenChange={setAssignCircuitDialogOpen}
            onSuccess={handleCircuitAssigned}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={
        isDarkTheme
          ? "bg-[#0f1642] border-blue-900/30 shadow-xl"
          : "bg-white border-blue-200/60 shadow-lg"
      }
    >
      <CardHeader
        className={
          isDarkTheme
            ? "pb-2 flex flex-row items-center justify-between"
            : "pb-2 flex flex-row items-center justify-between"
        }
      >
        <div>
          <CardTitle
            className={
              isDarkTheme
                ? "text-blue-100 text-lg"
                : "text-blue-900 text-lg"
            }
          >
            Workflow: {circuit?.title || "Circuit"}
          </CardTitle>
          <CardDescription>
            {circuit?.descriptif || "Document workflow circuit"}
          </CardDescription>
        </div>
        <Badge
          className={`${getStatusColor(document?.status || 0)} flex items-center`}
          variant="outline"
        >
          {getStatusIcon(document?.status || 0)}
          {getStatusText(document?.status || 0)}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {document && document.currentStepId ? (
          <div className="bg-blue-900/20 border border-blue-900/30 rounded-md p-3">
            <div className="text-xs text-gray-400 mb-1">Current Step</div>
            <div className="text-sm font-medium text-blue-200">
              {document.currentStep?.title || `Step ${document.currentStepId}`}
            </div>
          </div>
        ) : null}

        {circuit && circuitDetails && circuitDetails.length > 0 && (
          <CircuitDetailsList
            circuitDetails={circuitDetails}
          />
        )}

        <div className="flex justify-end space-x-2">
          <Button
            onClick={() => setAssignCircuitDialogOpen(true)}
            variant="outline"
            className={
              isDarkTheme
                ? "text-gray-300 border-gray-700 hover:bg-gray-800"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }
            size="sm"
          >
            Change Circuit
          </Button>
          <Button
            onClick={() => window.location.href = `/documents/${documentId}/flow`}
            className={
              isDarkTheme
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }
            size="sm"
          >
            Manage Workflow
          </Button>
        </div>
      </CardContent>

      <AssignCircuitDialog
        documentId={documentId}
        documentTitle={document.title}
        open={assignCircuitDialogOpen}
        onOpenChange={setAssignCircuitDialogOpen}
        onSuccess={handleCircuitAssigned}
      />
    </Card>
  );
}
