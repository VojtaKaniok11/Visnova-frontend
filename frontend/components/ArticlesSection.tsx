import { fetchAPI, getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import ClientDate from './ClientDate';

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
  CoverImage?: any;
}

async function getArticles(): Promise<Article[]> {
  try {
    const articlesRes = await fetchAPI('/articles', {
      'populate': '*',
      'sort[0]': 'createdAt:desc',
      'pagination[limit]': '3',
    });
    return articlesRes.data || [];
  } catch (error) {
    console.error('Error fetching articles', error);
    return [];
  }
}

function ArticleCard({ article }: { article: Article }) {
  const imageUrl = getStrapiMedia(article.CoverImage);

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
          <ClientDate dateString={article.createdAt} format="date" />
        </div>

        <h3 className="text-2xl font-black text-blue-900 mb-5 leading-tight group-hover:text-blue-700 transition-colors">
          {article.Title}
        </h3>

        <p className="text-slate-600 mb-8 flex-1 line-clamp-3 leading-relaxed font-medium opacity-80">
          {summary}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <Link
            href={`/aktuality/${article.documentId}`}
            className="inline-flex items-center px-6 py-2.5 bg-blue-900 text-yellow-400 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-800 transition-all shadow-lg hover:shadow-blue-900/20 active:scale-95 group/btn"
          >
            Číst více
            <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
          <Link
            href="/aktuality"
            className="inline-flex items-center px-6 py-2.5 bg-slate-100 text-slate-700 hover:text-blue-900 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all shadow-sm active:scale-95 group/btn-old"
          >
            Starší články
          </Link>
        </div>
      </div>
    </article>
  );
}

export async function ArticlesSection() {
  const articles = await getArticles();

  return (
    <div id="aktuality-top" className="lg:col-span-1">
      <h2 className="text-2xl font-black text-blue-900 mb-12 flex items-center gap-6 uppercase">
        <span className="w-14 h-3 bg-yellow-400 rounded-full inline-block shadow-md"></span>
        Aktuality
      </h2>

      {articles.length > 0 && <ArticleCard article={articles[0]} />}

      {articles.length === 0 && (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-12 text-center">
          <p className="text-slate-400 text-lg">Žádné články k zobrazení</p>
        </div>
      )}
    </div>
  );
}
