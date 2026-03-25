import React from 'react';

interface Match {
  id: number;
  Opponent: string;
  Date: string;
  IsHomeGame: boolean;
  Score?: string | null;
}

interface MatchListProps {
  matches: Match[];
}

const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  const now = new Date();

  // 1. Next Match: Future date AND no score yet
  // We take the one closest to now (since they are sorted desc in API, we might need to find the last one in the "future" part or just filter and sort)
  const futureMatches = matches
    .filter(m => new Date(m.Date) >= now && !m.Score)
    .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
  
  const nextMatch = futureMatches[0];

  // 2. Past results: Matches in the past OR matches with a score
  const pastResults = matches
    .filter(m => new Date(m.Date) < now || m.Score)
    .filter(m => m.id !== nextMatch?.id)
    .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());

  return (
    <div className="space-y-16">
      {/* NEXT MATCH SECTION */}
      {nextMatch && (
        <div className="bg-blue-900 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden group border border-white/5">
          {/* Decorative atmospheric effects */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-colors duration-1000"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-400/5 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-yellow-400 text-blue-950 text-[10px] font-black uppercase tracking-[0.2em] mb-12 shadow-xl border border-white/20">
              <span className="w-1.5 h-1.5 bg-blue-900 rounded-full animate-pulse"></span>
              Příští zápas
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10">
              <div className="text-center md:text-left flex flex-col">
                <span className="text-blue-200/40 font-black text-[10px] uppercase tracking-widest mb-3">Tým 1</span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.1]">
                  {nextMatch.IsHomeGame ? 'Jiskra Višňová' : nextMatch.Opponent}
                </h3>
              </div>
              
              <div className="relative flex justify-center py-6 md:py-0">
                <div className="text-6xl md:text-8xl font-black text-white/5 italic select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-tighter">VS</div>
                <div className="w-12 h-1 bg-yellow-400/20 rounded-full"></div>
              </div>
              
              <div className="text-center md:text-right flex flex-col">
                <span className="text-blue-200/40 font-black text-[10px] uppercase tracking-widest mb-3">Tým 2</span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.1]">
                  {!nextMatch.IsHomeGame ? 'Jiskra Višňová' : nextMatch.Opponent}
                </h3>
              </div>
            </div>
            
            <div className="mt-16 pt-10 border-t border-white/5 flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-black text-yellow-400 tracking-tight flex items-center gap-4">
                <svg className="w-6 h-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {new Date(nextMatch.Date).toLocaleDateString('cs-CZ', {
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long', 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </div>
              <p className="text-blue-100/40 mt-3 font-bold tracking-[0.3em] uppercase text-[9px]">U nás na stadionu ve Višňové</p>
            </div>
          </div>
        </div>
      )}

      {/* PAST RESULTS SECTION */}
      <div className="space-y-12">
        <h2 className="text-3xl font-black text-blue-900 tracking-tight flex items-center gap-4">
          <span className="w-2 h-8 bg-blue-900 rounded-full"></span>
          Poslední výsledky
        </h2>
        
        <div className="grid grid-cols-1 gap-6">
          {pastResults.map((match) => (
            <div key={match.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 grid grid-cols-1 md:grid-cols-3 items-center border border-slate-100 group hover:-translate-y-1">
              <div className="text-center md:text-left font-black text-lg text-slate-900">
                <span className={match.IsHomeGame ? "text-blue-900 bg-blue-50 px-3 py-1 rounded-lg" : ""}>
                   {match.IsHomeGame ? 'Jiskra Višňová' : match.Opponent}
                </span>
              </div>
              
              <div className="flex flex-col items-center gap-4 py-6 md:py-0">
                <div className="px-12 py-5 bg-slate-50 rounded-[1.5rem] flex items-center justify-center border border-slate-100 group-hover:bg-blue-900 group-hover:text-yellow-400 transition-all duration-300 min-w-[160px] shadow-sm group-hover:shadow-blue-900/30">
                  <span className="text-3xl font-black leading-none tracking-tight">
                    {match.Score || '- : -'}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                   {new Date(match.Date).toLocaleDateString('cs-CZ')}
                </div>
              </div>
              
              <div className="text-center md:text-right font-black text-lg text-slate-900">
                <span className={!match.IsHomeGame ? "text-blue-900 bg-blue-50 px-3 py-1 rounded-lg" : ""}>
                   {!match.IsHomeGame ? 'Jiskra Višňová' : match.Opponent}
                </span>
              </div>
            </div>
          ))}
          
          {pastResults.length === 0 && (
            <div className="text-slate-400 text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
              <p className="text-lg font-bold tracking-widest uppercase opacity-40">Žádné odehrané zápasy</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchList;
