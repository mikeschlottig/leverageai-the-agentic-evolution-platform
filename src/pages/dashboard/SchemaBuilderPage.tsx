import React from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Database, Table as TableIcon, Key, FileCode, Plus, Search, Terminal } from 'lucide-react';
export function SchemaBuilderPage() {
  const tables = [
    { name: 'users', rows: '1.2M', size: '240MB' },
    { name: 'sessions', rows: '4.5M', size: '1.1GB' },
    { name: 'messages', rows: '12M', size: '4.2GB' },
    { name: 'embeddings', rows: '12M', size: '18.4GB' },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">D1 Explorer</h1>
            <p className="text-zinc-500 text-sm">Visualize and construct your high-performance SQLite schemas.</p>
          </div>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs tracking-widest"
            onClick={() => toast.promise(new Promise(r=>setTimeout(r,2000)), {loading:'Creating new D1 table...', success:'Table created successfully', error:'Table creation failed - invalid schema'} )}
          >
            <Plus className="h-4 w-4 mr-2" /> New Table
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Registry</h3>
            <div className="space-y-2">
              {tables.map((table) => (
                <div key={table.name} className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <TableIcon className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-xs font-bold text-zinc-200">{table.name}</p>
                      <p className="text-[9px] text-zinc-500 font-mono">{table.rows} rows • {table.size}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-9 space-y-6">
            <Card className="bg-zinc-900/40 border-zinc-800 overflow-hidden">
              <CardHeader className="border-b border-zinc-900 bg-zinc-900/20 px-6 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                    <FileCode className="h-4 w-4 text-emerald-500" /> TABLE_SCHEMA: <span className="text-zinc-100">users</span>
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-zinc-500 hover:text-white"
                    onClick={() => toast.info('Loading data preview...')}
                  >
                    <Search className="h-3.5 w-3.5 mr-1" /> Data Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 border-b border-zinc-800">
                  <div className="p-6 border-r border-zinc-800 space-y-4">
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Columns</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'id', type: 'UUID', key: true },
                        { name: 'email', type: 'TEXT', key: false },
                        { name: 'created_at', type: 'TIMESTAMP', key: false },
                        { name: 'tier', type: 'INTEGER', key: false },
                      ].map(col => (
                        <div key={col.name} className="flex items-center justify-between group">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-zinc-300">{col.name}</span>
                            {col.key && <Key className="h-3 w-3 text-amber-500" />}
                          </div>
                          <span className="text-[10px] font-mono text-zinc-600 uppercase bg-zinc-950 px-1.5 rounded border border-zinc-800">{col.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-zinc-950/50 space-y-4">
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        className="border-zinc-800 h-20 flex-col text-[10px] gap-2 hover:bg-zinc-900"
                        onClick={() => toast.success('Primary key constraint applied')}
                      >
                        <Key className="h-4 w-4 text-amber-500" /> Primary Key
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-zinc-800 h-20 flex-col text-[10px] gap-2 hover:bg-zinc-900"
                        onClick={() => toast.success('Composite indexes optimized')}
                      >
                        <Database className="h-4 w-4 text-indigo-400" /> Indexing
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-zinc-950 space-y-3">
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Terminal className="h-3 w-3" /> Raw DDL
                  </h4>
                  <Textarea
                    readOnly
                    value={`CREATE TABLE users (\n  id TEXT PRIMARY KEY,\n  email TEXT UNIQUE NOT NULL,\n  created_at INTEGER DEFAULT (strftime('%s', 'now')),\n  tier INTEGER DEFAULT 0\n);`}
                    className="bg-zinc-900 border-zinc-800 text-emerald-500/80 font-mono text-xs min-h-[120px] resize-none focus-visible:ring-0"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}