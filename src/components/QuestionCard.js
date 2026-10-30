// Interactive Question Card Component
import { renderMathInText } from './KaTeXRenderer.js';

export function QuestionCard({
  question,
  userAnswer,
  setUserAnswer,
  onSubmitAnswer,
  onClearAnswer,
  onNextQuestion,
  onToggleCalculator,
  isSubmitted
}) {
  if (!question) return null;

  const handleMsqToggle = (optionId) => {
    if (isSubmitted) return;
    const current = Array.isArray(userAnswer) ? [...userAnswer] : [];
    if (current.includes(optionId)) {
      setUserAnswer(current.filter((id) => id !== optionId));
    } else {
      setUserAnswer([...current, optionId].sort());
    }
  };

  const isOptionSelected = (optionId) => {
    if (question.type === 'MCQ') {
      return userAnswer === optionId;
    }
    if (question.type === 'MSQ') {
      return Array.isArray(userAnswer) && userAnswer.includes(optionId);
    }
    return false;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden mb-8">
      
      {/* Question Card Header (GATE Exam Format) */}
      <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <span className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 font-mono font-bold text-xs">
            {question.paper} &bull; {question.subtopic}
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
            {question.type}
          </span>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
            +{question.marks} Mark{question.marks > 1 ? 's' : ''}
          </span>
        </div>

        {/* Negative Marking Rule Notice */}
        <div className="flex items-center space-x-2 text-xs">
          {question.type === 'MCQ' && (
            <span className="text-rose-400 font-mono bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/50">
              Negative: -{(question.marks / 3).toFixed(2)}
            </span>
          )}
          {question.type === 'MSQ' && (
            <span className="text-emerald-400 font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50">
              No Negative &bull; No Partial Marks
            </span>
          )}
          {question.type === 'NAT' && (
            <span className="text-sky-400 font-mono bg-sky-950/40 px-2 py-0.5 rounded border border-sky-900/50">
              NAT &bull; No Negative Marks
            </span>
          )}
        </div>
      </div>

      {/* PYQ Reference banner */}
      {question.pyqReference && (
        <div className="bg-indigo-950/20 px-6 py-1.5 border-b border-indigo-900/30 flex items-center justify-between text-[11px] text-indigo-300">
          <div className="flex items-center space-x-1.5">
            <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{question.pyqReference}</span>
          </div>
          <button
            onClick={onToggleCalculator}
            className="text-indigo-400 hover:text-indigo-200 underline font-mono cursor-pointer"
          >
            Virtual Calculator
          </button>
        </div>
      )}

      {/* Question Body */}
      <div className="p-6 sm:p-8">
        
        {/* Render question text with KaTeX */}
        <div
          className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-6 space-y-3"
          dangerouslySetInnerHTML={{ __html: renderMathInText(question.question) }}
        />

        {/* Answer Options for MCQ & MSQ */}
        {(question.type === 'MCQ' || question.type === 'MSQ') && question.options && (
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              {question.type === 'MCQ'
                ? 'Select the single correct option:'
                : 'Select one or more correct options (MSQ):'}
            </div>

            {question.options.map((opt) => {
              const selected = isOptionSelected(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    if (isSubmitted) return;
                    if (question.type === 'MCQ') {
                      setUserAnswer(opt.id);
                    } else {
                      handleMsqToggle(opt.id);
                    }
                  }}
                  className={`p-4 rounded-xl border text-sm sm:text-base flex items-start space-x-3 transition-all cursor-pointer ${
                    selected
                      ? 'border-blue-500 bg-blue-950/40 text-blue-100 shadow-md shadow-blue-500/10'
                      : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-950/80'
                  }`}
                >
                  {/* Radio / Checkbox Indicator */}
                  <div className="pt-0.5">
                    {question.type === 'MCQ' ? (
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-xs ${
                          selected
                            ? 'border-blue-500 bg-blue-600 text-white'
                            : 'border-slate-700 bg-slate-800 text-slate-400'
                        }`}
                      >
                        {opt.id}
                      </div>
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold ${
                          selected
                            ? 'border-blue-500 bg-blue-600 text-white'
                            : 'border-slate-700 bg-slate-800 text-slate-400'
                        }`}
                      >
                        {selected ? '✓' : opt.id}
                      </div>
                    )}
                  </div>

                  {/* Option Text with KaTeX */}
                  <div
                    className="flex-1 font-normal"
                    dangerouslySetInnerHTML={{ __html: renderMathInText(opt.text) }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* NAT (Numerical Answer Type) Input */}
        {question.type === 'NAT' && (
          <div className="mt-4 p-5 rounded-xl border border-slate-800 bg-slate-950/60 max-w-lg">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Numerical Answer:
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                disabled={isSubmitted}
                value={userAnswer || ''}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="e.g. 12 or 4.5"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setUserAnswer('')}
                className="px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-mono"
              >
                Clear
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Tip: Use decimal or integer as asked. Check rounding off instructions in the question.
            </p>
          </div>
        )}

      </div>

      {/* Action Footer */}
      <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={onClearAnswer}
            disabled={isSubmitted || !userAnswer}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition disabled:opacity-30 cursor-pointer"
          >
            Clear Response
          </button>
          <button
            onClick={onToggleCalculator}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-mono font-medium border border-indigo-900/40 transition flex items-center space-x-1"
          >
            <span>Calculator</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onNextQuestion}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
          >
            Skip / Next
          </button>

          <button
            onClick={onSubmitAnswer}
            disabled={!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition disabled:opacity-40 cursor-pointer flex items-center space-x-2"
          >
            <span>Submit & Check Answer</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}
