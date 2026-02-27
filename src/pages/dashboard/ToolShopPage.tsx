import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Github, Slack, Globe, Search, Code, Cloud, Terminal } from 'lucide-react';
const tools = [
  { name: 'GitHub Integration', desc: 'Manage repositories, PRs and issues via Agent', icon: Github, color: 'text-white' },
  { name: 'Slack Connector', desc: 'Enable agents to post updates and respond in channels', icon: Slack, color: 'text-pink-500' },
  { name: 'Web Browser', desc: 'Real-time web browsing and content extraction', icon: Globe, color: 'text-emerald-400' },
  { name: 'Wolfram Alpha', desc: 'Computational knowledge engine for complex logic', icon: Code, color: 'text-red-500' },
  { name: 'Cloudflare Workers', desc: 'Directly deploy and scale edge functions', icon: Cloud, color: 'text-orange-400' },
  { name: 'System Terminal', desc: 'Execute low-level CLI commands in sandbox', icon: Terminal, color: 'text-indigo-400' },
];
export function ToolShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Tool Shop</h1>
            <p className="text-zinc-500 text-sm">Discover and bind MCP-compliant capabilities to your agents.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input 
              placeholder="Search capabilities..." 
              className="pl-10 bg-zinc-950 border-zinc-800 focus-visible:ring-emerald-500/50 transition-all text-xs"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card key={tool.name} className="bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-all group overflow-hidden flex flex-col">
              <CardHeader className="pb-3 border-b border-zinc-800/50">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <tool.icon className={`h-5 w-5 ${tool.color}`} />
                  </div>
                  <Badge variant="outline" className="text-[9px] uppercase tracking-widest text-zinc-500">Official</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 flex-1 space-y-2">
                <CardTitle className="text-base font-bold text-zinc-100">{tool.name}</CardTitle>
                <p className="text-xs text-zinc-500 leading-relaxed">{tool.desc}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white transition-colors text-[10px] uppercase font-bold tracking-widest">
                  Connect Capability
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="p-12 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
          <ShoppingBag className="h-12 w-12 text-zinc-700" />
          <div>
            <h3 className="text-zinc-300 font-bold">Request a Custom Tool</h3>
            <p className="text-zinc-600 text-xs mt-1">Our engineering team can build custom MCP connectors for your proprietary stack.</p>
          </div>
          <Button variant="outline" className="border-zinc-700 text-zinc-400">Open Request Portal</Button>
        </div>
      </div>
    </div>
  );
}