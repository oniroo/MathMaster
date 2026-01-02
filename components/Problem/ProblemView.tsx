
import React, { useState } from 'react';
import { Problem, Difficulty } from '../types';
import LatexRenderer from './LatexRenderer';

interface ProblemViewProps {
  problem: Problem;
  onSubmit: (answer: string) => void;
  isSubmitting: boolean;
}

const ProblemView: React.FC<ProblemViewProps> = ({ problem, onSubmit, isSubmitting }) => {
  const [userAnswer, setUserAnswer] = useState('');

  // Fixed: Difficulty is a type alias for string literals. Replaced non-existent enum-like access with actual strings.
  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case '쉬움': return 'bg-green-100 text-green-700';
      case '보통': return 'bg-blue-100 text-blue-700';
      case '어려움': return 'bg-orange-100 text-orange-700';
      case '킬러': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleChoiceSelect = (choice: string) => {
    setUserAnswer(choice);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer) return;
    onSubmit(userAnswer);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getDifficultyColor(problem.difficulty)}`}>
          {problem.difficulty}
        </span>
        <span className="text-xs text-slate-500 font-medium">
          {/* Fixed: Changed problem.sourceType to problem.source */}
          출처: {problem.source}
        </span>
      </div>

      <div className="p-8">
        <div className="text-lg text-slate-800 mb-8 font-medium">
          <LatexRenderer content={problem.question} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {problem.choices && problem.choices.length > 0 ? (
            <div className="grid gap-3">
              {problem.choices.map((choice, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChoiceSelect(choice)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                    userAnswer === choice 
                      ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200' 
                      : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    userAnswer === choice ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {idx + 1}
                  </span>
                  <div className="flex-grow">
                    <LatexRenderer content={choice} />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 block">정답 입력 (숫자만)</label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="답안을 입력하세요"
                className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-lg"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!userAnswer || isSubmitting}
            className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] transition-all shadow-lg shadow-indigo-200"
          >
            {isSubmitting ? '채점 중...' : '답안 제출하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProblemView;
