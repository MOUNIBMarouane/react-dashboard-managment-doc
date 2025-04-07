
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchCircuits } from "@/services/circuitService";
import { Circuit } from "@/types/circuit";
import { Loader2, ArrowLeft, CircuitBoard } from "lucide-react";
import { toast } from "sonner";
import { useDocumentManagement } from "@/hooks/useDocumentManagement";

const SelectCircuit = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCircuit, setSelectedCircuit] = useState<string | null>(null);
  const { documents } = useDocumentManagement();
  const document = documents.find(doc => doc.id === documentId);

  useEffect(() => {
    const loadCircuits = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCircuits();
        setCircuits(data);
      } catch (error) {
        console.error("Error fetching circuits:", error);
        toast.error("Failed to load circuits");
      } finally {
        setIsLoading(false);
      }
    };

    loadCircuits();
  }, []);

  const handleSelectCircuit = (circuitId: string) => {
    setSelectedCircuit(circuitId);
  };

  const handleProceed = () => {
    if (selectedCircuit) {
      // Navigate to the circuit details page with the document ID as a parameter
      navigate(`/circuit-details/${selectedCircuit}?documentId=${documentId}`);
      toast.success(`Document assigned to circuit successfully`);
    } else {
      toast.error("Please select a circuit first");
    }
  };

  return (
    <Layout>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(-1)} 
            className="border-white/10 text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">Select Circuit</h1>
        </div>

        {document && (
          <Card className="bg-dashboard-blue-dark border-white/10 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Assigning Document: {document.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70">{document.content}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-white/50" />
            </div>
          ) : circuits.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white/5 rounded-lg">
              <CircuitBoard className="h-12 w-12 mx-auto mb-4 text-white/20" />
              <p className="text-white/60">No circuits found</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => navigate('/circuits')}
              >
                Create a new circuit
              </Button>
            </div>
          ) : (
            circuits.map((circuit) => (
              <Card 
                key={circuit.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedCircuit === circuit.id 
                    ? "bg-dashboard-blue-dark border-dashboard-accent" 
                    : "bg-dashboard-blue-dark/50 border-white/10 hover:bg-dashboard-blue-dark"
                }`}
                onClick={() => handleSelectCircuit(circuit.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CircuitBoard className={`h-5 w-5 ${
                      selectedCircuit === circuit.id ? "text-dashboard-accent" : "text-white/60"
                    }`} />
                    {circuit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/70 mb-3">{circuit.descriptif || "No description"}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">Steps: {circuit.crd_counter}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      circuit.is_active 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-gray-500/20 text-gray-400"
                    }`}>
                      {circuit.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleProceed}
            disabled={!selectedCircuit || isLoading}
            className="bg-dashboard-accent hover:bg-dashboard-accent/80"
          >
            Proceed
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SelectCircuit;
