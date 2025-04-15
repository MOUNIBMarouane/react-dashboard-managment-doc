
import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Protected route wrapper
import ProtectedRoute from '@/components/ProtectedRoute';

// Auth pages
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import UpdatePassword from '@/pages/UpdatePassword';

// Lazy loaded pages
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Documents = lazy(() => import('@/pages/Documents'));
const CreateDocument = lazy(() => import('@/pages/CreateDocument'));
const ViewDocument = lazy(() => import('@/pages/ViewDocument'));
const DocumentPage = lazy(() => import('@/pages/DocumentPage'));
const EditDocument = lazy(() => import('@/pages/EditDocument'));
const DocumentLignesPage = lazy(() => import('@/pages/DocumentLignesPage'));
const DocumentFlowPage = lazy(() => import('@/pages/DocumentFlowPage'));
const DocumentTypes = lazy(() => import('@/pages/DocumentTypes'));
const DocumentTypesManagement = lazy(() => import('@/pages/DocumentTypesManagement'));
const Circuits = lazy(() => import('@/pages/Circuits'));
const CreateCircuit = lazy(() => import('@/pages/CreateCircuit'));
const PendingApprovals = lazy(() => import('@/pages/PendingApprovals'));
const Profile = lazy(() => import('@/pages/Profile'));
const Admin = lazy(() => import('@/pages/Admin'));
const UserManagement = lazy(() => import('@/pages/UserManagement'));
const Welcome = lazy(() => import('@/pages/Welcome'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    console.info('Auth context current state:', { isAuthenticated, user, isLoading });
  }, [isAuthenticated, user, isLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-indigo-950">Loading...</div>}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Welcome />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
            <Route path="/update-password" element={isAuthenticated ? <Navigate to="/dashboard" /> : <UpdatePassword />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
            <Route path="/documents/create" element={<ProtectedRoute><CreateDocument /></ProtectedRoute>} />
            <Route path="/documents/:id" element={<ProtectedRoute><ViewDocument /></ProtectedRoute>} />
            <Route path="/document/:id" element={<ProtectedRoute><DocumentPage /></ProtectedRoute>} />
            <Route path="/documents/:id/edit" element={<ProtectedRoute><EditDocument /></ProtectedRoute>} />
            <Route path="/documents/:id/lignes" element={<ProtectedRoute><DocumentLignesPage /></ProtectedRoute>} />
            <Route path="/documents/:id/flow" element={<ProtectedRoute><DocumentFlowPage /></ProtectedRoute>} />
            <Route path="/document-types" element={<ProtectedRoute><DocumentTypes /></ProtectedRoute>} />
            <Route path="/document-types-management" element={<ProtectedRoute><DocumentTypesManagement /></ProtectedRoute>} />
            <Route path="/circuits" element={<ProtectedRoute><Circuits /></ProtectedRoute>} />
            <Route path="/circuits/create" element={<ProtectedRoute><CreateCircuit /></ProtectedRoute>} />
            <Route path="/pending-approvals" element={<ProtectedRoute><PendingApprovals /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
