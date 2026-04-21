import { fetchAPI, getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import MatchList from '@/components/MatchList';
import ClientDate from '@/components/ClientDate';


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
      <section id="zapas" className="pt-20 pb-40 bg-slate-50 relative">
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


        </div>
      </section>

      {/* Contacts Section */}
      <section id="kontakty" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-yellow-100/20 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-blue-900 mb-6 uppercase tracking-tighter">
              Kontakty
            </h2>
            <div className="w-20 h-1.5 bg-yellow-400 mx-auto rounded-full shadow-sm"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Management & Committee */}
            <div className="lg:col-span-1 space-y-10">
              {/* Management Cards */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-blue-950 flex items-center gap-3">
                  <span className="w-8 h-1 bg-yellow-400 rounded-full"></span>
                  Vedení spolku
                </h3>
                
                {[
                  { role: "Předseda spolku", name: "Milan Melka", tel: "723 231 909", email: "milanmelka@seznam.cz" },
                  { role: "Místopředseda spolku", name: "Filip Šolta", tel: "775 590 284", email: "filip.solta@seznam.cz" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-xs font-black text-yellow-600 uppercase tracking-widest mb-1">{item.role}</p>
                    <p className="text-xl font-black text-blue-900 mb-4">{item.name}</p>
                    <div className="space-y-2">
                      <a href={`tel:${item.tel.replace(/\s/g, '')}`} className="flex items-center gap-3 text-slate-600 hover:text-blue-700 transition-colors font-semibold">
                        <svg className="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {item.tel}
                      </a>
                      <a href={`mailto:${item.email}`} className="flex items-center gap-3 text-slate-600 hover:text-blue-700 transition-colors font-semibold break-all text-sm">
                        <svg className="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        {item.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Committee Members */}
              <div className="bg-blue-900 p-8 rounded-[2.5rem] shadow-xl text-white">
                <h3 className="text-xl font-black mb-6 uppercase tracking-wider flex items-center gap-3">
                  <span className="w-6 h-1 bg-yellow-400 rounded-full"></span>
                  Výkonný výbor
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Petr Soukup", "Jaroslav Soukup", "Pavel Kutílek", "Jaroslav Marek", "Milan Mazánek", "Darek Rücker", "Jiří Stejskal", "Filip Marek", "Milan Pavlů"].map((name, idx) => (
                    <span key={idx} className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold border border-white/5 hover:bg-white/20 transition-colors cursor-default">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Coaches Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
                <div className="bg-blue-900 border-b-4 border-yellow-400 py-6 px-8 flex justify-between items-center">
                  <h3 className="font-black text-white text-xl tracking-[0.1em] uppercase">Trenéři a vedoucí</h3>
                  <div className="hidden sm:block px-4 py-1 bg-yellow-400 text-blue-900 rounded-full text-[10px] font-black tracking-widest uppercase">Mužstva</div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                        <th className="py-4 px-8">Kategorie / Tým</th>
                        <th className="py-4 px-8">Jméno a Role</th>
                        <th className="py-4 px-8 text-right">Kontakt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { cat: "A tým muži", people: [
                          { name: "Milan Melka", role: "Trenér", tel: "723 231 909", email: "milanmelka@seznam.cz" },
                          { name: "Jaroslav Soukup", role: "Vedoucí", tel: "", email: "" }
                        ]},
                        { cat: "B tým muži", people: [
                          { name: "Milan Mazánek", role: "Trenér", tel: "722 960 332", email: "ital57@seznam.cz" },
                          { name: "Patrik Ležovič", role: "Vedoucí", tel: "", email: "" }
                        ]},
                        { cat: "C tým muži", people: [
                          { name: "Skalický Bedřich", role: "Trenér", tel: "774 630 730", email: "Skalicky.Bedrich@seznam.cz" },
                          { name: "Filip Marek", role: "Trenér", tel: "702 104 926", email: "filipmarekm3@seznam.cz" }
                        ]},
                        { cat: "Kategorie U15", people: [
                          { name: "Jindřich Lengál", role: "Trenér", tel: "601 201 666", email: "lengaljindra@seznam.cz" },
                          { name: "Michal Pařík", role: "Trenér", tel: "791 928 029", email: "michalparik@seznam.cz" }
                        ]},
                        { cat: "Kategorie U13", people: [
                          { name: "Milan Pavlů", role: "Trenér", tel: "739 772 778", email: "milan.pavlu90@gmail.com" }
                        ]},
                        { cat: "Kategorie U11", people: [
                          { name: "Milan Pavlů", role: "Trenér", tel: "739 772 778", email: "milan.pavlu90@gmail.com" }
                        ]},
                        { cat: "Kategorie U9", people: [
                          { name: "Pavel Kutílek", role: "Trenér", tel: "607 270 697", email: "paku2612@seznam.cz" }
                        ]},
                        { cat: "U7 + předpřípravka", people: [
                          { name: "Karina Šoltová", role: "Trenérka", tel: "727 805 551", email: "karina.soltova@seznam.cz" }
                        ]}
                      ].map((group, gIdx) => (
                        <tr key={gIdx} className="hover:bg-blue-50/30 transition-colors">
                          <td className="py-6 px-8 align-top">
                            <span className="block font-black text-blue-950 text-base">{group.cat}</span>
                          </td>
                          <td className="py-6 px-8 align-top">
                            {group.people.map((p, pIdx) => (
                              <div key={pIdx} className={pIdx > 0 ? "mt-4 border-t border-slate-100 pt-4" : ""}>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-900">{p.name}</span>
                                  <span className="text-[10px] font-black text-yellow-600 uppercase bg-yellow-50 px-2 py-0.5 rounded-md">{p.role}</span>
                                </div>
                              </div>
                            ))}
                          </td>
                          <td className="py-6 px-8 align-top text-right">
                            {group.people.map((p, pIdx) => (
                              <div key={pIdx} className={pIdx > 0 ? "mt-4 pt-4 h-[41px]" : ""}>
                                {p.tel && (
                                  <div className="flex flex-col items-end gap-1">
                                    <a href={`tel:${p.tel.replace(/\s/g, '')}`} className="text-sm font-bold text-blue-800 hover:underline">{p.tel}</a>
                                    <a href={`mailto:${p.email}`} className="text-[10px] text-slate-500 hover:text-blue-600 transition-colors font-medium lowercase truncate max-w-[150px]">{p.email}</a>
                                  </div>
                                )}
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-slate-50 p-6 mt-auto border-t border-slate-200">
                  <p className="text-xs text-slate-500 font-medium italic">V případě zájmu o nábor do mládežnických kategorií prosím kontaktujte přímo daného trenéra.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-blue-900 mb-6 uppercase tracking-tighter flex flex-col items-center gap-4">
              <span className="text-sm text-yellow-500 font-black tracking-[0.3em] uppercase">Spolupráce</span>
              Naši partneři
            </h2>
            <div className="w-20 h-1.5 bg-yellow-400 mx-auto rounded-full shadow-sm"></div>
          </div>
          
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-x-6 sm:gap-x-12 md:gap-x-20 gap-y-10 sm:gap-y-16 px-2 sm:px-8">
            {[
              { logo: "autodily.webp", url: "https://autodilyvazka.cz/" }, 
              { logo: "bw.jpg", url: "https://bowling-frydlant.cz/" }, 
              { logo: "cis.jpg", url: "https://cis.de/cz/" }, 
              { logo: "Denso-Logo.png", url: "https://denso.cz/" }, 
              { logo: "Fačr.png", url: "https://www.fotbal.cz/facr/" },
              { logo: "juta_logo.png", url: "https://www.juta.cz/" },
              { logo: "liberecky_kraj.webp", url: "https://www.kraj-lbc.cz/" }, 
              { logo: "LOGO-CUS.png", url: "https://www.cuscz.cz/" }, 
              { logo: "louda_auto.png", url: "https://autolouda.cz/koupit_vuz?vyrobce=BYD&auta-nova=True&auta-predvadeci=True&pocet-na-stranu=20&utm_source=google&utm_medium=cpc&utm_campaign=ALW_GA_NV_BYD_Obecn%C3%A9_PMAX_AKV_CI&utm_term=&utm_content=&gad_source=1&gad_campaignid=23337028003&gbraid=0AAAABAI7NM-mAWBdElkirsL8Yn0HBY2YR&gclid=Cj0KCQjwkYLPBhC3ARIsAIyHi3RUuq8rl8ZDRnBmubPIQjm6W-ax5fqSdZJU0uSQSajQ02XGwW7oipYaAqYnEALw_wcB" },
              { logo: "Narodni-sportovni-agentura_logo-rgb - kopie.png", url: "https://nsa.gov.cz/" }, 
              { logo: "stavebniny-zilka.jpg", url: "https://www.zivefirmy.cz/stavebniny-zilka_f422117" },
              { logo: "volosin.jpg", url: "https://www.autoservis-volosin.cz/" }, 
              { logo: "zelezarstvi.jpg", url: "https://www.firmy.cz/detail/2234914-zelezarstvi-jozef-culaga-frydlant.html" }
            ].map((partner, i) => {
              const imageContent = (
                <Image 
                  src={`/${partner.logo}`}
                  alt={`Partner ${partner.logo}`}
                  fill
                  className="object-contain"
                />
              );

              return partner.url ? (
                <a 
                  key={i} 
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-52 md:w-64 lg:w-80 h-16 sm:h-20 md:h-24 lg:h-32 relative hover:scale-105 hover:brightness-110 transition-all cursor-pointer block"
                >
                  {imageContent}
                </a>
              ) : (
                <div 
                  key={i} 
                  className="w-full sm:w-52 md:w-64 lg:w-80 h-16 sm:h-20 md:h-24 lg:h-32 relative"
                >
                  {imageContent}
                </div>
              );
            })}
          </div>

          {/* Table of Subsidies */}
          <div className="mt-24 max-w-5xl mx-auto flex flex-col items-center">
            <div className="text-center mb-10 w-full">
              <h3 className="text-2xl sm:text-3xl font-black text-blue-900 mb-2">Finanční podpora TJ JISKRA Višňová, z.s. v roce 2025</h3>
              <p className="text-slate-500 font-bold uppercase tracking-wider text-xs sm:text-sm">Informace pro rodiče, zákonné zástupce, členy</p>
            </div>
            
            <div className="bg-white rounded-[2rem] shadow-md border border-slate-200 overflow-hidden w-full">
              <div className="bg-blue-900 border-b-4 border-yellow-400 py-4 px-6 text-center">
                <h4 className="font-black text-white text-lg sm:text-xl tracking-[0.2em] uppercase">Dotační projekty – 2025</h4>
              </div>
              
              <div className="overflow-x-auto pb-2 -mb-2">
                <table className="w-full text-left min-w-[550px] md:min-w-full">
                  <thead>
                    <tr className="bg-slate-50/80 border-b-2 border-slate-200 uppercase text-[10px] sm:text-xs font-black text-slate-500 tracking-wider">
                      <th className="py-3 px-4 sm:px-8">Organizace</th>
                      <th className="py-3 px-4 sm:px-8 text-right">Dotace (Kč)</th>
                      <th className="py-3 px-4 sm:px-8">Č. rozhodnutí</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium text-sm sm:text-lg">
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-3 sm:py-4 px-4 sm:px-8 font-black text-blue-950">Národní sportovní agentura</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-right whitespace-nowrap font-bold text-slate-800">353 200</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-slate-500 text-xs sm:text-base">NSA-05200/2025/2508</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-3 sm:py-4 px-4 sm:px-8 font-black text-blue-950">Liberecký kraj – Program 4.23</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-right whitespace-nowrap font-bold text-slate-800">47 000</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-slate-500 text-xs sm:text-base">OLP/01176/2025</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-3 sm:py-4 px-4 sm:px-8 font-black text-blue-950">Obec Višňová – ID</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-right whitespace-nowrap font-bold text-slate-800">136 000</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-slate-500 text-xs sm:text-base">ID 4/2025</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-3 sm:py-4 px-4 sm:px-8 font-black text-blue-950">Obec Višňová – ID</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-right whitespace-nowrap font-bold text-slate-800">2 074</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-slate-500 text-xs sm:text-base">ID 20/2025</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-3 sm:py-4 px-4 sm:px-8 font-black text-blue-950">DENSO Liberec</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-right whitespace-nowrap font-bold text-slate-800">9 000</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-slate-400 text-xs sm:text-base text-center">-</td>
                    </tr>
                    <tr className="bg-slate-50/50 hover:bg-blue-50/50 transition-colors">
                      <td className="py-3 sm:py-4 px-4 sm:px-8 font-black text-blue-950">Liberecký kraj – Program 4.26</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-right whitespace-nowrap font-bold text-slate-800">131 431</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-slate-500 text-xs sm:text-base">OLP/01539/2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-slate-100/50 p-4 sm:px-8 sm:py-5 text-base text-slate-600 border-t-2 border-slate-200">
                <p className="leading-relaxed"><strong className="text-blue-950 font-black">Program 4.26: Prostředky použity na činnost mládeže:</strong> fotbalové míče, tréninkové pomůcky, sportovní vybavení - oblečení s potiskem, fotbalová soustředění, pronájem sportovišť, doprava, výdaje za energie.</p>
              </div>
            </div>
          </div>
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
