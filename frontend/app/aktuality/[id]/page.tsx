import { fetchAPI, getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import ClientDate from '@/components/ClientDate';

interface ContentChild {
  text: string;
}

interface ContentBlock {
  type: string;
  level?: number;
  children?: ContentChild[];
}

interface Article {
  id: number;
  documentId: string;
  Title: string;
  Content: ContentBlock[];
  createdAt: string;
  CoverImage?: any;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let article: Article | null = null;
  
  try {
    const res = await fetchAPI(`/articles/${id}`, {
      'populate': '*',
    });
    article = res.data;
  } catch (error) {
    console.error('Error fetching article detail', error);
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-blue-900 mb-6 tracking-tight">Článek nebyl nalezen</h1>
          <Link href="/" className="px-8 py-3 bg-blue-900 text-yellow-400 font-black rounded-xl hover:bg-blue-800 transition-all uppercase tracking-widest text-sm shadow-lg">
            Zpět na hlavní stranu
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = getStrapiMedia(article.CoverImage);
  
  // KROK 4: Ladění (přidáno pro kontrolu)
  console.log('DEBUG: URL pro článek detail', article.Title, 'je:', Array.isArray(article.CoverImage) ? article.CoverImage[0]?.url : article.CoverImage?.url);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-8">
        <div className="flex justify-start">
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-900 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition-all shadow-md border border-slate-100 active:scale-95 group">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Zpět na hlavní stranu
          </Link>
        </div>

        <article className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          
          {/* Cover Image */}
          <div className="relative h-[300px] md:h-[500px] w-full bg-slate-200 overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={article.Title}
                fill
                unoptimized={true}
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
                <svg className="w-24 h-24 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <div className="text-yellow-400 font-black tracking-widest uppercase mb-4 text-sm drop-shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <ClientDate dateString={article.createdAt} format="date" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-xl">
                {article.Title}
              </h1>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8 md:p-16">
            <div className="prose prose-lg max-w-none text-slate-700 font-medium leading-[1.8] tracking-normal">
              {Array.isArray(article.Content) ? article.Content.map((block: ContentBlock, index: number) => {
                if (block.type === 'paragraph') {
                  const text = block.children?.map((child: ContentChild) => child.text).join(' ');
                  if (!text || text === '') return null;
                  return <p key={index} className="mb-8 last:mb-0 border-l-4 border-slate-100 pl-6 py-1">{text}</p>;
                }
                if (block.type === 'heading') {
                  const text = block.children?.map((child: ContentChild) => child.text).join(' ');
                  if (block.level === 1) return <h1 key={index} className="text-4xl font-black text-blue-900 mb-8 mt-12">{text}</h1>;
                  if (block.level === 3) return <h3 key={index} className="text-2xl font-black text-blue-900 mb-8 mt-12">{text}</h3>;
                  return (
                    <h2 key={index} className="text-3xl font-black text-blue-900 mb-8 mt-12 flex items-center gap-4">
                      <span className="w-6 h-1.5 bg-yellow-400 rounded-full inline-block"></span>
                      {text}
                    </h2>
                  );
                }
                return null;
              }) : (
                <p className="opacity-60 italic text-center py-10">Obsah článku není k dispozici.</p>
              )}
            </div>
            
            <div className="mt-20 pt-12 border-t border-slate-100 flex items-center justify-center gap-8">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Fandíme Jiskře Višňová</p>
            </div>
          </div>
        </article>
      </main>

      {/* Footer Decoration */}
      <footer className="py-20 bg-slate-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full mb-8"></div>
           <p className="text-blue-900/40 text-[10px] font-black uppercase tracking-[0.5em]">Konec článku • TJ Jiskra Višňová</p>
        </div>
      </footer>
    </div>
  );
}
