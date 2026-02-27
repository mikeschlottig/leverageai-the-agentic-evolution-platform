import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Trash2, Bot, User, Copy, Check, Zap } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { chatService, formatTime, renderToolCall, Message } from '@/lib/chat';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
const WORKERS_AI_MODELS = [
  { id: '@cf/meta/llama-3.1-8b-instruct-fp8', name: 'Llama 3.1 8B (Free)' },
  { id: '@cf/mistral/nx-8b-v3:free', name: 'Mistral NX 8B (Free)' },
  { id: '@cf/qwen/qwen2.5-1.5b-instruct:free', name: 'Qwen 2.5 1.5B (Free)' },
  { id: 'custom', name: 'Custom Model ID' }
];
export function WorkersAIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(WORKERS_AI_MODELS[0].id);
  const [customModelId, setCustomModelId] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentModelId = model === 'custom' ? customModelId : model;
  const loadMessages = useCallback(async () => {
    const res = await chatService.getMessages();
    if (res.success && res.data) {
      setMessages(res.data.messages);
    }
  }, []);
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
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
      await toast.promise(
        chatService.sendMessage(text, currentModelId),
        {
          loading: 'Workers AI processing...',
          success: 'Message sent',
          error: 'Failed to send message'
        }
      );
      await loadMessages();
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateModel = async () => {
    if (!currentModelId) {
      toast.error('Please select or enter a model ID');
      return;
    }
    await toast.promise(
      chatService.updateModel(currentModelId),
      {
        loading: 'Updating Workers AI model...',
        success: 'Model updated successfully',
        error: 'Failed to update model'
      }
    );
  };
  return (
    <div className="h-full flex flex-col">
      {/* Header with Model Selection */}
      <Card className="border-b border-zinc-900 shrink-0">
        <CardHeader className="p-4 pb-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-zinc-100">Workers AI Terminal</CardTitle>
                <p className="text-sm text-zinc-500">Direct Cloudflare Workers AI access</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <div className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-pulse" />
                Free tier: ~100 req/day
              </div>
              <Button onClick={handleUpdateModel} size="sm" className="h-9">
                Update Model
              </Button>
            </div>
          </div>
          {/* Model Selection */}
          <div className="flex items-center gap-3 mt-4 p-3 bg-zinc-950/50 rounded-lg border border-zinc-800">
            <Select value={model} onValueChange={(value) => setModel(value)}>
              <SelectTrigger className="w-64 h-9 bg-zinc-900 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {WORKERS_AI_MODELS.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {model === 'custom' && (
              <Input
                value={customModelId}
                onChange={(e) => setCustomModelId(e.target.value)}
                placeholder="Enter custom model ID"
                className="flex-1 bg-zinc-900 border-zinc-700 text-xs"
              />
            )}
          </div>
        </CardHeader>
      </Card>
      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1">
        <div className="p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-zinc-500">
              <Zap className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-sm">Ready to use Workers AI models. Select a model above.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={cn(
                "flex gap-3",
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}>
                <div className={cn(
                  "max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed relative group",
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-zinc-900 border border-zinc-800 rounded-bl-sm'
                )}>
                  <div className="flex items-center gap-2 mb-2 opacity-80">
                    {message.role === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                    <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.toolCalls && message.toolCalls.length > 0 && (
                    <div className="mt-3 space-y-1">
                      <Separator className="my-2" />
                      <div className="flex flex-wrap gap-1">
                        {message.toolCalls.map((toolCall) => (
                          <Badge key={toolCall.id} variant="secondary" className="text-xs">
                            {renderToolCall(toolCall)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {message.role === 'assistant' && (
                    <button
                      onClick={() => handleCopy(message.content, message.id)}
                      className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-700"
                    >
                      {copiedId === message.id ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-zinc-400" />}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Bot className="h-3 w-3 opacity-50" />
                  <div className="flex gap-1">
                    <div className="h-1.5 w-4 bg-emerald-500 rounded animate-pulse" />
                    <div className="h-1.5 w-4 bg-emerald-500/50 rounded animate-pulse [animation-delay:0.1s]" />
                    <div className="h-1.5 w-4 bg-emerald-500/25 rounded animate-pulse [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      {/* Input */}
      <Card className="border-t border-zinc-900 shrink-0">
        <CardContent className="p-4">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message to Workers AI..."
              className="min-h-[44px] flex-1 resize-none"
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button type="submit" size="icon" disabled={loading || !input.trim()}>
              <Zap className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}