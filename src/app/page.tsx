
"use client"

import React, { useState, useEffect } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { StatsOverview } from '@/components/StatsOverview';
import { VotersTable } from '@/components/VotersTable';
import { ProcessedResults, analyzeData } from '@/app/lib/data-processor';
import { Trash2, ArrowLeft, BarChart3, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { localDb } from '@/app/lib/local-db';

/**
 * vula-medical-tech-assessment
 * A premium dashboard for community poll analysis.
 */
export default function Home() {
  const [results, setResults] = useState<ProcessedResults | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localDb.loadData();
    if (stored.users.length && stored.favourites.length) {
      setResults(analyzeData(stored.users, stored.favourites));
    }
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200">
      <nav className="bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 h-16 flex items-center px-6 md:px-12 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <BarChart3 className="w-4 h-4" />
          </div>
          <h1 className="text-sm font-bold tracking-tight uppercase">Vula Medical</h1>
        </div>
        
        {results && (
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setResults(null)} 
              className="h-9 px-4 text-[11px] font-bold uppercase tracking-wider border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300"
            >
              <ArrowLeft className="w-3 h-3 mr-2" /> Back
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => { localDb.clearData(); setResults(null); }} 
              className="w-9 h-9 text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-20">
        {!results ? (
          <div className="max-w-2xl mx-auto space-y-12">
            <header className="space-y-4 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">High-Performance Tool</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Analyze Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Community Poll</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium max-w-lg mx-auto leading-relaxed">
                Upload your files to find the winning choice and see a list of everyone who voted for it.
              </p>
            </header>
            
            <div className="bg-slate-900/40 p-8 md:p-12 rounded-[2.5rem] border border-slate-800/50 backdrop-blur-sm shadow-2xl">
              <FileUploader onResults={setResults} />
            </div>

            <footer className="text-center pt-8">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Vula Medical Technical Assessment</p>
            </footer>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <StatsOverview results={results} />
            <VotersTable voters={results.voters} colorName={results.popularColor} />
          </div>
        )}
      </div>
    </main>
  );
}
