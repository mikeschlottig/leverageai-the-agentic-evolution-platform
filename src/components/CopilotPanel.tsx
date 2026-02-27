import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, Send, X, Minimize2, Maximize2, Sparkles, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { chatService } from '@/lib/chat';
import { cn } from '@/lib/utils';
import type { Message } from '../../worker/types';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
export function CopilotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Configuration copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };
  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const text = input;
    setInput('');
    setLoading(true);
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    try {
      // Hidden context enrichment
      const moduleName = location.pathname.split('/').pop() || 'overview';
      const enrichedMessage = `[Context: User is currently on the ${moduleName} module] ${text}`;
      let assistantContent = '';
      await chatService.sendMessage(enrichedMessage, undefined, (chunk) => {
        assistantContent += chunk;
      });
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: assistantContent,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      toast.error("Copilot link interrupted. Check network.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4",
      isOpen ? (isExpanded ? "w-[600px]" : "w-[380px]") : "w-auto"
    )}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-full h-[550px] flex flex-col"
          >
            <Card className="flex-1 flex flex-col border-zinc-800 bg-zinc-950/90 backdrop-blur-xl shadow-2xl overflow-hidden border">
              <div className="p-4 border-b border-zinc-900 bg-zinc-900/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-100 tracking-tight">AI COPILOT</h3>
                    <p className="text-[10px] text-emerald-400 font-mono">EVOLUTION READY</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-grid-pattern">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                    <Sparkles className="h-10 w-10 text-emerald-500" />
                    <p className="text-xs max-w-[200px]">I'm your context-aware commander on the <span className="text-emerald-400 uppercase font-bold">{location.pathname.split('/').pop()}</span> page.</p>
                  </div>
                )}
                {messages.map((m) => (
                  <div key={m.id} className={cn("flex flex-col gap-1", m.role === 'user' ? "items-end" : "items-start")}>
                    <div className={cn(
                      "max-w-[85%] rounded-xl px-4 py-3 text-xs leading-relaxed relative group",
                      m.role === 'user' ? "bg-indigo-600 text-white" : "bg-zinc-900 border border-zinc-800 text-zinc-100"
                    )}>
                      <div className="whitespace-pre-wrap">{m.content}</div>
                      {m.role === 'assistant' && (
                        <button 
                          onClick={() => handleCopy(m.content, m.id)}
                          className="absolute -right-2 -bottom-2 h-6 w-6 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-700"
                        >
                          {copiedId === m.id ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-zinc-400" />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-zinc-900 bg-zinc-950">
                <div className="relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                    placeholder="Command copilot..."
                    className="min-h-[80px] bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-emerald-500/50 resize-none pr-12 text-xs"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    size="icon"
                    className="absolute bottom-2 right-2 h-8 w-8 bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-[10px] text-zinc-500 mt-2 text-center">Enriched with <span className="text-zinc-400">{location.pathname}</span> context.</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full shadow-2xl transition-all duration-300",
          isOpen ? "bg-zinc-900 text-zinc-100" : "bg-gradient-to-br from-indigo-600 to-emerald-600 text-white hover:scale-110"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </Button>
    </div>
  );
}