import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Placeholder from "./pages/Placeholder";
import { AppLayout } from "./components/app/Layout";
import { AppStateProvider, useAppState } from "@/context/app-state";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAppState();
  if (!currentUser) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route
      element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/diet-plan" element={<Placeholder title="Diet Plan" />} />
      <Route path="/tracking" element={<Placeholder title="Tracking & Reminders" />} />
      <Route path="/recipes" element={<Placeholder title="Recipe Generator" />} />
      <Route path="/scan" element={<Placeholder title="Barcode Scanner" />} />
      <Route path="/doctor" element={<DoctorDashboard />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppStateProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppStateProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
