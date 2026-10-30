// Comprehensive GATE Explanation & Solution Modal
import { renderMathInText } from './KaTeXRenderer.js';

export function ExplanationModal({
  isOpen,
  evaluation,
  onClose,
  onNextQuestion
}) {
  if (!isOpen || !evaluation) return null;

  const { isCorrect, marksAwarded, penalty, correctAnswer, explanation } = evaluation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        
        {/* Result Banner */}
        <div className={`p-5 rounded-2xl border mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isCorrect
            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
            : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black ${
              isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
            }`}>
              {isCorrect ? '✓' : '✕'}
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">
                {isCorrect ? 'Correct Answer! Outstanding.' : 'Incorrect Response'}
              </h3>
              <p className="text-xs opacity-90">
                {isCorrect
                  ? 'Your conceptual reasoning aligns with the official GATE marking scheme.'
                  : 'Review the detailed step-by-step derivation below to master this concept.'}
              </p>
            </div>
          </div>

          {/* GATE Marks Badge */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-700/50">
            <span className="text-xs font-mono uppercase tracking-wider opacity-80">
              Marks Awarded
            </span>
            <span className={`text-2xl font-mono font-black ${
              marksAwarded > 0 ? 'text-emerald-400' : marksAwarded < 0 ? 'text-rose-400' : 'text-slate-300'
            }`}>
              {marksAwarded > 0 ? `+${marksAwarded.toFixed(2)}` : marksAwarded.toFixed(2)}
            </span>
            {penalty > 0 && (
              <span className="text-[10px] text-rose-400 font-mono">
                Penalty: -{penalty.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Correct Answer Display */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Official Correct Answer:
          </span>
          <span className="text-base font-mono font-bold text-emerald-400 px-3 py-1 rounded-md bg-emerald-950/50 border border-emerald-800">
            {Array.isArray(correctAnswer) ? correctAnswer.join(', ') : String(correctAnswer)}
          </span>
        </div>

        {/* Detailed Explanation Section */}
        {explanation && (
          <div className="space-y-5 text-slate-200">
            
            {/* Core Concept Header */}
            {explanation.concept && (
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Concept In Focus
                </span>
                <h4 className="text-lg font-bold text-white mt-1">
                  {explanation.concept}
                </h4>
                {explanation.summary && (
                  <p className="text-sm text-slate-400 mt-1">
                    {explanation.summary}
                  </p>
                )}
              </div>
            )}

            {/* Formula Reference Box (if available) */}
            {explanation.formula && (
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40">
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1 flex items-center space-x-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>Key Formula / Governing Equation</span>
                </div>
                <div
                  className="font-serif text-center py-1 text-sm sm:text-base text-blue-200"
                  dangerouslySetInnerHTML={{ __html: renderMathInText(`$$${explanation.formula}$$`) }}
                />
              </div>
            )}

            {/* Step-by-Step Derivation */}
            {explanation.steps && explanation.steps.length > 0 && (
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Step-by-Step Mathematical Derivation:
                </h5>
                <ol className="space-y-2.5">
                  {explanation.steps.map((step, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 text-sm leading-relaxed"
                    >
                      <div
                        className="font-normal"
                        dangerouslySetInnerHTML={{ __html: renderMathInText(step) }}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Common GATE Trap Alert */}
            {explanation.trap && (
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>GATE Trap / Common Misconception</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-300 leading-relaxed">
                  {explanation.trap}
                </p>
              </div>
            )}

          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition cursor-pointer"
          >
            Review Question
          </button>

          <button
            onClick={() => {
              onClose();
              onNextQuestion();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Next Practice Question</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
