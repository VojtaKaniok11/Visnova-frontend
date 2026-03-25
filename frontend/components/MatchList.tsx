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
    <div className="space-y-12">
      {/* NEXT MATCH SECTION */}
      {nextMatch && (
        <div className="bg-emerald-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
             <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5s.67 1.5 1.5 1.5zm3.5 3c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5z"/>
             </svg>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/20 text-white text-sm font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Příští zápas
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-black">{nextMatch.IsHomeGame ? 'Jiskra Višňová' : nextMatch.Opponent}</h3>
                <p className="text-emerald-100 text-lg mt-2">{nextMatch.IsHomeGame ? 'Domácí hřiště' : 'Venkovní hřiště'}</p>
              </div>
              
              <div className="text-4xl md:text-6xl font-black text-emerald-200 opacity-50 px-4 italic">VS</div>
              
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-3xl md:text-5xl font-black">{!nextMatch.IsHomeGame ? 'Jiskra Višňová' : nextMatch.Opponent}</h3>
                <p className="text-emerald-100 text-lg mt-2">{!nextMatch.IsHomeGame ? 'Domácí hřiště' : 'Venkovní hřiště'}</p>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-white/20 flex flex-col items-center">
              <div className="text-2xl font-bold">
                {new Date(nextMatch.Date).toLocaleDateString('cs-CZ', {
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long', 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </div>
              <p className="text-emerald-100 mt-2">Přijďte nás podpořit!</p>
            </div>
          </div>
        </div>
      )}

      {/* PAST RESULTS SECTION */}
      <div className="space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
          <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 7h2v5.41l4.29 4.29-1.42 1.42L11 13.17V7z"/>
          </svg>
          Poslední výsledky
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {pastResults.map((match) => (
            <div key={match.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between border border-slate-100">
              <div className="flex-1 text-center md:text-left font-bold text-lg text-slate-700">
                <span className={match.IsHomeGame ? "text-emerald-700" : ""}>
                   {match.IsHomeGame ? 'Jiskra Višňová' : match.Opponent}
                </span>
              </div>
              
              <div className="my-4 md:my-0 px-8 py-3 bg-slate-100 rounded-xl flex items-center gap-4 min-w-[140px] justify-center">
                <span className="text-2xl font-black text-slate-900 leading-none">
                  {match.Score || '- : -'}
                </span>
              </div>
              
              <div className="flex-1 text-center md:text-right font-bold text-lg text-slate-700">
                <span className={!match.IsHomeGame ? "text-emerald-700" : ""}>
                   {!match.IsHomeGame ? 'Jiskra Višňová' : match.Opponent}
                </span>
              </div>
              
              <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-8 text-xs text-slate-400 font-medium uppercase tracking-tighter">
                {new Date(match.Date).toLocaleDateString('cs-CZ')}
              </div>
            </div>
          ))}
          
          {pastResults.length === 0 && (
            <div className="text-slate-400 text-center py-12 bg-slate-50 rounded-2xl dashed border-2 border-slate-200">
              Žádné odehrané zápasy v databázi.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchList;
