import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Shield, Zap, Database } from 'lucide-react';
export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-12">
        <div className="space-y-4 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] font-bold text-zinc-400 tracking-widest uppercase">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Agentic Evolution v1.0
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
            LEVERAGE<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto tracking-tight">
            High-grade orchestration for Cloudflare AgentsSDK.
            Engineering the next generation of autonomous intelligence.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 opacity-0 animate-in fade-in duration-500 delay-500ms">
          <div className="flex items-center gap-2 text-zinc-500">
            <Cpu className="h-4 w-4 text-indigo-500" />
            <span className="text-xs font-mono">Durable Objects</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-mono">MCP Protocol</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <Database className="h-4 w-4 text-indigo-500" />
            <span className="text-xs font-mono">D1 Persistence</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <Zap className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-mono">Edge Compute</span>
          </div>
        </div>
        <div className="opacity-0 animate-in zoom-in scale-95 duration-400 delay-[800ms]">
          <button 
            onClick={() => navigate('/app/chat')}
            className='bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white shadow-xl hover:shadow-indigo-500/25 font-black uppercase tracking-wider px-12 py-6 text-xl rounded-xl transition-all hover:scale-[1.02] hover:-translate-y-1 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:to-white/5 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 relative overflow-hidden'
          >
            Enter the Evolution
          </button>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-zinc-600 text-[10px] font-mono">
        <span>X CLOUDFLARE WORKERS</span>
        <div className="h-px w-12 bg-zinc-800" />
        <span>POWERED BY AGENTS SDK</span>
        <span>• AI requests limited to 100/day (Enterprise: Unlimited)</span>
      </div>
    </div>
  );
}