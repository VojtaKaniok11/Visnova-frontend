import { fetchAPI } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import MatchList from '@/components/MatchList';


export const revalidate = 60;

interface StrapiImage {
  url: string;
}

interface Article {
  id: number;
  Title: string;
  Content: string;
  createdAt: string;
  CoverImage?: StrapiImage;
}

interface Match {
  id: number;
  Opponent: string;
  Date: string;
  IsHomeGame: boolean;
}


export default async function Home() {
  // Fetch all relevant matches
  let matches = [];
  try {
    const matchesRes = await fetchAPI('/matches', {
      'sort[0]': 'Date:desc',
    });
    matches = matchesRes.data || [];
  } catch (error) {
    console.error('Error fetching matches', error);
  }


  // Fetch articles
  let articles: Article[] = [];
  try {
    const articlesRes = await fetchAPI('/articles', {
      'sort[0]': 'createdAt:desc',
      'pagination[limit]': '2',
      'populate': '*', // Get media
    });
    articles = articlesRes.data || [];
  } catch (error) {
    console.error('Error fetching articles', error);
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-blue-800 to-transparent"></div>
          {/* Subtle background pattern or image can go here */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
            <svg viewBox="0 0 200 200" className="w-[800px] h-[800px]" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FBBF24" d="M43.3,-72.1C55.4,-64.1,64.1,-50.2,71,-35.8C77.9,-21.4,82.9,-6.4,81.1,8C79.4,22.3,70.9,35.9,60.8,47.4C50.6,58.8,38.8,68,25,73.4C11.1,78.8,-4.8,80.4,-20.1,77C-35.4,73.6,-50,65.3,-61.7,53.2C-73.4,41,-82.1,25,-84.9,8.4C-87.8,-8.3,-84.8,-25.6,-75.7,-39.8C-66.6,-53.9,-51.4,-64.9,-36.5,-70.7C-21.5,-76.6,-7,-77.3,4.7,-84.5C16.3,-91.7,31.2,-79.9,43.3,-72.1Z" transform="translate(100 100) scale(1.1)"></path>
            </svg>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Zpátky na <span className="text-yellow-400">vrchol</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
            Oficiální webové stránky fotbalového klubu TJ Jiskra Višňová. Fanděte s námi a sledujte naše úspěchy!
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row">
            <Link href="/soupiska" className="px-8 py-4 text-lg font-bold rounded-full bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-400/50 hover:scale-105">
              Naše soupiska
            </Link>
            <a href="#aktuality" className="px-8 py-4 text-lg font-bold rounded-full bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 transition-all shadow-lg hover:scale-105">
              Zobrazit novinky
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Areas */}
      <section id="zapas" className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Col: Matches Info */}
            <div className="lg:col-span-1">
              <MatchList matches={matches} />
            </div>

            {/* Right Col: Articles */}
            <div id="aktuality" className="lg:col-span-1">

              <h2 className="text-4xl font-extrabold text-blue-900 mb-10 flex items-center gap-4">
                <span className="w-10 h-2 bg-yellow-400 rounded-full inline-block"></span>
                Aktuality
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.length > 0 ? articles.map((article: Article) => {
                  const imageUrl = article.CoverImage?.url ? 'http://localhost:1337' + article.CoverImage.url : '/placeholder.png';
                  
                  return (
                    <article key={article.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden group flex flex-col h-full">
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={article.Title || 'Article Image'}
                          fill
                          unoptimized={true}
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="p-8 flex-1 flex flex-col">
                        <div className="text-xs text-blue-600 font-black tracking-widest uppercase mb-3">
                          {new Date(article.createdAt).toLocaleDateString('cs-CZ')}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
                          {article.Title}
                        </h3>
                        {/* We use a simple truncation for content. In a real app we might use a summary field or strip markdown/HTML */}
                        <p className="text-slate-600 mb-6 flex-1 line-clamp-3">
                          {typeof article.Content === 'string' ? article.Content : 'Klikněte pro více informací o tomto článku. Podrobnosti se dozvíte uvnitř.'}
                        </p>
                        
                        <div className="mt-auto">
                          <span className="inline-flex items-center font-bold text-blue-700 hover:text-yellow-500 transition-colors cursor-pointer">
                            Číst více 
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                }) : (
                  <div className="col-span-1 md:col-span-2 bg-white rounded-3xl p-12 text-center text-slate-500 shadow-sm border border-slate-100">
                    <p className="text-lg">Zatím nebyly publikovány žádné novinky.</p>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
    </div>
  );
}
