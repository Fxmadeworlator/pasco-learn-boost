import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthWrapper } from "@/components/AuthWrapper";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Dashboard } from "@/pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthWrapper>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              } />
              {/* Placeholder routes - will be built later */}
              <Route path="/past-questions" element={<DashboardLayout><div className="p-6"><h1 className="text-2xl font-bold">Past Questions - Coming Soon!</h1></div></DashboardLayout>} />
              <Route path="/progress" element={<DashboardLayout><div className="p-6"><h1 className="text-2xl font-bold">Progress - Coming Soon!</h1></div></DashboardLayout>} />
              <Route path="/goals" element={<DashboardLayout><div className="p-6"><h1 className="text-2xl font-bold">Goals - Coming Soon!</h1></div></DashboardLayout>} />
              <Route path="/ai-chat" element={<DashboardLayout><div className="p-6"><h1 className="text-2xl font-bold">AI Assistant - Coming Soon!</h1></div></DashboardLayout>} />
              <Route path="/upgrade" element={<DashboardLayout><div className="p-6"><h1 className="text-2xl font-bold">Upgrade Plan - Coming Soon!</h1></div></DashboardLayout>} />
              <Route path="/profile" element={<DashboardLayout><div className="p-6"><h1 className="text-2xl font-bold">Profile - Coming Soon!</h1></div></DashboardLayout>} />
              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AuthWrapper>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
