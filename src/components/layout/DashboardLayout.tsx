import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { CopilotPanel } from '@/components/CopilotPanel';
import { ThemeToggle } from '@/components/ThemeToggle';
export default function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-zinc-950 text-zinc-50 overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-zinc-950 border-l border-zinc-900">
          <header className="h-14 border-b border-zinc-900 flex items-center justify-between px-6 shrink-0 bg-zinc-950/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-medium text-zinc-400">Mission Control / <span className="text-zinc-100 uppercase tracking-wider font-bold">Evolution</span></h2>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle className="static" />
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-500" />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative">
            <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />
            <Outlet />
          </main>
        </SidebarInset>
        <CopilotPanel />
      </div>
    </SidebarProvider>
  );
}