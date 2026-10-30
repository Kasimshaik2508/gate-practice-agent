// Topic and Syllabus Selector Component
export function TopicSelector({
  currentPaper,
  selectedSubject,
  setSelectedSubject,
  selectedSubtopic,
  setSelectedSubtopic,
  questionType,
  setQuestionType,
  marksFilter,
  setMarksFilter,
  onGenerateQuestion,
  isLoading
}) {
  const activeSubjectData = currentPaper.subjects.find((s) => s.id === selectedSubject) || currentPaper.subjects[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl mb-6">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Select Topic to Test Yourself
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Pick a subject from your <span className="text-blue-400 font-semibold">{currentPaper.name}</span> syllabus.
          </p>
        </div>

        {/* Quick Filter: Question Type & Marks */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Question Type Filter */}
          <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800 text-xs">
            <button
              onClick={() => setQuestionType('ALL')}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                questionType === 'ALL' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setQuestionType('MCQ')}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                questionType === 'MCQ' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              MCQ
            </button>
            <button
              onClick={() => setQuestionType('MSQ')}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                questionType === 'MSQ' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              MSQ
            </button>
            <button
              onClick={() => setQuestionType('NAT')}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                questionType === 'NAT' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              NAT
            </button>
          </div>

          {/* Marks Filter */}
          <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800 text-xs">
            <button
              onClick={() => setMarksFilter(1)}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                marksFilter === 1 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              1 Mark
            </button>
            <button
              onClick={() => setMarksFilter(2)}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                marksFilter === 2 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              2 Marks
            </button>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="mt-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Subject:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {currentPaper.subjects.map((subject) => {
            const isSelected = selectedSubject === subject.id;
            return (
              <button
                key={subject.id}
                onClick={() => {
                  setSelectedSubject(subject.id);
                  setSelectedSubtopic('');
                }}
                className={`text-left p-3 rounded-xl border text-xs transition-all relative ${
                  isSelected
                    ? 'border-blue-500 bg-blue-950/40 text-blue-200 font-semibold shadow-md shadow-blue-500/10'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="line-clamp-2">{subject.name}</div>
                <div className="mt-1 text-[10px] text-slate-400 font-mono">
                  {subject.weightage}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtopics Bar */}
      {activeSubjectData && activeSubjectData.subtopics && (
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Focus Subtopic (Optional):
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedSubtopic('')}
              className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                selectedSubtopic === ''
                  ? 'bg-slate-700 text-white border-slate-600 font-medium'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              All Subtopics
            </button>
            {activeSubjectData.subtopics.map((sub) => {
              const isSelected = selectedSubtopic === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubtopic(sub)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                    isSelected
                      ? 'bg-blue-600/30 text-blue-300 border-blue-500/50 font-medium'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Generator Call to Action Button */}
      <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-400 flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Questions are generated based on IIT/IISc GATE PYQ patterns & traps</span>
        </div>

        <button
          onClick={onGenerateQuestion}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>Synthesizing Question...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate PYQ-Style Question</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
