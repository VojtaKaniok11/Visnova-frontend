import { fetchAPI, getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import MatchList from '@/components/MatchList';


export const revalidate = 60;

interface ContentChild {
  text: string;
}

interface ContentBlock {
  type: string;
  children?: ContentChild[];
}

interface Article {
  id: number;
  documentId: string;
  Title: string;
  Content: ContentBlock[] | string;
  createdAt: string;
  CoverImage?: any; // Updated for Strapi 5 direct data
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
      'populate': '*',
      'sort[0]': 'Date:desc',
    });
    matches = matchesRes.data || [];
  } catch (error) {
    console.error('Error fetching matches', error);
  }


  // Fetch articles with explicit populate
  let articles: Article[] = [];
  try {
    // Ensuring ?populate=* is correctly passed
    const articlesRes = await fetchAPI('/articles', {
      'populate': '*', 
      'sort[0]': 'createdAt:desc',
      'pagination[limit]': '2',
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
          {/* Subtle glow / pattern */}
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Column 1: Match Info (Wider now) */}
            <div className="lg:col-span-1">
              <MatchList matches={matches} />
            </div>

            {/* Column 2: Articles (Next to it) */}
            <div id="aktuality" className="lg:col-span-1">

              <h2 className="text-4xl font-black text-blue-900 mb-12 flex items-center gap-6">
                <span className="w-14 h-3 bg-yellow-400 rounded-full inline-block shadow-md"></span>
                Aktuality
              </h2>
              
              <div className="grid grid-cols-1 gap-10">
                {articles.length > 0 ? articles.map((article: Article) => {
                  const imageUrl = getStrapiMedia(article.CoverImage);
                  
                  // KROK 4: Ladění (přidáno pro kontrolu)
                  console.log('DEBUG: URL pro článek', article.Title, 'je:', Array.isArray(article.CoverImage) ? article.CoverImage[0]?.url : article.CoverImage?.url);
                  
                  // Extract summary from Blocks content if needed
                  let summary = 'Klikněte pro více informací o tomto článku.';
                  if (typeof article.Content === 'string') {
                    summary = article.Content;
                  } else if (Array.isArray(article.Content)) {
                    const contentBlocks = article.Content as any[];
                    const firstParagraph = contentBlocks.find((block: any) => block.type === 'paragraph');
                    if (firstParagraph) {
                      summary = firstParagraph.children?.map((child: any) => child.text).join(' ') || summary;
                    }
                  }

                  return (
                    <article key={article.id} className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col h-full border border-slate-100 hover:-translate-y-2">
                       {/* Card Header with image at the very top */}
                       <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={article.Title || 'Article Image'}
                            fill
                            unoptimized={true}
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
                            <svg className="w-16 h-16 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      
                      <div className="p-10 flex-1 flex flex-col">
                        <div className="text-sm text-blue-700 font-black tracking-widest uppercase mb-4 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                          {new Date(article.createdAt).toLocaleDateString('cs-CZ')}
                        </div>
                        
                        <h3 className="text-2xl font-black text-blue-900 mb-5 leading-tight group-hover:text-blue-700 transition-colors">
                          {article.Title}
                        </h3>
                        
                        <p className="text-slate-600 mb-8 flex-1 line-clamp-3 leading-relaxed font-medium opacity-80">
                          {summary}
                        </p>
                        
                        <div className="mt-auto">
                          <Link 
                            href={`/aktuality/${article.documentId}`}
                            className="inline-flex items-center px-6 py-2.5 bg-blue-900 text-yellow-400 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-800 transition-all shadow-lg hover:shadow-blue-900/20 active:scale-95 group/btn"
                          >
                            Číst více 
                            <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                }) : (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-[2.5rem] p-16 text-center text-slate-500 shadow-sm border border-slate-100">
                    <p className="text-xl font-medium">Zatím nebyly publikovány žádné novinky.</p>
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
