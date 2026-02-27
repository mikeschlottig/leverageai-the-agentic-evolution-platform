import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code2, Play, Save, Shield, Terminal, Wrench, AlertTriangle, ArrowRight, Plus, Box, Zap } from 'lucide-react';
import { toast } from 'sonner';
export function SystemEngineerPage() {
  const [isDryRunning, setIsDryRunning] = useState(false);
  // Logical state for the system blueprint
  const [blueprint, setBlueprint] = useState({
    trigger: { id: 'HTTP_POST', path: '/api/evolution', type: 'WEBHOOK' },
    logic: { id: 'EVOLUTION_CORE', model: 'gemini-2.5-flash', memory: 'DURABLE_SQLITE' },
    output: [{ id: 'R2_DATA_LAKE', target: 'evolution-bucket' }]
  });
  const manifestJson = useMemo(() => {
    return JSON.stringify({
      version: "1.0.0",
      system_name: "LeverageAI_Evolution",
      architecture: blueprint,
      guardrails: ["PII_REDACTION", "TOXICITY_FILTER"],
      deployment: {
        target: "cloudflare_workers",
        scaling: "auto"
      }
    }, null, 2);
  }, [blueprint]);
  const handleDryRun = () => {
    setIsDryRunning(true);
    const dryRunPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.05) {
          reject(new Error('Simulated validation error in node: EVOLUTION_CORE'));
        } else {
          resolve('success');
        }
      }, 2000);
    });
    toast.promise(dryRunPromise, {
      loading: 'Executing logic validation pass...',
      success: 'Logic simulation verified. Zero conflicts detected.',
      error: 'Logic error detected in node: EVOLUTION_CORE',
    });
    dryRunPromise.finally(() => setIsDryRunning(false));
  };

  const handleDeploy = () => {
    const deployPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.1) {
          reject(new Error('Deployment rejected by safety guardrails'));
        } else {
          resolve('success');
        }
      }, 5000);
    });
    toast.promise(deployPromise, {
      loading: 'Deploying agentic blueprint to production...',
      success: 'Blueprint deployed successfully - live in all regions',
      error: 'Deployment rejected by safety guardrails',
    });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Agentic Engineer</h1>
            <p className="text-zinc-500 text-sm">Visual orchestration and manifest synchronization.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-zinc-800 text-zinc-400 font-bold uppercase text-xs tracking-widest" onClick={handleDryRun}>
              {isDryRunning ? <div className="h-3 w-3 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              Dry Run
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs tracking-widest" onClick={handleDeploy}>
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
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <Card className="relative bg-zinc-900 border-zinc-800 w-48 shadow-2xl">
                    <CardHeader className="p-3 border-b border-zinc-800 bg-indigo-500/5">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Trigger</p>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-xs font-bold text-zinc-100">{blueprint.trigger.id}</p>
                      <p className="text-[9px] text-zinc-500 mt-1 font-mono">{blueprint.trigger.path}</p>
                    </CardContent>
                  </Card>
                  <div className="absolute top-1/2 -right-6 -translate-y-1/2">
                    <ArrowRight className="h-5 w-5 text-zinc-700" />
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <Card className="relative bg-zinc-900 border-zinc-800 w-56 shadow-2xl">
                    <CardHeader className="p-3 border-b border-zinc-800 bg-emerald-500/5">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Logic: {blueprint.logic.id}</p>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-zinc-500 uppercase font-bold tracking-tighter">Model</span>
                        <span className="text-zinc-300 font-mono italic">{blueprint.logic.model}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-zinc-500 uppercase font-bold tracking-tighter">Memory</span>
                        <Badge variant="outline" className="text-[8px] py-0 border-zinc-700 text-indigo-400">{blueprint.logic.memory}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="absolute top-1/2 -right-6 -translate-y-1/2">
                    <ArrowRight className="h-4 w-4 text-zinc-700" />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {blueprint.output.map(out => (
                    <Card key={out.id} className="bg-zinc-900 border-zinc-800 w-48 opacity-90 hover:opacity-100 transition-opacity border-l-4 border-l-emerald-500">
                      <CardHeader className="p-2 border-b border-zinc-800">
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Output Sink</p>
                      </CardHeader>
                      <CardContent className="p-3 text-[10px] text-zinc-300 font-mono font-bold tracking-tighter">{out.id}</CardContent>
                    </Card>
                  ))}
                  <Card className="bg-zinc-900 border-zinc-800 w-48 border-dashed flex flex-col items-center justify-center h-20 hover:bg-zinc-900/50 cursor-pointer transition-colors" onClick={() => toast.info("Branch capability coming in Phase 8")}>
                    <Plus className="h-4 w-4 text-zinc-600" />
                    <span className="text-[9px] uppercase font-bold text-zinc-600 mt-1">Add Branch</span>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="code">
            <Card className="bg-zinc-950 border-zinc-900">
              <CardHeader className="border-b border-zinc-900 py-3 flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-bold text-zinc-400 uppercase tracking-widest">System Manifest</CardTitle>
                  <p className="text-[10px] text-zinc-600">Autogenerated from Visual Blueprint state.</p>
                </div>
                <Button size="sm" variant="ghost" className="h-8 text-zinc-500 hover:text-white" onClick={() => {
                   navigator.clipboard.writeText(manifestJson);
                   toast.success("Manifest copied to clipboard");
                }}>
                  Copy JSON
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <pre className="p-6 font-mono text-xs text-emerald-500/80 leading-relaxed overflow-x-auto">
                  {manifestJson}
                </pre>
              </CardContent>
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
                    <p className="text-zinc-100 font-bold uppercase tracking-tighter italic">No Active Policies</p>
                    <p className="text-zinc-500 text-xs">Security guardrails must be defined to enable deployment to US-EAST-1.</p>
                  </div>
                  <Button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] uppercase font-bold tracking-widest px-8">Import Default Guardrail</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}