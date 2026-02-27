import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Trash2, Plus, Bot, User, Settings, Copy, Check } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { chatService, MODELS, formatTime, renderToolCall, SessionInfo, Message } from '@/lib/chat';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(MODELS[0]?.id ?? 'google-ai-studio/gemini-2.5-flash');
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [openSessions, setOpenSessions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const loadMessages = useCallback(async () => {
    const res = await chatService.getMessages();
    if (res.success && res.data) {
      setMessages(res.data.messages);
    }
  }, []);
  const loadSessions = useCallback(async () => {
    const res = await chatService.listSessions();
    if (res.success) {
      setSessions(res.data || []);
    }
  }, []);
  useEffect(() => {
    loadMessages();
    loadSessions();
  }, [loadMessages, loadSessions]);
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);
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
        chatService.sendMessage(text, model, (chunk) => {
          // For streaming, we'll update via getMessages refresh
        }),
        {
          loading: 'Agent processing...',
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
  const handleClear = async () => {
    await toast.promise(chatService.clearMessages(), {
      loading: 'Clearing conversation...',
      success: 'Conversation cleared',
      error: 'Failed to clear conversation'
    });
    await loadMessages();
  };
  const handleNewSession = async () => {
    const res = await toast.promise(chatService.createSession(), {
      loading: 'Creating new session...',
      success: 'New session created',
      error: 'Failed to create session'
    });
    if (res.success) {
      await loadSessions();
      await loadMessages();
    }
  };
  const handleDeleteSession = async (sessionId: string) => {
    await toast.promise(chatService.deleteSession(sessionId), {
      loading: 'Deleting session...',
      success: 'Session deleted',
      error: 'Failed to delete session'
    });
    await loadSessions();
  };
  const handleModelChange = async (newModel: string) => {
    setModel(newModel);
    await toast.promise(chatService.updateModel(newModel), {
      loading: 'Updating model...',
      success: 'Model updated',
      error: 'Failed to update model'
    });
  };
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <Card className="border-b border-zinc-900 shrink-0">
        <CardHeader className="p-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-zinc-100">Agent Terminal</CardTitle>
                <p className="text-sm text-zinc-500">Persistent conversation with tool support</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={model} onValueChange={handleModelChange}>
                <SelectTrigger className="w-48 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MODELS.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Sheet open={openSessions} onOpenChange={setOpenSessions}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SheetHeader className="px-6 py-4 border-b border-zinc-900">
                    <SheetTitle>Sessions</SheetTitle>
                    <SheetDescription>Manage your conversation history</SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-120px)] px-4 py-2">
                    <div className="space-y-2">
                      {sessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-900 cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-emerald-500 text-white text-xs font-bold">
                                {session.title.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-zinc-100 truncate max-w-[200px]">{session.title}</span>
                              <span className="text-xs text-zinc-500">{formatDistanceToNow(session.lastActive)} ago</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 opacity-0 group-hover:opacity-100"
                            onClick={() => handleDeleteSession(session.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t border-zinc-900">
                    <Button onClick={handleNewSession} className="w-full" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Session
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              <Button onClick={handleClear} variant="ghost" size="icon" className="h-9 w-9" disabled={loading}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1">
        <div className="p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-zinc-500">
              <MessageCircle className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-sm">No messages yet. Start a conversation with your agent.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={cn(
                "flex gap-3",
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}>
                <div className={cn(
                  "max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed",
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
              placeholder="Send a message..."
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
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* Free Tier Notice */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-lg px-4 py-2 text-xs text-zinc-400 font-mono z-50">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-pulse" />
          Free tier: ~100 req/day total (Enterprise: Unlimited) - rate limited across users
        </div>
      </div>
    </div>
  );
}