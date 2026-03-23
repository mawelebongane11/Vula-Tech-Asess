"use client"

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User } from '@/app/lib/data-processor';
import { UserCheck, Search, ShieldCheck, Filter } from 'lucide-react';

export function VotersTable({ voters, colorName }: { voters: User[], colorName: string }) {
  const [search, setSearch] = useState('');

  const filteredVoters = voters.filter(u => 
    u.firstName.toLowerCase().includes(search.toLowerCase()) || 
    u.surname.toLowerCase().includes(search.toLowerCase()) ||
    u.id.includes(search)
  );

  return (
    <Card className="border-none shadow-2xl bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800/50">
      <CardHeader className="p-8 border-b border-slate-800/50 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <CardTitle className="text-3xl font-black tracking-tight text-white">Winner Directory</CardTitle>
            <div className="flex flex-wrap items-center gap-4">
               <div className="px-3.5 py-1.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-indigo-500/20 flex items-center gap-2">
                 <Filter className="w-3 h-3" /> Filtered by: {colorName}
               </div>
               <div className="flex items-center gap-2 text-slate-600">
                 <ShieldCheck className="w-3.5 h-3.5" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Sorted Alphabetically</span>
               </div>
            </div>
          </div>
          
          <div className="relative max-w-sm w-full group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
            </div>
            <Input 
              placeholder="Search names or IDs..." 
              className="pl-12 h-14 rounded-2xl bg-slate-950/50 border-slate-800 text-slate-200 placeholder:text-slate-600 text-[14px] font-medium focus-visible:ring-indigo-500/20 focus-visible:bg-slate-950 transition-all shadow-inner"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="max-h-[600px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
              <TableRow className="bg-slate-950/20 hover:bg-slate-950/20 border-none">
                <TableHead className="pl-10 text-[10px] font-bold uppercase tracking-widest text-slate-500 h-16">ID</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-500 h-16">Full Name</TableHead>
                <TableHead className="text-right pr-10 text-[10px] font-bold uppercase tracking-widest text-slate-500 h-16">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVoters.length > 0 ? (
                filteredVoters.map((u) => (
                  <TableRow key={u.id} className="hover:bg-indigo-500/[0.03] transition-colors border-slate-800/50 h-20 group">
                    <TableCell className="pl-10">
                      <span className="font-mono text-[12px] bg-slate-950 px-3.5 py-2 rounded-xl text-slate-400 font-bold group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all border border-slate-800">
                        #{u.id.padStart(4, '0')}
                      </span>
                    </TableCell>
                    <TableCell className="text-[15px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-slate-400 group-hover:text-slate-200 transition-colors">{u.firstName}</span> 
                        <span className="font-black uppercase tracking-tight text-white">{u.surname}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 text-[10px] font-bold text-indigo-400 uppercase tracking-widest border border-indigo-500/20 shadow-sm transition-all group-hover:bg-indigo-500/20">
                        <UserCheck className="w-4 h-4" /> Verified
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-80 text-center">
                    <div className="flex flex-col items-center justify-center gap-6 opacity-30">
                       <div className="w-20 h-20 bg-slate-800 rounded-[2rem] flex items-center justify-center">
                         <Search className="w-8 h-8 text-slate-500" />
                       </div>
                       <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">No people found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}