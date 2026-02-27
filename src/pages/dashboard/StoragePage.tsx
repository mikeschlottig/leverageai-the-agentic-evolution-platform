import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Layers, Database, HardDrive, Plus, PieChart, Info } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
const buckets = [
  { name: 'agent-memories', size: '1.2 TB', objects: '45.2M', access: 'Private', cors: 'Enabled' },
  { name: 'training-datasets', size: '840 GB', objects: '12.1M', access: 'Restricted', cors: 'Disabled' },
  { name: 'system-backups', size: '4.2 TB', objects: '1.2k', access: 'Private', cors: 'Disabled' },
  { name: 'public-assets', size: '120 GB', objects: '56k', access: 'Public', cors: 'Enabled' },
];
const storageDistribution = [
  { name: 'Embeddings', value: 40, color: '#6366f1' },
  { name: 'Logs', value: 30, color: '#10b981' },
  { name: 'Media', value: 20, color: '#8b5cf6' },
  { name: 'Other', value: 10, color: '#3f3f46' },
];
export function StoragePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">R2 Data Lakes</h1>
            <p className="text-zinc-500 text-sm">Orchestrate unstructured object storage at the edge.</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase text-xs tracking-widest">
            <Plus className="h-4 w-4 mr-2" /> Create Bucket
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Bucket Explorer</h3>
            <Card className="bg-zinc-900/40 border-zinc-800">
              <Table>
                <TableHeader className="bg-zinc-900/20">
                  <TableRow className="border-zinc-800">
                    <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Bucket Name</TableHead>
                    <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Size</TableHead>
                    <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Objects</TableHead>
                    <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Access</TableHead>
                    <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">CORS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buckets.map((bucket) => (
                    <TableRow key={bucket.name} className="border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                      <TableCell className="font-bold text-zinc-100">
                        <div className="flex items-center gap-2">
                          <Layers className="h-3 w-3 text-indigo-400" />
                          {bucket.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-zinc-400 font-mono text-xs">{bucket.size}</TableCell>
                      <TableCell className="text-zinc-400 font-mono text-xs">{bucket.objects}</TableCell>
                      <TableCell className="text-zinc-500 text-xs">{bucket.access}</TableCell>
                      <TableCell className="text-zinc-500 text-xs">{bucket.cors}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Distribution</h3>
            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader className="pb-0">
                <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <PieChart className="h-3 w-3 text-emerald-400" /> Content Type
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={storageDistribution}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {storageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a' }}
                      itemStyle={{ fontSize: '10px' }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {storageDistribution.map(item => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[9px] text-zinc-500 uppercase font-bold">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-950 border-zinc-800 p-4 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <Info className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">R2 Advice</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Bucket 'agent-memories' has increased in size by 24% this week. Consider enabling lifecycle rules to archive objects older than 30 days.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}