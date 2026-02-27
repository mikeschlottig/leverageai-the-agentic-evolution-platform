import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, Plus, Filter, MoreVertical, Play, Pause, RotateCcw, ShieldCheck } from 'lucide-react';
const mockAgents = [
  { id: "agt-001", name: "Support Sentinel", status: "Active", model: "Gemini 2.5 Flash", load: "12%", safety: "Grade A" },
  { id: "agt-002", name: "Security Watchdog", status: "Active", model: "Gemini 2.5 Pro", load: "45%", safety: "Grade A+" },
  { id: "agt-003", name: "Content Crafter", status: "Idle", model: "GPT-4o", load: "2%", safety: "Grade B" },
  { id: "agt-004", name: "Data Miner", status: "Error", model: "Gemini 2.0 Flash", load: "0%", safety: "N/A" },
  { id: "agt-005", name: "Code Reviewer", status: "Active", model: "Claude 3.5 Sonnet", load: "18%", safety: "Grade A" },
];
export function AgentManagerPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Agent Manager</h1>
          <p className="text-zinc-500 text-sm">Deploy and orchestrate your autonomous units.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2">
          <Plus className="h-4 w-4" /> Deploy New Agent
        </Button>
      </div>
      <Card className="bg-zinc-900/40 border-zinc-800">
        <CardContent className="p-0">
          <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input 
                placeholder="Search agents..." 
                className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-300 focus-visible:ring-emerald-500/50" 
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-zinc-800 text-zinc-400 gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader className="bg-zinc-900/20">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Agent</TableHead>
                <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Status</TableHead>
                <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Backbone</TableHead>
                <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Workload</TableHead>
                <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Safety</TableHead>
                <TableHead className="text-right text-zinc-500 font-bold uppercase text-[10px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAgents.map((agent) => (
                <TableRow key={agent.id} className="border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-zinc-100">{agent.name}</span>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">{agent.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "font-bold text-[10px] rounded-full",
                      agent.status === 'Active' && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                      agent.status === 'Idle' && "bg-zinc-800 text-zinc-400 border-zinc-700",
                      agent.status === 'Error' && "bg-red-500/10 text-red-500 border-red-500/20",
                    )}>
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-400 font-mono text-xs">{agent.model}</TableCell>
                  <TableCell className="text-zinc-400 font-mono text-xs">{agent.load}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-500">
                      <ShieldCheck className="h-3 w-3 text-indigo-400" />
                      {agent.safety}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-emerald-400 transition-colors">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-red-400 transition-colors">
                        <Pause className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-100 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}