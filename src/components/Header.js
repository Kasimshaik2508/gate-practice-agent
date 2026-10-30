// Header Component with Aspirant Profile & Error Notebook triggers
export function Header({
  currentPaper,
  onOpenPaperSelector,
  stats,
  historyCount,
  onToggleCalculator,
  onOpenSettings,
  user,
  onOpenProfile,
  onOpenHistory,
  onOpenSignIn
}) {
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
              {user ? `Aspirant: ${user.name} • ${user.targetYear}` : 'IIT & IISc standard PYQ practice with instant evaluation'}
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Active GATE Paper Pill */}
          <button
            onClick={onOpenPaperSelector}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer group"
            title="Change GATE Paper"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-bold">{currentPaper.code}</span>
            <span className="text-slate-400 hidden md:inline">({currentPaper.shortName})</span>
            <span className="text-slate-400 text-xs">▼</span>
          </button>

          {/* Error Notebook / History Button */}
          <button
            onClick={onOpenHistory}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500/40 transition text-xs flex items-center space-x-1.5 cursor-pointer relative"
            title="View Attempt History & Error Notebook"
          >
            <span className="text-sm">📖</span>
            <span className="hidden sm:inline font-medium">History</span>
            {historyCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-600 text-white font-bold font-mono">
                {historyCount}
              </span>
            )}
          </button>

          {/* Virtual Calculator Button */}
          <button
            onClick={onToggleCalculator}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-900/60 text-slate-300 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/50 transition text-xs flex items-center space-x-1.5 cursor-pointer"
            title="Open GATE Virtual Calculator"
          >
            <span className="hidden sm:inline font-mono font-bold">Calculator</span>
            <span className="sm:hidden font-mono text-xs">🧮</span>
          </button>

          {/* Score & Accuracy Badges */}
          <div className="hidden xl:flex items-center space-x-2 bg-slate-950/70 px-3 py-1 rounded-lg border border-slate-800 font-mono text-xs">
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

          {/* User Profile Pill or Sign In Button */}
          {user ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center space-x-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-gradient-to-r from-blue-950 to-indigo-950 border border-blue-500/40 hover:border-blue-400 transition cursor-pointer"
              title="Aspirant Profile"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-blue-200 hidden md:inline max-w-[90px] truncate">
                {user.name}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenSignIn}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center space-x-1.5"
            >
              <span>Sign In</span>
            </button>
          )}

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-blue-400 border border-slate-700 transition cursor-pointer text-xs"
            title="Configure AI & Gemini API"
          >
            ⚙
          </button>

        </div>
      </div>
    </header>
  );
}
