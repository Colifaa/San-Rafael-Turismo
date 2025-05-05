
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

// Páginas
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AlojamientosPage from "./pages/AlojamientosPage";
import ActividadesPage from "./pages/ActividadesPage";
import DetalleAlojamiento from "./pages/DetalleAlojamiento";
import DetalleActividad from "./pages/DetalleActividad";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/alojamientos" element={<AlojamientosPage />} />
            <Route path="/alojamientos/:id" element={<DetalleAlojamiento />} />
            <Route path="/actividades" element={<ActividadesPage />} />
            <Route path="/actividades/:id" element={<DetalleActividad />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
