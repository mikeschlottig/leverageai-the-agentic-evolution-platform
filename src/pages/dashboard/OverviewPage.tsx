import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Users, Zap, ShieldAlert, ArrowUpRight, Cpu } from 'lucide-react';
import {
  AreaChart,
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
const data = [
  { name: '00:00', val: 400 },
  { name: '04:00', val: 300 },
  { name: '08:00', val: 900 },
  { name: '12:00', val: 1200 },
  { name: '16:00', val: 800 },
  { name: '20:00', val: 1500 },
  { name: '23:59', val: 1100 },
];
const stats = [
  { label: "Active Agents", value: "12", icon: Users, trend: "+2", color: "text-indigo-400" },
  { label: "Requests/min", value: "1.2k", icon: Zap, trend: "+12%", color: "text-emerald-400" },
  { label: "System Load", value: "24%", icon: Cpu, trend: "-4%", color: "text-indigo-400" },
  { label: "Security Alerts", value: "0", icon: ShieldAlert, trend: "Stable", color: "text-emerald-400" },
];
export function OverviewPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Overview</h1>
        <p className="text-zinc-500 text-sm">Real-time status of your autonomous fleet.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm group hover:border-zinc-700 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-zinc-100">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">Growth</span>
                <span className="text-[10px] text-emerald-400 font-mono">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-zinc-900/40 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" /> Evolution Pulse
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="val" stroke="#10b981" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/40 border-zinc-800 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Recent Logs</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-800">
              {[
                { type: "DEPLOY", msg: "Agent 'Delta-01' reloaded", time: "2m ago" },
                { type: "D1", msg: "Schema synchronized: users_v2", time: "12m ago" },
                { type: "R2", msg: "Data lake ingestion complete", time: "45m ago" },
                { type: "AUTH", msg: "Cloudflare Session Token Refresh", time: "1h ago" },
                { type: "MCP", msg: "Registry updated (3 new tools)", time: "2h ago" },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400">{log.type}</div>
                    <p className="text-xs text-zinc-300 truncate max-w-[140px]">{log.msg}</p>
                  </div>
                  <span className="text-[10px] text-zinc-600 font-mono">{log.time}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-zinc-900/20">
              <Button variant="link" className="w-full text-zinc-500 hover:text-emerald-400 text-[10px] uppercase font-bold tracking-widest gap-2">
                View All Logs <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}