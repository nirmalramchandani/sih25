import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import DietPlanPage from "./pages/DietPlan";
import Tracking from "./pages/Tracking";
import Recipes from "./pages/Recipes";
import Scan from "./pages/Scan";
import { AppLayout } from "./components/app/Layout";
import { AppStateProvider, useAppState } from "@/context/app-state";

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
      <Route path="/diet-plan" element={<DietPlanPage />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/doctor" element={<DoctorDashboard />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <AppStateProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppStateProvider>
  </TooltipProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
