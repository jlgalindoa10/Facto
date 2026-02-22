import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import B2CLayout from "./layouts/B2CLayout";
import B2BLayout from "./layouts/B2BLayout";
import B2CHome from "./pages/b2c/B2CHome";
import B2CInvoices from "./pages/b2c/B2CInvoices";
import B2CInsights from "./pages/b2c/B2CInsights";
import B2CProfile from "./pages/b2c/B2CProfile";
import B2BDashboard from "./pages/b2b/B2BDashboard";
import B2BTransactions from "./pages/b2b/B2BTransactions";
import B2BCustomers from "./pages/b2b/B2BCustomers";
import B2BAnalytics from "./pages/b2b/B2BAnalytics";
import B2BInvoicing from "./pages/b2b/B2BInvoicing";
import B2BSettings from "./pages/b2b/B2BSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* B2C Routes */}
          <Route path="/app" element={<B2CLayout><B2CHome /></B2CLayout>} />
          <Route path="/app/invoices" element={<B2CLayout><B2CInvoices /></B2CLayout>} />
          <Route path="/app/insights" element={<B2CLayout><B2CInsights /></B2CLayout>} />
          <Route path="/app/profile" element={<B2CLayout><B2CProfile /></B2CLayout>} />
          {/* B2B Routes */}
          <Route path="/business" element={<B2BLayout><B2BDashboard /></B2BLayout>} />
          <Route path="/business/transactions" element={<B2BLayout><B2BTransactions /></B2BLayout>} />
          <Route path="/business/customers" element={<B2BLayout><B2BCustomers /></B2BLayout>} />
          <Route path="/business/analytics" element={<B2BLayout><B2BAnalytics /></B2BLayout>} />
          <Route path="/business/invoicing" element={<B2BLayout><B2BInvoicing /></B2BLayout>} />
          <Route path="/business/settings" element={<B2BLayout><B2BSettings /></B2BLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
