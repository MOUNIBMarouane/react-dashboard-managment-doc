
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Documents from "./pages/Documents";
import DocumentDetails from "./pages/DocumentDetails";
import LineDetails from "./pages/LineDetails";
import Types from "./pages/Types";
import TypeDetails from "./pages/TypeDetails";
import Circuits from "./pages/Circuits";
import CircuitDetails from "./pages/CircuitDetails";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user-details/:userId" element={<UserDetails />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/document-details/:documentId" element={<DocumentDetails />} />
          <Route path="/document-details/:documentId/line/:lineId" element={<LineDetails />} />
          <Route path="/types" element={<Types />} />
          <Route path="/type-details/:typeId" element={<TypeDetails />} />
          <Route path="/circuits" element={<Circuits />} />
          <Route path="/circuit-details/:circuitId" element={<CircuitDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
