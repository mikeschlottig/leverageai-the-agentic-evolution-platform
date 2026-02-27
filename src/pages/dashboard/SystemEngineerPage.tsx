import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Code2, Play, Save, Shield, Terminal, Wrench, Sparkles, AlertTriangle } from 'lucide-react';
export function SystemEngineerPage() {
  const [isDryRunning, setIsDryRunning] = useState(false);
  const handleDryRun = () => {
    setIsDryRunning(true);
    setTimeout(() => setIsDryRunning(false), 2000);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Agentic Engineer</h1>
            <p className="text-zinc-500 text-sm">Blueprint and configure system-level agent autonomous behaviors.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-zinc-800 text-zinc-400 font-bold uppercase text-xs tracking-widest" onClick={handleDryRun}>
              {isDryRunning ? <div className="h-3 w-3 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              Dry Run
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs tracking-widest">
              <Save className="h-4 w-4 mr-2" /> Save System
            </Button>
          </div>
        </div>
        <Tabs defaultValue="blueprint" className="space-y-6">
          <TabsList className="bg-zinc-900 border border-zinc-800 p-1">
            <TabsTrigger value="blueprint" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white px-6">Blueprint Canvas</TabsTrigger>
            <TabsTrigger value="safety" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white px-6">Safety Protocols</TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white px-6">Active Deployments</TabsTrigger>
          </TabsList>
          <TabsContent value="blueprint" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1: Persona */}
              <Card className="bg-zinc-900/40 border-zinc-800 flex flex-col h-fit">
                <CardHeader className="border-b border-zinc-900 pb-3">
                  <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-indigo-400" /> Persona Definition
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 uppercase font-bold">System Name</label>
                    <Input placeholder="Evolution-Alpha" className="bg-zinc-950 border-zinc-800 text-zinc-100 text-xs h-8" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 uppercase font-bold">Base Directives</label>
                    <Textarea placeholder="Act as a high-level system architect..." className="bg-zinc-950 border-zinc-800 text-zinc-100 text-xs min-h-[200px]" />
                  </div>
                </CardContent>
              </Card>
              {/* Column 2: Tools */}
              <Card className="bg-zinc-900/40 border-zinc-800 flex flex-col h-fit lg:col-span-2">
                <CardHeader className="border-b border-zinc-900 pb-3">
                  <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Wrench className="h-3 w-3 text-emerald-400" /> Toolset Binding (MCP)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['D1_DATABASE_TOOL', 'R2_STORAGE_CLIENT', 'HTTP_EDGE_CLIENT', 'VECTOR_INDEX_SEARCH'].map(tool => (
                      <div key={tool} className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-950 group hover:border-zinc-700 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                            <Code2 className="h-4 w-4 text-zinc-500" />
                          </div>
                          <div>
                            <p className="text-xs font-mono text-zinc-300">{tool}</p>
                            <p className="text-[9px] text-zinc-500">SYSTEM_BUILT_IN</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[9px] text-emerald-500 border-emerald-500/20 bg-emerald-500/5">Active</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full border-dashed border-zinc-800 text-zinc-500 text-[10px] uppercase font-bold tracking-widest hover:bg-zinc-900">
                    Bind Additional MCP Server
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="safety">
            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Shield className="h-4 w-4 text-indigo-400" /> Safety Constraint Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-800 rounded-xl space-y-4 text-center">
                  <AlertTriangle className="h-10 w-10 text-amber-500/50" />
                  <div className="space-y-1">
                    <p className="text-zinc-100 font-bold">No Policy Loaded</p>
                    <p className="text-zinc-500 text-xs">Load a safety protocol template to begin securing your agents.</p>
                  </div>
                  <Button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs">Import Guardrail</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}