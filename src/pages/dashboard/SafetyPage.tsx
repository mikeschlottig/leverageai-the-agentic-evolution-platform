import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShieldCheck, ShieldAlert, Lock, UserX, AlertTriangle, EyeOff, Ban } from 'lucide-react';
export function SafetyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Safety Protocol</h1>
          <p className="text-zinc-500 text-sm">Configure autonomous guardrails and content moderation.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Constraint Configuration</h3>
            <Card className="bg-zinc-900/40 border-zinc-800 p-6 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserX className="h-4 w-4 text-emerald-400" />
                    <div>
                      <p className="text-xs font-bold text-zinc-200">PII Redaction</p>
                      <p className="text-[10px] text-zinc-500">Auto-hide emails, IDs, and phone numbers.</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="h-4 w-4 text-indigo-400" />
                    <div>
                      <p className="text-xs font-bold text-zinc-200">Toxicity Filter</p>
                      <p className="text-[10px] text-zinc-500">Block harmful or offensive content.</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Ban className="h-4 w-4 text-red-400" />
                    <div>
                      <p className="text-xs font-bold text-zinc-200">Prompt Injection Shield</p>
                      <p className="text-[10px] text-zinc-500">Mitigate adversarial attacks.</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-6 border-t border-zinc-800 pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Token Budgeting</p>
                    <span className="text-[10px] font-mono text-zinc-500">4k / req</span>
                  </div>
                  <Slider defaultValue={[40]} max={100} step={1} className="py-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Aggression Threshold</p>
                    <span className="text-[10px] font-mono text-zinc-500">Level 2</span>
                  </div>
                  <Slider defaultValue={[20]} max={100} step={1} className="py-2" />
                </div>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-[10px] tracking-widest h-10">
                Update Security Policy
              </Button>
            </Card>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Security Audit Log</h3>
            <Card className="bg-zinc-950 border-zinc-800">
              <Table>
                <TableHeader className="bg-zinc-900/20">
                  <TableRow className="border-zinc-800">
                    <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Rule Triggered</TableHead>
                    <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Severity</TableHead>
                    <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Source Agent</TableHead>
                    <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Time</TableHead>
                    <TableHead className="text-right text-zinc-500 font-bold uppercase text-[10px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { rule: 'PII_REDACTION', sev: 'Low', agent: 'Support-Alpha', time: '2m ago', action: 'Redacted' },
                    { rule: 'PROMPT_INJECTION', sev: 'Critical', agent: 'Global-Edge', time: '12m ago', action: 'Blocked' },
                    { rule: 'TOXICITY_DETECTED', sev: 'Medium', agent: 'Chat-Bot-4', time: '45m ago', action: 'Filtered' },
                  ].map((log, i) => (
                    <TableRow key={i} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                      <TableCell className="font-mono text-[10px] text-zinc-300 italic">{log.rule}</TableCell>
                      <TableCell>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${log.sev === 'Critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-zinc-800 text-zinc-400'}`}>
                          {log.sev}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-zinc-400">{log.agent}</TableCell>
                      <TableCell className="text-[10px] text-zinc-600 font-mono">{log.time}</TableCell>
                      <TableCell className="text-right font-bold text-[10px] text-emerald-400">{log.action}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}