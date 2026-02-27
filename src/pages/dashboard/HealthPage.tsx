import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, Globe, Server, CheckCircle2, AlertCircle, Zap, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
const performanceData = [
  { time: '10:00', latency: 45, p99: 82 },
  { time: '11:00', latency: 42, p99: 78 },
  { time: '12:00', latency: 58, p99: 110 },
  { time: '13:00', latency: 48, p99: 94 },
  { time: '14:00', latency: 44, p99: 86 },
  { time: '15:00', latency: 40, p99: 72 },
  { time: '16:00', latency: 38, p99: 68 },
];
export function HealthPage() {
  const { data: health, isLoading } = useQuery({
    queryKey: ['health-stats'],
    queryFn: async () => {
      const res = await fetch('/api/health/stats');
      const json = await res.json();
      return json.success ? json.data : null;
    },
    refetchInterval: 10000
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic flex items-center gap-3">
              System Health
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] py-0 px-2 flex items-center gap-1.5 font-bold">
                <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" /> LIVE
              </Badge>
            </h1>
            <p className="text-zinc-500 text-sm">Real-time edge telemetry and platform integrity monitoring.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-zinc-900/40 border-zinc-800 shadow-xl overflow-hidden">
            <CardHeader className="border-b border-zinc-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-500" /> Latency Telemetry (Edge)
                </CardTitle>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">P99</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Avg</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[350px] pt-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorP99" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                  <XAxis dataKey="time" stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="p99" name="P99 Latency" stroke="#6366f1" fillOpacity={1} fill="url(#colorP99)" strokeWidth={2} />
                  <Area type="monotone" dataKey="latency" name="Avg Latency" stroke="#10b981" fillOpacity={1} fill="url(#colorAvg)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Regional Integrity</h3>
            <div className="space-y-4">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full bg-zinc-900/50" />
                ))
              ) : (
                health?.regions.map((region: any) => (
                  <Card key={region.name} className="bg-zinc-900/50 border-zinc-800 group hover:border-zinc-700 transition-colors">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "h-2 w-2 rounded-full",
                            region.status === 'Healthy' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                          )} />
                          <p className="text-xs font-bold text-zinc-200">{region.name}</p>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">{region.status}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/50 pt-3">
                        <div>
                          <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-tighter">Peak TP</p>
                          <div className="flex items-center gap-1 text-xs font-mono text-zinc-300">
                            <Zap className="h-3 w-3 text-amber-500" /> {region.peak}/s
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-tighter">Workers</p>
                          <div className="flex items-center gap-1 text-xs font-mono text-zinc-300">
                            <Users className="h-3 w-3 text-indigo-400" /> {region.workers} node
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            <Card className="bg-indigo-500/5 border-indigo-500/20 p-4 flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10 flex items-center gap-3">
                <Globe className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="text-xs font-bold text-indigo-100 uppercase tracking-tighter">Argo Smart Routing</p>
                  <p className="text-[10px] text-indigo-400/80">324 Active Points of Presence</p>
                </div>
              </div>
              <CheckCircle2 className="h-10 w-10 text-indigo-500/10 absolute -right-2 top-0" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}