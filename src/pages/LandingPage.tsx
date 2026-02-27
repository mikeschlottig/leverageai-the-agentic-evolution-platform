import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Cpu, Shield, Zap, Database } from 'lucide-react';
export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8"
        >
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ShinyButton onClick={() => navigate('/app/overview')}>
            Enter the Evolution
          </ShinyButton>
        </motion.div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-zinc-600 text-[10px] font-mono">
        <span>X CLOUDFLARE WORKERS</span>
        <div className="h-px w-12 bg-zinc-800" />
        <span>POWERED BY AGENTS SDK</span>
      </div>
    </div>
  );
}