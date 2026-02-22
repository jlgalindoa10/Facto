import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from 'react';
import PageLoader from './components/PageLoader';

// Lazy load Pages & Layouts
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const B2CLayout = React.lazy(() => import('./layouts/B2CLayout'));
const B2BLayout = React.lazy(() => import('./layouts/B2BLayout'));
const B2CHome = React.lazy(() => import('./pages/b2c/B2CHome'));
const B2CInvoices = React.lazy(() => import('./pages/b2c/B2CInvoices'));
const B2CInsights = React.lazy(() => import('./pages/b2c/B2CInsights'));
const B2CProfile = React.lazy(() => import('./pages/b2c/B2CProfile'));
const B2BDashboard = React.lazy(() => import('./pages/b2b/B2BDashboard'));
const B2BTransactions = React.lazy(() => import('./pages/b2b/B2BTransactions'));
const B2BCustomers = React.lazy(() => import('./pages/b2b/B2BCustomers'));
const B2BAnalytics = React.lazy(() => import('./pages/b2b/B2BAnalytics'));
const B2BInvoicing = React.lazy(() => import('./pages/b2b/B2BInvoicing'));
const B2BSettings = React.lazy(() => import('./pages/b2b/B2BSettings'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </BrowserRouter >
    </TooltipProvider >
  </QueryClientProvider >
);

export default App;
