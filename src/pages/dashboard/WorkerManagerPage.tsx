import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Cpu, Zap, Play, Settings, History, Activity, CheckCircle2, Circle } from 'lucide-react';
const workers = [
  { name: 'auth-service', status: 'Online', cpu: '0.4ms', requests: '1.2M', errors: '0.01%' },
  { name: 'image-optimizer', status: 'Online', cpu: '12.5ms', requests: '450k', errors: '0.00%' },
  { name: 'api-gateway', status: 'Online', cpu: '1.2ms', requests: '5.8M', errors: '0.05%' },
  { name: 'crawler-bot', status: 'Idle', cpu: '0.0ms', requests: '12k', errors: '1.20%' },
];
const pipelineStages = [
  { name: 'Validation', status: 'complete', time: '0.4s' },
  { name: 'Bundle Optimization', status: 'complete', time: '1.2s' },
  { name: 'Edge Propagation', status: 'active', time: 'In Progress' },
  { name: 'Health Check', status: 'pending', time: 'Waiting' },
];
export function WorkerManagerPage() {
  const [isDeploying, setIsDeploying] = React.useState(false);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Build Workers</h1>
            <p className="text-zinc-500 text-sm">Edge compute orchestration and deployment logs.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-zinc-800 text-zinc-400 font-bold uppercase text-xs tracking-widest" onClick={() => toast('Rollback initiated - checking previous versions')}>
              <History className="h-4 w-4 mr-2" /> Rollback
            </Button>
            <Button disabled={isDeploying} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase text-xs tracking-widest shadow-indigo-500/20 shadow-lg" onClick={() => {
              setIsDeploying(true);
              const deployP = new Promise((res, rej) => {
                setTimeout(() => Math.random() < 0.95 ? res() : rej(new Error()), 4000);
              });
              toast.promise(deployP, {
                loading: 'Deploying all workers...',
                success: 'All workers deployed to global edge PoPs',
                error: 'Deployment pipeline failure - retrying'
              });
              deployP.finally(() => setIsDeploying(false));
            }}>
              <Zap className="h-4 w-4 mr-2" /> Deploy All
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Active Inventory</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workers.map((worker) => (
                <Card key={worker.name} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md group hover:border-indigo-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold text-zinc-100">{worker.name}</CardTitle>
                    <Badge className={worker.status === 'Online' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}>
                      {worker.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Avg CPU</p>
                        <p className="text-xs font-mono text-zinc-300">{worker.cpu}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Requests</p>
                        <p className="text-xs font-mono text-zinc-300">{worker.requests}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Error Rate</p>
                        <p className={`text-xs font-mono ${worker.errors === '0.00%' ? 'text-emerald-400' : 'text-amber-400'}`}>{worker.errors}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-zinc-800/50">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] uppercase font-bold text-zinc-500 hover:text-zinc-100" onClick={() => toast.promise(new Promise((res) => setTimeout(res, 1200)), {
                        loading: `Launching ${worker.name}...`,
                        success: `${worker.name} executed`,
                        error: 'Execution failed'
                      })}>
                        <Play className="h-3.5 w-3.5 mr-1" /> Run
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] uppercase font-bold text-zinc-500 hover:text-zinc-100" onClick={() => toast.info(`${worker.name} configuration panel`)}>
                        <Settings className="h-3.5 w-3.5 mr-1" /> Config
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] uppercase font-bold text-zinc-500 hover:text-zinc-100" onClick={() => toast.info(`${worker.name} analytics loading`)}>
                        <Activity className="h-3.5 w-3.5 mr-1" /> Stats
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Deployment Pipeline</h3>
            <Card className="bg-zinc-900/40 border-zinc-800 p-4 space-y-4">
              <div className="space-y-3">
                {pipelineStages.map((stage, i) => (
                  <div key={stage.name} className="flex items-start gap-3 relative">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "h-5 w-5 rounded-full flex items-center justify-center shrink-0 z-10 border",
                        stage.status === 'complete' ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-500" :
                        stage.status === 'active' ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-400 animate-pulse" :
                        "bg-zinc-900 border-zinc-800 text-zinc-700"
                      )}>
                        {stage.status === 'complete' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5 fill-current" />}
                      </div>
                      {i !== pipelineStages.length - 1 && <div className="w-0.5 h-6 bg-zinc-800 -my-1" />}
                    </div>
                    <div className="flex-1">
                      <p className={cn("text-xs font-bold uppercase tracking-tight", stage.status === 'active' ? "text-indigo-400" : "text-zinc-400")}>{stage.name}</p>
                      <p className="text-[10px] text-zinc-600 font-mono">{stage.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Live Tail</h3>
            <Card className="bg-zinc-950 border-zinc-800 flex flex-col h-[300px]">
              <CardContent className="p-0 flex-1 overflow-hidden">
                <ScrollArea className="h-full p-4">
                  <div className="font-mono text-[10px] space-y-2 text-zinc-500">
                    <p className="text-zinc-400">[08:42:01] <span className="text-indigo-400 font-bold">INFO</span> Init build environment...</p>
                    <p>[08:42:03] <span className="text-emerald-400 font-bold">SUCCESS</span> Environment ready</p>
                    <p>[08:42:05] <span className="text-indigo-400 font-bold">INFO</span> Fetching dependencies...</p>
                    <p>[08:42:15] <span className="text-indigo-400 font-bold">INFO</span> Bundling with esbuild...</p>
                    <p className="text-zinc-300">[08:42:18] WRANGLER: Compressing bundle (2.4MB &rarr; 1.1MB)</p>
                    <p>[08:42:20] <span className="text-emerald-400 font-bold">SUCCESS</span> Deployment version 4.12.0</p>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}