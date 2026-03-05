import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import Monitoring from "./pages/Monitoring";
import Upload from "./pages/Upload";
import Violations from "./pages/Violations";
import Alerts from "./pages/Alerts";
import Admin from "./pages/Admin";
import Showcase from "./pages/Showcase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/violations" element={<Violations />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/showcase" element={<Showcase />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
