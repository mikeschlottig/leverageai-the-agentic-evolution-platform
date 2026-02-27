import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Plus, Filter, MoreVertical, Play, Trash2, ShieldCheck } from 'lucide-react';
import { chatService } from '@/lib/chat';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
export function AgentManagerPage() {
  const queryClient = useQueryClient();
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const { data: sessions, isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const res = await chatService.listSessions();
      if (!res.success) throw new Error(res.error);
      return res.data || [];
    }
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => chatService.deleteSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      toast.success('Agent session decommissioned');
      setSessionToDelete(null);
    },
    onError: () => {
      toast.error('Failed to decommission agent');
      setSessionToDelete(null);
    }
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Agent Manager</h1>
            <p className="text-zinc-500 text-sm">Deploy and orchestrate your autonomous units.</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 uppercase text-xs tracking-widest shadow-emerald-500/20 shadow-lg">
            <Plus className="h-4 w-4" /> Deploy New Agent
          </Button>
        </div>
        <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  placeholder="Search sessions..."
                  className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-300 focus-visible:ring-emerald-500/50"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-zinc-800 text-zinc-400 gap-2 uppercase text-[10px] font-bold">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader className="bg-zinc-900/20">
                <TableRow className="border-zinc-800 hover:bg-transparent text-zinc-500">
                  <TableHead className="font-bold uppercase text-[10px]">Session / Agent</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Status</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Last Pulse</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Created</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Safety</TableHead>
                  <TableHead className="text-right font-bold uppercase text-[10px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-zinc-800">
                      <TableCell><Skeleton className="h-8 w-40 bg-zinc-800/50" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16 bg-zinc-800/50" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24 bg-zinc-800/50" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24 bg-zinc-800/50" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16 bg-zinc-800/50" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-8 w-24 ml-auto bg-zinc-800/50" /></TableCell>
                    </TableRow>
                  ))
                ) : sessions?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-48 text-center text-zinc-600 italic">No active agent sessions found in Durable Objects.</TableCell>
                  </TableRow>
                ) : (
                  sessions?.map((session) => (
                    <TableRow key={session.id} className="border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-zinc-100 truncate max-w-[200px]">{session.title}</span>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">{session.id.slice(0, 8)}...</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="font-bold text-[10px] rounded-full bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Active</Badge>
                      </TableCell>
                      <TableCell className="text-zinc-400 font-mono text-xs">
                        {formatDistanceToNow(session.lastActive)} ago
                      </TableCell>
                      <TableCell className="text-zinc-400 font-mono text-xs">
                        {formatDistanceToNow(session.createdAt)} ago
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 uppercase">
                          <ShieldCheck className="h-3 w-3 text-indigo-400" /> Grade A
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-emerald-400 transition-colors">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-500 hover:text-red-400 transition-colors"
                            onClick={() => setSessionToDelete(session.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-100 transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <AlertDialog open={!!sessionToDelete} onOpenChange={() => setSessionToDelete(null)}>
          <AlertDialogContent className="bg-zinc-950 border-zinc-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-zinc-100 uppercase tracking-tighter italic">Confirm Decommission</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-500">
                This action will permanently terminate the agent's Durable Object state. This process is irreversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800">Abort</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-500 text-white font-bold"
                onClick={() => sessionToDelete && deleteMutation.mutate(sessionToDelete)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Terminating..." : "Terminate Unit"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}