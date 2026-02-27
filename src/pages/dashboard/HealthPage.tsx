import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Globe, Server, CheckCircle2, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
const performanceData = [
  { time: '10:00', latency: 45, throughput: 1200 },
  { time: '11:00', latency: 42, throughput: 1350 },
  { time: '12:00', latency: 58, throughput: 1800 },
  { time: '13:00', latency: 48, throughput: 1600 },
  { time: '14:00', latency: 44, throughput: 1400 },
  { time: '15:00', latency: 40, throughput: 1550 },
  { time: '16:00', latency: 38, throughput: 1700 },
];
const regions = [
  { name: 'US-East (N. Virginia)', status: 'Healthy', uptime: '99.99%', load: '24%' },
  { name: 'EU-West (London)', status: 'Healthy', uptime: '99.98%', load: '31%' },
  { name: 'Asia-North (Tokyo)', status: 'Degraded', uptime: '98.50%', load: '88%' },
];
export function HealthPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">System Health</h1>
          <p className="text-zinc-500 text-sm">Platform stability and edge performance telemetry.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-zinc-900/40 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" /> Global Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
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
                  <Area type="monotone" dataKey="latency" name="Latency (ms)" stroke="#6366f1" fillOpacity={1} fill="url(#colorLatency)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Regional Status</h3>
            <div className="space-y-4">
              {regions.map((region) => (
                <Card key={region.name} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${region.status === 'Healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
                      <div>
                        <p className="text-xs font-bold text-zinc-200">{region.name}</p>
                        <p className="text-[10px] text-zinc-500 uppercase font-mono">Uptime: {region.uptime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-zinc-500 uppercase">Load</p>
                      <p className="text-xs font-mono text-zinc-100">{region.load}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-indigo-500/5 border-indigo-500/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Globe className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="text-xs font-bold text-indigo-100">Global Coverage</p>
                  <p className="text-[10px] text-indigo-400/80">324 Edge PoPs Active</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}