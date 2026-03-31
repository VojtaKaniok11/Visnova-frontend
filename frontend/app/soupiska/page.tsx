import { fetchAPI, getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';

export const revalidate = 60;

interface Player {
  id: number;
  Name: string;
  Position: string;
  JerseyNumber?: number;
  Photo?: any;
}


export default async function Soupiska() {
  let players: Player[] = [];
  try {
    const playersRes = await fetchAPI('/players', {
      populate: '*', // Fetch photos
      'sort[0]': 'JerseyNumber:asc', // Optionally sort by number
    });
    players = playersRes.data || [];
  } catch (error) {
    console.error('Error fetching players:', error);
  }

  // Group and sort players by position
  const categories = [
    { title: 'Brankáři', keywords: ['brankář', 'golman', 'goalkeeper', 'brankar'] },
    { title: 'Obránci', keywords: ['obránce', 'obrance', 'defender'] },
    { title: 'Záložníci', keywords: ['záložník', 'zaloznik', 'midfielder'] },
    { title: 'Útočníci', keywords: ['útočník', 'utocnik', 'forward', 'striker'] }
  ];

  const groupedPlayers = categories.map(cat => ({
    ...cat,
    members: players.filter(p => 
      cat.keywords.some(k => p.Position?.toLowerCase().includes(k))
    )
  })).filter(cat => cat.members.length > 0);

  // Catch-all for other positions if any
  const otherPlayers = players.filter(p => 
    !categories.some(cat => cat.keywords.some(k => p.Position?.toLowerCase().includes(k)))
  );
  if (otherPlayers.length > 0) {
    groupedPlayers.push({ title: 'Ostatní', keywords: [], members: otherPlayers });
  }
  
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tight mb-4 flex justify-center items-center gap-6">
            <div className="w-10 h-2 bg-yellow-400 rounded-full"></div>
            Soupiska
            <div className="w-10 h-2 bg-yellow-400 rounded-full"></div>
          </h1>
        </div>

        {groupedPlayers.length > 0 ? (
          <div className="space-y-20">
            {groupedPlayers.map((category) => (
              <div key={category.title} className="space-y-10">
                <h2 className="text-2xl font-black text-blue-900 flex items-center gap-4">
                  <span className="bg-blue-900 text-yellow-400 px-3 py-1 rounded-lg text-xs uppercase tracking-widest">{category.members.length}</span>
                  {category.title}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {category.members.map((player: Player) => {
                    const imageUrl = getStrapiMedia(player.Photo) || '/placeholder.png';
                    console.log('DEBUG: URL pro hráče', player.Name, 'je:', player.Photo?.url);
                    
                    return (
                      <div key={player.id} className="bg-white rounded-[2rem] shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 relative border-b-8 border-yellow-400 hover:border-blue-900 hover:-translate-y-2">
                        
                        {/* Jersey Number Badge */}
                        {player.JerseyNumber && (
                          <div className="absolute top-4 right-4 z-10 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-blue-950 font-black text-xl shadow-xl border-4 border-white group-hover:scale-110 group-hover:bg-blue-900 group-hover:text-yellow-400 transition-all duration-300">
                            {player.JerseyNumber}
                          </div>
                        )}

                        {/* Photo area - REFINED SIZE */}
                        <div className="relative h-[380px] w-full bg-slate-200 overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={`Fotka hráče: ${player.Name}`}
                            fill
                            unoptimized={true}
                            className="object-cover object-top group-hover:scale-110 transition-transform duration-1000"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                          
                          {/* Name inside gradient */}
                          <div className="absolute bottom-6 left-6 right-6">
                            <h2 className="text-2xl font-black text-white group-hover:text-yellow-400 transition-colors drop-shadow-lg leading-tight">
                              {player.Name}
                            </h2>
                            <div className="text-yellow-400/80 font-bold tracking-[0.2em] uppercase text-[10px] mt-2 flex items-center gap-2">
                              <span className="w-4 h-0.5 bg-yellow-400/40"></span>
                              {player.Position || 'Hráč'}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-24 text-center shadow-2xl border border-slate-100">
            <svg className="w-20 h-20 mx-auto text-slate-200 mb-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-3xl font-black text-slate-800 mb-4">Soupiska je prázdná</h3>
            <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed">
              Administrátor momentálně doplňuje informace o týmu. Brzy zde uvidíte kompletní seznam našich hráčů.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
