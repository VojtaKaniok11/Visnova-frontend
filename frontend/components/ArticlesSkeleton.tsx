export function ArticlesLoadingSkeleton() {
  return (
    <div className="lg:col-span-1 animate-pulse">
      <div className="h-8 bg-slate-300 rounded-lg w-48 mb-12" />
      <div className="bg-slate-100 rounded-[2.5rem] overflow-hidden">
        <div className="h-64 bg-slate-200" />
        <div className="p-10 space-y-4">
          <div className="h-6 bg-slate-200 rounded w-32" />
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
