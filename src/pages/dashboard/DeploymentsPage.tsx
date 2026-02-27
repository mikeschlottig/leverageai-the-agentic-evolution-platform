import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { GitCommit, Rocket, History, Terminal, CheckCircle2, XCircle, RotateCcw, Clock } from 'lucide-react';
const history = [
  { hash: '8a2f1c9', env: 'Production', time: '12m ago', user: 'system_auth', status: 'Success' },
  { hash: '4d1e2b8', env: 'Staging', time: '1h ago', user: 'admin_evo', status: 'Success' },
  { hash: '2c9d3a4', env: 'Production', time: '4h ago', user: 'admin_evo', status: 'Rolled Back' },
  { hash: '9b1f0e2', env: 'Production', time: 'Yesterday', user: 'system_auth', status: 'Success' },
];
export function DeploymentsPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Deployments</h1>
            <p className="text-zinc-500 text-sm">System iteration history and orchestration logs.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-zinc-800 text-zinc-400 font-bold uppercase text-xs tracking-widest gap-2">
              <Clock className="h-4 w-4" /> Schedule
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs tracking-widest gap-2">
              <Rocket className="h-4 w-4" /> Deploy Master
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-zinc-800 before:to-zinc-900">
              {history.map((deploy, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:scale-110 transition-transform z-10">
                    {deploy.status === 'Success' ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <History className="h-5 w-5 text-amber-500" />}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm group-hover:border-zinc-700 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-100 uppercase text-xs italic tracking-tighter">{deploy.env} Deployment</span>
                        <Badge variant="outline" className={`text-[9px] font-mono ${deploy.status === 'Success' ? 'text-emerald-500' : 'text-amber-500'}`}>{deploy.status}</Badge>
                      </div>
                      <time className="text-[10px] font-mono text-zinc-600">{deploy.time}</time>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                        <GitCommit className="h-3 w-3" /> {deploy.hash}
                      </div>
                      <div className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">BY {deploy.user}</div>
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-zinc-800/50">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest">Details</Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest">Logs</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Active Pipeline</h3>
            <Card className="bg-zinc-950 border-zinc-800 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-500 animate-pulse" /> Live Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[9px] text-zinc-600 uppercase font-bold">Success Rate</p>
                    <p className="text-xl font-bold text-zinc-100">99.8%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-zinc-600 uppercase font-bold">Avg Duration</p>
                    <p className="text-xl font-bold text-zinc-100">42s</p>
                  </div>
                </div>
                <Button onClick={() => navigate('/app/terminal')} variant="outline" className="w-full border-zinc-800 text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-zinc-900">
                  <Terminal className="h-3.5 w-3.5" /> Open Live Tail
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/40 border-zinc-800 p-4 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <RotateCcw className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Recovery Protocol</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed italic">Rollback protection is currently ACTIVE. Production clusters will automatically revert to last known stable build if health checks fail post-deployment.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}