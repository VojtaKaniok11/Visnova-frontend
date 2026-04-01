import Image from "next/image";

export default function HistoriePage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Historie Klubu
          </h1>

        </div>

        {/* Main Content Container */}
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-16 border border-slate-100 mx-[50px]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            
            {/* Section 1: Poválečné období */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Poválečné období a založení oddílu
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Příchod nových osadníků šel ruku v ruce se zvýšeným zájmem o sport v okolí Višňové. Krátce po válce se z nevyužívaného jabloňového sadu uprostřed obce vybudovalo hřiště, avšak nebyly zbudovány kabiny, které by sloužily jako klubové zázemí. Zároveň vznikl historicky zcela první organizační výbor. Oddíl získal i svůj název, SK Hraničář Višňová. Do klubu začali proudit hráči a již roku 1946 se tým zapojil do okresních soutěží.
              </p>
            </div>

            {/* Historická fotka 1945 */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[480px] aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <Image 
                  src="/1945.jpg" 
                  alt="Historie 1945" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            {/* Historická fotka Kroky */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[480px] aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <Image 
                  src="/Kroky.jpg" 
                  alt="Historie - Kroky" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            {/* Section 2: První kroky */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                První kroky nového týmu
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Oddíl podával výborné výkony, které nezůstaly bez povšimnutí. Zástupci oddílu byli pozváni na sjezd Československé obce sokolské, zároveň byl klub propagován v Čs. rozhlasu. Soudobě vzniklo i žákovské mužstvo. Na počátku padesátých let klub uzavřel dohodu s n.p. Juta Višňová. Klub nově nesl název Sokol Juta Višňová, čímž do klubové kasy mířily značné sponzorské a finanční prostředky. Díky tomu mohlo být založeno například dorostenecké družstvo. Popularita fotbalu v obci rostla a tak roku 1955 započala stavba vytoužených kabin. V roce 1959 byly kabiny předány do užívání. Kolem hřiště bylo vystavěno i oplocení, čímž vyrostl plnohodnotný sportovní areál. Na sklonku šedesátých let byl změněn název fotbalového oddílu na současný TJ Jiskra Višňová.
              </p>
            </div>

            {/* Section 3: Úspěšné období */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Úspěšné období
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                V sezoně 1961/1962 se Jiskře podařilo získat titul Přeborník okresu a cenu za nejslušnější mužstvo. Roku 1967 bylo navrženo pořádat každoroční memoriál na počest tragicky zesnulému Zdeňku Roušarovi, který dlouhá léta patřil k důležitým hráčům A-týmu. V ročníku 1967/1968 mužstvo postoupilo do I. A třídy. Koncem šedesátých let vzniklo B-mužstvo a byl navázán družební styk s BSG Eintracht Kolkwitz. V sedmdesátých letech se klub potloukal mezi B třídou a I. A třídou.
              </p>
            </div>

            {/* Historická fotka 1960 */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[480px] aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <Image 
                  src="/1960.jpg" 
                  alt="Úspěšné období 1960" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            {/* Historická fotka 1987 */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <Image 
                  src="/Historie_1987.jpg" 
                  alt="Historie 1987" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            {/* Section 4: Osmdesátá léta */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Osmdesátá léta
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Na přelomu dekád se rozšířily kabiny, byl zbudován zbrusu nový plot. Činnost zahájil také kiosek, který též finančně podporoval chod klubu. Mužstvo se zvládlo prodrat až do samotného finále Československého poháru, kde padlo s Ústím nad Labem B.
              </p>
            </div>

            {/* Section 5: Zlatá éra */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                “Zlatá éra“
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                V posledním desetiletí milénia se pro tým koupil nový mikrobus s 20 místy a memoriál nově nesl jméno Bohumila Bursy. V tomto období to však byly ty méně pamětihodné momenty. Mezi ročníky 1997/1998 a 1998/1999 se týmu podařilo postoupit dvakrát za sebou a sezónu a půl projít bez jediné prohry. Tato famózní jízda zůstane v pamětích všech višňovských fanoušků. Fotbalem v té době žilo celé široké okolí. Postup 3 x za sebou – z Okresního přeboru do I.B třídy do I. A třídy a do Oblastního přeboru (po reorganizaci v současné době Krajský přebor).
              </p>
            </div>

            {/* Section 6: Nultá léta */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Nultá léta
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Provedly se zásadní úpravy hrací plochy. Velký milník přichází roku 2004, kdy se začínají práce na výstavbě umělé plochy za hlavním hřištěm. Následující rok je vše zhotovené a za doprovodu slavnostního zahájení je UMT zpřístupněna všem…
              </p>
            </div>
          </div>
        </div>

        {/* Bubble 2: Moderní éra (od roku 2006) */}
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-16 border border-slate-100 mx-[50px] mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            
            {/* Section 7: Rok 2006 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Rok 2006
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Již v lednu začíná výbor plánovat oslavy 60. let fotbalu. V květnu dostáváme dotaci od ČMFS na činnost sportovní fotbalové třídy při ZŠ. Při příležitosti otvírání česko-polské hranice se koná turnaj gard. Do oddílu vstupuje nový sponzor, firma BENTELER. Výbor pracuje ve složení J. Cýrus (předseda), P. Jína (sekretář), M. Melka st. (ekonom) a další členové.
              </p>
            </div>

            {/* Section 8: Rok 2007 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Rok 2007
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Plánování opravy občerstvení a kabin za pomoci členů V. Veselého a J. Soukupa ml. V červenci se koná 2. ročník Memoriálu Mirka Peška. Dochází k velkým rošádám v přestupech a změně na postu sekretáře, kde p. Jínu nahradil p. Milan Mazánek.
              </p>
            </div>

            {/* Section 9: Rok 2008 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Rok 2008
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Oslavy 40. výročí fotbalové družby s německým SV 96 KOLKWITZ. Bohatý program pro hosty včetně návštěvy muzea a ohňostroje. K A mužstvu nastupuje trenér Karel Ševčík. Po letech služeb je prodán autobus Avia Ikarus.
              </p>
            </div>

            {/* Section 10: Rok 2009 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Rok 2009
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Zapojení mládeže do družby s Kolkwitz – zájezd přípravky pod vedením Pavla Jíny. Děti měly nabitý program včetně bowlingu a grilování. Předsevzetí o pokračování družby bylo naplněno, následovala pauza do roku 2014.
              </p>
            </div>

            {/* Section 11: Rok 2010 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Rok 2010
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Příprava na video-natáčení zápasů a přenosy na TV COM. U B mužstva nastupují noví trenéři J. Chadima a J. Chládek. Smutnou událostí bylo úmrtí trenéra A mužstva Karla Ševčíka. Rozhodnutí o zvětšení základny mládeže a rekonstrukce kabin (topení, WC).
              </p>
            </div>

            {/* Section 12: Rok 2011 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Rok 2011
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Zvolen nový výbor (předseda Filip Šolta). Dokončení ústředního topení a sociálek. Oddíl po třetí v řadě vyhrává okresní pohár. Hráč Lukáš Zach zachraňuje spoluhráče při kolapsu v Hejnicích. K A týmu přichází trenér Jaroslav Leibl.
              </p>
            </div>

            {/* Section 13: Rok 2012 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Rok 2012
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Nástup nového systému FAČR – elektronická revoluce v evidenci a poště. Na Memoriál M. Peška přijíždí staří kamarádi z Kolkwitz. Pokračuje rozvoj přípravky a školení nových trenérů.
              </p>
            </div>

            {/* Section 14: Rok 2013 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Rok 2013
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Plošná výměna registračních průkazů. Úpravy trávníku, instalace nových branek. B mužstvo má za úkol postoupit do I.B třídy. Nejmladší fotbalisté doprovází ligové hráče při utkání Slovan Liberec – Příbram. Členové TJ se zapojují do komunálních voleb.
              </p>
            </div>

            {/* Section 15: Rok 2014 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Rok 2014
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                A mužstvo vítězí v Krajském přeboru a vybojovává postup do divize, kterého se však vzdává. Další úspěšný družební zájezd do Kolkwitz (2. místo na turnaji). Filip Šolta a Iva Cýrusová jsou zvoleni do obecního zastupitelstva.
              </p>
            </div>

            {/* Section 16: Rok 2015 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Rok 2015
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Nová pravidla FAČR (konec vetování rozhodčích, hlášení kořalky v kiosku). Zařazení mladší přípravky do soutěží. Milan Mazánek se vrací do funkce sekretáře. Příchod čtyř hráčů z Dětřichova na hostování.
              </p>
            </div>

            {/* Section 17: Rok 2016 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Rok 2016
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Klub má 5 mládežnických a 2 dospělá mužstva. U A týmu střídá trenéra Leibla Milan Melka ml. Úspěšný zájezd na turnaj obcí Višňových (2. místo). Další úpravy trávníku a brigády v areálu.
              </p>
            </div>

          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-12 text-center opacity-40">
           <p className="text-slate-900 font-bold uppercase tracking-widest text-xs">
             TJ Jiskra Višňová — Od roku 1946
           </p>
        </div>

      </div>
    </div>
  );
}
