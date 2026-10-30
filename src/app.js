// Main GATE Practice Agent Application Component
import { useState, useEffect } from 'react';
import { GATE_PAPERS } from './data/papers.js';
import { generateQuestion, evaluateAnswer } from './utils/aiGenerator.js';
import { Header } from './components/Header.js';
import { PaperSelector } from './components/PaperSelector.js';
import { TopicSelector } from './components/TopicSelector.js';
import { QuestionCard } from './components/QuestionCard.js';
import { ExplanationModal } from './components/ExplanationModal.js';
import { VirtualCalculator } from './components/VirtualCalculator.js';
import { StatsDashboard } from './components/StatsDashboard.js';
import { ApiKeyModal } from './components/ApiKeyModal.js';

export function App() {
  // Paper state
  const [currentPaper, setCurrentPaper] = useState(() => {
    const saved = localStorage.getItem('gate_paper_id');
    const match = GATE_PAPERS.find(p => p.id === saved);
    return match || GATE_PAPERS[0]; // Default: GATE CS
  });
  const [isPaperSelectorOpen, setIsPaperSelectorOpen] = useState(false);

  // Subject and topic filter state
  const [selectedSubject, setSelectedSubject] = useState(currentPaper.subjects[0]?.id || 'algo_ds');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [questionType, setQuestionType] = useState('ALL');
  const [marksFilter, setMarksFilter] = useState(2);

  // Active question & answering state
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);

  // Modals & Tools
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('gate_gemini_api_key') || '');

  // Session Stats
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('gate_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return { score: 0, attempted: 0, correct: 0, incorrect: 0, totalPenalty: 0 };
  });

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem('gate_stats', JSON.stringify(stats));
  }, [stats]);

  // When paper changes, update active subject & save to localStorage
  const handleSelectPaper = (paper) => {
    setCurrentPaper(paper);
    setSelectedSubject(paper.subjects[0]?.id || '');
    setSelectedSubtopic('');
    localStorage.setItem('gate_paper_id', paper.id);
  };

  // Load a question
  const loadNewQuestion = async () => {
    setIsLoadingQuestion(true);
    setUserAnswer(null);
    setIsSubmitted(false);
    setEvaluation(null);
    setIsExplanationOpen(false);

    try {
      const q = await generateQuestion({
        paperId: currentPaper.id,
        subjectId: selectedSubject,
        subtopic: selectedSubtopic,
        questionType: questionType === 'ALL' ? null : questionType,
        marks: marksFilter,
        geminiApiKey: geminiApiKey
      });
      setCurrentQuestion(q);
    } catch (err) {
      console.error('Failed to generate question:', err);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  // Load initial question when app starts or when subject changes
  useEffect(() => {
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPaper.id, selectedSubject]);

  // Handle Answer Submission
  const handleSubmitAnswer = () => {
    if (!currentQuestion || !userAnswer) return;

    const evalResult = evaluateAnswer(currentQuestion, userAnswer);
    setEvaluation(evalResult);
    setIsSubmitted(true);
    setIsExplanationOpen(true);

    // Update Session Stats
    setStats((prev) => {
      const isCorr = evalResult.isCorrect;
      return {
        score: prev.score + evalResult.marksAwarded,
        attempted: prev.attempted + 1,
        correct: prev.correct + (isCorr ? 1 : 0),
        incorrect: prev.incorrect + (!isCorr ? 1 : 0),
        totalPenalty: prev.totalPenalty + evalResult.penalty
      };
    });

    // Trigger celebration confetti if correct
    if (evalResult.isCorrect && typeof window !== 'undefined' && window.confetti) {
      window.confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleClearAnswer = () => {
    setUserAnswer(currentQuestion?.type === 'MSQ' ? [] : '');
  };

  const handleResetStats = () => {
    setStats({ score: 0, attempted: 0, correct: 0, incorrect: 0, totalPenalty: 0 });
  };

  const handleSaveApiKey = (key) => {
    setGeminiApiKey(key);
    localStorage.setItem('gate_gemini_api_key', key);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        currentPaper={currentPaper}
        onOpenPaperSelector={() => setIsPaperSelectorOpen(true)}
        stats={stats}
        onToggleCalculator={() => setIsCalculatorOpen((prev) => !prev)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Topic Selector Section */}
        <TopicSelector
          currentPaper={currentPaper}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedSubtopic={selectedSubtopic}
          setSelectedSubtopic={setSelectedSubtopic}
          questionType={questionType}
          setQuestionType={setQuestionType}
          marksFilter={marksFilter}
          setMarksFilter={setMarksFilter}
          onGenerateQuestion={loadNewQuestion}
          isLoading={isLoadingQuestion}
        />

        {/* Question Answering Card */}
        {isLoadingQuestion ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center shadow-xl">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <h3 className="text-lg font-bold text-white">Synthesizing GATE Question...</h3>
            <p className="text-xs text-slate-400 mt-1">
              Applying IISc / IIT examination standards, LaTeX formulas, and concept traps.
            </p>
          </div>
        ) : (
          <QuestionCard
            question={currentQuestion}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            onSubmitAnswer={handleSubmitAnswer}
            onClearAnswer={handleClearAnswer}
            onNextQuestion={loadNewQuestion}
            onToggleCalculator={() => setIsCalculatorOpen((prev) => !prev)}
            isSubmitted={isSubmitted}
          />
        )}

        {/* Live Performance & Scorecard */}
        <StatsDashboard
          stats={stats}
          onResetStats={handleResetStats}
          currentPaper={currentPaper}
        />

      </main>

      {/* Modals & Popups */}
      <PaperSelector
        isOpen={isPaperSelectorOpen}
        onClose={() => setIsPaperSelectorOpen(false)}
        currentPaper={currentPaper}
        onSelectPaper={handleSelectPaper}
      />

      <ExplanationModal
        isOpen={isExplanationOpen}
        evaluation={evaluation}
        onClose={() => setIsExplanationOpen(false)}
        onNextQuestion={loadNewQuestion}
      />

      <VirtualCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <ApiKeyModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={geminiApiKey}
        onSaveApiKey={handleSaveApiKey}
      />

    </div>
  );
}
