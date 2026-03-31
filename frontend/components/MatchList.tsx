import React from 'react';

interface Match {
  id: number;
  Opponent: string;
  Date: string;
  IsHomeGame: boolean;
  Score?: string | null;
  Team?: string; // Add Team field
}

interface MatchListProps {
  matches: Match[];
  show?: 'upcoming' | 'past' | 'both';
}

const MatchList: React.FC<MatchListProps> = ({ matches, show = 'both' }) => {
  const now = new Date();

  // 1. Next Match: ONLY HOME games for A or B team
  // Selection rule: Closest home match, but if both A and B play at home same weekend, A has priority.
  const homeMatches = matches
    .filter(m => m.IsHomeGame && (m.Team === 'A' || m.Team === 'B'))
    .filter(m => new Date(m.Date) >= now && !m.Score)
    .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

  let nextMatch = null;
  if (homeMatches.length > 0) {
    const firstMatch = homeMatches[0];
    const firstMatchDate = new Date(firstMatch.Date);
    
    // Define "weekend" or "same round" as matches within 48h of the first match found
    const weekendMatches = homeMatches.filter(m => 
      new Date(m.Date).getTime() <= firstMatchDate.getTime() + (48 * 60 * 60 * 1000)
    );
    
    // Priority to A team if they play at home in the same window
    nextMatch = weekendMatches.find(m => m.Team === 'A') || firstMatch;
  }

  // 2. Past results: Matches in the past OR matches with a score
  // 2. Past results: Latest match for each team (A, B, C) that has already been played
  const teams = ['A', 'B', 'C'];
  const pastResults = teams.map(team => {
    return matches
      .filter(m => m.Team === team)
      .filter(m => new Date(m.Date) < now || m.Score)
      .filter(m => m.id !== nextMatch?.id)
      .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())[0];
  }).filter(Boolean); // Remote undefined if a team has no past matches

  return (
    <div className="space-y-16">
      {/* NEXT MATCH SECTION */}
      {nextMatch && (show === 'upcoming' || show === 'both') && (
        <div className="bg-blue-900 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden group border border-white/5">
          {/* Decorative atmospheric effects */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-colors duration-1000"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-400/5 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-yellow-400 text-blue-950 text-xs md:text-sm font-black uppercase tracking-[0.2em] mb-12 shadow-xl border border-white/20">
              <span className="w-2 h-2 bg-blue-900 rounded-full animate-pulse"></span>
              Příští zápas {nextMatch.Team && `— ${nextMatch.Team}-TÝM`}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-8">
              <div className="text-center md:text-right flex flex-col">
                <span className="text-blue-200/40 font-black text-[10px] uppercase tracking-widest mb-3">Domácí</span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.1]">
                  {nextMatch.IsHomeGame ? 'Višňová' : nextMatch.Opponent}
                </h3>
              </div>
              
              <div className="relative flex justify-center py-6 md:py-0">
                <div className="text-6xl md:text-8xl font-black text-white/5 italic select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-tighter">VS</div>
                <div className="w-16 h-1 bg-yellow-400/20 rounded-full"></div>
              </div>
              
              <div className="text-center md:text-left flex flex-col">
                <span className="text-blue-200/40 font-black text-[10px] uppercase tracking-widest mb-3">Hosté</span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.1]">
                  {!nextMatch.IsHomeGame ? 'Višňová' : nextMatch.Opponent}
                </h3>
              </div>
            </div>
            
            <div className="mt-16 pt-10 border-t border-white/5 flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-black text-yellow-400 tracking-tight flex items-center gap-4 text-center">
                {new Date(nextMatch.Date).toLocaleDateString('cs-CZ', {
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long', 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </div>
              <p className="text-blue-100/40 mt-3 font-bold tracking-[0.3em] uppercase text-[9px]">U nás na hřišti ve Višňové</p>
            </div>

            {/* Map Link Icon */}
            <a 
              href="https://www.google.com/maps/place/TJ+JISKRA+Vi%C5%A1%C5%88ov%C3%A1/@50.9677064,15.0254143,209m/data=!3m1!1e3!4m6!3m5!1s0x4709272b3c6f9069:0xa4417acd5b0e0ba!8m2!3d50.9676599!4d15.0251961!16s%2Fg%2F11tj9ngxjg?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Zobrazit na mapě"
              className="absolute bottom-4 right-8 md:bottom-1 md:right-14 p-2.5 bg-white/10 hover:bg-yellow-400 hover:text-blue-950 rounded-xl transition-all duration-300 border border-white/10 group/map shadow-lg"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* PAST RESULTS SECTION */}
      {(show === 'past' || show === 'both') && (
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
                     {match.IsHomeGame ? 'Višňová' : match.Opponent}
                  </span>
                </div>
                
                <div className="flex flex-col items-center gap-3 py-6 md:py-0">
                  {match.Team && (
                    <span className="px-3 py-1 bg-yellow-400 rounded-full text-blue-900 text-[10px] font-black shadow-sm">
                      {match.Team}-TÝM
                    </span>
                  )}
                  <div className="px-12 py-5 bg-slate-50 rounded-[1.5rem] flex flex-col items-center justify-center border border-slate-100 group-hover:bg-blue-900 group-hover:text-yellow-400 transition-all duration-300 min-w-[170px] shadow-sm group-hover:shadow-blue-900/30">
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
                     {!match.IsHomeGame ? 'Višňová' : match.Opponent}
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
      )}
    </div>
  );
};

export default MatchList;
