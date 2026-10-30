// Session Performance & GATE Analytics Dashboard
export function StatsDashboard({ stats, onResetStats, currentPaper }) {
  const accuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl mb-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <span>Session GATE Performance</span>
            <span className="text-xs font-mono font-normal text-slate-400">({currentPaper.code})</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time tracking with authentic negative marking penalties
          </p>
        </div>
        <button
          onClick={onResetStats}
          className="text-xs text-slate-400 hover:text-rose-400 transition cursor-pointer"
        >
          Reset Session
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
        
        {/* Net GATE Score */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Net GATE Marks
          </span>
          <div className={`text-2xl font-black font-mono mt-1 ${
            stats.score >= 0 ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {stats.score.toFixed(2)}
          </div>
          <span className="text-[10px] text-slate-400">
            Includes -1/3 negative marks
          </span>
        </div>

        {/* Accuracy */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Accuracy
          </span>
          <div className="text-2xl font-black font-mono text-sky-400 mt-1">
            {accuracy}%
          </div>
          <span className="text-[10px] text-slate-400">
            {stats.correct} correct of {stats.attempted}
          </span>
        </div>

        {/* Questions Attempted */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Total Attempted
          </span>
          <div className="text-2xl font-black font-mono text-indigo-400 mt-1">
            {stats.attempted}
          </div>
          <span className="text-[10px] text-slate-400">
            {stats.incorrect} wrong &bull; {stats.attempted - stats.correct - stats.incorrect} skipped
          </span>
        </div>

        {/* Penalty Deducted */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Negative Penalties
          </span>
          <div className="text-2xl font-black font-mono text-rose-400 mt-1">
            -{stats.totalPenalty.toFixed(2)}
          </div>
          <span className="text-[10px] text-slate-400">
            Avoidable mistakes
          </span>
        </div>

      </div>
    </div>
  );
}
