import { fetchAPI, getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';

export const revalidate = 60;

interface StrapiImage {
  url: string;
}

interface Player {
  id: number;
  Name: string;
  Position: string;
  JerseyNumber?: number;
  Photo?: StrapiImage;
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

  // Pre-sort or organize players by position? Let's just list them nicely.
  
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-extrabold text-blue-900 tracking-tight mb-4 flex justify-center items-center gap-4">
            <div className="w-16 h-2 bg-yellow-400 rounded-full"></div>
            Naše Soupiska
            <div className="w-16 h-2 bg-yellow-400 rounded-full"></div>
          </h1>
          <p className="text-xl text-slate-600 font-light mt-6">
            Seznamte se s týmem Jiskra Višňová. Hrdí reprezentanti našich klubových barev, připravení bojovat za vítězství.
          </p>
        </div>

        {players.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {players.map((player: Player) => {
              const photoUrl = player.Photo?.url ? getStrapiMedia(player.Photo.url) : null;
              
              return (
                <div key={player.id} className="bg-white rounded-[2rem] shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 relative border-b-8 border-yellow-400 hover:border-blue-900">
                  
                  {/* Jersey Number Badge */}
                  {player.JerseyNumber && (
                    <div className="absolute top-4 right-4 z-10 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-black text-xl shadow-lg border-4 border-white group-hover:scale-110 transition-transform">
                      {player.JerseyNumber}
                    </div>
                  )}

                  {/* Photo area */}
                  <div className="relative h-80 w-full bg-slate-200 overflow-hidden">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={`Fotka hráče: ${player.Name}`}
                        fill
                        className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-300">
                        <svg className="w-32 h-32 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    )}
                    
                    {/* Gradient Overlay for subtle look */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Name inside gradient */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h2 className="text-2xl font-black text-white group-hover:text-yellow-400 transition-colors drop-shadow-md">
                        {player.Name}
                      </h2>
                      <div className="text-blue-200 font-medium tracking-wide uppercase text-sm mt-1">
                        {player.Position || 'Hráč'}
                      </div>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center shadow-xl border border-slate-100">
            <svg className="w-16 h-16 mx-auto text-slate-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Zatím nebyly přidáni žádní hráči</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Soupiska momentálně zeje prázdnotou. Administrátor brzy doplní informace o našem týmu.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
