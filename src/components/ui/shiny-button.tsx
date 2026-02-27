import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export function ShinyButton({ children, className, ...props }: ShinyButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 rounded-xl group overflow-hidden bg-zinc-950 border border-zinc-800 shadow-[0_0_20px_rgba(99,102,241,0.2)]",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)]">
        <div className="relative h-full w-20 bg-white/10 blur-xl animate-shimmer" />
      </div>
      <span className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-r from-indigo-600/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-xs">
        {children}
      </span>
      {/* Decorative corners */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-indigo-500 opacity-50" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-emerald-500 opacity-50" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-emerald-500 opacity-50" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-indigo-500 opacity-50" />
    </motion.button>
  );
}