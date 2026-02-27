import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Code2, Play, Save, Shield, Terminal, Wrench, Sparkles, AlertTriangle, ArrowRight, Plus, Box, Zap } from 'lucide-react';
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
            <p className="text-zinc-500 text-sm">Visual orchestration of autonomous system logic.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-zinc-800 text-zinc-400 font-bold uppercase text-xs tracking-widest" onClick={handleDryRun}>
              {isDryRunning ? <div className="h-3 w-3 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              Dry Run
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs tracking-widest">
              <Save className="h-4 w-4 mr-2" /> Deploy Logic
            </Button>
          </div>
        </div>
        <Tabs defaultValue="blueprint" className="space-y-6">
          <TabsList className="bg-zinc-900 border border-zinc-800 p-1">
            <TabsTrigger value="blueprint" className="px-6">Visual Blueprint</TabsTrigger>
            <TabsTrigger value="code" className="px-6">JSON Manifest</TabsTrigger>
            <TabsTrigger value="safety" className="px-6">Safety Guardrails</TabsTrigger>
          </TabsList>
          <TabsContent value="blueprint" className="space-y-6">
            <Card className="bg-zinc-950 border-zinc-900 relative overflow-hidden h-[600px] bg-grid-pattern">
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Button size="sm" variant="outline" className="bg-zinc-950 border-zinc-800 text-[10px] font-bold uppercase">
                  <Box className="h-3 w-3 mr-2" /> Templates
                </Button>
                <Button size="sm" variant="outline" className="bg-zinc-950 border-zinc-800 text-[10px] font-bold uppercase">
                  <Zap className="h-3 w-3 mr-2" /> Auto-Layout
                </Button>
              </div>
              <div className="p-12 flex flex-col md:flex-row items-center justify-center gap-12 h-full">
                {/* Trigger Node */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <Card className="relative bg-zinc-900 border-zinc-800 w-48 shadow-2xl">
                    <CardHeader className="p-3 border-b border-zinc-800 bg-indigo-500/5">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Trigger</p>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-xs font-bold text-zinc-100">HTTP_REQUEST</p>
                      <p className="text-[9px] text-zinc-500 mt-1 font-mono">POST /api/evolution</p>
                    </CardContent>
                  </Card>
                  <div className="absolute top-1/2 -right-6 -translate-y-1/2">
                    <ArrowRight className="h-5 w-5 text-zinc-700" />
                  </div>
                </div>
                {/* Logic Node */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <Card className="relative bg-zinc-900 border-zinc-800 w-56 shadow-2xl">
                    <CardHeader className="p-3 border-b border-zinc-800 bg-emerald-500/5">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Logic: Evolution_Core</p>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-zinc-500">Model</span>
                        <span className="text-zinc-300 font-mono">gemini-2.5</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-zinc-500">Memory</span>
                        <Badge variant="outline" className="text-[8px] py-0 border-zinc-700">Durable</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="absolute top-1/3 -right-6">
                    <ArrowRight className="h-4 w-4 text-zinc-700" />
                  </div>
                  <div className="absolute bottom-1/3 -right-6">
                    <ArrowRight className="h-4 w-4 text-zinc-700" />
                  </div>
                </div>
                {/* Output Nodes Stack */}
                <div className="flex flex-col gap-4">
                  <Card className="bg-zinc-900 border-zinc-800 w-48 opacity-60 hover:opacity-100 transition-opacity">
                    <CardHeader className="p-2 border-b border-zinc-800">
                      <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Output 1</p>
                    </CardHeader>
                    <CardContent className="p-3 text-[10px] text-zinc-400 font-mono">R2_DATA_LAKE</CardContent>
                  </Card>
                  <Card className="bg-zinc-900 border-zinc-800 w-48 border-dashed flex flex-col items-center justify-center h-20 hover:bg-zinc-900/50 cursor-pointer">
                    <Plus className="h-4 w-4 text-zinc-600" />
                    <span className="text-[9px] uppercase font-bold text-zinc-600 mt-1">Add Branch</span>
                  </Card>
                </div>
              </div>
              {/* Action Toolbar */}
              <div className="absolute bottom-4 left-4 bg-zinc-900/80 border border-zinc-800 p-2 rounded-lg flex gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white"><Terminal className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white"><Code2 className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white"><Wrench className="h-4 w-4" /></Button>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="safety">
            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Shield className="h-4 w-4 text-indigo-400" /> Policy Configuration
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