export default function HistoriePage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tight mb-4 flex justify-center items-center gap-6">
            <div className="w-10 h-2 bg-yellow-400 rounded-full"></div>
            Historie Klubu
            <div className="w-10 h-2 bg-yellow-400 rounded-full"></div>
          </h1>
          <p className="text-lg text-slate-600 font-medium mt-6 opacity-70">
            Od skromných začátků až po současnost. Příběh TJ Jiskra Višňová.
          </p>
        </div>

        <div className="bg-white rounded-[4rem] shadow-2xl p-12 md:p-20 relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-blue-900">
            <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
              <path d="m21.2 5.3-2.6-2.6a1 1 0 0 0-1.4 0l-1.3 1.3-1.6-1.6a1 1 0 0 0-1.4 0l-1.3 1.3-1.6-1.6a1 1 0 0 0-1.4 0L9 4.7 7.7 3.4a1 1 0 0 0-1.4 0L3.7 6a1 1 0 0 0 0 1.4L5 8.7 3.4 10.3a1 1 0 0 0 0 1.4l1.6 1.6-1.3 1.3a1 1 0 0 0 0 1.4L6.3 18.6a1 1 0 0 0 1.4 0l1.3-1.3 1.6 1.6a1 1 0 0 0 1.4 0l1.3-1.3 1.6 1.6a1 1 0 0 0 1.4 0L17.7 18l1.3 1.3a1 1 0 0 0 1.4 0l2.6-2.6a1 1 0 0 0 0-1.4L20.4 14l1.6-1.6a1 1 0 0 0 0-1.4l-1.6-1.6 1.3-1.3a1 1 0 0 0 0-1.4l-1.6-1.6 1.1-1.1a1 1 0 0 0 0-1.4zM24 12c0 6.6-5.4 12-12 12S0 18.6 0 12 5.4 0 12 0s12 5.4 12 12z"/>
            </svg>
          </div>

          <div className="max-w-2xl text-slate-700 space-y-8 leading-relaxed text-lg">
            <p className="first-letter:text-5xl first-letter:font-black first-letter:text-blue-900 first-letter:float-left first-letter:mr-3">
              Historie našeho klubu sahá desítky let do minulosti. TJ Jiskra Višňová byla vždy srdcem naší obce, místem střetávání a sportovního zápolení. Od dob, kdy se hrálo na hřištích, která nebyla zdaleka tak dokonalá jako ta dnešní, jsme ušli dlouhou cestu.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-center text-center">
                <span className="text-4xl text-blue-900 font-black mb-2">120+</span>
                <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Aktivních hráčů</span>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-center text-center">
                <span className="text-4xl text-blue-900 font-black mb-2">3</span>
                <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Soutěžní týmy</span>
              </div>
            </div>
            <p>
              V průběhu let se vystřídalo mnoho generací hráčů, funkcionářů i fanoušků. Každý z nich přispěl svým dílem k tomu, že Jiskra i dnes stojí jako hrdý reprezentant Višňové na fotbalové mapě našeho kraje.
            </p>
            <p>
              Naše úspěchy v krajských a okresních soutěžích jsou důkazem tvrdé práce všech, kteří s klubem spojili svůj osud. Důležitější než trofeje v našich vitrínách je však přátelství a sportovní duch, který náš klub provází od jeho založení.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
