
import React from 'react';
import { Problem, Submission } from '../types';
import { Latex } from './Latex';

export const Feedback: React.FC<{ problem: Problem; result: Submission; onNext: () => void }> = ({ problem, result, onNext }) => (
  <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl animate-in zoom-in-95">
      <h2 className={`text-2xl font-black mb-4 ${result.isCorrect ? 'text-green-600' : 'text-rose-600'}`}>
        {result.isCorrect ? '정답입니다!' : '오답입니다.'}
      </h2>
      <div className="bg-slate-50 p-6 rounded-2xl mb-6 overflow-y-auto max-h-96">
        <p className="text-sm font-bold text-slate-400 mb-2">상세 해설</p>
        <Latex content={problem.explanation} />
      </div>
      <button onClick={onNext} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold">
        다음 문제
      </button>
    </div>
  </div>
);
