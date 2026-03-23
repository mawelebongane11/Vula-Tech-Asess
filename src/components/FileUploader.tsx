"use client"

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Loader2, CheckCircle2, Database, Upload } from 'lucide-react';
import { parseUsers, parseFavourites, analyzeData, ProcessedResults } from '@/app/lib/data-processor';
import { localDb } from '@/app/lib/local-db';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onResults: (results: ProcessedResults) => void;
}

export function FileUploader({ onResults }: FileUploaderProps) {
  const [usersText, setUsersText] = useState('');
  const [favsText, setFavsText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileNames, setFileNames] = useState({ users: '', favs: '' });
  
  const usersRef = useRef<HTMLInputElement>(null);
  const favsRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File, type: 'users' | 'favs') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (type === 'users') {
        setUsersText(text);
        setFileNames(p => ({ ...p, users: file.name }));
      } else {
        setFavsText(text);
        setFileNames(p => ({ ...p, favs: file.name }));
      }
    };
    reader.readAsText(file);
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const users = parseUsers(usersText);
        const favs = parseFavourites(favsText);
        if (!users.length || !favs.length) throw new Error('Format error');
        
        localDb.saveData(users, favs);
        onResults(analyzeData(users, favs));
        toast({ title: "Ready", description: "The results have been processed." });
      } catch (e) {
        toast({ title: "Error", description: "Please check your file format.", variant: "destructive" });
      } finally {
        setIsProcessing(false);
      }
    }, 600);
  };

  const Slot = ({ type, name }: { type: 'users' | 'favs', name: string }) => (
    <div 
      className={cn(
        "h-44 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer p-6 text-center group relative overflow-hidden",
        name 
          ? "bg-indigo-500/5 border-indigo-500/30 shadow-inner shadow-indigo-500/5" 
          : "bg-slate-950/40 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/50 transition-all"
      )}
      onClick={() => type === 'users' ? usersRef.current?.click() : favsRef.current?.click()}
    >
      {name ? (
        <div className="space-y-3">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/30">
            <CheckCircle2 className="w-6 h-6 text-indigo-400" />
          </div>
          <p className="text-[11px] font-bold text-indigo-200 truncate max-w-[160px] tracking-tight">{name}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto text-slate-500 group-hover:text-indigo-400 group-hover:scale-110 transition-all border border-slate-800 shadow-xl">
            {type === 'users' ? <Database className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              {type === 'users' ? 'User List' : 'Color Votes'}
            </p>
            <p className="text-[9px] font-medium text-slate-600">Select text file</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Slot type="users" name={fileNames.users} />
        <Slot type="favs" name={fileNames.favs} />
        <input type="file" ref={usersRef} className="hidden" accept=".txt" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0], 'users')} />
        <input type="file" ref={favsRef} className="hidden" accept=".txt" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0], 'favs')} />
      </div>
      
      <Button 
        onClick={handleProcess} 
        disabled={!usersText || !favsText || isProcessing}
        className="w-full h-16 rounded-[1.25rem] text-xs font-bold uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-500 text-white transition-all active:scale-[0.98] disabled:opacity-20"
      >
        {isProcessing ? (
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Play className="w-4 h-4 fill-current" />
            <span>Show Results</span>
          </div>
        )}
      </Button>
    </div>
  );
}