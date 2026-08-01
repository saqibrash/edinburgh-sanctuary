import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteLayout from "@/components/SiteLayout";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import SwedishMassage from "./pages/SwedishMassage.tsx";
import BespokeMassage from "./pages/BespokeMassage.tsx";
import FootRitual from "./pages/FootRitual.tsx";
import ScalpMassage from "./pages/ScalpMassage.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsAndConditions from "./pages/TermsAndConditions.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>

      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SiteLayout><Index /></SiteLayout>} />
            <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
            <Route path="/swedish-massage" element={<SiteLayout><SwedishMassage /></SiteLayout>} />
            <Route path="/bespoke-massage" element={<SiteLayout><BespokeMassage /></SiteLayout>} />
            <Route path="/foot-ritual" element={<SiteLayout><FootRitual /></SiteLayout>} />
            <Route path="/rebalancing-scalp-massage" element={<SiteLayout><ScalpMassage /></SiteLayout>} />
            <Route path="/indian-head-massage" element={<Navigate to="/rebalancing-scalp-massage" replace />} />
            <Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
  </QueryClientProvider>

);

export default App;
