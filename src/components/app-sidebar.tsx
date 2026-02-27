import React from "react";
import { 
  LayoutDashboard, 
  Cpu, 
  Users, 
  Settings, 
  Terminal, 
  Database, 
  Library, 
  ShoppingBag, 
  Activity, 
  Globe, 
  ShieldCheck, 
  Zap,
  Box,
  Code2,
  GitBranch,
  Layers,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
const menuGroups = [
  {
    label: "Core",
    items: [
      { title: "Overview", icon: LayoutDashboard, url: "/app/overview" },
      { title: "Agent Manager", icon: Users, url: "/app/agents" },
      { title: "System Health", icon: Activity, url: "/app/health" },
    ]
  },
  {
    label: "Evolution Engineering",
    items: [
      { title: "Build Workers", icon: Cpu, url: "/app/workers" },
      { title: "Agentic Systems", icon: Code2, url: "/app/systems" },
      { title: "D1 Schemas", icon: Database, url: "/app/database" },
      { title: "R2 Data Lakes", icon: Layers, url: "/app/storage" },
      { title: "Knowledge Library", icon: Library, url: "/app/library" },
    ]
  },
  {
    label: "Network & Security",
    items: [
      { title: "Tool Shop", icon: ShoppingBag, url: "/app/tools" },
      { title: "Edge Proxy", icon: Globe, url: "/app/edge" },
      { title: "Safety Protocol", icon: ShieldCheck, url: "/app/safety" },
      { title: "Fast Track", icon: Zap, url: "/app/fast-track" },
    ]
  },
  {
    label: "Development",
    items: [
      { title: "Terminal", icon: Terminal, url: "/app/terminal" },
      { title: "Packages", icon: Box, url: "/app/packages" },
      { title: "Deployments", icon: GitBranch, url: "/app/deploy" },
      { title: "Settings", icon: Settings, url: "/app/settings" },
    ]
  }
];
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  return (
    <Sidebar collapsible="icon" className="border-r border-zinc-900 bg-zinc-950">
      <SidebarHeader className="h-14 flex items-center justify-start px-4 border-b border-zinc-900">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-7 w-7 rounded bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center font-bold text-white text-xs">
            LA
          </div>
          <span className="font-bold text-zinc-100 tracking-tighter text-lg group-data-[collapsible=icon]:hidden">
            LEVERAGE<span className="text-emerald-400">AI</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="py-4">
        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-zinc-500 text-[10px] uppercase font-bold px-4 mb-2 group-data-[collapsible=icon]:hidden">
              {group.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                    className={cn(
                      "hover:bg-zinc-900 transition-colors",
                      location.pathname === item.url ? "text-emerald-400 bg-zinc-900/50" : "text-zinc-400"
                    )}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-zinc-900 group-data-[collapsible=icon]:hidden">
        <div className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800">
          <p className="text-[10px] text-zinc-500 font-medium">SYSTEM STATUS</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-300">All Agents Active</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}