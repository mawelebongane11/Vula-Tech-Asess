import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, TrendingUp, Trophy, Activity, Database, CheckCircle2 } from 'lucide-react';
import { ProcessedResults } from '@/app/lib/data-processor';

export function StatsOverview({ results }: { results: ProcessedResults }) {
  const { popularColor, totalVotesForWinner, totalParticipants } = results;
  const pct = totalParticipants ? Math.round((totalVotesForWinner / totalParticipants) * 100) : 0;

  const colorHex: Record<string, string> = {
    blue: '#3b82f6',
    red: '#ef4444',
    green: '#22c55e',
    yellow: '#eab308',
    orange: '#f97316',
    purple: '#a855f7',
    pink: '#ec4899',
  };

  const displayColor = popularColor.toLowerCase();
  const hex = colorHex[displayColor] || '#64748b';

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      <Card className="lg:col-span-2 border-none shadow-2xl bg-slate-900 rounded-[2.5rem] overflow-hidden relative group transition-all border border-slate-800/50">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-60" />
        <CardContent className="p-10 flex flex-col justify-between min-h-[280px] relative z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
                <Trophy className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Most Popular</span>
              </div>
              <div>
                <h2 className="text-7xl font-black tracking-tighter leading-none text-white">{popularColor}</h2>
                <div className="flex items-center gap-3 mt-8">
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-pulse" />
                   <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                     <Palette className="w-4 h-4 text-indigo-500" /> Selected Theme
                   </p>
                </div>
              </div>
            </div>
            <div 
              className="w-40 h-40 rounded-[2rem] border-[12px] border-white/5 shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-3 flex items-center justify-center relative overflow-hidden" 
              style={{ backgroundColor: hex }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent" />
              <CheckCircle2 className="w-12 h-12 text-white/40" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        <Card className="border-none shadow-xl bg-slate-900 rounded-[2rem] border border-slate-800/50 group transition-all">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Winners</span>
              <Activity className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="flex items-baseline gap-4">
              <h2 className="text-5xl font-black text-white">{totalVotesForWinner}</h2>
              <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[11px] font-bold text-indigo-400">{pct}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-xl bg-slate-900 rounded-[2rem] border border-slate-800/50 group transition-all">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Votes</span>
              <Database className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="flex items-center gap-6">
              <h2 className="text-5xl font-black text-white">{totalParticipants}</h2>
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all">
                <Database className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}