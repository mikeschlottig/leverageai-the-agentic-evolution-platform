import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { LandingPage } from '@/pages/LandingPage'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { OverviewPage } from '@/pages/dashboard/OverviewPage'
import { AgentManagerPage } from '@/pages/dashboard/AgentManagerPage'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/app",
    element: <DashboardLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "", element: <Navigate to="overview" replace /> },
      { path: "overview", element: <OverviewPage /> },
      { path: "agents", element: <AgentManagerPage /> },
      { path: "*", element: <div className="p-8 text-zinc-500 font-mono text-xs">Module under construction in Phase 2...</div> },
    ]
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)