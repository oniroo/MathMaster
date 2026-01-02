
import React from 'react';
import { Problem, Submission } from '../../types';
import { Latex } from '../ui/Latex';

export const Result: React.FC<{ problem: Problem; data: Submission; onNext: () => void }> = ({ problem, data, onNext }) => (
  <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
      <h2 className={`text-2xl font-black mb-4 ${data.isCorrect ? 'text-green-600' : 'text-rose-600'}`}>
        {data.isCorrect ? '정답입니다!' : '오답입니다.'}
      </h2>
      <div className="bg-slate-50 p-6 rounded-2xl mb-6 max-h-80 overflow-y-auto">
        <p className="text-xs font-bold text-slate-400 mb-2 uppercase">해설</p>
        <Latex text={problem.explanation} />
      </div>
      <button onClick={onNext} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">
        다음 문제
      </button>
    </div>
  </div>
);
