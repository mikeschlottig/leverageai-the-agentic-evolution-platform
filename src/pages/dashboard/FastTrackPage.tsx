import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Zap, Timer, Trash2, ArrowUpRight, BarChart3, CloudLightning } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
const latencyData = [
  { name: 'Start', standard: 180, optimized: 180 },
  { name: 'DNS', standard: 240, optimized: 120 },
  { name: 'TCP', standard: 450, optimized: 210 },
  { name: 'TLS', standard: 680, optimized: 320 },
  { name: 'TTFB', standard: 920, optimized: 410 },
];
export function FastTrackPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Fast Track</h1>
          <p className="text-zinc-500 text-sm">Extreme edge acceleration and caching strategies.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader className="border-b border-zinc-800 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-emerald-500" /> Latency Comparison
                </CardTitle>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-3 bg-zinc-700" />
                    <span className="text-[10px] text-zinc-500 uppercase font-bold">Standard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-3 bg-emerald-500" />
                    <span className="text-[10px] text-emerald-500 uppercase font-bold">Optimized</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[300px] pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={latencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                    <XAxis dataKey="name" stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} label={{ value: 'ms', angle: -90, position: 'insideLeft', style: { fill: '#52525b', fontSize: 10 } }} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="standard" stroke="#3f3f46" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="optimized" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-zinc-950 border-zinc-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-zinc-100">Tiered Caching</p>
                    <p className="text-[10px] text-zinc-500">Utilize internal Argo network topology.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-zinc-100">Smart Routing</p>
                    <p className="text-[10px] text-zinc-500">Bypass congestion with real-time analytics.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </Card>
              <Card className="bg-zinc-950 border-zinc-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-zinc-100">0-RTT Resumption</p>
                    <p className="text-[10px] text-zinc-500">Eliminate round-trips for repeat users.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-zinc-100">Early Hints</p>
                    <p className="text-[10px] text-zinc-500">Server push assets during thinking phase.</p>
                  </div>
                  <Switch />
                </div>
              </Card>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Instant Actions</h3>
            <Card className="bg-red-500/5 border-red-500/20 p-6 space-y-6">
              <div className="space-y-2 text-center">
                <Trash2 className="h-8 w-8 text-red-500 mx-auto opacity-50" />
                <h4 className="text-xs font-bold text-red-200 uppercase tracking-widest">Global Cache Purge</h4>
                <p className="text-[10px] text-zinc-500 leading-relaxed">Instantly invalidate all edge cached content across all 324 global PoPs.</p>
              </div>
              <Button className="w-full bg-red-600/20 hover:bg-red-600 border border-red-500/50 text-red-100 font-bold uppercase text-[10px] tracking-widest transition-all">
                Execute Purge
              </Button>
            </Card>
            <Card className="bg-zinc-950 border-zinc-800 p-6 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400">
                <Timer className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Optimization Score</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-white italic tracking-tighter leading-none">98</span>
                <span className="text-xs text-emerald-500 font-bold mb-1">Excellent</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full w-[98%] bg-gradient-to-r from-indigo-500 to-emerald-500" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}