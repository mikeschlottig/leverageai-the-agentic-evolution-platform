import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, Users, Zap, ShieldAlert, ArrowUpRight, Cpu, Clock } from 'lucide-react';
import { chatService } from '@/lib/chat';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
const initialChartData = [
  { name: '00:00', val: 400 },
  { name: '04:00', val: 300 },
  { name: '08:00', val: 900 },
  { name: '12:00', val: 1200 },
  { name: '16:00', val: 800 },
  { name: '20:00', val: 1500 },
  { name: '23:59', val: 1100 },
];
export function OverviewPage() {
  const navigate = useNavigate();
  const [pulseData, setPulseData] = useState(initialChartData);
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['system-heartbeat'],
    queryFn: async () => {
      const res = await fetch('/api/health/stats');
      const json = await res.json();
      return json.success ? json.data : null;
    },
    refetchInterval: 5000
  });
  const { data: recentSessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ['sessions-recent'],
    queryFn: async () => {
      const res = await chatService.listSessions();
      return res.success ? (res.data?.slice(0, 5) || []) : [];
    }
  });
  // Simulate pulse variations
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseData(current => current.map(item => ({
        ...item,
        val: Math.max(200, item.val + (Math.random() * 100 - 50))
      })));
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  const metricCards = [
    { label: "Active Agents", value: stats?.totalSessions?.toString() || "0", icon: Users, trend: "Synced", color: "text-indigo-400" },
    { label: "Requests/min", value: "1.2k", icon: Zap, trend: "+12%", color: "text-emerald-400" },
    { label: "System Load", value: stats?.systemStatus || "Optimal", icon: Cpu, trend: "Edge", color: "text-indigo-400" },
    { label: "Safety Grade", value: "A+", icon: ShieldAlert, trend: "SECURE", color: "text-emerald-400" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in relative z-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Mission Dashboard</h1>
          <p className="text-zinc-500 text-sm">Synthetic oversight of your evolution protocols.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((stat) => (
            <Card key={stat.label} className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm group hover:border-zinc-700 hover:shadow-glow transition-all duration-300 overflow-hidden relative">
              {statsLoading && <div className="absolute inset-0 bg-zinc-900/50 z-20 animate-pulse" />}
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition-transform`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-zinc-100">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-tighter font-bold">STATUS</span>
                  <span className="text-[10px] text-emerald-400 font-mono uppercase font-bold">{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-zinc-900/40 border-zinc-800">
            <CardHeader className="border-b border-zinc-900/50 pb-4">
              <CardTitle className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" /> Real-time Throughput Pulse
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pulseData}>
                  <defs>
                    <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
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
                  <Area type="monotone" dataKey="val" stroke="#10b981" fillOpacity={1} fill="url(#colorPulse)" strokeWidth={2} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/40 border-zinc-800 overflow-hidden flex flex-col">
            <CardHeader className="border-b border-zinc-900/50 pb-4">
              <CardTitle className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-400" /> Neural Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
              <div className="divide-y divide-zinc-800/50">
                {sessionsLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="p-4 flex gap-4">
                      <Skeleton className="h-4 w-4 bg-zinc-800" />
                      <Skeleton className="h-4 flex-1 bg-zinc-800" />
                    </div>
                  ))
                ) : (recentSessions?.length === 0 ? (
                  <div className="p-8 text-center text-zinc-600 text-[10px] font-bold uppercase italic tracking-widest">No Active Sessions</div>
                ) : (
                  recentSessions?.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 hover:bg-zinc-800/30 transition-colors group cursor-pointer" onClick={() => navigate('/app/agents')}>
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-[9px] font-mono text-indigo-400 font-bold">NODE</div>
                        <p className="text-xs text-zinc-300 truncate group-hover:text-zinc-100 transition-colors">{session.title}</p>
                      </div>
                      <span className="text-[10px] text-zinc-600 font-mono shrink-0 ml-2">
                        {formatDistanceToNow(session.lastActive)}
                      </span>
                    </div>
                  ))
                ))}
              </div>
            </CardContent>
            <div className="p-4 bg-zinc-950/50 border-t border-zinc-900">
              <Button onClick={() => navigate('/app/agents')} variant="link" className="w-full text-zinc-500 hover:text-emerald-400 text-[10px] uppercase font-bold tracking-widest gap-2">
                Launch Fleet Manager <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}