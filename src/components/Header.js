// Header Component
export function Header({ currentPaper, onOpenPaperSelector, stats, onToggleCalculator, onOpenSettings }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30">
            G
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-200 bg-clip-text text-transparent">
                GATE AI Practice Agent
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                PYQ Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              IISc & IIT standard PYQ-modeled practice with instant evaluation
            </p>
          </div>
        </div>

        {/* Paper Selector & Live Stats */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Active GATE Paper Pill */}
          <button
            onClick={onOpenPaperSelector}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-medium border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer group"
            title="Change GATE Paper"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-bold">{currentPaper.code}</span>
            <span className="text-slate-400 hidden md:inline">({currentPaper.shortName})</span>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Virtual Calculator Button */}
          <button
            onClick={onToggleCalculator}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-900/60 text-slate-300 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/50 transition text-xs flex items-center space-x-1.5"
            title="Open GATE Virtual Calculator"
          >
            <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="hidden sm:inline font-mono font-bold">Calculator</span>
          </button>

          {/* Score & Accuracy Badges */}
          <div className="hidden lg:flex items-center space-x-2 bg-slate-950/70 px-3 py-1 rounded-lg border border-slate-800 font-mono text-xs">
            <span className="text-slate-400">Score:</span>
            <span className={`font-bold ${stats.score >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {stats.score.toFixed(2)}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Acc:</span>
            <span className="font-bold text-sky-400">
              {stats.attempted > 0 ? `${Math.round((stats.correct / stats.attempted) * 100)}%` : '0%'}
            </span>
          </div>

          {/* AI Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-blue-400 border border-slate-700 transition"
            title="Configure AI & Gemini API"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

        </div>
      </div>
    </header>
  );
}
