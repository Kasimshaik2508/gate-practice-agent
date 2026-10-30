// Aspirant Profile Overview & Account Management Modal
export function UserProfileModal({
  isOpen,
  onClose,
  user,
  stats,
  history,
  onEditProfile,
  onSignOut
}) {
  if (!isOpen || !user) return null;

  const totalSolved = history.length;
  const correctCount = history.filter((h) => h.isCorrect).length;
  const lifetimeScore = history.reduce((sum, h) => sum + (h.marksAwarded || 0), 0);
  const accuracy = totalSolved > 0 ? Math.round((correctCount / totalSolved) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>{user.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {user.paperId}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {user.email || 'Aspirant'} &bull; {user.targetYear}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Lifetime Stats */}
        <div className="my-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Lifetime Preparation Stats
          </span>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Solved</span>
              <div className="text-lg font-mono font-bold text-white mt-0.5">{totalSolved}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Score</span>
              <div className={`text-lg font-mono font-bold mt-0.5 ${lifetimeScore >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {lifetimeScore.toFixed(2)}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Accuracy</span>
              <div className="text-lg font-mono font-bold text-sky-400 mt-0.5">{accuracy}%</div>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-500">Target Paper:</span>
            <span className="font-bold text-white">GATE {user.paperId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Target Exam:</span>
            <span className="font-bold text-white">{user.targetYear}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Daily Target:</span>
            <span className="font-bold text-white">{user.dailyGoal} questions / day</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onSignOut();
            }}
            className="text-xs text-rose-400 hover:text-rose-300 transition"
          >
            Sign Out / Switch User
          </button>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                onClose();
                onEditProfile();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              Edit Profile
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
