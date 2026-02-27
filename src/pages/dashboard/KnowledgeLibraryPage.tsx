import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Library, Upload, Search, FileText, Globe, Code, Database, Clock } from 'lucide-react';
const knowledgeBases = [
  { name: 'Product Manuals', type: 'PDF/Docs', count: '142', size: '24.5MB', status: 'Synced' },
  { name: 'System API Ref', type: 'OpenAPI', count: '12', size: '2.1MB', status: 'Active' },
  { name: 'Customer History', type: 'D1 Vector', count: '85k', size: '1.4GB', status: 'Syncing' },
  { name: 'Regulatory Docs', type: 'Markdown', count: '310', size: '12.8MB', status: 'Synced' },
  { name: 'Marketing Assets', type: 'Raw Text', count: '56', size: '4.2MB', status: 'Idle' },
  { name: 'Engineering Wiki', type: 'Git/Web', count: '1.2k', size: '180MB', status: 'Synced' },
];
export function KnowledgeLibraryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Knowledge Library</h1>
            <p className="text-zinc-500 text-sm">Repository for system assets, documentation, and vector data lakes.</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase text-xs tracking-widest">
            <Upload className="h-4 w-4 mr-2" /> Upload Asset
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upload Dropzone Simulation */}
          <Card className="bg-zinc-900/20 border-2 border-dashed border-zinc-800 group hover:border-zinc-700 transition-all flex flex-col items-center justify-center p-8 cursor-pointer">
            <div className="h-12 w-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Library className="h-6 w-6 text-zinc-500 group-hover:text-emerald-400" />
            </div>
            <p className="text-sm font-bold text-zinc-400">Ingest New Data Source</p>
            <p className="text-[10px] text-zinc-600 mt-1 uppercase tracking-widest font-mono">PDF, MD, SQL, CSV</p>
          </Card>
          {knowledgeBases.map((kb) => (
            <Card key={kb.name} className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm group hover:border-indigo-500/50 transition-all overflow-hidden">
              <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-bold text-zinc-100">{kb.name}</CardTitle>
                <div className="h-8 w-8 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500">
                  {kb.type === 'PDF/Docs' && <FileText className="h-4 w-4" />}
                  {kb.type === 'OpenAPI' && <Code className="h-4 w-4" />}
                  {kb.type === 'D1 Vector' && <Database className="h-4 w-4" />}
                  {kb.type === 'Markdown' && <Globe className="h-4 w-4" />}
                  {(kb.type === 'Raw Text' || kb.type === 'Git/Web') && <FileText className="h-4 w-4" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Type</p>
                    <p className="text-xs font-mono text-zinc-300">{kb.type}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Docs</p>
                    <p className="text-xs font-mono text-zinc-300">{kb.count}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50">
                   <div className="flex items-center gap-1.5">
                    <div className={`h-1.5 w-1.5 rounded-full ${kb.status === 'Syncing' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="text-[10px] text-zinc-500 font-mono uppercase">{kb.status}</span>
                   </div>
                   <span className="text-[10px] text-zinc-600 font-mono">{kb.size}</span>
                </div>
              </CardContent>
              <CardFooter className="p-0 border-t border-zinc-800">
                <Button variant="ghost" className="w-full h-10 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white rounded-none">
                  Open Repository
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 py-4 text-zinc-600">
          <div className="h-px flex-1 bg-zinc-900" />
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span className="text-[10px] font-mono tracking-tighter uppercase">Last system-wide sync: 12 minutes ago</span>
          </div>
          <div className="h-px flex-1 bg-zinc-900" />
        </div>
      </div>
    </div>
  );
}