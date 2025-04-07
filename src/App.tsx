
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import SelectCircuit from "./pages/SelectCircuit";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
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
            <Route path="/select-circuit/:documentId" element={<SelectCircuit />} />
          </Route>
          
          {/* Redirect from root to login if needed */}
          <Route path="" element={<Navigate to="/login" replace />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
