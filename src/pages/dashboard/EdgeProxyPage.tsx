import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Globe, ArrowRight, ShieldAlert, Activity, Plus, MoreHorizontal } from 'lucide-react';
const rules = [
  { source: '/api/v1/*', target: 'worker-primary-api', status: 'Active', latency: '12ms' },
  { source: '/auth/*', target: 'worker-auth-shield', status: 'Active', latency: '8ms' },
  { source: '/cdn/assets/*', target: 'r2-bucket-proxy', status: 'Bypass', latency: '4ms' },
  { source: '/beta/*', target: 'worker-canary-node', status: 'Active', latency: '22ms' },
];
export function EdgeProxyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Edge Proxy</h1>
            <p className="text-zinc-500 text-sm">Global request orchestration and traffic filtering.</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase text-xs tracking-widest gap-2">
            <Plus className="h-4 w-4" /> New Proxy Rule
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Active Routing Rules</h3>
            <Card className="bg-zinc-900/40 border-zinc-800">
              <Table>
                <TableHeader className="bg-zinc-900/20">
                  <TableRow className="border-zinc-800">
                    <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Source Path</TableHead>
                    <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Target Destination</TableHead>
                    <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Status</TableHead>
                    <TableHead className="text-right text-zinc-500 font-bold uppercase text-[10px]">Overhead</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule, i) => (
                    <TableRow key={i} className="border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
                      <TableCell className="font-mono text-xs text-zinc-300">{rule.source}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-indigo-500" />
                          <span className="text-xs font-bold text-zinc-200">{rule.target}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={rule.status === 'Active' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 'text-zinc-500 border-zinc-700'}>
                          {rule.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-[10px] font-mono text-zinc-500">{rule.latency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-zinc-950 border-zinc-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-100 uppercase tracking-tighter">Load Balancer</p>
                    <p className="text-[10px] text-zinc-500">Auto-scaling enabled</p>
                  </div>
                </div>
                <Badge className="bg-zinc-800 text-zinc-400">99.9% Uptime</Badge>
              </Card>
              <Card className="bg-zinc-950 border-zinc-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-100 uppercase tracking-tighter">Throughput</p>
                    <p className="text-[10px] text-zinc-500">4.2k req/sec avg</p>
                  </div>
                </div>
                <Badge className="bg-zinc-800 text-zinc-400">Standard</Badge>
              </Card>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">WAF Activity Feed</h3>
            <Card className="bg-zinc-900/40 border-zinc-800 h-[500px] flex flex-col overflow-hidden">
              <CardHeader className="border-b border-zinc-800 pb-3">
                <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <ShieldAlert className="h-3 w-3 text-red-500" /> Live Threat Mitigation
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-y-auto">
                <div className="divide-y divide-zinc-800">
                  {[
                    { event: 'SQL_INJECTION', ip: '192.168.1.1', time: '2m ago', action: 'BLOCKED' },
                    { event: 'BRUTE_FORCE', ip: '45.12.33.2', time: '12m ago', action: 'CHALLENGED' },
                    { event: 'GEO_BLOCK', ip: '210.12.9.8', time: '45m ago', action: 'BLOCKED' },
                    { event: 'DDOS_FLOOD', ip: 'Multiple', time: '1h ago', action: 'THROTTLED' },
                  ].map((threat, i) => (
                    <div key={i} className="p-4 space-y-1 hover:bg-zinc-900/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-300 font-bold">{threat.event}</span>
                        <Badge variant="outline" className="text-[9px] text-red-500 border-red-500/20">{threat.action}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-zinc-600 font-mono">
                        <span>Source: {threat.ip}</span>
                        <span>{threat.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}