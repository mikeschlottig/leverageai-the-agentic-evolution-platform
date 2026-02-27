import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Box, Download, Copy, Check, Search, ShieldCheck, Zap, GitBranch } from 'lucide-react';
import { toast } from 'sonner';
const packages = [
  { name: '@evolution/nlp-core', version: 'v2.4.1', downloads: '1.2M', score: '98', category: 'Logic' },
  { name: '@evolution/d1-sync', version: 'v1.0.8', downloads: '450k', score: '94', category: 'Storage' },
  { name: '@evolution/vision-pro', version: 'v3.2.0', downloads: '890k', score: '99', category: 'Vision' },
  { name: '@evolution/mcp-slack', version: 'v1.2.2', downloads: '120k', score: '82', category: 'Tool' },
  { name: '@evolution/auth-guard', version: 'v1.1.0', downloads: '34k', score: '96', category: 'Security' },
  { name: '@evolution/web-search', version: 'v4.0.2', downloads: '6.7M', score: '95', category: 'Tool' },
];
export function PackagesPage() {
  const [copied, setCopied] = useState(false);
  const installCmd = "bun add @evolution/nlp-core";
  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    toast.success('Install command copied');
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Registry Explorer</h1>
            <p className="text-zinc-500 text-sm">Modular capabilities and pre-built agent logic blocks.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search registry..."
              className="pl-10 bg-zinc-950 border-zinc-800 focus-visible:ring-indigo-500/50 text-xs"
            />
          </div>
        </div>
        <Card className="bg-indigo-500/5 border border-indigo-500/20 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
              <Download className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-100 uppercase tracking-widest leading-none">CLI Installation</p>
              <p className="text-[10px] text-zinc-500 mt-1">Directly add system modules to your custom workers.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-zinc-800 w-full md:w-auto">
            <code className="text-[10px] font-mono text-indigo-400">{installCmd}</code>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-white" onClick={handleCopy}>
              {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.name} className="bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-all group">
              <CardHeader className="pb-3 flex flex-row items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-bold text-zinc-100">{pkg.name}</CardTitle>
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                  </div>
                  <p className="text-[10px] font-mono text-zinc-500">{pkg.version}</p>
                </div>
                <Badge variant="secondary" className="text-[9px] uppercase font-bold text-zinc-400 bg-zinc-800 border-none">
                  {pkg.category}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-tighter">
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <Download className="h-3 w-3" /> {pkg.downloads}
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <Zap className="h-3 w-3 text-amber-500" /> Score: <span className="text-zinc-300 font-mono">{pkg.score}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-1.5 flex-1 bg-zinc-950 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${pkg.score}%` }} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-0 border-t border-zinc-800">
                <Button variant="ghost" className="w-full h-10 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white rounded-none flex gap-2">
                  <GitBranch className="h-3 w-3" /> View Source
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}