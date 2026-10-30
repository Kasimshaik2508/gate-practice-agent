// GATE Paper & Discipline Selection Modal / Screen
import { GATE_PAPERS } from '../data/papers.js';

export function PaperSelector({ isOpen, onClose, currentPaper, onSelectPaper }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                GATE 2025 / 2026
              </span>
              <span className="text-xs text-slate-400">Official Exam Syllabus</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              Select Your Target GATE Paper
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Choose your engineering discipline. The practice agent will tailor all topics, questions, and PYQ patterns accordingly.
            </p>
          </div>
          {currentPaper && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            >
              ✕
            </button>
          )}
        </div>

        {/* Paper Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {GATE_PAPERS.map((paper) => {
            const isSelected = currentPaper?.id === paper.id;
            return (
              <div
                key={paper.id}
                onClick={() => {
                  onSelectPaper(paper);
                  onClose();
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'border-blue-500 bg-blue-950/30 shadow-lg shadow-blue-500/10'
                    : 'border-slate-800 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                {/* Accent Ribbon */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${paper.color}`} />

                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-black font-mono tracking-tight text-white group-hover:text-blue-400 transition">
                        {paper.code}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                        {paper.badge}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm text-slate-200 mt-1">
                      {paper.name}
                    </h3>
                  </div>
                  {isSelected && (
                    <span className="text-blue-400 text-lg">✓</span>
                  )}
                </div>

                {/* Key subjects preview */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    High-Yield Subjects:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {paper.subjects.slice(0, 3).map((subj) => (
                      <span
                        key={subj.id}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-700"
                      >
                        {subj.name.split('&')[0].trim()}
                      </span>
                    ))}
                    <span className="text-[11px] px-1.5 py-0.5 text-slate-400">
                      +{paper.subjects.length - 3} more
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>You can switch your paper at any time from the top bar.</span>
          {currentPaper && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
            >
              Continue with {currentPaper.code}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
