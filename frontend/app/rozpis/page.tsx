import { fetchAPI } from '@/lib/strapi';

export const revalidate = 60;

interface Match {
  id: number;
  Opponent: string;
  Date: string;
  IsHomeGame: boolean;
  Score?: string | null;
  Team?: string;
}

export default async function RozpisPage() {
  let matches: Match[] = [];
  try {
    const response = await fetchAPI('/matches', {
      populate: '*',
      'sort[0]': 'Date:asc',
      'pagination[pageSize]': 100,
    });
    matches = response.data || [];
  } catch (error) {
    console.error('Error fetching matches:', error);
  }

  const teams = [
    { id: 'A', name: 'A-tým', description: 'Krajský přebor' },
    { id: 'B', name: 'B-tým', description: 'I.B třída' },
    { id: 'C', name: 'C-tým', description: 'III. třída' },
  ];

  const now = new Date();

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tight mb-4 flex justify-center items-center gap-6">
            <div className="w-10 h-2 bg-yellow-400 rounded-full"></div>
            Rozpis Zápasů
            <div className="w-10 h-2 bg-yellow-400 rounded-full"></div>
          </h1>
          <p className="text-lg text-slate-600 font-medium mt-6 opacity-70">
            Aktuální přehled všech jarních zápasů
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {teams.map((team) => {
            const teamMatches = matches.filter(m => m.Team === team.id);
            
            return (
              <div key={team.id} className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border-b-8 border-yellow-400 p-6 md:p-8 flex flex-col h-fit">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-blue-900 mb-1">{team.name}</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-1 bg-yellow-400 rounded-full"></div>
                    <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">{team.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {teamMatches.length > 0 ? teamMatches.map((match) => {
                    const matchDate = new Date(match.Date);
                    const isPassed = matchDate < now || match.Score;
                    
                    return (
                      <div key={match.id} className={`p-4 rounded-2xl flex flex-col gap-2 transition-colors relative overflow-hidden group ${isPassed ? 'bg-blue-50/50' : 'bg-slate-50 hover:bg-slate-100/100'}`}>
                        
                        {/* Home/Away indicator bar */}
                        <div className={`absolute top-0 right-0 bottom-0 w-1.5 ${match.IsHomeGame ? 'bg-yellow-400' : 'bg-slate-300'}`}></div>

                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter text-slate-400">
                          <div className="flex gap-2">
                            <span className="text-blue-900">{matchDate.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric' })}</span>
                            <span>{matchDate.toLocaleDateString('cs-CZ', { weekday: 'short' }).toUpperCase()}</span>
                            <span className={`px-1.5 py-0.5 rounded-sm ml-2 ${match.IsHomeGame ? 'bg-blue-900 text-yellow-400' : 'bg-slate-200 text-slate-500'}`}>
                              {match.IsHomeGame ? 'DOMA' : 'VENKU'}
                            </span>
                          </div>
                          <span className={`${match.Score ? 'bg-blue-900 text-yellow-400' : 'bg-white text-blue-900'} px-2 py-0.5 rounded shadow-sm font-black`}>
                            {match.Score || matchDate.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-slate-800 leading-tight pr-4">
                          {match.IsHomeGame ? `Višňová - ${match.Opponent}` : `${match.Opponent} - Višňová`}
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="py-10 text-center text-slate-300 italic text-sm">
                      Žádné zápasy nenalezeny
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
