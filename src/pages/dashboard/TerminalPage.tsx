import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Terminal as TerminalIcon, ChevronRight, Zap, Database, Cpu, Trash2, Shield } from 'lucide-react';
const mockLogs = [
  { type: 'sys', content: 'LeverageAI Shell v1.0.4 (stable)' },
  { type: 'sys', content: 'Connecting to Cloudflare Edge Network...' },
  { type: 'success', content: 'Connection established. 14 regions online.' },
  { type: 'info', content: 'Durable Object "CHAT_AGENT" active.' },
  { type: 'info', content: 'D1 Database "MESSAGES_DB" ready.' },
];
export function TerminalPage() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(mockLogs);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scrollContainer = scrollRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [history]);
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const cmd = input.trim().toLowerCase();
    setHistory(prev => [...prev, { type: 'cmd', content: input.trim() }]);
    setTimeout(() => {
      if (cmd === 'agents list') {
        setHistory(prev => [...prev, { type: 'info', content: 'Listing active agents:\n - sentinel-01 (IDLE)\n - guard-alpha (BUSY)\n - worker-node-4 (ONLINE)' }]);
      } else if (cmd === 'clear') {
        setHistory([]);
      } else if (cmd === 'mock-deploy') {
        setHistory(prev => [
          ...prev, 
          { type: 'sys', content: 'Starting mock deployment...' },
          { type: 'info', content: 'Compiling edge chunks...' },
          { type: 'success', content: 'Deployment successful: v1.12.0-canary' }
        ]);
      } else if (cmd === 'mock-status') {
        setHistory(prev => [...prev, { type: 'success', content: 'SYSTEM STATUS: ALL GREEN\nEDGE_LATENCY: 12ms\nACTIVE_WORKERS: 4\nTHREAT_LEVEL: ZERO' }]);
      } else if (cmd === 'help') {
        setHistory(prev => [...prev, { type: 'sys', content: 'Available commands:\n agents list - Show all agents\n clear - Clear terminal\n mock-deploy - Trigger edge build simulation\n mock-status - Check system integrity' }]);
      } else {
        setHistory(prev => [...prev, { type: 'error', content: `Command not found: ${cmd}. Type 'help' for options.` }]);
      }
    }, 100);
    setInput('');
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <TerminalIcon className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">Mission Terminal</h1>
              <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest font-bold">Direct platform access</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setHistory([])}
            className="text-zinc-500 hover:text-red-400 hover:bg-red-400/5 text-[10px] font-bold uppercase tracking-widest"
          >
            <Trash2 className="h-3 w-3 mr-2" /> Purge Logs
          </Button>
        </div>
        <Card className="bg-zinc-950 border-zinc-900 h-[600px] flex flex-col overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500 opacity-50" />
          <CardHeader className="bg-zinc-900/30 border-b border-zinc-900 py-2 px-4 flex flex-row items-center justify-between">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500/20 border border-amber-500/50" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
              <Shield className="h-3 w-3" />
              <span>SECURE_SHELL:8829</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col min-h-0 bg-grid-pattern">
            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
              <div className="font-mono text-xs space-y-2 leading-relaxed">
                {history.length === 0 && (
                  <p className="text-zinc-800 italic">Terminal session cleared. Type 'help' to begin.</p>
                )}
                {history.map((log, i) => (
                  <div key={i} className="flex gap-3">
                    {log.type === 'cmd' && <ChevronRight className="h-4 w-4 text-emerald-500 shrink-0" />}
                    <div className={`
                      whitespace-pre-wrap
                      ${log.type === 'sys' && 'text-indigo-400 font-bold'}
                      ${log.type === 'success' && 'text-emerald-400'}
                      ${log.type === 'info' && 'text-zinc-500'}
                      ${log.type === 'error' && 'text-red-400 font-bold'}
                      ${log.type === 'cmd' && 'text-zinc-100'}
                    `}>
                      {log.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <form onSubmit={handleCommand} className="p-4 border-t border-zinc-900 bg-zinc-900/50 flex items-center gap-3">
              <ChevronRight className="h-4 w-4 text-emerald-500 animate-pulse" />
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter command..."
                className="flex-1 bg-transparent border-none outline-none text-zinc-100 font-mono text-xs placeholder:text-zinc-700"
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}