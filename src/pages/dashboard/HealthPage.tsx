import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Globe, Server, CheckCircle2, AlertCircle, Zap, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
const performanceData = [
  { time: '10:00', latency: 45, p99: 82, throughput: 1200 },
  { time: '11:00', latency: 42, p99: 78, throughput: 1350 },
  { time: '12:00', latency: 58, p99: 110, throughput: 1800 },
  { time: '13:00', latency: 48, p99: 94, throughput: 1600 },
  { time: '14:00', latency: 44, p99: 86, throughput: 1400 },
  { time: '15:00', latency: 40, p99: 72, throughput: 1550 },
  { time: '16:00', latency: 38, p99: 68, throughput: 1700 },
];
const regions = [
  { name: 'US-East (N. Virginia)', status: 'Healthy', uptime: '99.99%', load: '24%', workers: 12, peak: '1.2k' },
  { name: 'EU-West (London)', status: 'Healthy', uptime: '99.98%', load: '31%', workers: 8, peak: '840' },
  { name: 'Asia-North (Tokyo)', status: 'Degraded', uptime: '98.50%', load: '88%', workers: 42, peak: '5.6k' },
];
export function HealthPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic flex items-center gap-3">
              System Health 
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] py-0 px-2 flex items-center gap-1.5">
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
              {regions.map((region) => (
                <Card key={region.name} className="bg-zinc-900/50 border-zinc-800 group hover:border-zinc-700 transition-colors">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${region.status === 'Healthy' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
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
              ))}
            </div>
            <Card className="bg-indigo-500/5 border-indigo-500/20 p-4 flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10 flex items-center gap-3">
                <Globe className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="text-xs font-bold text-indigo-100 uppercase tracking-tighter">Argo Routing</p>
                  <p className="text-[10px] text-indigo-400/80">324 Active PoPs</p>
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