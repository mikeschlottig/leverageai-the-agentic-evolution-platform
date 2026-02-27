import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Github, Slack, Globe, Search, Code, Cloud, Terminal, Check, Power } from 'lucide-react';
import { toast } from 'sonner';
const toolCatalog = [
  { id: 'git', name: 'GitHub Integration', desc: 'Manage repositories, PRs and issues via Agent', icon: Github, color: 'text-white' },
  { id: 'slack', name: 'Slack Connector', desc: 'Enable agents to post updates and respond in channels', icon: Slack, color: 'text-pink-500' },
  { id: 'web', name: 'Web Browser', desc: 'Real-time web browsing and content extraction', icon: Globe, color: 'text-emerald-400' },
  { id: 'math', name: 'Wolfram Alpha', desc: 'Computational knowledge engine for complex logic', icon: Code, color: 'text-red-500' },
  { id: 'cf', name: 'Cloudflare Workers', desc: 'Directly deploy and scale edge functions', icon: Cloud, color: 'text-orange-400' },
  { id: 'cli', name: 'System Terminal', desc: 'Execute low-level CLI commands in sandbox', icon: Terminal, color: 'text-indigo-400' },
];
export function ToolShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [connectedTools, setConnectedTools] = useState<Set<string>>(new Set(['web', 'cf']));
  const filteredTools = toolCatalog.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const toggleTool = (id: string, name: string) => {
    const next = new Set(connectedTools);
    if (next.has(id)) {
      next.delete(id);
      toast.info(`Capability disconnected: ${name}`);
    } else {
      next.add(id);
      toast.success(`Capability bound to fleet: ${name}`);
    }
    setConnectedTools(next);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Tool Shop</h1>
            <p className="text-zinc-500 text-sm">Discover and bind MCP-compliant capabilities to your agents.</p>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-80">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search capabilities..."
                className="pl-10 bg-zinc-950 border-zinc-800 focus-visible:ring-emerald-500/50 transition-all text-xs"
              />
            </div>
            <div className="flex justify-between px-1">
              <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">{filteredTools.length} results found</span>
              <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">{connectedTools.size} bound</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const isConnected = connectedTools.has(tool.id);
            return (
              <Card key={tool.id} className={cn(
                "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-all group overflow-hidden flex flex-col",
                isConnected && "border-emerald-500/30 ring-1 ring-emerald-500/10"
              )}>
                <CardHeader className="pb-3 border-b border-zinc-800/50">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <tool.icon className={`h-5 w-5 ${tool.color}`} />
                    </div>
                    {isConnected ? (
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-bold uppercase">Bound</Badge>
                    ) : (
                      <Badge variant="outline" className="text-[9px] uppercase tracking-widest text-zinc-500">Available</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6 flex-1 space-y-2">
                  <CardTitle className="text-base font-bold text-zinc-100">{tool.name}</CardTitle>
                  <p className="text-xs text-zinc-500 leading-relaxed">{tool.desc}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    onClick={() => toggleTool(tool.id, tool.name)}
                    className={cn(
                      "w-full text-[10px] uppercase font-bold tracking-widest transition-all",
                      isConnected 
                        ? "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20" 
                        : "bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white"
                    )}
                  >
                    {isConnected ? (
                      <><Power className="h-3 w-3 mr-2" /> Disconnect</>
                    ) : (
                      <><Check className="h-3 w-3 mr-2" /> Connect Capability</>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
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