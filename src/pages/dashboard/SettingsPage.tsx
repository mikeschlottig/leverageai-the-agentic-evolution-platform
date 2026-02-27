import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Settings, Lock, Key, Layout, Shield, Copy, CheckCircle2, User } from 'lucide-react';
import { toast } from 'sonner';
export function SettingsPage() {
  const [copied, setCopied] = useState(false);
  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    toast.success('API Key copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Settings className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">System Settings</h1>
            <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest font-bold">Platform Configuration</p>
          </div>
        </div>
        <Tabs defaultValue="security" className="space-y-6">
          <TabsList className="bg-zinc-900 border border-zinc-800 p-1">
            <TabsTrigger value="profile" className="px-6 gap-2">
              <User className="h-3.5 w-3.5" /> Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="px-6 gap-2">
              <Lock className="h-3.5 w-3.5" /> Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="px-6 gap-2">
              <Layout className="h-3.5 w-3.5" /> Interface
            </TabsTrigger>
          </TabsList>
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <Key className="h-4 w-4 text-emerald-400" /> Platform API Keys
                </CardTitle>
                <CardDescription className="text-zinc-500">Manage keys for direct SDK access and MCP binding.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Secret Key (Evolution-v1)</Label>
                    <div className="flex gap-2">
                      <Input 
                        readOnly 
                        value="sk_evolution_7x923jLp0w2M1n8V6q" 
                        type="password" 
                        className="bg-zinc-950 border-zinc-800 text-zinc-300 font-mono text-xs" 
                      />
                      <Button variant="outline" className="border-zinc-800 shrink-0 px-3" onClick={() => handleCopy('sk_evolution_7x923jLp0w2M1n8V6q')}>
                        {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-zinc-500" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Public Identifier</Label>
                    <Input 
                      readOnly 
                      value="pk_id_8829-zeta" 
                      className="bg-zinc-950 border-zinc-800 text-zinc-500 font-mono text-xs" 
                    />
                  </div>
                </div>
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg flex gap-3 items-start">
                  <Shield className="h-5 w-5 text-red-500 mt-0.5" />
                  <p className="text-[10px] text-zinc-400 leading-relaxed italic">
                    <span className="text-red-400 font-bold block mb-1 uppercase">Danger Zone</span>
                    Ensure your secret keys are never shared or committed to version control. If compromised, rotate keys immediately via the 'Emergency Reset' protocol.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appearance">
            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100">Interface Customization</CardTitle>
                <CardDescription className="text-zinc-500">Adjust the visual density and accent profiles.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Accent Profile</Label>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-500 border-2 border-white ring-2 ring-white/20 cursor-pointer" />
                      <div className="h-8 w-8 rounded-full bg-emerald-500 border-2 border-transparent hover:border-zinc-700 cursor-pointer" />
                      <div className="h-8 w-8 rounded-full bg-amber-500 border-2 border-transparent hover:border-zinc-700 cursor-pointer" />
                      <div className="h-8 w-8 rounded-full bg-pink-500 border-2 border-transparent hover:border-zinc-700 cursor-pointer" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Interface Density</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 border-zinc-800 text-xs">Standard</Button>
                      <Button variant="outline" className="flex-1 bg-zinc-800 border-zinc-700 text-xs text-white">Dense (Hacker)</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}