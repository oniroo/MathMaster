
import React from 'react';
import { Problem, Submission } from '../types';
import LatexRenderer from './LatexRenderer';

interface FeedbackModalProps {
  problem: Problem;
  // Fixed: Corrected UserSubmission to Submission
  submission: Submission;
  onNext: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ problem, submission, onNext }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className={`p-6 flex items-center justify-center ${submission.isCorrect ? 'bg-green-500' : 'bg-rose-500'}`}>
          <div className="text-white text-center">
            <h2 className="text-3xl font-black mb-1">
              {submission.isCorrect ? '정답입니다! 🎉' : '아쉽네요... 😢'}
            </h2>
            <p className="text-white/80 font-medium">
              {submission.isCorrect ? '완벽한 논리였어요!' : '다시 한 번 검토해볼까요?'}
            </p>
          </div>
        </div>

        <div className="p-8 overflow-y-auto flex-grow space-y-6">
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">나의 답안</h3>
            <div className={`p-4 rounded-xl font-bold text-lg ${submission.isCorrect ? 'bg-green-50 text-green-700' : 'bg-rose-50 text-rose-700'}`}>
               {submission.userAnswer}
            </div>
          </section>

          {!submission.isCorrect && (
            <section>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">정답</h3>
              <div className="p-4 rounded-xl font-bold text-lg bg-indigo-50 text-indigo-700">
                 {problem.correctAnswer}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">상세 해설</h3>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <LatexRenderer content={problem.explanation} />
            </div>
          </section>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={onNext}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-colors"
          >
            다음 문제로 넘어가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
