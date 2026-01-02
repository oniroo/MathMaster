
import React, { useState, useEffect, useCallback } from 'react';
import { geminiService } from './services/gemini';
import { QuizState, Problem, UserSubmission, Difficulty } from './types';
import ProblemView from './components/ProblemView';
import FeedbackModal from './components/FeedbackModal';
import { BookOpen, Trophy, History, RefreshCcw, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentProblem: null,
    history: [],
    isLoading: false,
    error: null,
  });
  
  const [lastSubmission, setLastSubmission] = useState<UserSubmission | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const loadNewProblem = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const problemData = await geminiService.generateMathProblem('지수함수의 성질과 그래프, 지수방정식, 지수부등식');
      const newProblem: Problem = {
        ...problemData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setState(prev => ({
        ...prev,
        currentProblem: newProblem,
        isLoading: false,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: '문제를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      }));
    }
  }, []);

  useEffect(() => {
    loadNewProblem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (userAnswer: string) => {
    if (!state.currentProblem) return;

    // Basic cleaning for comparison (especially for numeric answers)
    const normalizedUser = userAnswer.replace(/\s/g, '').toLowerCase();
    const normalizedCorrect = state.currentProblem.correctAnswer.replace(/\s/g, '').toLowerCase();
    
    // Check if correct (simple equality for now, could be smarter for LaTeX)
    const isCorrect = normalizedUser === normalizedCorrect || 
                      (state.currentProblem.choices && state.currentProblem.choices.findIndex(c => c === userAnswer) + 1 === parseInt(state.currentProblem.correctAnswer));

    const submission: UserSubmission = {
      problemId: state.currentProblem.id,
      userAnswer,
      isCorrect,
      timestamp: Date.now(),
    };

    setLastSubmission(submission);
    setState(prev => ({
      ...prev,
      history: [...prev.history, submission]
    }));
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setLastSubmission(null);
    loadNewProblem();
  };

  const correctCount = state.history.filter(h => h.isCorrect).length;
  const accuracy = state.history.length > 0 ? Math.round((correctCount / state.history.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/80">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-black text-xl text-slate-900 tracking-tight">
              Math<span className="text-indigo-600">Master</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-bold">{correctCount}</span>
              </div>
              <div className="h-4 w-px bg-slate-300" />
              <div className="text-sm font-bold text-slate-600">{accuracy}%</div>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <RefreshCcw className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* Progress Section */}
        <div className="mb-8 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {state.history.map((h, i) => (
            <div 
              key={i} 
              className={`flex-shrink-0 w-3 h-3 rounded-full ${h.isCorrect ? 'bg-green-500' : 'bg-rose-500 shadow-sm shadow-rose-200'}`}
            />
          ))}
          {state.isLoading && (
            <div className="w-3 h-3 rounded-full bg-slate-200 animate-pulse" />
          )}
        </div>

        {/* Content Area */}
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          {state.isLoading ? (
            <div className="text-center space-y-4 animate-in fade-in duration-700">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-lg font-bold text-slate-600">지수함수 기출 변형 문제를 생성하고 있습니다...</p>
              <p className="text-sm text-slate-400">Gemini 3.0 Pro가 정교한 수식을 설계하는 중입니다.</p>
            </div>
          ) : state.error ? (
            <div className="bg-rose-50 border-2 border-rose-100 p-8 rounded-3xl text-center space-y-4 max-w-md">
              <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
              <h3 className="text-xl font-bold text-rose-900">문제가 발생했습니다</h3>
              <p className="text-rose-700">{state.error}</p>
              <button 
                onClick={loadNewProblem}
                className="px-6 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-colors"
              >
                다시 시도하기
              </button>
            </div>
          ) : state.currentProblem ? (
            <div className="w-full">
               <ProblemView 
                problem={state.currentProblem} 
                onSubmit={handleSubmit}
                isSubmitting={state.isLoading}
              />
            </div>
          ) : null}
        </div>

        {/* Info Stats Mobile */}
        <div className="mt-12 sm:hidden grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">정답 개수</p>
            <p className="text-2xl font-black text-slate-900">{correctCount}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">정답률</p>
            <p className="text-2xl font-black text-slate-900">{accuracy}%</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 mt-12 text-center">
        <p className="text-slate-400 text-sm font-medium">
          본 서비스는 수능 수학 지수함수 정복을 위해 AI가 생성한 고퀄리티 변형 문제를 제공합니다.
        </p>
      </footer>

      {/* Modal Overlay */}
      {showFeedback && lastSubmission && state.currentProblem && (
        <FeedbackModal 
          problem={state.currentProblem}
          submission={lastSubmission}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default App;
