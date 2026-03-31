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
  Score?: string | null;
  Team?: string;
}


export default async function Home() {
  // Fetch all relevant matches
  let matches: Match[] = [];
  try {
    const matchesRes = await fetchAPI('/matches', {
      'populate': '*',
      'sort[0]': 'Date:desc',
      'pagination[pageSize]': 100,
    });
    matches = matchesRes.data || [];
  } catch (error) {
    console.error('Error fetching matches', error);
  }


  // Fetch articles with explicit populate
  let articles: Article[] = [];
  try {
    const articlesRes = await fetchAPI('/articles', {
      'populate': '*', 
      'sort[0]': 'createdAt:desc',
      'pagination[limit]': '3',
    });
    articles = articlesRes.data || [];
  } catch (error) {
    console.error('Error fetching articles', error);
  }

  return (
    <div>
      {/* Main Content Areas */}
      <section id="zapas" className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Row 1: Next Match (Full Width) */}
          <div className="mb-20">
            <MatchList matches={matches} show="upcoming" />
          </div>
            
          {/* Row 2: Grid with Past matches and First Article */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Column 1: Past Matches */}
            <div className="lg:col-span-1">
              <MatchList matches={matches} show="past" />
            </div>

            {/* Column 2: First Article */}
            <div id="aktuality-top" className="lg:col-span-1">
              <h2 className="text-4xl font-black text-blue-900 mb-12 flex items-center gap-6">
                <span className="w-14 h-3 bg-yellow-400 rounded-full inline-block shadow-md"></span>
                Aktuality
              </h2>
              
              {articles.length > 0 && (
                <ArticleCard article={articles[0]} />
              )}
            </div>
          </div>

          {/* Row 3: Remaining 2 Articles side-by-side */}
          {articles.length > 1 && (
            <div className="mt-20">
              <h2 className="text-4xl font-black text-blue-900 mb-12 flex items-center gap-6">
                <span className="w-14 h-3 bg-yellow-400 rounded-full inline-block shadow-md"></span>
                Další novinky
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {articles.slice(1).map((article: Article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Helper component for Article Card to avoid repetition
function ArticleCard({ article }: { article: Article }) {
  const imageUrl = getStrapiMedia(article.CoverImage);
  
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
    <article className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col h-full border border-slate-100 hover:-translate-y-2">
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
}
