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
import { WorkerManagerPage } from '@/pages/dashboard/WorkerManagerPage'
import { SystemEngineerPage } from '@/pages/dashboard/SystemEngineerPage'
import { SchemaBuilderPage } from '@/pages/dashboard/SchemaBuilderPage'
import { KnowledgeLibraryPage } from '@/pages/dashboard/KnowledgeLibraryPage'
import { HealthPage } from '@/pages/dashboard/HealthPage'
import { ToolShopPage } from '@/pages/dashboard/ToolShopPage'
import { StoragePage } from '@/pages/dashboard/StoragePage'
import { SafetyPage } from '@/pages/dashboard/SafetyPage'
import { TerminalPage } from '@/pages/dashboard/TerminalPage'
import { SettingsPage } from '@/pages/dashboard/SettingsPage'
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
      { path: "health", element: <HealthPage /> },
      { path: "workers", element: <WorkerManagerPage /> },
      { path: "systems", element: <SystemEngineerPage /> },
      { path: "database", element: <SchemaBuilderPage /> },
      { path: "storage", element: <StoragePage /> },
      { path: "library", element: <KnowledgeLibraryPage /> },
      { path: "tools", element: <ToolShopPage /> },
      { path: "safety", element: <SafetyPage /> },
      { path: "terminal", element: <TerminalPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "*", element: <div className="p-8 text-zinc-500 font-mono text-xs">Module under construction in Phase 4...</div> },
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