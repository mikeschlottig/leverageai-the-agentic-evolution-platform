import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Cpu, Zap, AlertCircle, Play, Settings, History, Activity } from 'lucide-react';
const workers = [
  { name: 'auth-service', status: 'Online', cpu: '0.4ms', requests: '1.2M', errors: '0.01%' },
  { name: 'image-optimizer', status: 'Online', cpu: '12.5ms', requests: '450k', errors: '0.00%' },
  { name: 'api-gateway', status: 'Online', cpu: '1.2ms', requests: '5.8M', errors: '0.05%' },
  { name: 'crawler-bot', status: 'Idle', cpu: '0.0ms', requests: '12k', errors: '1.20%' },
];
export function WorkerManagerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Build Workers</h1>
            <p className="text-zinc-500 text-sm">Edge compute orchestration and deployment logs.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-zinc-800 text-zinc-400 font-bold uppercase text-xs tracking-widest">
              <History className="h-4 w-4 mr-2" /> Rollback
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase text-xs tracking-widest">
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
                        <p className="text-[10px] text-zinc-500 uppercase">Avg CPU</p>
                        <p className="text-xs font-mono text-zinc-300">{worker.cpu}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-zinc-500 uppercase">Requests</p>
                        <p className="text-xs font-mono text-zinc-300">{worker.requests}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-zinc-500 uppercase">Error Rate</p>
                        <p className={`text-xs font-mono ${worker.errors === '0.00%' ? 'text-emerald-400' : 'text-amber-400'}`}>{worker.errors}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-zinc-800/50">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-zinc-500 hover:text-zinc-100">
                        <Play className="h-3.5 w-3.5 mr-1" /> Run
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-zinc-500 hover:text-zinc-100">
                        <Settings className="h-3.5 w-3.5 mr-1" /> Config
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-zinc-500 hover:text-zinc-100">
                        <Activity className="h-3.5 w-3.5 mr-1" /> Stats
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Deployment Stream</h3>
            <Card className="bg-zinc-950 border-zinc-800 flex flex-col h-[500px]">
              <CardHeader className="border-b border-zinc-900 bg-zinc-900/20">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Build Logs: Active</span>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-hidden">
                <ScrollArea className="h-full p-4">
                  <div className="font-mono text-[10px] space-y-2 text-zinc-500">
                    <p className="text-zinc-400">[08:42:01] <span className="text-indigo-400">INFO</span> Initializing build environment...</p>
                    <p>[08:42:03] <span className="text-emerald-400">SUCCESS</span> Environment ready</p>
                    <p>[08:42:05] <span className="text-indigo-400">INFO</span> Fetching dependencies (npm install)</p>
                    <p>[08:42:12] <span className="text-indigo-400">INFO</span> Compiling TypeScript assets</p>
                    <p>[08:42:15] <span className="text-indigo-400">INFO</span> Bundling with esbuild...</p>
                    <p className="text-zinc-300">[08:42:18] WRANGLER: Compressing bundle (2.4MB -> 1.1MB)</p>
                    <p>[08:42:20] <span className="text-emerald-400">SUCCESS</span> Deployment complete (Version 4.12.0)</p>
                    <p className="text-zinc-600">--- END OF STREAM ---</p>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <p key={i} className="opacity-40">[08:40:{i + 10}] Heartbeat ACK from worker-cluster-us-east</p>
                    ))}
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