export function MatchesLoadingSkeleton() {
  return (
    <div className="space-y-16 animate-pulse">
      {/* Upcoming match skeleton */}
      <div className="bg-blue-950/30 rounded-[2rem] p-10 md:p-14 h-64 md:h-72" />

      {/* Past results skeleton */}
      <div>
        <div className="h-8 bg-slate-300 rounded-lg w-48 mb-12" />
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-100 rounded-[2.5rem] h-32 md:h-24" />
          ))}
        </div>
      </div>
    </div>
  );
}
