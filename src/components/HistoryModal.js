// Aspirant Attempt History & Revision Error Notebook
import { useState } from 'react';
import { renderMathInText } from './KaTeXRenderer.js';

export function HistoryModal({ isOpen, onClose, history, onClearHistory }) {
  if (!isOpen) return null;

  const [filter, setFilter] = useState('ALL'); // 'ALL', 'MISTAKES', 'CORRECT'
  const [expandedId, setExpandedId] = useState(null);

  const filteredHistory = history.filter((item) => {
    if (filter === 'MISTAKES') return !item.isCorrect;
    if (filter === 'CORRECT') return item.isCorrect;
    return true;
  });

  const totalScore = history.reduce((acc, curr) => acc + (curr.marksAwarded || 0), 0);
  const correctCount = history.filter((h) => h.isCorrect).length;
  const accuracy = history.length > 0 ? Math.round((correctCount / history.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-base">
                📖
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Aspirant Attempt History & Error Notebook
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Review your previous solved questions, examine mistake traps, and revisit mathematical derivations.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition self-end sm:self-auto cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* History Summary Bar */}
        <div className="grid grid-cols-3 gap-3 my-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Total Solved</span>
            <div className="text-xl font-bold font-mono text-white mt-0.5">{history.length}</div>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Lifetime Marks</span>
            <div className={`text-xl font-bold font-mono mt-0.5 ${totalScore >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {totalScore.toFixed(2)}
            </div>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Overall Accuracy</span>
            <div className="text-xl font-bold font-mono text-sky-400 mt-0.5">{accuracy}%</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                filter === 'ALL' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Attempts ({history.length})
            </button>
            <button
              onClick={() => setFilter('MISTAKES')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                filter === 'MISTAKES' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-rose-300'
              }`}
            >
              Mistakes Only ({history.filter((h) => !h.isCorrect).length})
            </button>
            <button
              onClick={() => setFilter('CORRECT')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                filter === 'CORRECT' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              Correct ({correctCount})
            </button>
          </div>

          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-400 hover:text-rose-300 transition cursor-pointer"
            >
              Clear Log
            </button>
          )}
        </div>

        {/* List of Previous Questions */}
        {filteredHistory.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
            <span className="text-3xl">📝</span>
            <h4 className="text-base font-bold text-slate-300 mt-2">No history items match this filter</h4>
            <p className="text-xs text-slate-400 mt-1">
              Start practicing and answering questions to build your error notebook.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((item, idx) => {
              const isExpanded = expandedId === item.id;
              const formattedDate = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div
                  key={item.id || idx}
                  className={`rounded-xl border transition-all overflow-hidden ${
                    item.isCorrect
                      ? 'border-emerald-900/40 bg-emerald-950/10'
                      : 'border-rose-900/40 bg-rose-950/10'
                  }`}
                >
                  {/* Card Bar */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/40 transition"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        item.isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {item.isCorrect ? '✓' : '✕'}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-white">
                            {item.paper} &bull; {item.subtopic || item.subject}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                            {item.type}
                          </span>
                          <span className="text-[10px] text-slate-400">{formattedDate}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-1 font-serif">
                          {item.questionText ? item.questionText.slice(0, 100) + '...' : 'GATE Question'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 self-end sm:self-auto">
                      <div className="text-right">
                        <div className={`text-sm font-mono font-bold ${
                          item.marksAwarded > 0 ? 'text-emerald-400' : item.marksAwarded < 0 ? 'text-rose-400' : 'text-slate-400'
                        }`}>
                          {item.marksAwarded > 0 ? `+${item.marksAwarded.toFixed(2)}` : item.marksAwarded.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Your: <span className="font-bold text-white">{Array.isArray(item.userAnswer) ? item.userAnswer.join(',') : item.userAnswer}</span> | Ans: <span className="text-emerald-400 font-bold">{Array.isArray(item.correctAnswer) ? item.correctAnswer.join(',') : item.correctAnswer}</span>
                        </div>
                      </div>
                      <span className="text-slate-400 text-xs">{isExpanded ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {/* Expanded Detail View */}
                  {isExpanded && (
                    <div className="p-5 border-t border-slate-800 bg-slate-950/70 space-y-4 text-xs animate-fadeIn">
                      <div>
                        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                          Complete Question:
                        </span>
                        <div
                          className="text-slate-200 mt-1 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: renderMathInText(item.questionText) }}
                        />
                      </div>

                      {item.explanation && (
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                          {item.explanation.concept && (
                            <div>
                              <span className="text-blue-400 font-bold uppercase text-[10px]">Concept:</span>
                              <div className="font-bold text-white text-sm">{item.explanation.concept}</div>
                            </div>
                          )}

                          {item.explanation.formula && (
                            <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-900/40 text-center font-serif text-blue-200" dangerouslySetInnerHTML={{ __html: renderMathInText(`$$${item.explanation.formula}$$`) }} />
                          )}

                          {item.explanation.steps && (
                            <div>
                              <span className="text-slate-400 font-bold uppercase text-[10px]">Derivation:</span>
                              <ol className="list-decimal list-inside space-y-1 text-slate-300 mt-1">
                                {item.explanation.steps.map((s, i) => (
                                  <li key={i} dangerouslySetInnerHTML={{ __html: renderMathInText(s) }} />
                                ))}
                              </ol>
                            </div>
                          )}

                          {item.explanation.trap && (
                            <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/40 text-amber-200">
                              <span className="font-bold text-amber-400">⚠️ GATE Trap: </span>
                              {item.explanation.trap}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
          >
            Close Notebook
          </button>
        </div>

      </div>
    </div>
  );
}
